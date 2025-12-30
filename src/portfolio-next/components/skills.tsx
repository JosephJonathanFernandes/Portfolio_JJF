'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Cloud, Wrench } from 'lucide-react';
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
      id: 'databases',
      title: 'Databases',
      icon: Database,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'tools',
      title: 'Tools & Technologies',
      icon: Wrench,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'from-indigo-500 to-purple-500'
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
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Continuous Learning</h3>
            <p className="text-blue-100 mb-6">
              I'm constantly expanding my skill set and staying updated with the latest technologies.
              Currently focusing on advanced AI/ML techniques, cloud architecture, and emerging web technologies.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Currently Learning</h4>
                <ul className="text-left space-y-1">
                  <li>• Java </li>
                  <li>• Systems Design </li>
                  <li>• Machine Learning and Deep Learning</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Areas of Interest</h4>
                <ul className="text-left space-y-1">
                  <li>• IOT </li>
                  <li>• Image Processing and Computer Vision</li>
                  <li>• AI/ML and Deep Learning </li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Certifications</h4>
                <ul className="text-left space-y-1">
                  <li>• MISRA-C Certified</li>
                  <li>• AUTOSAR Trained</li>
                  <li>• NPTEL Courses</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
