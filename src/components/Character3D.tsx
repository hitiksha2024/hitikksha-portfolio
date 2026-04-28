"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";

const ptr = { x: 0, y: 0 };

/* ── Rounded rect helper ── */
function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ══════════════════════════
   MAIN EDITOR PANEL TEXTURE
══════════════════════════ */
function makeMainPanel(): THREE.CanvasTexture {
  const W = 520, H = 340;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;

  // Dark bg
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "rgba(8,6,24,0.97)");
  bg.addColorStop(1, "rgba(4,3,14,0.98)");
  ctx.fillStyle = bg;
  rrect(ctx, 0, 0, W, H, 14);
  ctx.fill();

  // Outer border
  ctx.strokeStyle = "rgba(124,58,237,0.35)";
  ctx.lineWidth = 1.5;
  rrect(ctx, 0, 0, W, H, 14);
  ctx.stroke();

  // Top bar
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.fillRect(0, 0, W, 36);

  // Window dots
  [["#ff5f57",14],["#febc2e",32],["#28c840",50]].forEach(([col,x])=>{
    ctx.beginPath(); ctx.arc(x as number, 18, 6, 0, Math.PI*2);
    ctx.fillStyle = col as string; ctx.fill();
  });

  // Top right icon
  ctx.strokeStyle = "rgba(167,139,250,0.5)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(W-30, 10, 16, 16);
  ctx.strokeStyle = "rgba(167,139,250,0.8)";
  ctx.beginPath(); ctx.moveTo(W-26, 18); ctx.lineTo(W-18, 18); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W-26, 14); ctx.lineTo(W-22, 14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W-26, 22); ctx.lineTo(W-20, 22); ctx.stroke();

  // Code lines — colored bars like reference image
  const rows = [
    { y: 52,  bars: [{x:18,w:180,c:"#7c3aed"},{x:205,w:90,c:"#4338ca"},{x:302,w:130,c:"#1d4ed8"}] },
    { y: 70,  bars: [{x:18,w:60,c:"#6d28d9"},{x:85,w:200,c:"#4ade80"},{x:292,w:80,c:"#22d3ee"}] },
    { y: 88,  bars: [{x:18,w:120,c:"#a78bfa"},{x:145,w:160,c:"#7c3aed"},{x:312,w:100,c:"#4338ca"}] },
    { y: 106, bars: [{x:18,w:240,c:"#22d3ee"},{x:265,w:60,c:"#a78bfa"},{x:332,w:120,c:"#4ade80"}] },
    { y: 124, bars: [{x:18,w:80,c:"#4ade80"},{x:105,w:140,c:"#a78bfa"},{x:252,w:180,c:"#6d28d9"}] },
    { y: 142, bars: [] }, // gap
    { y: 160, bars: [{x:18,w:200,c:"#7c3aed"},{x:225,w:100,c:"#22d3ee"},{x:332,w:80,c:"#a78bfa"}] },
    { y: 178, bars: [{x:18,w:140,c:"#4338ca"},{x:165,w:220,c:"#4ade80"},{x:392,w:60,c:"#6d28d9"}] },
    { y: 196, bars: [{x:18,w:100,c:"#22d3ee"},{x:125,w:180,c:"#7c3aed"},{x:312,w:140,c:"#4ade80"}] },
    { y: 214, bars: [{x:18,w:260,c:"#a78bfa"},{x:285,w:80,c:"#4338ca"},{x:372,w:100,c:"#22d3ee"}] },
    { y: 232, bars: [{x:18,w:60,c:"#4ade80"},{x:85,w:160,c:"#6d28d9"},{x:252,w:200,c:"#7c3aed"}] },
    { y: 250, bars: [] },
    { y: 268, bars: [{x:18,w:180,c:"#22d3ee"},{x:205,w:120,c:"#a78bfa"},{x:332,w:100,c:"#4ade80"}] },
    { y: 286, bars: [{x:18,w:100,c:"#7c3aed"},{x:125,w:200,c:"#4338ca"},{x:332,w:140,c:"#22d3ee"}] },
    { y: 304, bars: [{x:18,w:240,c:"#6d28d9"},{x:265,w:100,c:"#4ade80"},{x:372,w:80,c:"#a78bfa"}] },
    { y: 322, bars: [{x:18,w:80,c:"#a78bfa"},{x:105,w:160,c:"#22d3ee"},{x:272,w:180,c:"#7c3aed"}] },
  ];

  rows.forEach(row => {
    row.bars.forEach(bar => {
      ctx.fillStyle = bar.c + "90";
      ctx.beginPath();
      ctx.roundRect(bar.x, row.y, bar.w, 9, 4);
      ctx.fill();
    });
  });

  // Scanlines
  for (let y = 36; y < H; y += 4) {
    ctx.fillStyle = "rgba(0,0,0,0.04)";
    ctx.fillRect(0, y, W, 1);
  }

  return new THREE.CanvasTexture(c);
}

