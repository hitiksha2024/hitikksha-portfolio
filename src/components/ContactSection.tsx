"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Compose mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Hi Hitiksha,\n\n${form.message}\n\n— ${form.name}\n${form.email}`);
    window.open(`mailto:hitiksha57@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section pb-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-3">Let&apos;s Build Something</span>
          <h2 className="section-title text-white">
            Got an idea? <span className="text-gradient">Let&apos;s talk.</span>
          </h2>
          <p className="text-[#64748b] mt-4 max-w-lg mx-auto font-light">
            Whether it&apos;s a collaboration, an opportunity, or you just want to say hi — my
            inbox is always open.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <a
              href="mailto:hitiksha57@gmail.com"
              className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-violet-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                <Mail size={22} />
              </div>
              <div>
                <div className="text-xs text-[#64748b] mb-0.5">Email me</div>
                <div className="text-sm font-medium text-white">hitiksha57@gmail.com</div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/hitiksha-pandav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                <LinkedinIcon />
              </div>
              <div>
                <div className="text-xs text-[#64748b] mb-0.5">LinkedIn</div>
                <div className="text-sm font-medium text-white">Hitiksha Pandav</div>
              </div>
            </a>

            {/* Availability badge */}
            <div className="flex items-center gap-3 px-5 py-3 glass rounded-2xl border border-green-500/20 w-fit">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-green-400">Open to opportunities</span>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#64748b] mb-1.5 block">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="input-field"
                />
              </div>
              <div>
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
            <div>
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

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full justify-center"
            >
              {sent ? "✓ Opening your email..." : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-white/5 pt-8 text-center text-[#334155] text-xs">
        © {new Date().getFullYear()} Hitiksha Pandav — Built with Next.js, Three.js & Framer Motion
      </div>
    </section>
  );
}
<div className="mt-32 border-t border-white/5 pt-12 text-center">
  <p className="text-[#334155] text-[10px] uppercase tracking-[0.4em] font-bold">
    © {new Date().getFullYear()} Hitiksha Pandav — Crafting digital experiences
  </p>
</div>

