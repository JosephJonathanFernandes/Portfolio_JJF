'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { experience } from '@/data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Experience
          </h2>
          <div className="w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel overflow-hidden relative group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-white/20 group-hover:bg-white/40 transition-colors" />
              
              <div className="border-b border-white/5 p-8 bg-white/[0.02]">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-zinc-400 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-zinc-500" />
                        <span className="font-semibold text-zinc-300">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-zinc-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  {exp.note && (
                    <div className="flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300">
                      <Sparkles className="w-4 h-4 text-zinc-400" />
                      <span>{exp.note}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8">
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  {exp.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-5 tracking-tight">
                      Key Contributions
                    </h4>
                    <ul className="space-y-4">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-400 text-sm leading-relaxed">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-5 tracking-tight">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 text-zinc-300 rounded-lg text-xs font-medium tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
