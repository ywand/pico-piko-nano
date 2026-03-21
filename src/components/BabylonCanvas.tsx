"use client";

import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  DirectionalLight,
  ShadowGenerator,
  Vector3,
  MeshBuilder,
  Quaternion,
  PhysicsBody,
  PhysicsShapeBox,
  PhysicsShapeSphere,
  PhysicsMotionType,
  HavokPlugin,
  PBRMaterial,
  StandardMaterial,
  Color3,
  Color4,
  Matrix,
  Mesh,
} from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";
import * as GUI from "@babylonjs/gui";

type ObjectOptions = {
  position?: Vector3;
  size?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  rotation?: Vector3;
  scaling?: Vector3;
  physics?: {
    friction?: number;
  };
};

type MaterialOptions = {
  color?: Color3;
  alpha?: number;
  metallic?: number;
  roughness?: number;
};

type SleepState = {
  idleTime: number;
  isStatic: boolean;
  lastTime: number;
};
const stateMap = new Map<PhysicsBody, SleepState>();

class Game {
  engine: Engine;
  scene: Scene;
  size: {
    width: number;
    height: number;
  };
  camera: ArcRotateCamera;
  light: HemisphericLight;
  dlight: DirectionalLight;
  shadow: ShadowGenerator;
  gui: {
    ui: GUI.AdvancedDynamicTexture;
    panel: GUI.StackPanel;
    text: Record<string, GUI.TextBlock>;
    other: Record<string, unknown>;
  };
  obj: Record<string, any> = {};
  mat: Record<string, any> = {};

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.engine.setHardwareScalingLevel(1);
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.2, 0.2, 0.3, 1);
    this.size = {
      width: this.scene.getEngine().getRenderWidth(),
      height: this.scene.getEngine().getRenderHeight(),
    };
    this.camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      50,
      Vector3.Zero(),
      this.scene,
    );
    this.camera.attachControl(canvas, true);
    this.camera.wheelPrecision = 100;
    this.light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene,
    );
    this.light.intensity = 0.3;
    this.dlight = new DirectionalLight(
      "dir",
      new Vector3(0, -1, 0),
      //new Vector3(0, -1, 0), // 真下（垂直）に向ける
      this.scene,
    );
    this.dlight.position = new Vector3(10, 50, 10);
    this.dlight.shadowMinZ = 1;
    this.dlight.shadowMaxZ = 400;
    this.dlight.autoUpdateExtends = false;
    this.dlight.shadowOrthoScale = 10;
    this.shadow = new ShadowGenerator(1024, this.dlight);
    this.shadow.blurScale = 2;
    this.shadow.setDarkness(0.5);
    this.shadow.useBlurExponentialShadowMap = true;
    this.shadow.getShadowMap()!.refreshRate = 1;

    this.gui = {
      ui: GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene),
      panel: new GUI.StackPanel(),
      text: {},
      other: {},
    };

    this.mat.matAwake = new StandardMaterial("awake", this.scene);
    this.mat.matAwake.diffuseColor = new Color3(0.2, 0.6, 1);
    this.mat.matSleep = new StandardMaterial("sleep", this.scene);
    this.mat.matSleep.diffuseColor = new Color3(0.1, 0.3, 0.5); // スリープ時
  }

  //物理設定
  async initPysics() {
    const havok = await HavokPhysics({
      locateFile: () => "/HavokPhysics.wasm",
    });
    if (this.scene.isDisposed) return;
    const plugin = new HavokPlugin(true, havok);
    this.scene.enablePhysics(new Vector3(0, -9.8, 0), plugin);
    this.scene.getPhysicsEngine()?.setTimeStep(1 / 60);
    this.scene.getPhysicsEngine()?.setSubTimeStep(2);
  }

  setupGUI() {
    this.gui.panel.width = "250px";
    this.gui.panel.adaptHeightToChildren = true;
    this.gui.panel.isVertical = true;
    this.gui.panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.gui.panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.gui.panel.background = "rgba(200,200,200,0.5)";
    this.gui.ui.addControl(this.gui.panel);
    //this.gui.ui.idealWidth = 1920;
    //this.gui.ui.idealHeight = 1080;
    this.gui.ui.renderScale = 1;
    //this.gui.panel.isVisible = true;

    //fps表示
    this.gui.text.fpsText = new GUI.TextBlock();
    this.gui.text.fpsText.text = "FPS：0";
    this.gui.text.fpsText.color = "black";
    this.gui.text.fpsText.resizeToFit = true;
    this.gui.text.fpsText.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.gui.text.fpsText.textVerticalAlignment =
      GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.gui.text.fpsText.fontSize = this.size.height / 30 + "px";
    this.gui.text.fpsText.paddingTop = 4;
    this.gui.panel.addControl(this.gui.text.fpsText);
    this.scene.onBeforeRenderObservable.add(() => {
      this.gui.text.fpsText.text = "FPS：" + this.engine.getFps().toFixed();
    });
    this.gui.other = {};
  }

  createGround(option: ObjectOptions) {
    const w = option.size?.width ?? 1;
    const h = option.size?.height ?? 1;
    const d = option.size?.depth ?? 1;
    this.obj.ground = MeshBuilder.CreateBox(
      "floor",
      { width: w, depth: d, height: h },
      this.scene,
    );
    this.obj.ground.rotationQuaternion = new Quaternion();
    this.obj.ground.receiveShadows = true;
    //this.shadow.addShadowCaster(this.obj.ground, false);
    //this.shadow.getShadowMap()?.renderList?.push(this.obj.ground);

    this.obj.groundBody = new PhysicsBody(
      this.obj.ground,
      PhysicsMotionType.STATIC,
      false,
      this.scene,
    );

    // 地面と壁は薄い箱として扱う
    console.log(this.scene.isPhysicsEnabled());
    this.obj.groundShape = new PhysicsShapeBox(
      Vector3.Zero(), // center
      Quaternion.Identity(), // rotation
      new Vector3(w, h, d),
      this.scene,
    );

    const groundMaterial = {
      friction: 1.0, // 摩擦（0〜1程度が一般的）
      restitution: 0.1, // 反発（跳ね返り）
    };
    this.obj.groundShape.material = groundMaterial;
    this.obj.groundBody.shape = this.obj.groundShape;
  }

  createWalls(option: ObjectOptions) {
    const w = option.size?.width ?? 1;
    const h = option.size?.height ?? 1;
    const d = option.size?.depth ?? 1;
    // 壁のデータ定義（位置とサイズ）
    const walls: { mesh: any; body: PhysicsBody }[] = [];
    const wallsData = [
      {
        name: "wall_N",
        pos: new Vector3(0, h / 2, -d / 2),
        size: new Vector3(w, h, d / 10),
      },
      {
        name: "wall_S",
        pos: new Vector3(0, h / 2, d / 2),
        size: new Vector3(w, h, d / 10),
      },
      {
        name: "wall_E",
        pos: new Vector3(w / 2, h / 2, 0),
        size: new Vector3(w / 10, h, d),
      },
      {
        name: "wall_W",
        pos: new Vector3(-w / 2, h / 2, 0),
        size: new Vector3(w / 10, h, d),
      },
    ];
    wallsData.forEach((data) => {
      const wall = MeshBuilder.CreateBox(
        data.name,
        {
          width: data.size.x,
          height: data.size.y,
          depth: data.size.z,
        },
        this.scene,
      );
      wall.position = data.pos;
      wall.parent = this.obj.ground; // 地面を親にする（地面の傾きに連動する）
      wall.isVisible = true; // 見えなくする（デバッグ時は true にすると確認しやすいです）
      wall.enableEdgesRendering();
      wall.edgesWidth = 2;
      wall.edgesColor = new Color4(0.5, 0.8, 1, 1);
      wall.material = this.createMaterial(data.name, {
        color: new Color3(1, 0, 0),
        alpha: 0.1,
      });

      // 壁の物理設定
      const wallBody = new PhysicsBody(
        wall,
        PhysicsMotionType.STATIC,
        false,
        this.scene,
      );
      wallBody.shape = new PhysicsShapeBox(
        Vector3.Zero(),
        Quaternion.Identity(),
        new Vector3(data.size.x, data.size.y, data.size.z),
        this.scene,
      );
      wallBody.shape.material = {
        friction: option.physics?.friction ?? 1,
        restitution: 0.1,
      };
      walls.push({ mesh: wall, body: wallBody });
    });
  }

  createBalls(num: number, size: number) {
    //ボールの定義
    this.obj.balls = [];
    const masterSphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: size, segments: 12 },
      this.scene,
    );
    masterSphere.setEnabled(false);
    const sphereShape = new PhysicsShapeSphere(
      Vector3.Zero(), // center
      size / 2, // 直径1なら半径0.5
      this.scene,
    );

    for (let i = 0; i < num; i++) {
      const sphere = masterSphere.clone(`b{i}`);
      sphere.setEnabled(true);
      sphere.material = this.mat.matAwake;
      this.shadow.addShadowCaster(sphere);
      sphere.position.copyFrom(this.randomPos());

      const sphereBody = new PhysicsBody(
        sphere,
        PhysicsMotionType.DYNAMIC,
        false,
        this.scene,
      );

      sphereBody.shape = sphereShape;
      sphereBody.shape.material = {
        friction: 0.5, // 摩擦
        restitution: 0.5, // 反発 0=なし, 1=完全弾性
      };

      this.obj.balls.push({
        mesh: sphere,
        body: sphereBody,
      });
    }
  }

  stopObj(mesh: Mesh, body: PhysicsBody, state: SleepState) {
    body.setLinearVelocity(Vector3.Zero());
    body.setAngularVelocity(Vector3.Zero());
    body.setMotionType(PhysicsMotionType.STATIC);
    mesh.material = this.mat.matSleep;
    state.isStatic = true;
    state.idleTime = 0;
  }

  randomPos(): Vector3 {
    const wRange = 10;
    const hRange = 50;
    const dRange = 10;
    const hDef = 20;
    return new Vector3(
      (Math.random() - 0.5) * wRange,
      hDef + Math.random() * hRange,
      (Math.random() - 0.5) * dRange,
    );
  }

  resetObjPosition(mesh: Mesh, body: PhysicsBody, state: SleepState) {
    const pos = this.randomPos();

    //物理状態リセット
    body.setMotionType(PhysicsMotionType.DYNAMIC);
    body.setLinearVelocity(Vector3.Zero());
    body.setAngularVelocity(Vector3.Zero());

    // 位置と回転の同期
    mesh.position.copyFrom(pos);
    if (mesh.rotationQuaternion) {
      mesh.rotationQuaternion.copyFrom(Quaternion.Identity());
    }
    body.disablePreStep = false;

    state.isStatic = false;
    state.idleTime = 0;
  }

  checkBalls() {
    if (!this.obj.balls) return;

    this.obj.balls.forEach((ballObj: any) => {
      const { mesh, body } = ballObj;
      let state = stateMap.get(body);
      if (!state) {
        state = {
          idleTime: 0,
          isStatic: false,
          lastTime: performance.now(),
        };
        stateMap.set(body, state);
      }

      if (this.checkBallPos(mesh)) {
        this.resetObjPosition(mesh, body, state);
        return;
      }
      if (this.checkBallStopTime(mesh, body, state)) {
        this.stopObj(mesh, body, state);
      }
    });
  }

  checkBallPos(mesh: Mesh): boolean {
    const RESET_HEIGHT = -50;
    if (mesh.position.y < RESET_HEIGHT) {
      return true;
    }
    return false;
  }

  checkBallStopTime(mesh: Mesh, body: PhysicsBody, state: SleepState): boolean {
    const THRESHOLD_SPEED = 0.1;
    const STATIC_DELAY = 3.0; // 秒

    const now = performance.now();
    const deltaSec = (now - state.lastTime) / 1000;
    state.lastTime = now;

    const v = body.getLinearVelocity();
    const speed = v ? v.length() : 0;
    if (speed < THRESHOLD_SPEED) {
      state.idleTime += deltaSec;
    } else {
      state.idleTime = 0;
      mesh.material = this.mat.matAwake;
    }
    if (state.idleTime > STATIC_DELAY) {
      return true;
    }
    return false;
  }

  createMaterial(name: string, opt: MaterialOptions = {}) {
    const mat = new StandardMaterial(name, this.scene);

    mat.diffuseColor = opt.color ?? new Color3(1, 1, 1);
    mat.alpha = opt.alpha ?? 1.0;
    mat.roughness = opt.roughness ?? 0.5;

    return mat;
  }

  async init() {
    await this.initPysics();
    this.setupGUI();

    const rw = Math.round(Math.random() * 10) + 1;
    const rd = Math.round(Math.random() * 10) + 1;
    const rh = Math.max(20 - rw - rd, 1);
    this.createGround({ size: { width: rw, depth: rd, height: 1 } });
    this.createWalls({ size: { width: rw, depth: rd, height: rh } });
    this.createBalls(100, 1);
  }
}

export function BabylonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || started.current) return;
    started.current = true;

    //初期設定
    const game = new Game(canvasRef.current);
    game.init();

    let frameCount = 0;
    game.engine.runRenderLoop(() => {
      // カメラが存在することを確認
      if (game.scene && game.scene.activeCamera) {
        frameCount++;
        if (frameCount % 5 === 0) {
          game.checkBalls();
        }
        game.scene.render();
      }
    });

    const resize = () => game.engine.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      started.current = false;
      game.scene.dispose();
      game.engine.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100vh", touchAction: "none" }}
    />
  );
}
