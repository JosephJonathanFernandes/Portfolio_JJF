'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Wrench, Brain } from 'lucide-react';
import { skills } from '@/data/portfolio';

export default function Skills() {
  const skillCategories = [
    {
      id: 'languages',
      title: 'Languages',
      icon: Code2
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Libraries',
      icon: Cpu
    },
    {
      id: 'ml',
      title: 'ML & AI Libraries',
      icon: Brain
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: Database
    },
    {
      id: 'tools',
      title: 'Tools & Concepts',
      icon: Wrench
    }
  ];

  const getSkillsByCategory = (categoryId: string) => {
    return skills.filter(skill => skill.category === categoryId);
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Skills
          </h2>
          <div className="w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category.id);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="glass-panel overflow-hidden group"
              >
                <div className="border-b border-white/5 p-6 bg-white/[0.02] flex items-center space-x-4">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{category.title}</h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between group/skill"
                      >
                        <span className="text-zinc-300 font-medium group-hover/skill:text-white transition-colors">
                          {skill.name}
                        </span>
                        <span className="px-3 py-1 rounded-md text-[11px] font-semibold tracking-widest uppercase border border-white/10 bg-white/5 text-zinc-400">
                          {skill.level}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
