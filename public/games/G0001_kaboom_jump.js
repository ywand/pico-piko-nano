import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";
import * as maps from "./G0001_kaboom_jump_map.js";

const DEBUG = false;
const fontSize = {
  sm: 12,
  md: 16,
  lg: 32,
}
const container = document.getElementById("main");
const cw = container.clientWidth;
const ch = container.clientHeight;
const cv = document.createElement("canvas");
console.log("canvas info:", cw, ch, cv);
container.appendChild(cv);
const GRAVITY_VAL = 1000;
const DEF_SPEED = 150;
const DEF_POINT = 100;
const MAX_GAME_STAGE = 3;
const START_STAGE = 1;
kaboom({
  width: cw,
  height: ch,
  canvas: cv,
  background: [240, 240, 240],
  gravity: GRAVITY_VAL,
});
cv.tabIndex = 0;
cv.focus();
setGravity(GRAVITY_VAL);

Promise.all([loadSprite("bean", "../assets/bean.png")]
).then(() => {
  console.log("全てのリソース読み込み完了");
  getHightScore();
  go("game", { stageNum: START_STAGE });
});

//ゲームシーンの作成
let stageClearFlag = false;
let point = 0;
scene("game", ({ stageNum = 1 }) => {
  const stageName = "stage" + stageNum;
  console.log("scene", stageNum, stageName);
  const startPos = createMap(stageName);
  stageClearFlag = false;
  createPlayer(startPos, stageNum);
  setupInput();
  point += DEF_POINT;
  setupUI();
});

//マップ生成
const TILE_SIZE = 32;
const tileDef = {
  "■": { solid: true, color: rgb(80, 80, 80) },   // 壁
  "宝": { solid: false, color: rgb(255, 200, 50) },
  "始": { start: true },
  "終": { solid: false, color: rgb(240, 0, 0) },
  "戻": { solid: false, color: rgb(240, 240, 240) },
  "１": { solid: false, color: rgb(0, 0, 255) },
  "２": { solid: false, color: rgb(0, 0, 255) },
  "３": { solid: false, color: rgb(0, 255, 0) },
  "４": { solid: false, color: rgb(0, 255, 0) },
  "□": null,
};
// ゲート収集用
let currentGate = null;   // 今入っているゲート番号
const warpPairs = {
  "1": "2",
  "2": "1",
  "3": "4",
  "4": "3",
};
let isWarping = false; // ワープ中フラグ
function handleWarp(num) {
  if (currentGate === num) return; // 同じゲート内なら無視
  if (currentGate != null) return; // ワープ情報を持っていたら無視
  if (isWarping) return; // ワープ中なら何もしない

  const target = warpPairs[num];
  const posData = gates[target][0];
  currentGate = num;  // 今いるゲートを記録
  isWarping = true; // フラグを立てる
  if (player.vel) {
    player.vel = vec2(0, 0);
    player.move(0, 0);
  }
  player.area.enabled = false;
  player.pos = vec2(posData.px + TILE_SIZE / 2, posData.py + TILE_SIZE / 2);
  groundedY = player.pos.y;
  // 0.5秒後にフラグを解除（この間は戻らない）
  wait(0.5, () => {
    isWarping = false;
    player.area.enabled = true;
  });
}
const gates = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
};
let map_y_limit = 0;
function createMap(stageName) {
  let startPos = vec2(0, 0);
  gates["1"] = [];
  gates["2"] = [];
  gates["3"] = [];
  gates["4"] = [];
  const stageMap = maps.strMaps[stageName];
  if (!stageMap) {
    console.error("Map not found:", stageName);
    return startPos;
  }
  console.log("stageMap:", stageMap);

  stageMap.forEach((row, y) => {
    [...row].forEach((c, x) => {
      const def = tileDef[c];
      if (!def) return;
      const px = x * TILE_SIZE;
      const py = y * TILE_SIZE;
      map_y_limit = Math.max(py + TILE_SIZE, map_y_limit);

      // 壁などの地形
      if (def.solid) {
        add([
          rect(TILE_SIZE, TILE_SIZE),
          pos(px, py),
          area(),
          body({ isStatic: true }),
          color(def.color),
        ]);
        def.isStatic = true;
      }

      // 宝
      if (c === "宝") {
        add([
          rect(TILE_SIZE * 0.6, TILE_SIZE * 0.6),
          pos(px + TILE_SIZE * 0.2, py + TILE_SIZE * 0.2),
          area(),
          color(def.color),
          "treasure",
        ]);
      }
      if (c === "終") {
        add([
          rect(TILE_SIZE * 0.6, TILE_SIZE * 0.6),
          pos(px + TILE_SIZE * 0.2, py + TILE_SIZE * 0.2),
          area(),
          color(def.color),
          "goal",
        ]);
      }
      if (c === "戻") {
        add([
          rect(TILE_SIZE, TILE_SIZE),
          pos(px, py),
          area(),
          color(def.color),
          "back",
        ]);
      }
      if (c === "１") {
        add([
          rect(TILE_SIZE * 0.6, TILE_SIZE * 0.6),
          pos(px + TILE_SIZE * 0.2, py + TILE_SIZE * 0.2),
          area(),
          color(def.color),
          "gate1",
        ]);
        gates["1"].push({ px, py });
      }
      if (c === "２") {
        add([
          rect(TILE_SIZE * 0.6, TILE_SIZE * 0.6),
          pos(px + TILE_SIZE * 0.2, py + TILE_SIZE * 0.2),
          area(),
          color(def.color),
          "gate2",
        ]);
        gates["2"].push({ px, py });
      }
      if (c === "３") {
        add([
          rect(TILE_SIZE * 0.6, TILE_SIZE * 0.6),
          pos(px + TILE_SIZE * 0.2, py + TILE_SIZE * 0.2),
          area(),
          color(def.color),
          "gate3",
        ]);
        gates["3"].push({ px, py });
      }
      if (c === "４") {
        add([
          rect(TILE_SIZE * 0.6, TILE_SIZE * 0.6),
          pos(px + TILE_SIZE * 0.2, py + TILE_SIZE * 0.2),
          area(),
          color(def.color),
          "gate4",
        ]);
        gates["4"].push({ px, py });
      }

      // スタート位置
      if (def.start) {
        startPos = vec2(
          px + TILE_SIZE / 2,
          py + TILE_SIZE / 2
        );
      }
    });
  });
  return startPos;
}

