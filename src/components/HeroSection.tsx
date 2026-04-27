"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";

const HeroCanvas = dynamic(() => import("./Character3D"), { ssr: false });

// Two lines of the name — each character animated through a mask
const LINES = [
  { word: "HITIKSHA", offset: 0 },
  { word: "PANDAV", offset: 8 },
];

// Spring mask-reveal: letter starts BELOW its container clip
// The overflow-hidden parent acts as the invisible floor
const letterVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 180,
      delay: 0.05 + i * 0.055,
    },
  }),
};

const fadeUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  // Text parallax + fade on scroll
  const y = useTransform(scrollYProgress, [0, 0.25], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  // Orb scroll parallax — floats up slower than text
  const orbScrollY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-30%"]);

  // ── Cursor-follow spring values ──
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Silky smooth spring — low stiffness = floaty, damping prevents overshoot
  const springX = useSpring(rawX, { stiffness: 45, damping: 18, mass: 1 });
  const springY = useSpring(rawY, { stiffness: 45, damping: 18, mass: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalize to -1 → +1 relative to section center
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rawX.set(nx * 80);
    rawY.set(ny * 55);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };


  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-grid"
    >
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between w-full pt-24 pb-16 relative z-10"
      >
        {/* ─── LEFT: Text ─── */}
        <div className="w-full lg:w-[55%] flex flex-col">
          {/* Eyebrow label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="section-label">Enter My Universe</span>
          </motion.div>

          {/* ── Name: spring mask-reveal per character ──
               Each letter lives in an overflow-hidden div that acts
               as an invisible clip floor. The letter springs up into
               view from below, left-to-right across both lines. */}
          <div className="mb-7 select-none">
            <div className="flex flex-col" style={{ lineHeight: 1.06 }}>
              {LINES.map(({ word, offset }) => (
                <div key={word} className="flex">
                  {word.split("").map((char, i) => (
                    // overflow-hidden = the invisible mask / clip floor
                    <div
                      key={`${word}-${i}`}
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        // extra bottom padding so descenders (y,j,p) aren't clipped
                        paddingBottom: "0.08em",
                      }}
                    >
                      <motion.span
                        custom={offset + i}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block text-[clamp(3.6rem,10vw,7.5rem)] font-black tracking-[-0.04em]"
                        style={{
                          background:
                            "linear-gradient(135deg, #e2e8f0 0%, #c4b5fd 35%, #a78bfa 60%, #22d3ee 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          willChange: "transform",
                        }}
                      >
                        {char}
                      </motion.span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Role — no company */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="mb-5"
          >
            <span className="text-xl md:text-2xl font-light text-[#94a3b8]">
              MERN Stack Developer
            </span>
          </motion.div>

          {/* Description — clean bold prose */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
            className="max-w-lg mb-10 space-y-2"
          >
            <p className="text-lg md:text-xl font-semibold text-white leading-snug">
              Full-stack developer building interfaces people
              <span className="text-violet-400"> love to use </span>
              and backends built to last.
            </p>
            <p className="text-sm md:text-base text-[#64748b] leading-relaxed font-light">
              1.5+ years shipping real-world products — from fintech platforms
              to real-time apps — with React, Node.js, MongoDB &amp; a
              relentless attention to detail.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <button
              className="btn-primary"
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Build Lab <span>→</span>
            </button>
            <button
              className="btn-outline"
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Let&apos;s Connect
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.4 }}
            className="flex gap-8 mt-10 pt-8 border-t border-white/5"
          >
            {[
              { value: "1.5+", label: "Years Exp." },
              { value: "6+", label: "Live Projects" },
              { value: "5+", label: "Tech Stack" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-gradient-violet">{stat.value}</div>
                <div className="text-xs text-[#64748b] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Spacer keeps text from stretching full width on desktop */}
        <div className="hidden lg:block lg:w-[45%]" aria-hidden />
      </motion.div>

      {/*
        ── 3D Canvas: absolute right-side layer ──
        Outer div: scroll parallax (orbScrollY) + mask clipping
        Inner div: cursor-follow springs (springX, springY)
        Two separate layers = clean composition, no value combining needed.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.6, ease: "easeOut" }}
        className="absolute top-0 right-0 h-full pointer-events-none z-[5]"
        style={{
          width: "52%",
          y: orbScrollY,
          maskImage:
            "radial-gradient(ellipse 90% 80% at 75% 50%, black 10%, rgba(0,0,0,0.85) 38%, rgba(0,0,0,0.3) 62%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 75% 50%, black 10%, rgba(0,0,0,0.85) 38%, rgba(0,0,0,0.3) 62%, transparent 85%)",
        }}
      >
        {/* Inner layer: cursor-follow — springX/Y move the orb toward cursor */}
        <motion.div
          className="w-full h-full relative"
          style={{ x: springX, y: springY }}
        >
          {/* Ambient violet bloom — follows the orb */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: 0,
              background:
                "radial-gradient(ellipse 50% 55% at 72% 50%, rgba(124,58,237,0.2) 0%, transparent 70%)",
            }}
          />
          <HeroCanvas />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#475569]">Scroll</span>
        <div
          className="w-[1px] h-10 bg-gradient-to-b from-violet-500 to-transparent"
          style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
        />
      </motion.div>
    </section>
  );
}
