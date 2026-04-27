"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Dot – fast, tight spring
  const dotX = useSpring(mx, { stiffness: 600, damping: 30 });
  const dotY = useSpring(my, { stiffness: 600, damping: 30 });

  // Ring – slow, soft spring (lags behind)
  const ringX = useSpring(mx, { stiffness: 120, damping: 20 });
  const ringY = useSpring(my, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      // Update mouse glow CSS vars on root for background effect
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <>
      {/* Core dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#a78bfa",
        }}
      />
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(167,139,250,0.5)",
          boxShadow: "0 0 10px rgba(124,58,237,0.3)",
        }}
      />
    </>
  );
}
