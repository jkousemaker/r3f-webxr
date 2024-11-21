import "./index.css";
import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import { PerspectiveCamera } from "@theatre/r3f";
import demoProjectState from "./state.json";

// create-react-app
if (import.meta.env.DEV) {
  studio.initialize();
  studio.extend(extension);
}

const demoSheet = getProject("Demo Project", { state: demoProjectState }).sheet(
  "Demo Sheet"
);
const App = () => {
  useEffect(() => {
    demoSheet.project.ready.then(() =>
      demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
    );
  }, []);
  return (
    <Canvas>
      <SheetProvider sheet={demoSheet}>
        <PerspectiveCamera
          theatreKey="Camera"
          makeDefault
          position={[5, 5, -5]}
          fov={75}
        />
        <ambientLight />
        <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
        <e.mesh theatreKey="Cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </e.mesh>
      </SheetProvider>
    </Canvas>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
