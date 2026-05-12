"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Send, AlertCircle } from "lucide-react";
import { useState, useRef, MouseEvent, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Toast from "./Toast";

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* ── Magnetic link wrapper ── */
function MagneticLink({ children, href, target, rel, className }: {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
    message: "",
    type: "success",
    visible: false,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  const focusForm = () => {
    nameInputRef.current?.focus();
    document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    // EmailJS implementation
    // These keys should be added to your .env file
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_default";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_default";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key";

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      to_name: "Hitiksha",
      message: form.message,
      reply_to: form.email,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          setSent(true);
          setForm({ name: "", email: "", message: "" });
          setLoading(false);
          setToast({
            message: "Message sent successfully! I'll get back to you soon.",
            type: "success",
            visible: true,
          });
          setTimeout(() => setSent(false), 3000);
        },
        (err) => {
          setLoading(false);
          console.error("FAILED...", err);
          setError("Failed to send message. Please try again.");
          setToast({
            message: "Something went wrong. Please try again.",
            type: "error",
            visible: true,
          });
        }
      );
  };

  return (
    <section id="contact" className="section pb-32 relative overflow-hidden">
      {/* Ambient Glows instead of 3D */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      {/* Section divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl mx-auto h-px mb-20 origin-left"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)" }}
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.span variants={itemVariants} className="section-label block mb-3">
            Let&apos;s Build Something
          </motion.span>
          <motion.h2 variants={itemVariants} className="section-title text-white">
            Got an idea? <span className="text-gradient">Let&apos;s talk.</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#64748b] mt-4 max-w-lg mx-auto font-light">
            Whether it&apos;s a collaboration, an opportunity, or you just want to say hi — my
            inbox is always open.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <button
                onClick={focusForm}
                className="w-full flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-violet-500/30 transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="text-xs text-[#64748b] mb-0.5">Email me</div>
                  <div className="text-sm font-medium text-white">pandavhitiksha@gmail.com</div>
                </div>
              </button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <MagneticLink
                href="https://www.linkedin.com/in/hitiksha-pandav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                  <LinkedinIcon />
                </div>
                <div>
                  <div className="text-xs text-[#64748b] mb-0.5">LinkedIn</div>
                  <div className="text-sm font-medium text-white">Hitiksha Pandav</div>
                </div>
              </MagneticLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <MagneticLink
                href="https://github.com/hitiksha-pandav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/20 group-hover:scale-110 transition-all duration-300">
                  <GithubIcon />
                </div>
                <div>
                  <div className="text-xs text-[#64748b] mb-0.5">GitHub</div>
                  <div className="text-sm font-medium text-white">hitiksha-pandav</div>
                </div>
              </MagneticLink>
            </motion.div>

            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 px-5 py-3 glass rounded-2xl border border-green-500/20 w-fit">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping" />
                </div>
                <span className="text-xs font-medium text-green-400">Open to opportunities</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            id="contact-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-xs text-[#64748b] mb-1.5 block">Name</label>
                <input
                  ref={nameInputRef}
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="input-field"
                />
              </div>
              <div className="relative">
                <label className="text-xs text-[#64748b] mb-1.5 block">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="input-field"
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-xs text-[#64748b] mb-1.5 block">Message</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or idea..."
                rows={5}
                className="input-field resize-none"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
              >
                <AlertCircle size={14} /> {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className={`btn-primary w-full justify-center relative overflow-hidden ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : sent ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ✓ Message Sent!
                  </motion.span>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-32 border-t border-white/5 pt-12 text-center"
      >
        <p className="text-[#334155] text-[10px] uppercase tracking-[0.4em] font-bold">
          © {new Date().getFullYear()} Hitiksha Pandav — Crafting digital experiences
        </p>
      </motion.div>

      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </section>
  );
}
