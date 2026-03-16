"use client";

import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
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

export function BabylonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || started.current) return;
    started.current = true;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.2, 0.2, 0.3, 1);

    // カメラ
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      50,
      Vector3.Zero(),
      scene,
    );
    camera.attachControl(canvasRef.current, true);
    camera.wheelPrecision = 100;

    // ライト
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    const initPhysics = async () => {
      //物理設定
      const havok = await HavokPhysics({
        locateFile: () => "/HavokPhysics.wasm",
      });
      if (scene.isDisposed) return;
      const plugin = new HavokPlugin(true, havok);
      scene.enablePhysics(new Vector3(0, -9.8, 0), plugin);
      scene.getPhysicsEngine()?.setTimeStep(1 / 60);
      scene.getPhysicsEngine()?.setSubTimeStep(2);

      //GUI
      const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "UI",
        true,
        scene,
      );
      const panel = new GUI.StackPanel();
      panel.width = "250px";
      panel.isVertical = true;
      panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
      panel.background = "rgba(128,128,128,0.5)";
      ui.addControl(panel);
      ui.idealWidth = 1920;
      ui.renderScale = 1;

      //地面用傾き
      const tiltLabel = new GUI.TextBlock();
      tiltLabel.text = "地面傾き：";
      tiltLabel.height = "50px";
      tiltLabel.color = "black";
      panel.addControl(tiltLabel);
      const tiltSlider = new GUI.Slider();
      tiltSlider.minimum = -90;
      tiltSlider.maximum = 90;
      tiltSlider.value = 0;
      tiltSlider.height = "40px";
      panel.addControl(tiltSlider);

      // 地面
      const GROUND_WIDTH = 100;
      const GROUND_HEIGHT = 100;
      const GROUND_THICKNESS = 1;
      const FRICTION = 1.2;

      const ground = MeshBuilder.CreateGround(
        "ground",
        { width: GROUND_WIDTH, height: GROUND_HEIGHT },
        scene,
      );
      ground.rotationQuaternion = new Quaternion();

      const groundBody = new PhysicsBody(
        ground,
        PhysicsMotionType.ANIMATED,
        false,
        scene,
      );
      // 地面と壁は薄い箱として扱う
      const groundShape = new PhysicsShapeBox(
        Vector3.Zero(), // center
        Quaternion.Identity(), // rotation
        new Vector3(GROUND_WIDTH / 2, GROUND_THICKNESS / 2, GROUND_HEIGHT / 2), // extents (半サイズ)
        scene,
      );
      groundBody.shape = groundShape;

      // 壁のデータ定義（位置とサイズ）
      const WALL_HEIGHT = 5;
      const WALL_THICKNESS = 1;
      const walls: { mesh: any; body: PhysicsBody }[] = [];
      const wallsData = [
        {
          name: "wall_N",
          pos: new Vector3(0, WALL_HEIGHT / 2, GROUND_HEIGHT / 2),
          size: new Vector3(GROUND_WIDTH, WALL_HEIGHT, WALL_THICKNESS),
        },
        {
          name: "wall_S",
          pos: new Vector3(0, WALL_HEIGHT / 2, -GROUND_HEIGHT / 2),
          size: new Vector3(GROUND_WIDTH, WALL_HEIGHT, WALL_THICKNESS),
        },
        {
          name: "wall_E",
          pos: new Vector3(GROUND_WIDTH / 2, WALL_HEIGHT / 2, 0),
          size: new Vector3(WALL_THICKNESS, WALL_HEIGHT, GROUND_HEIGHT),
        },
        {
          name: "wall_W",
          pos: new Vector3(-GROUND_WIDTH / 2, WALL_HEIGHT / 2, 0),
          size: new Vector3(WALL_THICKNESS, WALL_HEIGHT, GROUND_HEIGHT),
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
          scene,
        );
        wall.position = data.pos;
        wall.parent = ground; // 地面を親にする（地面の傾きに連動する）
        wall.isVisible = true; // 見えなくする（デバッグ時は true にすると確認しやすいです）
        wall.enableEdgesRendering();
        wall.edgesWidth = 2;
        wall.edgesColor = new Color4(0.5, 0.8, 1, 1);

        // 壁の物理設定
        const wallBody = new PhysicsBody(
          wall,
          PhysicsMotionType.ANIMATED,
          false,
          scene,
        );
        wallBody.shape = new PhysicsShapeBox(
          Vector3.Zero(),
          Quaternion.Identity(),
          new Vector3(data.size.x / 2, data.size.y / 2, data.size.z / 2),
          scene,
        );
        wallBody.shape.material = { friction: FRICTION, restitution: 0.1 };
        walls.push({ mesh: wall, body: wallBody });
      });
      tiltSlider.onPointerUpObservable.add(() => {
        const intVal = Math.round(tiltSlider.value);
        tiltSlider.value = intVal;
        const rad = (intVal * Math.PI) / 180;
        const targetRotation = Quaternion.FromEulerAngles(rad, 0, 0);
        groundBody.setTargetTransform(ground.position, targetRotation);
        const rotMatrix = new Matrix();
        targetRotation.toRotationMatrix(rotMatrix);

        walls.forEach((w) => {
          const localPos = w.mesh.position.subtract(ground.position);
          const rotatedPos = Vector3.TransformCoordinates(localPos, rotMatrix);
          w.body.setTargetTransform(
            ground.position.add(rotatedPos),
            targetRotation,
          );
        });

        tiltLabel.text = "傾き：" + intVal;
        console.log(tiltLabel.text, "rad:", rad);
      });

      //ボールの定義
      const numSpheres = 100;
      const sphereDiameter = 1;

      // 1. ガラス用のマテリアルを作成
      const glassMaterial = new PBRMaterial("glassMat", scene);
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
      if (scene.environmentTexture) {
        glassMaterial.refractionTexture = scene.environmentTexture;
      }
      for (let i = 0; i < numSpheres; i++) {
        // 球体
        const sphere = MeshBuilder.CreateSphere(
          `sphere_${i}`,
          { diameter: 1 },
          scene,
        );
        // ランダムな位置を設定
        const randomX = (Math.random() - 0.5) * 3; // -4 to 4
        const randomY = 5 + Math.random() * 10; // 5 to 15
        const randomZ = (Math.random() - 0.5) * 3; // -4 to 4
        sphere.position.set(randomX, randomY, randomZ);

        const sphereBody = new PhysicsBody(
          sphere,
          PhysicsMotionType.DYNAMIC,
          false,
          scene,
        );
        const sphereShape = new PhysicsShapeSphere(
          Vector3.Zero(), // center
          sphereDiameter / 2, // 直径1なら半径0.5
          scene,
        );
        // 作成したマテリアルを割り当て
        sphere.material = glassMaterial;

        //摩擦設定
        sphereBody.shape = sphereShape;
        sphereBody.setMassProperties({ mass: 1 });
        const FRICTION = 1.2; //摩擦係数
        const RESTITUTION = 0.5; //反発係数

        sphereShape.material = { friction: FRICTION, restitution: RESTITUTION };

        sphereBody.setLinearDamping(0.3);
        sphereBody.setAngularDamping(0.3);
      }
    };

    initPhysics(); // ここで全ての初期化（マテリアル作成含む）を待つ

    engine.runRenderLoop(() => {
      if (scene && scene.activeCamera) {
        // カメラが存在することを確認
        scene.render();
      }
    });

    const resize = () => engine.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      started.current = false;
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100vh", touchAction: "none" }}
    />
  );
}
