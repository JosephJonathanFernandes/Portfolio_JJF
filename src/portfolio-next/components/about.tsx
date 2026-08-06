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
            About
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
              From production ECU code to real-time sign language recognition.
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
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
                Three top finishes in 2025: 1st at HackAura (national), 1st at Infofest (Goa University),
                and top 7 at HackIndia Spark 3 (80+ teams).
              </p>
              <p>
                GATE qualified in both CSE and DA. 47 NPTEL courses completed at top recognition
                tiers: Domain Scholar, Star, Megastar, and Evangelist.
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
            {stats.map((stat) => (
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
            Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
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
            <p className="text-blue-100 mb-2">
              {personalInfo.education.institution}
            </p>
            <p className="text-blue-100">
              {personalInfo.education.status} · CGPA: {personalInfo.education.cgpa}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
