'use client';

import { motion } from 'framer-motion';
import { Code, Cpu, Award, BookOpen } from 'lucide-react';
import { personalInfo, additionalAchievements } from '@/data/portfolio';

export default function About() {
  const stats = [
    { icon: Code, label: 'Years Coding', value: '4+' },
    { icon: Cpu, label: 'Projects Built', value: '10+' },
    { icon: Award, label: 'Hackathons Won', value: '1' },
    { icon: BookOpen, label: 'CGPA', value: personalInfo.education.cgpa }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Passionate Software Engineer
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                I am a final-year Computer Engineering student specializing in AI/ML with a strong foundation
                in embedded systems and full-stack development. My journey spans from low-level C/C++ programming
                for automotive systems to modern web applications and machine learning solutions.
              </p>
              <p>
                During my internship at Visteon Corporation, I contributed to production automotive embedded systems,
                achieving 100% test coverage for AUTOSAR modules and implementing MISRA-C compliance standards.
                This experience solidified my understanding of quality assurance and embedded systems development.
              </p>
              <p>
                Beyond traditional software engineering, I have won one hackathon and multiple competitive coding competitions. My work
                combines technical expertise with creative problem-solving across domains like space exploration,
                environmental sustainability, and network security.
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
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
              >
                <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalAchievements.map((achievement) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
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
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Education
          </h3>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white max-w-2xl mx-auto">
            <h4 className="text-xl font-semibold mb-2">
              {personalInfo.education.degree}
            </h4>
            <p className="text-blue-100 mb-4">
              {personalInfo.education.status} • CGPA: {personalInfo.education.cgpa}
            </p>
            <p className="text-sm text-blue-100">
              Specializing in Artificial Intelligence and Machine Learning
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
