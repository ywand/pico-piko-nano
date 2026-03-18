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
  Color3,
  Color4,
  Matrix,
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

class Game {
  engine: Engine;
  scene: Scene;
  camera: ArcRotateCamera;
  light: HemisphericLight;
  dlight: DirectionalLight;
  shadow: ShadowGenerator;
  gui: Record<string, any> = {};
  obj: Record<string, any> = {};

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.2, 0.2, 0.3, 1);
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
    this.gui.ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true,
      this.scene,
    );
    this.gui.panel = new GUI.StackPanel();
    this.gui.panel.width = "250px";
    this.gui.panel.isVertical = true;
    this.gui.panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.gui.panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.gui.panel.background = "rgba(128,128,128,0.5)";
    this.gui.ui.addControl(this.gui.panel);
    this.gui.ui.idealWidth = 1920;
    this.gui.ui.renderScale = 1;
    this.gui.panel.isVisible = false;

    //地面用傾き
    this.gui.tiltLabel = new GUI.TextBlock();
    this.gui.tiltLabel.text = "地面傾き：";
    this.gui.tiltLabel.height = "50px";
    this.gui.tiltLabel.color = "black";
    this.gui.panel.addControl(this.gui.tiltLabel);
    this.gui.tiltSlider = new GUI.Slider();
    this.gui.tiltSlider.minimum = -90;
    this.gui.tiltSlider.maximum = 90;
    this.gui.tiltSlider.value = 0;
    this.gui.tiltSlider.height = "40px";
    this.gui.panel.addControl(this.gui.tiltSlider);

    this.gui.tiltSlider.onPointerUpObservable.add(() => {
      const intVal = Math.round(this.gui.tiltSlider.value);
      this.gui.tiltSlider.value = intVal;
      const rad = (intVal * Math.PI) / 180;
      this.gui.tiltLabel.text = "傾き：" + intVal;
      console.log(this.gui.tiltLabel.text, "rad:", rad);
    });
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

  createBalls(num: number) {
    //ボールの定義
    const numSpheres = num;
    const sphereDiameter = 1;

    // 1. ガラス用のマテリアルを作成
    const glassMaterial = new PBRMaterial("glassMat", this.scene);
    glassMaterial.transparencyMode = PBRMaterial.PBRMATERIAL_ALPHABLEND;
    // 青色を設定
    glassMaterial.albedoColor = new Color3(0.1, 0.3, 1.0);
    // ガラスの質感を設定
    glassMaterial.metallic = 0.0; // 金属ではない
    glassMaterial.roughness = 0.1; // 表面は非常に滑らか
    // 透明度と屈折の設定
    glassMaterial.alpha = 0.3; // 透明度（0が完全透明）
    glassMaterial.indexOfRefraction = 1.5; // ガラスの屈折率（一般的に1.5前後）
    glassMaterial.linkRefractionWithTransparency = true; // 透明度と屈折を連動させる
    if (this.scene.environmentTexture) {
      glassMaterial.refractionTexture = this.scene.environmentTexture;
    }
    glassMaterial.transparencyMode = PBRMaterial.PBRMATERIAL_ALPHABLEND;
    glassMaterial.forceAlphaTest = true; // アルファテストを強制
    glassMaterial.alphaCutOff = 0.1; // 影の判定基準

    this.obj.balls = [];
    for (let i = 0; i < numSpheres; i++) {
      // 球体
      const sphere = MeshBuilder.CreateSphere(
        `sphere_${i}`,
        { diameter: 1 },
        this.scene,
      );
      this.shadow.addShadowCaster(sphere);
      // ランダムな位置を設定
      const randomX = (Math.random() - 0.5) * 2; // -4 to 4
      const randomY = 5 + Math.random() * 200; // 5 to 15
      const randomZ = (Math.random() - 0.5) * 2; // -4 to 4
      sphere.position.set(randomX, randomY, randomZ);

      const sphereBody = new PhysicsBody(
        sphere,
        PhysicsMotionType.DYNAMIC,
        false,
        this.scene,
      );
      const sphereShape = new PhysicsShapeSphere(
        Vector3.Zero(), // center
        sphereDiameter * 0.5, // 直径1なら半径0.5
        this.scene,
      );
      // 作成したマテリアルを割り当て
      //sphere.material = glassMaterial;

      //摩擦設定
      sphereBody.shape = sphereShape;
      sphereBody.setMassProperties({ mass: 1 });
      const FRICTION = 0.5; //摩擦係数
      const RESTITUTION = 0.3; //反発係数

      sphereShape.material = { friction: FRICTION, restitution: RESTITUTION };

      sphereBody.setLinearDamping(0.1);
      sphereBody.setAngularDamping(0.1);

      this.obj.balls.push({
        mesh: sphere,
        body: sphereBody,
      });
    }
  }

  checkBallReset() {
    const RESET_HEIGHT = -50;
    if (!this.obj.balls) return;

    this.obj.balls.forEach((ballObj: any) => {
      const { mesh, body } = ballObj;

      if (mesh.position.y < RESET_HEIGHT) {
        const randomX = (Math.random() - 0.5) * 2;
        const randomY = 20 + Math.random() * 10;
        const randomZ = (Math.random() - 0.5) * 2;
        const pos = new Vector3(randomX, randomY, randomZ);

        // 1. 速度を完全にゼロにする
        body.setLinearVelocity(Vector3.Zero());
        body.setAngularVelocity(Vector3.Zero());

        // 2. 位置と回転をリセット
        // body.transformNode 経由で位置を設定
        mesh.position.copyFrom(pos);
        if (mesh.rotationQuaternion) {
          mesh.rotationQuaternion.copyFrom(Quaternion.Identity());
        }

        // 3. 物理エンジン側に現在のMeshの位置を強制同期させる
        // Havokではこれを呼ぶことで内部の状態が更新されます
        body.disablePreStep = false; // 確実に同期させるためのフラグ（必要に応じて）

        // 4. スリープ解除（重要）
        // 動かした後に物理計算の対象として再認識させる
        // body.forceReinit(); // もし同期しない場合は再初期化も有効
      }
    });
  }

  createMaterial(name: string, opt: MaterialOptions = {}) {
    const mat = new PBRMaterial(name, this.scene);

    mat.albedoColor = opt.color ?? new Color3(1, 1, 1);
    mat.alpha = opt.alpha ?? 1.0;

    mat.metallic = opt.metallic ?? 0.0;
    mat.roughness = opt.roughness ?? 0.5;

    if (mat.alpha < 1) {
      mat.transparencyMode = PBRMaterial.PBRMATERIAL_ALPHABLEND;
    }

    return mat;
  }

  async init() {
    await this.initPysics();
    this.setupGUI();
    this.createGround({ size: { width: 5, depth: 5, height: 1 } });
    this.createWalls({ size: { width: 5, depth: 5, height: 4.5 } });
    this.createBalls(100);
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

    game.engine.runRenderLoop(() => {
      // カメラが存在することを確認
      if (game.scene && game.scene.activeCamera) {
        game.checkBallReset();
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