//プレイヤー生成
let player = null;
let speed;
let groundedY = null
function createPlayer(startPos, stageNum) {
  console.log("createPlayer", startPos, stageNum);

  //プレイヤー追加
  player = add([
    sprite("bean"),
    area(TILE_SIZE / 3, TILE_SIZE / 3),
    pos(startPos.x, startPos.y),
    body({ weight: 1 }),
    scale(0.5),  // ← ここでscaleを初期化
    anchor("center"),
  ]);
  speed = DEF_SPEED;
  console.log("player", player);

  PlayerCollideCheck(startPos, stageNum);

  function updatePlayerControl() {
    inputLog();
    if (input.left) {
      player.move(-speed, 0);
    }
    if (input.right) {
      player.move(speed, 0);
    }
    if (input.down) {
      //降下はタッチやマウスで表現出来ないため無効化
      player.move(0, speed);
    }
    if (input.jump) {
      if (player.isGrounded()) {
        player.jump(speed * 2);
      }
      input.jump = false;
    }
  }

  //プレイヤー状態の更新
  player.onUpdate(() => {
    if (player.isGrounded()) {
      if (groundedY === null) {
        groundedY = Math.round(player.pos.y)
      }
      player.pos.y = groundedY
    } else {
      groundedY = null
    }

    const target = player.pos;
    const smooth = 6; // 小さいほどゆっくり（2〜6が目安）
    camPos(
      camPos().lerp(target, smooth * dt())
    );

    updatePlayerControl();
    //落下した場合リスタート
    if (player.pos.y > map_y_limit) {
      point -= 10;
      player.pos.x = startPos.x;
      player.pos.y = startPos.y;
    }
  })
}

//衝突判定の作成
function PlayerCollideCheck(startPos, stageNum) {
  //宝との接触
  player.onCollide("treasure", (t) => {
    if (t.collected) return;
    t.collected = true;
    speed += 30;            // スピード上昇
    point += 10;
    destroy(t);             // 宝を消す
    console.log("スピードアップ！: " + speed);
  });
  player.onCollide("back", (t) => {
    player.pos = vec2(startPos.x, startPos.y);
    point -= 10;
    console.log("リスタート: " + startPos);
  });

  //ゲートと接触でワープ
  player.onCollide("gate1", () => handleWarp("1"));
  player.onCollide("gate2", () => handleWarp("2"));
  player.onCollide("gate3", () => handleWarp("3"));
  player.onCollide("gate4", () => handleWarp("4"));
  player.onCollideEnd("gate1", () => {
    if (currentGate === "1") currentGate = null;
  });
  player.onCollideEnd("gate2", () => {
    if (currentGate === "2") currentGate = null;
  });
  player.onCollideEnd("gate3", () => {
    if (currentGate === "3") currentGate = null;
  });
  player.onCollideEnd("gate4", () => {
    if (currentGate === "4") currentGate = null;
  });

  //ゴールエリアとの接触
  player.onCollide("goal", (t) => {
    if (t.collected) return;
    t.collected = true;
    destroy(t);             // ゴールを消す
    console.log("ステージ" + stageNum + " クリア！");
    stageClearFlag = true;
    const strStageClear = createTextArea("ステージ" + stageNum + " クリア！", cw / 2 - fontSize.lg * 4, ch / 2 - fontSize.lg * 1, fontSize.lg, rgb(255, 0, 0));

    const nextStage = stageNum + 1;

    if (nextStage <= MAX_GAME_STAGE) {
      wait(3, () => {
        go("game", { stageNum: nextStage });
      });
    } else {
      const strGameClear = createTextArea("ゲームクリア！", cw / 2 - fontSize.lg * 4, ch / 2, fontSize.lg, rgb(255, 0, 0));
      if (highScore.point < point) {

        const now = new Date()
        const strYMD =
          now.getFullYear() + "-" +
          (now.getMonth() + 1).toString().padStart(2, "0") + "-" +
          now.getDate().toString().padStart(2, "0")
        setHightScore(point, strYMD);
        getHightScore();
        strGameClear.text = "ゲームクリア！\nハイスコア更新！";
      }
    }
  });
}

