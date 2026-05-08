"use client";

import { motion } from "framer-motion";

const entries = [
  {
    period: "2025 — Present",
    company: "ELaunch Infotech",
    role: "Software Developer",
    type: "Full-time",
    highlights: [
      "Leading full-stack development on Oppi Wallet, Trippica, Cool Match and Nexus — products used by thousands of real users",
      "Architecting RESTful APIs consumed by mobile apps live on Play Store and App Store",
      "Driving end-to-end feature delivery: requirements → design → dev → deployment",
      "Mentoring junior contributors and reviewing code for quality and consistency",
    ],
    accent: "#7c3aed",
  },
  {
    period: "Dec 2024 — 2025",
    company: "ELaunch Infotech",
    role: "Junior Software Developer",
    type: "Full-time",
    highlights: [
      "After a strong 6-month internship, promoted to Junior Software Developer at ELaunch Infotech",
      "Took growing ownership of backend APIs, frontend features, and end-to-end delivery",
      "Built and optimised Node.js + Express APIs integrated with React frontends",
      "Improved MongoDB query performance and worked on real-time Socket.io features",
    ],
    accent: "#06b6d4",
  },
  {
    period: "June 2024 — Dec 2024",
    company: "ELaunch Infotech",
    role: "Software Engineer Intern",
    type: "Internship",
    highlights: [
      "Joined straight after graduating in 2024 — contributing to production code from week one",
      "Worked on frontend React components and backend Express.js routes",
      "Learned agile workflows, code reviews, and real-world product development cycles",
    ],
    accent: "#34d399",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="section-label block mb-3">Journey Log</span>
          <h2 className="section-title text-white">
            How I&apos;ve <span className="text-gradient">grown</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-violet-500/60 via-cyan-500/30 to-transparent origin-top hidden md:block"
          />

          <div className="space-y-12">
            {entries.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative md:pl-20"
              >
                {/* Dot */}
                <div
                  className="absolute left-[27px] top-5 w-3 h-3 rounded-full hidden md:block"
                  style={{
                    background: entry.accent,
                    boxShadow: `0 0 12px ${entry.accent}, 0 0 24px ${entry.accent}50`,
                  }}
                />

                <div className="glass rounded-2xl p-7 border border-white/5 hover:border-white/10 transition-all duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: entry.accent }}
                      >
                        {entry.period}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1 group-hover:text-violet-300 transition-colors">
                        {entry.role}
                      </h3>
                      <p className="text-[#94a3b8] text-sm font-medium">{entry.company}</p>
                    </div>
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full shrink-0"
                      style={{ background: `${entry.accent}15`, color: entry.accent }}
                    >
                      {entry.type}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {entry.highlights.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 + j * 0.06 + 0.3 }}
                        className="flex items-start gap-3 text-[#64748b] text-sm font-light leading-relaxed"
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: entry.accent }}
                        />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
