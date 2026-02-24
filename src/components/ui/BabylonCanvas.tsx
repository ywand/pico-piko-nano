import { useEffect, useRef } from "react"
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
  CubeTexture,
} from "@babylonjs/core"
import HavokPhysics from "@babylonjs/havok"

export function BabylonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const engine = new Engine(canvasRef.current, true)
    const scene = new Scene(engine)

    scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(
      "https://assets.babylonjs.com/environments/environmentSpecular.env",
      scene
    );

    // カメラ
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      50,
      Vector3.Zero(),
      scene
    )
    camera.attachControl(canvasRef.current, true)
    camera.wheelPrecision = 100;

    // ライト
    new HemisphericLight("light", new Vector3(0, 1, 0), scene)

    const initPhysics = async () => {
      const havok = await HavokPhysics({
        locateFile: () => "/HavokPhysics.wasm",
      });
      const plugin = new HavokPlugin(true, havok)
      scene.enablePhysics(new Vector3(0, -9.8, 0), plugin)
      scene.getPhysicsEngine()?.setTimeStep(1 / 60);

      // 地面
      const GROUND_WIDTH = 100;
      const GROUND_HEIGHT = 100;
      const GROUND_THICKNESS = 1;
      const ground = MeshBuilder.CreateGround(
        "ground",
        { width: GROUND_WIDTH, height: GROUND_HEIGHT },
        scene
      )

      const groundBody = new PhysicsBody(
        ground,
        PhysicsMotionType.STATIC,
        false,
        scene
      )
      // Ground は薄い箱として扱う
      const groundShape = new PhysicsShapeBox(
        new Vector3(0, 0, 0),     // center
        Quaternion.Identity(),    // rotation
        new Vector3(GROUND_WIDTH / 2, GROUND_THICKNESS / 2, GROUND_HEIGHT / 2),   // extents (半サイズ)
        scene
      )
      ground.position.y = -GROUND_THICKNESS / 2;
      groundBody.shape = groundShape

      const numSpheres = 100;
      const sphereDiameter = 1;

      // 1. ガラス用のマテリアルを作成
      const glassMaterial = new PBRMaterial("glassMat", scene);
      glassMaterial.transparencyMode = PBRMaterial.PBRMATERIAL_ALPHABLEND;
      // 青色を設定
      glassMaterial.albedoColor = new Color3(0.1, 0.3, 1.0);
      // ガラスの質感を設定
      glassMaterial.metallic = 0.0;           // 金属ではない
      glassMaterial.roughness = 0.05;         // 表面は非常に滑らか
      // 透明度と屈折の設定
      glassMaterial.alpha = 0.1;              // 透明度（0が完全透明）
      glassMaterial.indexOfRefraction = 1.5;  // ガラスの屈折率（一般的に1.5前後）
      glassMaterial.linkRefractionWithTransparency = true; // 透明度と屈折を連動させる
      glassMaterial.refractionTexture = scene.environmentTexture;

      for (let i = 0; i < numSpheres; i++) {
        // 球体
        const sphere = MeshBuilder.CreateSphere(
          `sphere_${i}`,
          { diameter: 1 },
          scene
        )
        // ランダムな位置を設定
        const randomX = (Math.random() - 0.5) * 8; // -4 to 4
        const randomY = 5 + Math.random() * 100;    // 5 to 15
        const randomZ = (Math.random() - 0.5) * 8; // -4 to 4
        sphere.position.set(randomX, randomY, randomZ);

        const sphereBody = new PhysicsBody(
          sphere,
          PhysicsMotionType.DYNAMIC,
          false,
          scene
        )
        const sphereShape = new PhysicsShapeSphere(
          Vector3.Zero(), // center
          sphereDiameter / 2, // 直径1なら半径0.5
          scene
        )
        // 作成したマテリアルを割り当て
        sphere.material = glassMaterial;

        //摩擦設定
        sphereBody.shape = sphereShape
        sphereBody.setMassProperties({ mass: 1 })
        const FRICTION = 1.2;     //摩擦係数
        const RESTITUTION = 0.5;  //反発係数

        groundShape.material = { friction: FRICTION, restitution: 0 };
        sphereShape.material = { friction: FRICTION, restitution: RESTITUTION };

        sphereBody.setLinearDamping(0.3);
        sphereBody.setAngularDamping(0.3);
      }
    }

    initPhysics(); // ここで全ての初期化（マテリアル作成含む）を待つ

    engine.runRenderLoop(() => {
      if (scene.activeCamera) { // カメラが存在することを確認
        scene.render();
      }
    })

    const resize = () => engine.resize()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      engine.dispose()
    }
  }, [])


  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />
}