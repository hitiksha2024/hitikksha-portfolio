"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  // Dot – fast, tight spring for instant responsiveness
  const dotX = useSpring(mx, { stiffness: 800, damping: 40, restDelta: 0.001 });
  const dotY = useSpring(my, { stiffness: 800, damping: 40, restDelta: 0.001 });

  // Ring – soft spring for organic trailing effect
  const ringX = useSpring(mx, { stiffness: 150, damping: 25, restDelta: 0.001 });
  const ringY = useSpring(my, { stiffness: 150, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      
      // Update global CSS variables for the background radial gradient (throttled by the browser's own style system)
      // We use 'requestAnimationFrame' to ensure we only update once per frame
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
      });
    };

    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    const addListeners = () => {
      const hoverables = document.querySelectorAll("a, button, [role='button'], input, textarea, .cursor-hover");
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleUnhover);
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    const timer = setTimeout(addListeners, 1000);

    const observer = new MutationObserver(() => {
      addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [mx, my]);

  return (
    <>
      {/* Background Ambient Glow — follows cursor smoothly */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.06) 0%, transparent 70%)`,
        }}
      />

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
          willChange: "transform",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          background: isHovering ? "#c4b5fd" : "#a78bfa",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          willChange: "transform",
        }}
        animate={{
          width: isHovering ? 60 : 36,
          height: isHovering ? 60 : 36,
          borderColor: isHovering ? "rgba(196,181,253,0.5)" : "rgba(167,139,250,0.4)",
          boxShadow: isHovering
            ? "0 0 25px rgba(124,58,237,0.4)"
            : "0 0 10px rgba(124,58,237,0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div
          className="w-full h-full rounded-full border-[1px] border-inherit"
        />
      </motion.div>
    </>
  );
}
