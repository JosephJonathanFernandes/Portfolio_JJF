'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Award, BookOpen, GraduationCap } from 'lucide-react';
import { personalInfo, achievements } from '@/data/portfolio';

/* --- Animated count-up hook --- */
function useCountUp(target: number, decimals = 0) {
  const [value, setValue] = useState(target); // SSR: renders real value, not 0
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      setValue(0); // reset to 0 before animating (SSR already showed real value)
      const duration = 1400;
      const start = performance.now();
      const animate = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(parseFloat((target * eased).toFixed(decimals)));
        if (t < 1) requestAnimationFrame(animate);
        else setValue(target);
      };
      setTimeout(() => requestAnimationFrame(animate), 50);
      obs.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, decimals]);

  return { value, ref };
}

function StatCard({ icon: Icon, label, numericValue, displaySuffix, decimals = 0 }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  numericValue: number;
  displaySuffix?: string;
  decimals?: number;
}) {
  const { value, ref } = useCountUp(numericValue, decimals);
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass-panel-elevated p-7 flex flex-col items-center justify-center text-center group cursor-default"
    >
      <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-5 group-hover:border-indigo-400/25 group-hover:bg-indigo-400/5 transition-all duration-300">
        <Icon className="w-6 h-6 text-zinc-400 group-hover:text-indigo-300 transition-colors duration-300" />
      </div>
      <span ref={ref} className="text-3xl font-extrabold text-white font-display tracking-tight">
        {display}{displaySuffix}
      </span>
      <div className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mt-2 leading-snug">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const stats = [
    { icon: Code,          label: 'Public GitHub Repos', numericValue: 70, displaySuffix: '+' },
    { icon: Award,         label: 'GATE Qualified',       numericValue: 2,  displaySuffix: ' Tracks' },
    { icon: BookOpen,      label: 'NPTEL Courses',        numericValue: 47  },
    { icon: GraduationCap, label: 'CGPA',                 numericValue: 9.78, decimals: 2 },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/[0.025] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="section-heading text-4xl text-white mb-6">About</h2>
          <div className="w-12 h-px bg-white/20 mx-auto" />
        </motion.div>

        {/* Bio + Stats */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-display tracking-tight leading-snug">
              Computer Engineering, GEC Goa<br />CGPA 9.78 · AI/ML Honors
            </h3>
            <div className="space-y-5 text-zinc-400 leading-relaxed text-[15px]">
              <p>Software Engineer at <strong className="text-white">Visteon Corporation</strong>, working on automotive software. During my internship there, I achieved 100% branch and statement coverage across 14 AUTOSAR production ECU modules using VectorCAST, and analyzed 100K+ MISRA-C/CERT-C static warnings.</p>
              <p>My final-year project, Vāksetu, is a real-time Indian Sign Language recognition system that runs at
                <strong className="text-white"> 98.33% accuracy</strong> across 300 sign classes at <strong className="text-white">60+ FPS</strong> on CPU — no GPU required. I also built CmdBridge, a cross-platform terminal assistant in C with <strong className="text-white">94% test coverage</strong> across 211 tests.</p>
              <p>GATE qualified in CSE and DA. 47 NPTEL certifications across programming and data science tracks.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
            className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}>
                <StatCard {...s} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-3">Recognition</p>
            <h3 className="section-heading text-2xl text-white">Achievements</h3>
          </div>
          <div className="space-y-10">
            {[
              { title: 'Hackathons & Competitions', items: achievements.hackathons },
              { title: 'Academic', items: achievements.academic },
              { title: 'Quizzing, Debating & Open Source', items: achievements.other }
            ].map((section, idx) => (
              <div key={section.title}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5 pl-2">{section.title}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.items.map((a, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 + idx * 0.1 }} viewport={{ once: true }}
                      whileHover={{ x: 5, transition: { duration: 0.15 } }}
                      className="glass-panel px-6 py-5 flex items-start gap-4 group hover:border-white/20 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 mt-2 shrink-0 group-hover:bg-indigo-400 group-hover:shadow-[0_0_8px_rgba(129,140,248,0.6)] transition-all" />
                      <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-3">Background</p>
            <h3 className="section-heading text-2xl text-white">Education</h3>
          </div>
          <div className="glass-panel-elevated p-10 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 flex items-center justify-center rounded-full glass-panel border-white/20 mx-auto mb-6">
                <GraduationCap className="w-6 h-6 text-zinc-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 font-display tracking-tight">
                {personalInfo.education.degree}
              </h4>
              <p className="text-zinc-400 mb-4">{personalInfo.education.institution}</p>
              <div className="flex items-center justify-center gap-3 text-zinc-500 text-sm font-medium">
                <span>{personalInfo.education.status}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>CGPA: <strong className="text-white">{personalInfo.education.cgpa}</strong></span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
