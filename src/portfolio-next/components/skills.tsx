'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Wrench, Brain } from 'lucide-react';
import { skills } from '@/data/portfolio';

const LEVEL_CONFIG = {
  Expert:     { pct: 100, label: 'Expert',     gradient: 'from-white to-indigo-200' },
  Proficient: { pct: 70,  label: 'Proficient', gradient: 'from-zinc-300 to-indigo-300/60' },
  Familiar:   { pct: 40,  label: 'Familiar',   gradient: 'from-zinc-500 to-zinc-400/60' },
};

const skillCategories = [
  { id: 'languages',  title: 'Languages',              icon: Code2    },
  { id: 'frameworks', title: 'Frameworks & Libraries',  icon: Cpu      },
  { id: 'ml',         title: 'ML & AI Libraries',       icon: Brain    },
  { id: 'databases',  title: 'Databases',               icon: Database  },
  { id: 'tools',      title: 'Tools & Concepts',        icon: Wrench   },
];

function SkillBar({ pct, gradient, delay }: { pct: number; gradient: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: started ? `${pct}%` : 0 }}
        transition={{ duration: 0.9, delay, ease: [0.34, 1.56, 0.64, 1] }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">What I work with</p>
          <h2 className="section-heading text-4xl text-white mb-6">Skills</h2>
          <div className="w-12 h-px bg-white/20 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIdx) => {
            const catSkills = skills.filter(s => s.category === cat.id);
            if (!catSkills.length) return null;
            return (
              <motion.div key={cat.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }} viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-panel overflow-hidden group hover:border-white/20 transition-all duration-300">

                {/* Header */}
                <div className="border-b border-white/5 px-6 py-5 flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:bg-indigo-400/10 group-hover:border-indigo-400/20 transition-all">
                    <cat.icon className="w-4.5 h-4.5 text-zinc-400 group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight font-display flex-1">{cat.title}</h3>
                  <span className="text-xs text-zinc-700 font-semibold">{catSkills.length}</span>
                </div>

                {/* Skills */}
                <div className="px-6 py-5 space-y-4">
                  {catSkills.map((skill, si) => {
                    const cfg = LEVEL_CONFIG[skill.level];
                    return (
                      <div key={skill.name} className="group/skill">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-zinc-400 group-hover/skill:text-white transition-colors duration-200">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700">
                            {cfg.label}
                          </span>
                        </div>
                        <SkillBar pct={cfg.pct} gradient={cfg.gradient} delay={si * 0.05} />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
