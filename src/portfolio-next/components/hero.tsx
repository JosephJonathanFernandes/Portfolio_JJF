'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Trophy, GitBranch, BookOpen, Cpu } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const ROLES = ['Systems Software Engineer', 'AI / ML Developer', 'Full-Stack Developer', 'Competitive Programmer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let t: NodeJS.Timeout;
    if (!isDeleting && displayed.length < current.length) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
    } else if (!isDeleting && displayed.length === current.length) {
      t = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 25);
    } else {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const particles = useMemo(() => {
    const r = (s: number) => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };
    return Array.from({ length: 30 }, (_, i) => ({
      left: r(99 + i * 3) * 100, top: r(99 + i * 3 + 1) * 100,
      dur: 5 + r(99 + i * 3 + 2) * 4, delay: r(99 + i * 3 + 3) * 4,
      big: r(99 + i * 3 + 4) > 0.8,
    }));
  }, []);

  const stats = [
    { icon: Trophy,    label: 'ISL Accuracy',   value: '98.3%' },
    { icon: Cpu,       label: 'AUTOSAR ECU',    value: 'Prod'  },
    { icon: GitBranch, label: 'OSS Merged PRs', value: '15+'   },
    { icon: BookOpen,  label: 'GATE Qualified', value: 'CSE+DA'},
  ];

  const socials = [
    { icon: Github,      href: personalInfo.github,             label: 'GitHub'   },
    { icon: Linkedin,    href: personalInfo.linkedin,            label: 'LinkedIn' },
    { icon: Mail,        href: `mailto:${personalInfo.email}`,   label: 'Email'    },
    { icon: ExternalLink,href: personalInfo.gitroll,             label: 'GitRoll'  },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-8">

      {/* Aurora blobs specific to hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-blob absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />
        <div className="aurora-blob-2 absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-500/[0.05] blur-[100px]" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div key={i}
            className={`absolute ${p.big ? 'w-1.5 h-1.5' : 'w-1 h-1'} bg-white/25 rounded-full`}
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.1, 0.45, 0.1] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300 tracking-wide font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 glow-dot" />
            Software Engineer @ Visteon
          </span>
        </motion.div>

        {/* Name — full name on one large hero headline */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}>
          <h1 className="text-[clamp(3.2rem,10vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9] mb-6 font-display">
            <span className="text-shimmer">Joseph</span>{' '}
            <br className="sm:hidden" />
            <span className="text-white/90">Jonathan</span>
            <br />
            <span className="text-white/80">Fernandes</span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="h-10 flex items-center justify-center mb-5">
          <p className="text-lg sm:text-xl text-zinc-400 font-medium tracking-wide font-display">
            {displayed}
            <span className="inline-block w-[2px] h-5 bg-indigo-400 ml-0.5 align-middle animate-pulse" />
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base text-zinc-500 mb-12 max-w-xl mx-auto leading-relaxed">
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button onClick={() => scrollTo('projects')}
            className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-zinc-100 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:shadow-[0_0_60px_rgba(255,255,255,0.22)] hover:scale-[1.04] active:scale-100">
            View My Work
          </button>
          <a href="/joseph_jonathan_fernandes_resume.pdf" download
            className="px-8 py-3.5 bg-white/5 text-white font-medium rounded-full border border-white/15 hover:bg-white/10 hover:border-white/25 transition-all duration-300 flex items-center justify-center gap-2.5 hover:scale-[1.04] active:scale-100">
            Download Resume
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.65 }}
          className="flex justify-center gap-4 mb-12">
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-500 hover:text-white hover:border-white/25 hover:bg-white/10 hover:scale-110 transition-all duration-300">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="w-full max-w-2xl glass-panel px-4 sm:px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 group">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors duration-300" />
                <span className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">{value}</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 font-semibold text-center leading-tight">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1 }}
          onClick={() => scrollTo('about')} aria-label="Scroll to About"
          className="text-zinc-600 hover:text-zinc-400 transition-colors duration-300">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>



      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
}
