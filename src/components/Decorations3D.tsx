"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ── Floating Wireframe Torus Knot ── */
function WireframeTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.1;
  });

  const geo = useMemo(() => new THREE.TorusKnotGeometry(1, 0.35, 100, 16), []);

  return (
    <mesh ref={ref} geometry={geo}>
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#7c3aed"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

/* ── Floating Dodecahedron ── */
function FloatingDodecahedron() {
  const ref = useRef<THREE.Mesh>(null);
  const clock = useRef(0);
  const geo = useMemo(() => new THREE.DodecahedronGeometry(1, 0), []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    clock.current += delta;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.18;
    ref.current.position.y = Math.sin(clock.current * 0.8) * 0.15;
  });

  return (
    <mesh ref={ref} geometry={geo}>
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

/* ── Floating Icosahedron ── */
function FloatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  const clock = useRef(0);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    clock.current += delta;
    ref.current.rotation.x += delta * 0.1;
    ref.current.rotation.z += delta * 0.15;
    ref.current.position.y = Math.sin(clock.current * 0.6) * 0.2;
  });

  return (
    <mesh ref={ref} geometry={geo}>
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#7c3aed"
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.95}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

/* ── Octahedron with edges ── */
function FloatingOctahedron() {
  const groupRef = useRef<THREE.Group>(null);
  const clock = useRef(0);
  const geo = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    clock.current += delta;
    groupRef.current.rotation.x += delta * 0.08;
    groupRef.current.rotation.y += delta * 0.14;
    groupRef.current.position.y = Math.sin(clock.current * 0.7) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          color="#0d0520"
          roughness={0.1}
          metalness={0.95}
          transparent
          opacity={0.6}
        />
      </mesh>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

/* ── Shared mini-particle field ── */
function MiniParticles({ count = 40, color = "#a78bfa", radius = 2 }: {
  count?: number;
  color?: string;
  radius?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * 0.5 + Math.random() * radius * 0.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count, radius]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── EXPORTED CANVAS COMPONENTS ─── */

export function AboutDecoration3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 5]} intensity={1.5} color="#a78bfa" />
      <directionalLight position={[-3, -2, 3]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#f472b6" />
      <FloatingIcosahedron />
      <MiniParticles count={30} color="#a78bfa" radius={2.5} />
    </Canvas>
  );
}

export function SkillsDecoration3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 3, 5]} intensity={2} color="#a78bfa" />
      <directionalLight position={[-3, -1, 4]} intensity={1.2} color="#06b6d4" />
      <WireframeTorus />
      <MiniParticles count={50} color="#06b6d4" radius={3} />
    </Canvas>
  );
}

export function ProjectsDecoration3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 38 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} color="#7c3aed" />
      <directionalLight position={[-2, -2, 3]} intensity={1} color="#06b6d4" />
      <FloatingOctahedron />
      <MiniParticles count={35} color="#7c3aed" radius={2} />
    </Canvas>
  );
}

export function ContactDecoration3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 5]} intensity={1.5} color="#a78bfa" />
      <directionalLight position={[-3, -2, 3]} intensity={1} color="#06b6d4" />
      <FloatingDodecahedron />
      <MiniParticles count={25} color="#06b6d4" radius={2} />
    </Canvas>
  );
}