/* ══════════════════════════
   SMALL PANEL TEXTURE
══════════════════════════ */
function makeSmallPanel(): THREE.CanvasTexture {
  const W = 280, H = 200;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "rgba(8,5,22,0.96)");
  bg.addColorStop(1, "rgba(4,3,14,0.98)");
  ctx.fillStyle = bg;
  rrect(ctx, 0, 0, W, H, 12);
  ctx.fill();

  ctx.strokeStyle = "rgba(96,165,250,0.4)";
  ctx.lineWidth = 1.5;
  rrect(ctx, 0, 0, W, H, 12);
  ctx.stroke();

  // Top accent
  ctx.strokeStyle = "#60a5fa";
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(60, 0); ctx.stroke();

  // </> icon
  ctx.font = "bold 22px monospace";
  ctx.fillStyle = "#60a5fa";
  ctx.shadowColor = "#60a5fa";
  ctx.shadowBlur = 14;
  ctx.textAlign = "center";
  ctx.fillText("</>", W/2, 52);
  ctx.shadowBlur = 0;

  // Divider
  ctx.strokeStyle = "rgba(96,165,250,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(20, 70); ctx.lineTo(W-20, 70); ctx.stroke();

  // Bullet rows
  const items = ["Frontend Client", "REST API Layer", "Database Model"];
  items.forEach((label, i) => {
    const y = 96 + i * 30;
    // Dot
    ctx.beginPath(); ctx.arc(28, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#60a5fa";
    ctx.shadowColor = "#60a5fa"; ctx.shadowBlur = 8;
    ctx.fill(); ctx.shadowBlur = 0;
    // Bar
    ctx.fillStyle = "rgba(96,165,250," + (0.5 - i * 0.1) + ")";
    ctx.beginPath();
    ctx.roundRect(40, y - 5, 140 - i * 20, 8, 3);
    ctx.fill();
    // Checkmark on last
    if (i === 2) {
      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(W-40, y-4); ctx.lineTo(W-34, y+2); ctx.lineTo(W-26, y-6);
      ctx.stroke();
    }
  });

  // Status dot
  ctx.beginPath(); ctx.arc(20, H-18, 4, 0, Math.PI*2);
  ctx.fillStyle = "#60a5fa"; ctx.shadowColor = "#60a5fa"; ctx.shadowBlur = 8;
  ctx.fill(); ctx.shadowBlur = 0;
  ctx.font = "10px monospace";
  ctx.fillStyle = "rgba(96,165,250,0.7)"; ctx.textAlign = "left";
  ctx.fillText("● ACTIVE", 32, H-13);

  return new THREE.CanvasTexture(c);
}

/* ══════════════════════════
   TECH BADGE TEXTURE
══════════════════════════ */
function makeBadge(text: string, bg: string, fg: string): THREE.CanvasTexture {
  const S = 96;
  const c = document.createElement("canvas");
  c.width = S; c.height = S;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "rgba(8,6,20,0.82)";
  rrect(ctx, 4, 4, S-8, S-8, 12);
  ctx.fill();
  ctx.strokeStyle = bg + "50"; ctx.lineWidth = 1.5;
  rrect(ctx, 4, 4, S-8, S-8, 12); ctx.stroke();
  ctx.font = "bold 22px monospace";
  ctx.fillStyle = fg; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.shadowColor = fg; ctx.shadowBlur = 10;
  ctx.fillText(text, S/2, S/2);
  return new THREE.CanvasTexture(c);
}

