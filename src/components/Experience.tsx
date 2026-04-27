"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Oppi Wallet",
    details: [
      "Built backend APIs and frontend web platform.",
      "Worked on real-world financial/user flows.",
      "Live on Play Store / App Store."
    ]
  },
  {
    role: "Backend Developer",
    company: "Trippica",
    details: [
      "Built scalable backend services and APIs.",
      "Focus on performance and reliability.",
      "Live app."
    ]
  },
  {
    role: "Backend Developer",
    company: "Cool Match",
    details: [
      "Developed backend logic and integrations.",
      "API handling and system logic.",
      "Live app."
    ]
  }
];

export default function Experience() {
  return (
    <section className="relative w-full py-24 z-10" id="experience">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            My journey at ELaunch Solution Pvt. Ltd. and the real-world applications I've engineered.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative pl-10 md:pl-0 mb-12 md:flex md:justify-between items-center group"
            >
              {/* Timeline Line (Desktop) */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-[-3rem] w-[1px] bg-white/10 group-last:bg-transparent" />
              
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-[50%] md:ml-[-24px] top-1 md:top-0 w-12 h-12 bg-black rounded-full border-2 border-primary flex items-center justify-center z-10 box-content shadow-[0_0_15px_rgba(155,135,245,0.4)]">
                <Briefcase size={20} className="text-primary" />
              </div>

              {/* Content Card (Left or Right) */}
              <div className={`md:w-[45%] ${index % 2 === 0 ? "md:text-right" : "md:ml-auto md:text-left"}`}>
                <div className="glass p-6 rounded-2xl hover:border-primary/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-primary font-medium mb-4">{exp.company}</h4>
                  <ul className={`text-gray-400 font-light text-sm space-y-2 list-none ${index % 2 === 0 ? "md:pl-0" : ""}`}>
                    {exp.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 justify-start md:justify-end">
                        <span className={`md:hidden text-primary`}>•</span>
                        {index % 2 === 0 ? (
                          <>
                            <span className="hidden md:inline-block">{detail}</span>
                            <span className="hidden md:inline-block text-primary">•</span>
                          </>
                        ) : (
                          <>
                            <span className="hidden md:inline-block text-primary">•</span>
                            <span className="hidden md:inline-block">{detail}</span>
                          </>
                        )}
                        {/* Mobile view only text */}
                        <span className="md:hidden">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
