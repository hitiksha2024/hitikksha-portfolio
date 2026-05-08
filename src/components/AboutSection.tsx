"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const slideRight: Variants = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const pillVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

const timeline = [
  {
    year: "June 2024",
    title: "Graduated & Joined as Intern",
    desc: "Completed BCA and joined ELaunch Infotech immediately in June 2024. Hit the ground running — contributing to real production code from week one.",
    icon: "🎓",
  },
  {
    year: "Dec 2024",
    title: "Junior Software Developer",
    desc: "After a strong 6-month internship, promoted to Junior Software Developer at ELaunch Infotech. Took growing ownership of backend APIs, frontend features, and end-to-end delivery.",
    icon: "🚀",
  },
  {
    year: "2025 — Present",
    title: "Software Developer",
    desc: "Progressed to Software Developer at ELaunch Infotech. Owning end-to-end delivery of production-grade features — from architecture decisions to deployment — trusted with more responsibility at every sprint.",
    icon: "⚡",
  },
];

export default function AboutSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "center center"]
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" ref={scrollRef} className="section relative overflow-hidden">
      {/* Section divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto h-px mb-12 origin-left"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)" }}
      />

      {/* Ambient Glows */}
      <div className="absolute left-0 top-1/3 -translate-y-1/2 w-64 h-64 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-20">
          {/* Left: Text */}
          <motion.div
            className="w-full lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
          >
            <motion.div variants={fadeUp} className="mb-3">
              <span className="section-label">README // THE_DEVELOPER_BEHIND</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="section-title text-white mb-6">
              Turning complex{" "}
              <span className="text-gradient">problems</span> into
              <br />elegant solutions
            </motion.h2>

            <motion.p variants={fadeUp} className="text-[#94a3b8] text-lg leading-relaxed mb-6 font-light">
              I&apos;m a Full Stack Developer who believes in a{" "}
              <strong className="text-white font-medium">clean code mindset</strong> —
              writing systems that are readable, maintainable, and scalable from day one.
            </motion.p>

            <motion.p variants={fadeUp} className="text-[#64748b] text-base leading-relaxed font-light">
              Fresh out of college in 2024, I joined{" "}
              <span className="text-violet-300 font-medium">ELaunch Infotech</span>{" "}
              and haven&apos;t looked back. From intern to Junior Developer to Software
              Developer in under two years — every step driven by real projects, real
              deadlines, and real users depending on what I ship.
            </motion.p>

            {/* Trait pills */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10px" }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {["Problem Solver", "Clean Code Advocate", "API Architect", "Performance Focused", "Team Player"].map((trait) => (
                <motion.span
                  key={trait}
                  variants={pillVariants}
                  whileHover={{ scale: 1.1, y: -2, boxShadow: "0 0 15px rgba(124,58,237,0.3)" }}
                  className="px-3 py-1 text-xs font-medium rounded-full glass border border-violet-500/20 text-violet-300 cursor-default transition-colors hover:border-violet-500/40 hover:text-violet-200"
                >
                  {trait}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Timeline */}
          <div className="w-full lg:w-1/2 relative">
            {/* Vertical line — scroll sync */}
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-violet-500/60 via-cyan-500/40 to-transparent origin-top"
            />

            <motion.div
              className="space-y-10 pl-14 relative"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10px" }}
            >
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={slideRight}
                  className="relative"
                >
                  {/* Dot on line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.08 }}
                    className="absolute -left-14 top-1 w-10 h-10 rounded-full glass bg-[#0a0a0f] border border-violet-500/40 flex items-center justify-center text-lg shadow-[0_0_20px_rgba(124,58,237,0.4)] z-10"
                  >
                    {item.icon}
                  </motion.div>

                  <div className="glass rounded-2xl p-5 border border-white/5 hover:border-violet-500/20 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]">
                    <div className="text-xs font-mono text-cyan-400 mb-1">{item.year}</div>
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-violet-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[#64748b] text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