//操作入力関連
const input = {
  left: false,
  right: false,
  jump: false,
  down: false,
}
let oldinput = {
  left: false,
  right: false,
  jump: false,
  down: false,
}
function setupInput() {
  //キー入力
  keyBind(["right", "d", "6"], "right");
  keyBind(["left", "a", "4"], "left");
  keyBind(["up", "w", "8", "space"], "jump");
  keyBind(["down", "s", "2"], "down");

  // タッチ処理
  onTouchStart((pos) => {
    handleTouch(pos);
  });

  onTouchMove((pos) => {
    handleTouch(pos);
  });

  // マウスクリック処理
  onMouseDown(() => {
    const mpos = mousePos();
    if (mpos.x > cw * 0.7) {
      input.right = true;
    }
    else if (mpos.x < cw * 0.3) {
      input.left = true;
    }
    if (mpos.y < ch * 0.49) {
      input.jump = true;
    } else if (mpos.y > ch * 0.6) {
      input.down = true;
    }
  });

  onMouseRelease(() => {
    input.right = false;
    input.left = false;
    input.jump = false;
    input.down = false;
  });
}

function keyBind(keys, prop) {
  keys.forEach(k => {
    onKeyDown(k, () => input[prop] = true);
    onKeyRelease(k, () => input[prop] = false);
  });
}

function handleTouch(pos) {
  const cam = camPos();
  const tposX = pos.x - cw / 2;
  const tposY = pos.y - ch / 2;

  if (tposX > cw * 0.7) {
    input.right = true;
  }
  else if (tposX < cw * 0.3) {
    input.left = true;
  }
  if (tposY < ch * 0.49) {
    input.jump = true;
  } else if (tposY > ch * 0.6) {
    input.down = true;
  }
};

function inputLog() {
  if (DEBUG) {
    if (
      input.left !== oldinput.left ||
      input.right !== oldinput.right ||
      input.jump !== oldinput.jump ||
      input.down !== oldinput.down
    ) {
      console.log(input);
      oldinput = { ...input };
    }
  }
}

// テキストを作成する関数
function createTextArea(str, x = 0, y = 0, tsize = 16, col = rgb(0, 0, 0)) {
  const textBox = add([
    text(str, {
      size: tsize,
      font: "sinko",
      width: cw,    // 必要に応じて折り返し幅を調整
      align: "left",
    }),
    pos(x, y),        // 画面上の固定座標
    color(col),
    fixed(), // 画面スクロールに追従させる
    z(100),  // 数値を大きくして手前に持ってくる
  ]);

  return textBox;
}

function strNowTime() {
  const elapsed = time(); // 起動時からの経過秒数
  const mins = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const secs = Math.floor(elapsed % 60).toString().padStart(2, "0");
  return mins + ":" + secs
}

function setupUI() {
  // 使用例：画面左上に固定表示
  const strNowInfo = "時間" + "00:00" + "/点数" + String(point).padStart(3, "0") + "/速さ" + speed;
  const nowInfo = createTextArea(strNowInfo, 0, 0, fontSize.md);
  nowInfo.onUpdate(() => {
    if (stageClearFlag) return
    updatePoint();
    nowInfo.text = "時間" + strNowTime() + "/点数" + String(point).padStart(3, "0") + "/速さ" + speed;
  });
  const strHightScoreInfo = "最高点" + String(highScore.point).padStart(3, "0") + "/記録日" + highScore.date;
  const HightScoreInfo = createTextArea(strHightScoreInfo, 0, 20, fontSize.md);
  HightScoreInfo.onUpdate(() => {
    HightScoreInfo.text = "最高点" + String(highScore.point).padStart(3, "0") + "/記録日" + highScore.date;
  });
}

let diffSec = 0;
let oldTime = 0;
function updatePoint() {
  if (stageClearFlag) return
  let t = Math.floor(time());
  if (oldTime < t) {
    diffSec = t - oldTime;
    oldTime = t;
    point -= diffSec;
  }
}

//ハイスコア取得
let highScore = {
  point: 0,
  date: "",
}
function getHightScore() {
  highScore.point = localStorage.getItem("G0001_HightScore_point")
  highScore.date = localStorage.getItem("G0001_HightScore_date")
  if (highScore.point == null || highScore == undefined) {
    //初回ゲーム起動時にハイスコアの設定がない場合に初期値設定
    highScore.point = 0
    highScore.date = "0000-00-00"
    setHightScore(highScore.point, highScore.date, highScore.timer)
  }
}
//ハイスコア設定
function setHightScore(point, date, timer) {
  localStorage.setItem("G0001_HightScore_point", point)
  localStorage.setItem("G0001_HightScore_date", date)
}