/* ══════════════════════════
   MAIN EDITOR PANEL MESH
══════════════════════════ */
function MainPanel() {
  const grpRef = useRef<THREE.Group>(null);
  const clock  = useRef(0);
  const tex    = useMemo(() => makeMainPanel(), []);

  useFrame((_s, delta) => {
    clock.current += delta;
    const t = clock.current;
    if (!grpRef.current) return;
    grpRef.current.rotation.y = -0.06 + Math.sin(t * 0.22) * 0.025 + ptr.x * 0.08;
    grpRef.current.rotation.x =  0.04 + Math.cos(t * 0.18) * 0.02  - ptr.y * 0.05;
    grpRef.current.position.y = -0.1 + Math.sin(t * 0.55) * 0.055;
  });

  return (
    <group ref={grpRef} position={[0.35, 0.15, 0]}>
      {/* Back glow */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[3.2, 2.2]} />
        <meshStandardMaterial color="#7c3aed" transparent opacity={0.08}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Panel */}
      <mesh>
        <planeGeometry args={[2.9, 1.9]} />
        <meshStandardMaterial map={tex} transparent opacity={0.96}
          roughness={0.06} metalness={0.28} toneMapped={false} />
      </mesh>
      {/* Edge glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.9, 1.9)]} />
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

/* ══════════════════════════
   SMALL PANEL MESH
══════════════════════════ */
function SmallPanel() {
  const grpRef = useRef<THREE.Group>(null);
  const clock  = useRef(1.4);
  const tex    = useMemo(() => makeSmallPanel(), []);

  useFrame((_s, delta) => {
    clock.current += delta;
    const t = clock.current;
    if (!grpRef.current) return;
    grpRef.current.rotation.y = 0.08 + Math.sin(t * 0.28) * 0.03 + ptr.x * 0.06;
    grpRef.current.rotation.x = -0.03 + Math.cos(t * 0.22) * 0.02 - ptr.y * 0.04;
    grpRef.current.position.y = -0.55 + Math.sin(t * 0.6 + 1.4) * 0.05;
  });

  return (
    <group ref={grpRef} position={[1.2, -0.5, 0.45]}>
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[1.85, 1.35]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.07}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[1.65, 1.2]} />
        <meshStandardMaterial map={tex} transparent opacity={0.94}
          roughness={0.07} metalness={0.25} toneMapped={false} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.65, 1.2)]} />
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

/* ══════════════════════════
   FLOATING TECH BADGES
══════════════════════════ */
const BADGES = [
  { text: "JS",  bg: "#eab308", fg: "#000000", pos: [-2.1,  1.1, 0.2] as [number,number,number] },
  { text: "TS",  bg: "#3b82f6", fg: "#ffffff", pos: [-0.4,  1.7, 0.1] as [number,number,number] },
  { text: "⚛",  bg: "#61dafb", fg: "#61dafb", pos: [ 2.0,  1.3, 0.1] as [number,number,number] },
  { text: "{}",  bg: "#a78bfa", fg: "#a78bfa", pos: [-2.4, -0.3, 0.2] as [number,number,number] },
  { text: "</>", bg: "#a78bfa", fg: "#a78bfa", pos: [ 2.5,  0.3, 0.0] as [number,number,number] },
  { text: "DB",  bg: "#4ade80", fg: "#4ade80", pos: [ 1.5, -1.4, 0.2] as [number,number,number] },
  { text: "5",   bg: "#f97316", fg: "#f97316", pos: [ 2.4, -0.8, 0.1] as [number,number,number] },
];

