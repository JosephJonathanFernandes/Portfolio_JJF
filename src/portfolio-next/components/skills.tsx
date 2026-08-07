'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Wrench, Brain } from 'lucide-react';
import { skills } from '@/data/portfolio';

const LEVEL_CONFIG = {
  Expert:     { pct: 100, label: 'Expert',     color: 'bg-white' },
  Proficient: { pct: 70,  label: 'Proficient', color: 'bg-zinc-400' },
  Familiar:   { pct: 40,  label: 'Familiar',   color: 'bg-zinc-600' },
};

const skillCategories = [
  { id: 'languages',  title: 'Languages',             icon: Code2   },
  { id: 'frameworks', title: 'Frameworks & Libraries', icon: Cpu     },
  { id: 'ml',         title: 'ML & AI Libraries',      icon: Brain   },
  { id: 'databases',  title: 'Databases',              icon: Database },
  { id: 'tools',      title: 'Tools & Concepts',       icon: Wrench  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">What I work with</p>
          <h2 className="section-heading text-4xl text-white mb-6">Skills</h2>
          <div className="w-12 h-px bg-white/20 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => {
            const categorySkills = skills.filter(s => s.category === category.id);
            if (!categorySkills.length) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-panel overflow-hidden group hover:border-white/20 transition-all duration-300"
              >
                {/* Card header */}
                <div className="border-b border-white/5 px-6 py-5 flex items-center gap-4">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <category.icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight font-display">{category.title}</h3>
                  <span className="ml-auto text-xs text-zinc-600 font-medium">{categorySkills.length}</span>
                </div>

                {/* Skills list */}
                <div className="px-6 py-5 space-y-4">
                  {categorySkills.map((skill, skillIdx) => {
                    const cfg = LEVEL_CONFIG[skill.level];
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: skillIdx * 0.04 }}
                        viewport={{ once: true }}
                        className="group/skill"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-zinc-300 group-hover/skill:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                            {cfg.label}
                          </span>
                        </div>
                        <div className="h-px bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${cfg.pct}%` }}
                            transition={{ duration: 0.8, delay: skillIdx * 0.05, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className={`h-full rounded-full ${cfg.color} opacity-40 group-hover/skill:opacity-70 transition-opacity`}
                          />
                        </div>
                      </motion.div>
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
