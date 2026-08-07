'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#experience', label: 'Experience', id: 'experience' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 origin-left z-[9999]"
        style={{ scaleX }}
      />

      <header className="fixed top-4 inset-x-0 w-full flex justify-center z-50 px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? 'glass-panel-elevated shadow-2xl shadow-black/50'
              : 'bg-black/20 backdrop-blur-sm border border-white/5'
          }`}
        >
          <Link href="#home" className="text-lg font-bold text-white mr-8 tracking-tight font-display">
            JJF.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-white bg-white/15'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex ml-8">
            <Link
              href="#contact"
              className="px-5 py-2 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-gray-300 hover:text-white bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              className="absolute top-20 inset-x-4 glass-panel-elevated md:hidden p-4 flex flex-col space-y-2 origin-top"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-white bg-white/15'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="text-black bg-white px-4 py-3 rounded-xl text-base font-semibold transition-colors text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Let's Talk
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
