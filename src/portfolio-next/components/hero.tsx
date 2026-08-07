'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const particlePositions = useMemo(() => {
    const seed = 12345;
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 20 }, (_, i) => ({
      left: seededRandom(seed + i * 3) * 100,
      top: seededRandom(seed + i * 3 + 1) * 100,
      duration: 4 + seededRandom(seed + i * 3 + 2) * 2,
      delay: seededRandom(seed + i * 3 + 3) * 2,
    }));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    let frameId: number;
    const throttled = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => handleMouseMove(e));
    };
    window.addEventListener('mousemove', throttled);
    return () => {
      window.removeEventListener('mousemove', throttled);
      cancelAnimationFrame(frameId);
    };
  }, [handleMouseMove]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [0.5, 1, 0.5], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300 tracking-wide font-medium">
              CE Student @ GEC Goa
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight">
              {personalInfo.name}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-zinc-400 mb-6 font-medium tracking-tight">
              {personalInfo.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-lg text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.tagline}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              View My Work
            </button>

            <a
              href="/joseph_jonathan_fernandes_resume.pdf"
              download
              className="px-8 py-3.5 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span>Download Resume</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-6 mb-16"
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
                className="text-zinc-500 hover:text-white transition-colors duration-300"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center"
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
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
