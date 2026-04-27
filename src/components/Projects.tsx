"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Nexus",
    category: "Task Management System",
    description: "End-to-end full stack development encompassing frontend UI and backend infrastructure. Features advanced task flows and a robust user system.",
    imageColor: "from-blue-600/20 to-purple-600/20",
  },
  {
    title: "E-Commerce Web",
    category: "Online Store",
    description: "Comprehensive e-commerce solution featuring a secure user system, product catalog, order management, and a dedicated admin panel.",
    imageColor: "from-emerald-600/20 to-teal-600/20",
  },
  {
    title: "Internal Management",
    category: "Web Platform",
    description: "A highly scalable internal web platform built to streamline corporate operations, employee management, and company-wide resources.",
    imageColor: "from-orange-600/20 to-red-600/20",
  }
];

export default function Projects() {
  return (
    <section className="relative w-full py-24 z-10" id="projects">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Project <span className="text-gradient">Showcase</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Highlighting premium applications I've built with a focus on polished UI and scalable backends.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="glass rounded-2xl overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-300 relative"
            >
              {/* Image Placeholder (Glow Effect) */}
              <div className={`w-full h-48 bg-gradient-to-br ${project.imageColor} relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="p-6">
                <div className="text-xs text-primary font-semibold tracking-wider uppercase mb-2">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-light text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-secondary transition-colors">
                  View Project <ExternalLink size={16} />
                </button>
              </div>
              
              {/* Hover Glow Edge */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-primary/50 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