function TechBadges() {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const textures = useMemo(() =>
    BADGES.map(b => makeBadge(b.text, b.bg, b.fg)), []);
  const phases = useRef(BADGES.map((_, i) => i * 0.9));

  useFrame((_s, delta) => {
    BADGES.forEach((b, i) => {
      phases.current[i] += delta * (0.45 + i * 0.08);
      const g = refs.current[i];
      if (!g) return;
      const ph = phases.current[i];
      g.position.set(
        b.pos[0] + Math.sin(ph * 0.6) * 0.09,
        b.pos[1] + Math.cos(ph * 0.5) * 0.12,
        b.pos[2]
      );
      g.rotation.y = ptr.x * 0.15 + Math.sin(ph * 0.3) * 0.06;
      g.rotation.x = ptr.y * -0.1 + Math.cos(ph * 0.4) * 0.04;
    });
  });

  return (
    <group>
      {BADGES.map((b, i) => (
        <group key={i} ref={el => { refs.current[i] = el; }} position={b.pos}>
          <mesh>
            <planeGeometry args={[0.44, 0.44]} />
            <meshStandardMaterial map={textures[i]} transparent opacity={0.9}
              roughness={0.1} metalness={0.2} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ══════════════════════════
   FLOATING TEXT LABEL
══════════════════════════ */
function makeTextLabel(text: string): THREE.CanvasTexture {
  const W = 180, H = 48;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);
  ctx.font = "italic 20px Georgia, serif";
  ctx.fillStyle = "rgba(148,163,184,0.45)";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(text, W/2, H/2);
  return new THREE.CanvasTexture(c);
}

function FloatingLabels() {
  const labels = useMemo(() => [
    { text: "express", pos: [-1.2, -0.2, 0.8] as [number,number,number] },
    { text: "mongoDB", pos: [ 0.8, -1.6, 0.3] as [number,number,number] },
    { text: "node",    pos: [-1.8,  0.5, 0.5] as [number,number,number] },
  ], []);
  const textures = useMemo(() => labels.map(l => makeTextLabel(l.text)), [labels]);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const clock = useRef(0);

  useFrame((_s, delta) => {
    clock.current += delta;
    labels.forEach((l, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.position.set(
        l.pos[0] + Math.sin(clock.current * 0.4 + i) * 0.08,
        l.pos[1] + Math.cos(clock.current * 0.35 + i) * 0.07,
        l.pos[2]
      );
    });
  });

  return (
    <group>
      {labels.map((_, i) => (
        <mesh key={i} ref={el => { refs.current[i] = el; }} position={labels[i].pos}>
          <planeGeometry args={[0.9, 0.24]} />
          <meshStandardMaterial map={textures[i]} transparent opacity={0.8}
            blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ══════════════════════════
   GLOW PARTICLES
══════════════════════════ */
function GlowDots() {
  const ref = useRef<THREE.Points>(null);
  const clock = useRef(0);
  const count = 60;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#7c3aed"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#4ade80"),
      new THREE.Color("#a78bfa"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i*3]   = (Math.random()-0.5)*8;
      positions[i*3+1] = (Math.random()-0.5)*5;
      positions[i*3+2] = (Math.random()-0.5)*3-1;
      const col = palette[i % palette.length];
      colors[i*3] = col.r; colors[i*3+1] = col.g; colors[i*3+2] = col.b;
    }
    return { positions, colors };
  }, []);

  useFrame((_s, delta) => {
    clock.current += delta;
    if (ref.current) {
      ref.current.rotation.y += delta * 0.012;
      (ref.current.material as THREE.PointsMaterial).opacity =
        0.35 + 0.12 * Math.sin(clock.current * 0.5);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} vertexColors transparent opacity={0.4}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ══════════════════════════
   CAMERA RIG
══════════════════════════ */
function CameraRig() {
  const { camera } = useThree();
  const clock = useRef(0);
  const smooth = useRef({ x: 0, y: 0 });
  useFrame((_s, delta) => {
    clock.current += delta;
    const t = clock.current;
    smooth.current.x += (ptr.x - smooth.current.x) * 0.04;
    smooth.current.y += (ptr.y - smooth.current.y) * 0.04;
    const tx = Math.sin(t*0.11)*0.2 + smooth.current.x * 0.35;
    const ty = Math.cos(t*0.09)*0.14 + smooth.current.y * 0.25;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.position.z = 5.0 + Math.sin(t*0.18)*0.12;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ══════════════════════════
   LIGHTS
══════════════════════════ */
function Lights() {
  const v = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);
  const clock = useRef(0);
  useFrame((_s, delta) => {
    clock.current += delta;
    const t = clock.current;
    if (v.current) v.current.intensity = 2.2 + 0.7*Math.sin(t*1.1);
    if (b.current) b.current.intensity = 1.8 + 0.5*Math.cos(t*0.85);
  });
  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[4,5,4]}   intensity={2.5} color="#c4b5fd" />
      <directionalLight position={[-4,-2,2]} intensity={1.6} color="#61dafb" />
      <pointLight ref={v} position={[0,1.5,3]}   intensity={2.2} color="#a78bfa" distance={12} />
      <pointLight ref={b} position={[-2,-1,2]}   intensity={1.8} color="#22d3ee" distance={10} />
      <pointLight           position={[2,2,-2]}  intensity={1.2} color="#4ade80" distance={8}  />
    </>
  );
}

/* ══════════════════════════
   SCENE
══════════════════════════ */
function Scene() {
  return (
    <>
      <CameraRig />
      <Lights />
      <GlowDots />
      <MainPanel />
      <SmallPanel />
      <TechBadges />
      <FloatingLabels />
    </>
  );
}

/* ══════════════════════════
   EXPORT
══════════════════════════ */
export default function Character3D() {
  const onMove  = useCallback((e: PointerEvent) => {
    ptr.x = ((e.clientX / window.innerWidth)  * 2 - 1) * 0.6;
    ptr.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.4;
  }, []);
  const onLeave = useCallback(() => { ptr.x = 0; ptr.y = 0; }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [onMove, onLeave]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.0], fov: 44 }}
      style={{ background: "transparent" }}
      gl={{
        antialias: true, alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
