import { useEffect, useRef } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from '@babylonjs/core';

export function BabylonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      3,
      Vector3.Zero(),
      scene,
    );
    camera.attachControl(canvasRef.current, true);
    new HemisphericLight("light", new Vector3(0, 0, 0), scene);

    MeshBuilder.CreateBox("box", {}, scene);
    engine.runRenderLoop(() => scene.render());
    return () => engine.dispose();
  }, []);

  return <canvas ref={canvasRef}
    style={
      {
        width: "100vw",
        height: "100dvh",
        display: "block",
        position: "fixed",
        inset: 0,
      }
    }
  />
};
