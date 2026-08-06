'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Wrench, Brain } from 'lucide-react';
import { skills } from '@/data/portfolio';

export default function Skills() {
  const skillCategories = [
    {
      id: 'languages',
      title: 'Languages',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Libraries',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ml',
      title: 'ML & AI Libraries',
      icon: Brain,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: Database,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'tools',
      title: 'Tools & Concepts',
      icon: Wrench,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const getSkillsByCategory = (categoryId: string) => {
    return skills.filter(skill => skill.category === categoryId);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Proficient':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Familiar':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
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
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center space-x-3">
                    <category.icon className="w-8 h-8" />
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-900 dark:text-white font-medium">
                          {skill.name}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(skill.level)}`}>
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
