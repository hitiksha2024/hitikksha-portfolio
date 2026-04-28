"use client";

import { motion } from "framer-motion";

const techSymbols = [
  { text: "</>",    x: "6%",  y: "12%", size: "2.2rem", rotate: -12, delay: 0 },
  { text: "{}",     x: "88%", y: "18%", size: "2.8rem", rotate: 15,  delay: 0.5 },
  { text: "⚛",     x: "82%", y: "60%", size: "3.2rem", rotate: -8,  delay: 1 },
  { text: "=>",     x: "10%", y: "72%", size: "2rem",   rotate: 5,   delay: 0.3 },
  { text: "npm",    x: "72%", y: "88%", size: "1.7rem", rotate: -14, delay: 0.8 },
  { text: "λ",      x: "18%", y: "42%", size: "3rem",   rotate: 10,  delay: 1.2 },
  { text: "[ ]",    x: "62%", y: "8%",  size: "2.2rem", rotate: -5,  delay: 0.6 },
  { text: "git",    x: "90%", y: "42%", size: "1.8rem", rotate: 18,  delay: 0.4 },
  { text: "const",  x: "4%",  y: "55%", size: "1.7rem", rotate: 8,   delay: 0.7 },
  { text: "async",  x: "78%", y: "75%", size: "1.7rem", rotate: -10, delay: 1.3 },
  { text: "404",    x: "5%",  y: "28%", size: "1.9rem", rotate: 7,   delay: 1.4 },
];

export default function TechBackground() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden select-none">
      {techSymbols.map((sym, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute font-mono font-bold text-violet-400/[0.05] tracking-tight"
          style={{
            left: sym.x,
            top: sym.y,
            fontSize: sym.size,
            rotateZ: sym.rotate,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
        >
          {sym.text}
        </motion.span>
      ))}
    </div>
  );
}
