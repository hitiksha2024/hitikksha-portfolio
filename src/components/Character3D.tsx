"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Orb() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);
  const clock = useRef(0);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    clock.current += delta;
    const t = clock.current;

    // Gentle idle bob — cursor follow now handled by DOM spring (HeroSection)
    groupRef.current.position.y = Math.sin(t * 1.1) * 0.1;
    // Slow idle rotation so the orb never looks frozen
    groupRef.current.rotation.y += delta * 0.08;

    // Ring 1 — spins on its own local Z (always looks like a circle from front)
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35;
    }

    // Ring 2 — spins on its own X so the tilt stays consistent
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.2;
    }

    // Satellite orbits in XZ plane — stays on ring 1's equatorial plane
    if (satelliteRef.current) {
      satelliteRef.current.position.x = Math.cos(t * 1.4) * 1.3;
      satelliteRef.current.position.z = Math.sin(t * 1.4) * 1.3;
      satelliteRef.current.position.y = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core sphere — deep dark metallic */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#0d0520" roughness={0.04} metalness={0.98} />
      </mesh>

      {/* Subtle glow shell */}
      <mesh scale={1.07}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          transparent
          opacity={0.06}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/*
        Ring 1 — equatorial (flat, horizontal)
        rotation={[Math.PI/2, 0, 0]} makes it lie flat around the sphere.
        ring1Ref spins on Z so it rotates within its own plane — always a clean circle.
      */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.32, 0.018, 32, 200]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/*
        Ring 2 — tilted orbit (cyan)
        Tilt: Math.PI/2.8 on X gives roughly 33° tilt — looks like a classic planet ring.
        ring2Ref spins on Z within its own tilted plane — stays consistently round.
      */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.8, 0, Math.PI / 5]}>
        <torusGeometry args={[1.62, 0.012, 32, 200]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Satellite dot — orbits in the equatorial plane of ring 1 */}
      <mesh ref={satelliteRef} position={[1.3, 0, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color="#f472b6"
          emissive="#f472b6"
          emissiveIntensity={4}
        />
      </mesh>
    </group>
  );
}

export default function Character3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 38 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 4, 6]} intensity={2.8} color="#a78bfa" />
      <directionalLight position={[-4, -3, 4]} intensity={2} color="#06b6d4" />
      <pointLight position={[0, 0, 4]} intensity={1.8} color="#f472b6" />
      <pointLight position={[0, -4, 2]} intensity={1} color="#7c3aed" />
      <Orb />
    </Canvas>
  );
}
