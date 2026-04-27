"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

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

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.02,1.02,1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const onMouseLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)",
      transition: "transform 0.5s ease",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className="h-full"
    >
      <div
        className={`card-shine h-full glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-colors duration-300 group flex flex-col`}
      >
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
                className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              {/* dark overlay so text above stays readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-5xl font-black opacity-10 select-none"
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
        <div className="p-6 flex flex-col flex-1">
          <div
            className="text-xs font-mono font-semibold mb-1"
            style={{ color: project.accent }}
          >
            {project.role}
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
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
                className="px-2 py-0.5 text-[11px] rounded-full font-medium"
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
              <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* Bottom glow edge */}
        <div
          className="h-[1px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
        />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-3">Build Lab</span>
          <h2 className="section-title text-white">
            Things I&apos;ve <span className="text-gradient">shipped</span>
          </h2>
          <p className="text-[#64748b] mt-4 max-w-xl mx-auto font-light">
            Real-world applications in production. Hover cards for an immersive 3D tilt.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
