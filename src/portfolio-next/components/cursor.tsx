'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springCfgFast = { stiffness: 800, damping: 40, mass: 0.3 };
  const springCfgSlow = { stiffness: 200, damping: 30, mass: 0.8 };

  const fastX = useSpring(mouseX, springCfgFast);
  const fastY = useSpring(mouseY, springCfgFast);
  const slowX = useSpring(mouseX, springCfgSlow);
  const slowY = useSpring(mouseY, springCfgSlow);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <div className="hidden lg:block">
      {/* Outer glow ring — slow follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9990] -translate-x-1/2 -translate-y-1/2"
        style={{ x: slowX, y: slowY }}
      >
        <div className="w-8 h-8 rounded-full border border-white/20 bg-indigo-400/5 backdrop-blur-none" />
      </motion.div>

      {/* Inner dot — fast */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9991] -translate-x-1/2 -translate-y-1/2"
        style={{ x: fastX, y: fastY }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
      </motion.div>
    </div>
  );
}
