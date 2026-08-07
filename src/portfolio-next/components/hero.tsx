'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Trophy, GitBranch, BookOpen, Cpu } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const ROLES = [
  'Embedded Systems Engineer',
  'AI/ML Developer',
  'Full-Stack Developer',
  'Competitive Programmer',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const particlePositions = useMemo(() => {
    const seededRandom = (s: number) => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };
    return Array.from({ length: 24 }, (_, i) => ({
      left: seededRandom(12345 + i * 3) * 100,
      top: seededRandom(12345 + i * 3 + 1) * 100,
      duration: 5 + seededRandom(12345 + i * 3 + 2) * 3,
      delay: seededRandom(12345 + i * 3 + 3) * 3,
      size: seededRandom(12345 + i * 3 + 4) > 0.7 ? 'w-1.5 h-1.5' : 'w-1 h-1',
    }));
  }, []);

  const stats = [
    { icon: Trophy, label: 'Hackathon Wins', value: '3' },
    { icon: GitBranch, label: 'Public Repos', value: '70+' },
    { icon: BookOpen, label: 'NPTEL Courses', value: '47' },
    { icon: Cpu, label: 'GATE Qualified', value: 'CSE+DA' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full bg-indigo-500/[0.025] blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.025] blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full bg-indigo-400/[0.015] blur-[100px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute ${p.size} bg-white/20 rounded-full`}
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300 tracking-wide font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 glow-dot" />
            Available · Joining Visteon as SDE after graduation
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-[-0.04em] mb-4 font-display text-shimmer leading-none">
            {personalInfo.name.split(' ')[0]}
          </h1>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-[-0.04em] mb-8 font-display text-white/90 leading-none">
            {personalInfo.name.split(' ').slice(1).join(' ')}
          </h1>
        </motion.div>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="h-12 flex items-center justify-center mb-6"
        >
          <p className="text-xl sm:text-2xl text-zinc-400 font-medium tracking-wide font-display">
            {displayed}
            <span className="inline-block w-0.5 h-6 bg-indigo-400 ml-1 animate-pulse" />
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-zinc-100 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-100"
          >
            View My Work
          </button>
          <a
            href="/joseph_jonathan_fernandes_resume.pdf"
            download
            className="px-8 py-3.5 bg-white/5 text-white font-medium rounded-full border border-white/15 hover:bg-white/10 hover:border-white/25 transition-all duration-300 flex items-center gap-2.5 hover:scale-105 active:scale-100"
          >
            Download Resume
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex justify-center space-x-5 mb-16"
        >
          {[
            { icon: Github, href: personalInfo.github, label: 'GitHub' },
            { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
            { icon: ExternalLink, href: personalInfo.gitroll, label: 'GitRoll' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-500 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              <Icon className="w-4.5 h-4.5" />
            </a>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="w-full max-w-2xl glass-panel px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 group">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                <span className="text-xl font-bold text-white font-display tracking-tight">{value}</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <button
            onClick={() => scrollToSection('about')}
            aria-label="Scroll to About"
            className="text-zinc-600 hover:text-white transition-colors duration-300"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
