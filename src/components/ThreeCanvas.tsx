"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import Character from "./Character";

export default function ThreeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="w-full h-full pointer-events-none"
      gl={{ antialias: true }}
    >
      {/* No shadows — avoids the unpackRGBAToDepth shader bug in Three.js r184 */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[2.5, 5, 5]}
        intensity={1.8}
        color="#9b87f5"
      />
      <directionalLight
        position={[-2.5, 5, 5]}
        intensity={1.2}
        color="#00f0ff"
      />
      <pointLight position={[0, -2, 3]} intensity={0.5} color="#ffffff" />

      <Environment preset="city" />

      <Suspense fallback={null}>
        <Character />
      </Suspense>
    </Canvas>
  );
}
