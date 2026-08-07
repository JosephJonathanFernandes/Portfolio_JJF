'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
  ];

  return (
    <header className="fixed top-6 inset-x-0 w-full flex justify-center z-50 px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${scrolled ? 'glass-panel shadow-2xl shadow-black/50' : 'bg-transparent'}`}
      >
        <Link href="#home" className="text-lg font-bold text-white mr-8 tracking-tight">
          JJF.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-full border border-white/10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-400 hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex ml-8">
           <Link href="#contact" className="px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-colors">
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 inset-x-4 glass-panel md:hidden p-4 flex flex-col space-y-2 origin-top"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="text-black bg-white px-4 py-3 rounded-xl text-base font-medium transition-colors text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Let's Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
