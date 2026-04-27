"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function Character() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 7;
  const targetPos = new THREE.Vector3(isMobile ? 0 : 2, isMobile ? 1 : 0, 0);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smoothly move to target position
    groupRef.current.position.lerp(targetPos, 0.05);

    // Subtle cursor-following rotation (head tracking effect)
    const targetX = (state.mouse.x * viewport.width) / 5;
    const targetY = (state.mouse.y * viewport.height) / 5;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/*
        🎯 TO USE YOUR OWN ANIME 3D MODEL:

        1. Place your `.glb` file in /public/models/anime_character.glb
        2. Install: npm i @react-three/drei (already installed)
        3. Replace the Float + mesh below with:

           import { useGLTF } from "@react-three/drei";
           const { scene } = useGLTF("/models/anime_character.glb");
           return <primitive object={scene} scale={[1, 1, 1]} dispose={null} />;

        Recommended free sources:
        - VRoid Studio → export as VRM → convert to GLB via https://vrm-addon-for-blender.info
        - Sketchfab (search "anime girl", filter Downloadable, CC-BY)
      */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* Outer ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.4, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#9b87f5"
            emissive="#9b87f5"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Core sphere */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#1a1a2e"
            roughness={0.1}
            metalness={0.9}
            envMapIntensity={2}
          />
        </mesh>

        {/* Glow sphere (slightly larger, transparent) */}
        <mesh scale={1.08}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#9b87f5"
            transparent
            opacity={0.08}
            roughness={1}
            metalness={0}
          />
        </mesh>
      </Float>
    </group>
  );
}
