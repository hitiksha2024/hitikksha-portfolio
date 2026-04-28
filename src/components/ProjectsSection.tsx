"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";



const projects = [
  {
    title: "Oppi Wallet",
    role: "Full Stack Developer",
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
    desc: "A live travel-booking platform. Engineered scalable backend microservices and APIs focused on performance, reliability, and fault tolerance.",
    tags: ["Node.js", "Express", "MongoDB", "REST APIs"],
    accent: "#06b6d4",
    grad: "from-cyan-900/40 to-blue-900/40",
    live: "https://trippica.com/",
    image: "/trippica.png",
  },
  {
    title: "Cool Match",
    role: "Backend Developer",
    desc: "Real-time matchmaking app. Built backend logic, Socket.io event flows, and complex API integrations for live user-matching systems.",
    tags: ["Node.js", "Socket.io", "MongoDB"],
    accent: "#f472b6",
    grad: "from-pink-900/40 to-rose-900/40",
    live: "https://coolmatch.app/en",
    image: "/coolmatch.png",
  },
  {
    title: "Nexus",
    role: "Full Stack Developer",
    desc: "Internal task management system — full frontend + backend. Advanced task flows with role-based access control and real-time status updates.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    accent: "#34d399",
    grad: "from-emerald-900/40 to-teal-900/40",
    live: null,
    image: null,
  },
  {
    title: "E-Commerce Web",
    role: "Full Stack Developer",
    desc: "Feature-complete e-commerce solution: product catalog, order management, payment integration, and a full admin panel.",
    tags: ["React", "Node.js", "MongoDB"],
    accent: "#fb923c",
    grad: "from-orange-900/40 to-amber-900/40",
    live: null,
    image: null,
  },
  {
    title: "Management System",
    role: "Full Stack Developer",
    desc: "Scalable internal web platform for corporate operations — employee management, resource tracking, and reporting dashboards.",
    tags: ["React", "Node.js", "MongoDB"],
    accent: "#818cf8",
    grad: "from-indigo-900/40 to-sky-900/40",
    live: null,
    image: null,
  },
];

/* ── Performant 3D tilt card using useMotionValue (no setState re-renders) ── */
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw motion values — updated on every mousemove, no re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth follow
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  // Transform normalized values into rotations
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  // Shine overlay position — follows cursor
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
      <div
        className="h-full glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-colors duration-300 group flex flex-col relative"
      >
        {/* Dynamic shine overlay — follows cursor */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [shineX, shineY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Header — screenshot or gradient fallback */}
        <div
          className={`h-44 relative overflow-hidden bg-gradient-to-br ${project.grad}`}
          style={{ position: "relative" }}
        >
          {project.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              {/* dark overlay so text above stays readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-5xl font-black opacity-10 select-none group-hover:opacity-20 group-hover:scale-110 transition-all duration-500"
                style={{ color: project.accent }}
              >
                {project.title[0]}
              </span>
            </div>
          )}

          {/* Beam sweep on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, transparent 40%, ${project.accent}15 60%, transparent 80%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 relative z-[2]">
          <div
            className="text-xs font-mono font-semibold mb-1"
            style={{ color: project.accent }}
          >
            {project.role}
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-[#64748b] text-sm leading-relaxed mb-5 flex-1 font-light">
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] rounded-full font-medium transition-all duration-300 hover:scale-105"
                style={{ background: `${project.accent}15`, color: project.accent }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA — only shown when project is live */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-[#94a3b8] hover:text-white transition-colors group/btn w-fit"
            >
              View Project
              <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </a>
          )}
        </div>

        {/* Bottom glow edge */}
        <div
          className="h-[1px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="section relative overflow-hidden">
      {/* Section divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto h-px mb-12 origin-center"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)" }}
      />

      {/* Ambient Glows instead of 3D */}
      <div className="absolute left-0 bottom-20 w-64 h-64 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="text-center mb-16"
        >
          <motion.span variants={itemVariants} className="section-label block mb-3">
            DEPLOYMENTS
          </motion.span>
          <motion.h2 variants={itemVariants} className="section-title text-white">
            Things I&apos;ve <span className="text-gradient">shipped</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#64748b] mt-4 max-w-xl mx-auto font-light">
            Real-world applications in production. Hover cards for an immersive 3D tilt.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
