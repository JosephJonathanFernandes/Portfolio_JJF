'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, ExternalLink, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xvkpgpyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'JosephJonathanFernandes',
      href: personalInfo.github,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'joseph-jonathan-fernandes',
      href: personalInfo.linkedin,
    },
    {
      icon: ExternalLink,
      label: 'GitRoll',
      value: 'View Profile',
      href: personalInfo.gitroll,
    }
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Contact
          </h2>
          <div className="w-16 h-1 bg-white/20 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Joining Visteon as an SDE post-graduation, but always open to discussing open source, research, or interesting tech. Direct email is fastest.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">
              Get in touch
            </h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                  <p className="text-zinc-400">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 glass-panel hover:bg-white/10 group transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <method.icon className="w-6 h-6 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all" />
                    <div>
                      <div className="font-semibold text-white text-sm tracking-tight">{method.label}</div>
                      <div className="text-xs text-zinc-500 truncate mt-0.5">{method.value}</div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-10 p-8 glass-panel relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mt-10 -mr-10" />
              <h4 className="text-xl font-bold text-white mb-6 tracking-tight">
                Available for
              </h4>
              <ul className="space-y-3 text-zinc-400">
                {[
                  'Full-time SDE roles',
                  'Embedded systems positions',
                  'AI/ML engineering roles',
                  'Backend/full-stack development',
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white/50 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel p-10">
              <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">
                Send a message
              </h3>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-4 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">Message sent. I will get back to you within 24 hours.</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-4 border border-rose-500/20 bg-rose-500/10 text-rose-400 rounded-lg flex items-center space-x-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">Something went wrong. Email me directly at {personalInfo.email}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-zinc-300 mb-2 tracking-wide uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-white/5 text-white transition-all placeholder:text-zinc-600 outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-zinc-300 mb-2 tracking-wide uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-white/5 text-white transition-all placeholder:text-zinc-600 outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-zinc-300 mb-2 tracking-wide uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-white/5 text-white transition-all placeholder:text-zinc-600 outline-none"
                    placeholder="Opportunity / Collaboration / Other"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-zinc-300 mb-2 tracking-wide uppercase">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-white/5 text-white transition-all placeholder:text-zinc-600 outline-none resize-none"
                    placeholder="Tell me about the role or project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
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
