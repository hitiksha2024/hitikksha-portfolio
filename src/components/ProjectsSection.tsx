"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, ArrowRight } from "lucide-react";

interface Project {
  title: string;
  role: string;
  desc: string;
  tags: string[];
  accent: string;
  grad: string;
  live: string | null;
  image: string | null;
  category: "Full Stack" | "Backend & APIs" | "Real-Time";
  badge: string;
}

const projects: Project[] = [
  {
    title: "Oppi Wallet",
    role: "Full Stack Developer",
    category: "Full Stack",
    badge: "Live on Stores & Web",
    desc: "A real-world financial platform — built backend APIs, user authentication flows, and the full frontend web experience. Live on Play Store & App Store.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    accent: "#7c3aed",
    grad: "from-violet-900/40 to-purple-900/40",
    live: "https://oppiwallet.com/en",
    image: "/oppiwallet.png",
  },
  {
    title: "Trippica",
    role: "Backend Developer",
    category: "Backend & APIs",
    badge: "Microservices & APIs",
    desc: "A live travel-booking platform. Engineered scalable backend microservices and APIs focused on high throughput, fault tolerance, and booking logic.",
    tags: ["Node.js", "Express", "MongoDB", "REST APIs"],
    accent: "#06b6d4",
    grad: "from-cyan-900/40 to-blue-900/40",
    live: "https://trippica.com/",
    image: "/trippica.png",
  },
  {
    title: "Cool Match",
    role: "Backend Developer",
    category: "Real-Time",
    badge: "Live Socket Engine",
    desc: "Real-time matchmaking app. Built backend logic, Socket.io event flows, and complex API integrations for live concurrent user-matching systems.",
    tags: ["Node.js", "Socket.io", "MongoDB"],
    accent: "#f472b6",
    grad: "from-pink-900/40 to-rose-900/40",
    live: "https://coolmatch.app/en",
    image: "/coolmatch.png",
  },
  {
    title: "Nexus",
    role: "Full Stack Developer",
    category: "Full Stack",
    badge: "Enterprise Workflow",
    desc: "Internal task management system — full frontend + backend. Advanced task flows with role-based access control (RBAC) and real-time status updates.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    accent: "#34d399",
    grad: "from-emerald-900/40 to-teal-900/40",
    live: null,
    image: null,
  },
  {
    title: "E-Commerce Web",
    role: "Full Stack Developer",
    category: "Full Stack",
    badge: "End-to-End Retail",
    desc: "Feature-complete e-commerce solution: product catalog, cart flows, order management, payment integration, and a full admin dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
    accent: "#fb923c",
    grad: "from-orange-900/40 to-amber-900/40",
    live: null,
    image: null,
  },
  {
    title: "Management System",
    role: "Full Stack Developer",
    category: "Full Stack",
    badge: "Corporate Operations",
    desc: "Scalable internal web platform for corporate operations — employee management, resource tracking, and high-performance reporting dashboards.",
    tags: ["React", "Node.js", "MongoDB"],
    accent: "#818cf8",
    grad: "from-indigo-900/40 to-sky-900/40",
    live: null,
    image: null,
  },
];

const categories = ["All", "Full Stack", "Backend & APIs", "Real-Time"] as const;
type CategoryFilter = (typeof categories)[number];

/* ── Performant 3D tilt card using useMotionValue ── */
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const shineX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const shineY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="h-full perspective"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="h-full glass rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 group flex flex-col relative shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        {/* Dynamic shine overlay */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [shineX, shineY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.09) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Header Preview or Fallback */}
        <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${project.grad}`}>
          {/* Status Badge floating at top right */}
          <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-[10px] font-mono font-semibold glass border border-white/10 text-white flex items-center gap-1.5 shadow-lg backdrop-blur-md">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
            />
            <span className="tracking-wide">{project.badge}</span>
          </div>

          {project.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/40 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-6xl font-black opacity-10 select-none group-hover:opacity-20 group-hover:scale-110 transition-all duration-500"
                style={{ color: project.accent }}
              >
                {project.title[0]}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
            </div>
          )}

          {/* Hover beam */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, transparent 40%, ${project.accent}20 60%, transparent 80%)`,
            }}
          />
        </div>

        {/* Card Content */}
        <div className="p-6 md:p-7 flex flex-col flex-1 relative z-[2]">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: project.accent }}
            >
              {project.role}
            </span>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 flex-1 font-light">
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[11px] rounded-full font-mono font-medium transition-all duration-300 border"
                style={{
                  background: `${project.accent}12`,
                  borderColor: `${project.accent}30`,
                  color: project.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Link or Details */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 transition-all duration-300 group/btn"
              >
                <span>Live Preview</span>
                <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <span className="text-xs font-mono text-white/40 italic flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                Enterprise Architecture
              </span>
            )}

            <button
              onClick={() => {
                const contact = document.querySelector("#contact");
                if (contact) {
                  contact.scrollIntoView({ behavior: "smooth" });
                  window.dispatchEvent(
                    new CustomEvent("select-project-type", { detail: `Project inquiry like ${project.title}` })
                  );
                }
              }}
              className="text-xs font-medium text-[#94a3b8] hover:text-white transition-colors flex items-center gap-1 ml-auto"
            >
              <span>Build similar</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Bottom glow accent line */}
        <div
          className="h-[2px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section relative overflow-hidden bg-transparent">
      {/* Section divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto h-px mb-16 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)",
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute left-0 bottom-20 w-80 h-80 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="section-label">DEPLOYMENTS // PROVEN SHIPMENTS</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="section-title text-white mb-4">
            Things I&apos;ve <span className="text-gradient">engineered & shipped</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#94a3b8] text-base leading-relaxed font-light">
            Real-world products serving real users. High-concurrency backends, responsive client apps, and intuitive architectures.
          </motion.p>

          {/* Category Filter Pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-[#94a3b8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectFilter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 shadow-[0_0_15px_rgba(124,58,237,0.35)]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat}
                    <span className="text-[10px] opacity-60">
                      ({cat === "All" ? projects.length : projects.filter(p => p.category === cat).length})
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Freelance Project CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 md:p-10 rounded-3xl glass border border-violet-500/25 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-500/30 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0">
              <Sparkles size={26} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                Have a project or MVP in mind?
              </h3>
              <p className="text-sm text-[#94a3b8] font-light max-w-lg">
                I help founders and engineering leaders build fast, reliable, and scalable web software.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const contact = document.querySelector("#contact");
              if (contact) {
                contact.scrollIntoView({ behavior: "smooth" });
                window.dispatchEvent(
                  new CustomEvent("select-project-type", { detail: "Freelance MVP / Project" })
                );
              }
            }}
            className="btn-primary text-sm md:text-base px-7 py-3.5 shrink-0 shadow-[0_0_25px_rgba(124,58,237,0.4)]"
          >
            Request Project Estimate →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
