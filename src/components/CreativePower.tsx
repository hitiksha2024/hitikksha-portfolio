"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

export default function CreativePower() {
  return (
    <section className="relative w-full py-24 z-10 bg-black/40" id="creative-power">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              My <span className="text-gradient">Creative Power</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed font-light mb-6">
              I believe that the best web experiences sit at the intersection of raw performance and emotional design. My creative power lies in combining structured backend architecture with fluid, interactive frontend layers.
            </p>
            <div className="glass p-6 rounded-2xl border-l-4 border-l-secondary">
              <h3 className="text-xl font-semibold text-white mb-2">The "D-Model" Concept</h3>
              <p className="text-sm text-gray-400">
                To the right is a conceptual exploration of raw energy—a shifting, dynamic geometry that represents the constant evolution of digital ideas. It is mathematically driven WebGL, blending perfect physics with distorted optics to create something that feels "alive" without being literal.
              </p>
            </div>
          </motion.div>

          {/* Right 3D Model Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 h-[400px] glass rounded-3xl overflow-hidden relative group"
          >
            {/* Subtle glow behind canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
            
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[2, 2, 2]} intensity={1.5} color="#00f0ff" />
              <directionalLight position={[-2, -2, -2]} intensity={1} color="#9b87f5" />
              <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
                <mesh>
                  <icosahedronGeometry args={[1, 4]} />
                  <meshStandardMaterial
                    color="#c4b5fd"
                    emissive="#4c1d95"
                    emissiveIntensity={0.4}
                    roughness={0.1}
                    metalness={0.95}
                    envMapIntensity={2}
                  />
                </mesh>
              </Float>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
            
            {/* Instruction Overlay */}
            <div className="absolute bottom-4 right-4 text-xs font-mono text-gray-500 tracking-widest uppercase pointer-events-none group-hover:text-primary transition-colors">
              Drag to interact
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
