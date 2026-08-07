'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, ExternalLink, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

interface FormData { name: string; email: string; subject: string; message: string; }
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/xvkpgpyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactMethods = [
    { icon: Mail,        label: 'Email',    value: personalInfo.email,          href: `mailto:${personalInfo.email}` },
    { icon: Github,      label: 'GitHub',   value: 'JosephJonathanFernandes',   href: personalInfo.github },
    { icon: Linkedin,    label: 'LinkedIn', value: 'joseph-jonathan-fernandes', href: personalInfo.linkedin },
    { icon: ExternalLink,label: 'GitRoll',  value: 'View Profile',              href: personalInfo.gitroll },
  ];

  const inputCls = "w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-700 text-sm outline-none transition-all duration-300 focus:border-indigo-400/40 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]";

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">Get in touch</p>
          <h2 className="section-heading text-4xl text-white mb-6">Contact</h2>
          <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
          <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Joining Visteon as an SDE post-graduation, but always open to discussing open source, research, or interesting tech. Direct email is fastest.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left col */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 font-display tracking-tight">Let's connect</h3>

            {/* Location */}
            <div className="flex items-center gap-4 mb-8 glass-panel p-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 flex-shrink-0">
                <MapPin className="w-4.5 h-4.5 text-zinc-400" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-600 font-semibold mb-0.5">Location</div>
                <div className="text-white font-medium">{personalInfo.location}</div>
              </div>
            </div>

            {/* Contact methods */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {contactMethods.map((m, i) => (
                <motion.a
                  key={m.label}
                  href={m.href}
                  target={m.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="glass-panel p-4 flex items-center gap-3 group hover:border-white/20 hover:bg-white/8 transition-all duration-300"
                >
                  <m.icon className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white">{m.label}</div>
                    <div className="text-[11px] text-zinc-600 truncate group-hover:text-zinc-400 transition-colors">{m.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Available for */}
            <div className="glass-panel p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Available for</h4>
              <ul className="space-y-3">
                {['Full-time SDE roles', 'Embedded systems positions', 'AI/ML engineering roles', 'Backend/full-stack development'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right col — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel-elevated p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />

              <h3 className="text-2xl font-bold text-white mb-8 font-display tracking-tight">Send a message</h3>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center gap-3 text-sm font-medium"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  Message sent! I'll get back to you within 24 hours.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 border border-rose-500/20 bg-rose-500/10 text-rose-400 rounded-xl flex items-center gap-3 text-sm font-medium"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  Something went wrong. Email me directly at {personalInfo.email}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Opportunity / Collaboration / Other" className={inputCls} />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Tell me about the role or project..." className={`${inputCls} resize-none`} />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white text-black font-bold rounded-xl transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
