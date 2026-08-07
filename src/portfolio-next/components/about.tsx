'use client';

import { motion } from 'framer-motion';
import { Code, Award, BookOpen, GraduationCap } from 'lucide-react';
import { personalInfo, achievements } from '@/data/portfolio';

export default function About() {
  const stats = [
    { icon: Code, label: 'Public GitHub Repos', value: '70+' },
    { icon: Award, label: 'GATE Qualified', value: 'CSE + DA' },
    { icon: BookOpen, label: 'NPTEL Courses', value: '47' },
    { icon: GraduationCap, label: 'CGPA', value: personalInfo.education.cgpa }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            About
          </h2>
          <div className="w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 tracking-tight leading-tight">
              From production ECU code to real-time sign language recognition.
            </h3>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                Final-year Computer Engineering student at GEC Goa with an AI/ML Honors specialization.
                Completed an embedded systems internship at Visteon Technical & Services Centre in 2025,
                working on production ECU modules with a 7-person team.
                A Pre-Placement Offer has been accepted.
              </p>
              <p>
                Projects span embedded C through applied AI. The ISL recognition system (final year
                project) achieves 98.33% accuracy across 300 sign classes at 60+ FPS CPU inference.
                CmdBridge maps natural-language intent to native OS APIs in C with 94% test coverage.
                Three top finishes in 2025: 1st at HackAura (national), 1st at Infofest competitive programming (Goa University),
                and top 7 at HackIndia Spark 3 (80+ teams).
              </p>
              <p>
                GATE qualified in both CSE and DA (2025 and 2026). 47 NPTEL courses completed at top recognition
                tiers: Domain Scholar (Programming & Data Science), Superstar, Megastar, Evangelist, Discipline and many more.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 text-center flex flex-col items-center justify-center min-h-[200px]"
              >
                <div className="p-4 bg-white/5 rounded-full mb-6 border border-white/10">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-white mb-10 text-center tracking-tight">
            Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10 shrink-0 mt-0.5">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {achievement}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-10 tracking-tight">
            Education
          </h3>
          <div className="glass-panel p-10 max-w-2xl mx-auto border-t-2 border-t-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
              {personalInfo.education.degree}
            </h4>
            <p className="text-zinc-400 text-lg mb-3">
              {personalInfo.education.institution}
            </p>
            <div className="flex items-center justify-center space-x-3 text-zinc-500 font-medium">
              <span>{personalInfo.education.status}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>CGPA: {personalInfo.education.cgpa}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
