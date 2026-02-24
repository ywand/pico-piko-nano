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
} from "@babylonjs/core"
import HavokPhysics from "@babylonjs/havok"

export function BabylonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const engine = new Engine(canvasRef.current, true)
    const scene = new Scene(engine)

    // カメラ
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      10,
      Vector3.Zero(),
      scene
    )
    camera.attachControl(canvasRef.current, true)

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
      for (let i = 0; i < numSpheres; i++) {
        // 球体
        const sphere = MeshBuilder.CreateSphere(
          `sphere_${i}`,
          { diameter: 1 },
          scene
        )
        // ランダムな位置を設定
        const randomX = (Math.random() - 0.5) * 8; // -4 to 4
        const randomY = 5 + Math.random() * 50;    // 5 to 15
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

    initPhysics()

    engine.runRenderLoop(() => {
      scene.render()
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