"use client";

import { motion, type Variants } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0): Variants => ({
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay } },
});

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
    desc: "After a strong 6-month internship, promoted to Junior Software Developer. Took growing ownership of backend APIs, frontend features, and end-to-end delivery.",
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
  return (
    <section id="about" className="section">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start gap-20">
          {/* Left: Text */}
          <div className="w-full lg:w-1/2">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mb-3"
            >
              <span className="section-label">The Mind Behind the Code</span>
            </motion.div>

            <motion.h2
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="section-title text-white mb-6"
            >
              Turning complex{" "}
              <span className="text-gradient">problems</span> into
              <br /> elegant solutions
            </motion.h2>

            <motion.p
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-[#94a3b8] text-lg leading-relaxed mb-6 font-light"
            >
              I&apos;m a Full Stack Developer who believes in a{" "}
              <strong className="text-white font-medium">clean code mindset</strong> —
              writing systems that are readable, maintainable, and scalable from day one.
            </motion.p>

            <motion.p
              variants={fadeUp(0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-[#64748b] text-base leading-relaxed font-light"
            >
              Fresh out of college in 2024, I joined{" "}
              <span className="text-violet-300 font-medium">ELaunch Infotech</span>{" "}
              and haven&apos;t looked back. From intern to Junior Developer to Software
              Developer in under two years — every step driven by real projects, real
              deadlines, and real users depending on what I ship.
            </motion.p>

            {/* Trait pills */}
            <motion.div
              variants={fadeUp(0.4)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {["Problem Solver", "Clean Code Advocate", "API Architect", "Performance Focused", "Team Player"].map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 text-xs font-medium rounded-full glass border border-violet-500/20 text-violet-300"
                >
                  {trait}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Timeline */}
          <div className="w-full lg:w-1/2 relative">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-violet-500/60 via-cyan-500/40 to-transparent origin-top"
            />

            <div className="space-y-10 pl-14 relative">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Dot on line */}
                  <div className="absolute -left-14 top-1 w-10 h-10 rounded-full glass border border-violet-500/30 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                    {item.icon}
                  </div>

                  <div className="glass rounded-2xl p-5 border border-white/5 hover:border-violet-500/20 transition-all duration-300 group">
                    <div className="text-xs font-mono text-cyan-400 mb-1">{item.year}</div>
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-violet-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#64748b] text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
