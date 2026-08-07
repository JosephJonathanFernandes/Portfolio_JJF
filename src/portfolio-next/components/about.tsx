'use client';

import { motion } from 'framer-motion';
import { Code, Award, BookOpen, GraduationCap, ExternalLink } from 'lucide-react';
import { personalInfo, achievements } from '@/data/portfolio';

export default function About() {
  const stats = [
    { icon: Code,         label: 'Public GitHub Repos', value: '70+' },
    { icon: Award,        label: 'GATE Qualified',       value: 'CSE + DA' },
    { icon: BookOpen,     label: 'NPTEL Courses',        value: '47' },
    { icon: GraduationCap,label: 'CGPA',                 value: personalInfo.education.cgpa },
  ];

  return (
    <section id="about" className="py-28 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">Who I am</p>
          <h2 className="section-heading text-4xl text-white mb-6">About</h2>
          <div className="w-12 h-px bg-white/20 mx-auto" />
        </motion.div>

        {/* Bio + Stats */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 font-display tracking-tight leading-snug">
              From production ECU code to real-time sign language recognition.
            </h3>
            <div className="space-y-5 text-zinc-400 leading-relaxed">
              <p>
                Final-year Computer Engineering student at GEC Goa with an AI/ML Honors specialization.
                Completed an embedded systems internship at Visteon Technical & Services Centre in 2025,
                working on production ECU modules with a 7-person team. A Pre-Placement Offer has been accepted.
              </p>
              <p>
                Projects span embedded C through applied AI. The ISL recognition system (final year
                project) achieves 98.33% accuracy across 300 sign classes at 60+ FPS CPU inference.
                CmdBridge maps natural-language intent to native OS APIs in C with 94% test coverage.
              </p>
              <p>
                GATE qualified in both CSE and DA (2025 and 2026). 47 NPTEL courses completed at top recognition
                tiers: Domain Scholar, Superstar, Megastar, Evangelist, Discipline and many more.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-panel-elevated p-7 flex flex-col items-center justify-center text-center group cursor-default"
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-5 group-hover:border-indigo-400/20 group-hover:bg-indigo-400/5 transition-all">
                  <stat.icon className="w-6 h-6 text-zinc-400 group-hover:text-indigo-300 transition-colors" />
                </div>
                <div className="text-3xl font-extrabold text-white mb-2 font-display tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-3">Recognition</p>
            <h3 className="section-heading text-2xl text-white">Achievements</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                className="glass-panel px-6 py-5 flex items-start gap-4 group hover:border-white/20 transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 mt-2 shrink-0 group-hover:bg-indigo-400 transition-colors" />
                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-3">Background</p>
            <h3 className="section-heading text-2xl text-white">Education</h3>
          </div>

          <div className="glass-panel-elevated p-10 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/[0.03] rounded-full blur-3xl pointer-events-none -mt-10 -mr-10" />
            <div className="relative z-10">
              <div className="w-12 h-12 flex items-center justify-center rounded-full glass-panel border-white/20 mx-auto mb-6">
                <GraduationCap className="w-6 h-6 text-zinc-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 font-display tracking-tight">
                {personalInfo.education.degree}
              </h4>
              <p className="text-zinc-400 mb-2">{personalInfo.education.institution}</p>
              <div className="flex items-center justify-center gap-3 text-zinc-500 text-sm font-medium mt-4">
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
