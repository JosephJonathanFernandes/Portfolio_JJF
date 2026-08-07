'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { experience } from '@/data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">Where I've worked</p>
          <h2 className="section-heading text-4xl text-white mb-6">Experience</h2>
          <div className="w-12 h-px bg-white/20 mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent ml-6 hidden sm:block" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative sm:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-8 hidden sm:flex items-center justify-center w-12 h-12 rounded-full glass-panel-elevated border border-white/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                  <Briefcase className="w-5 h-5 text-zinc-300" />
                </div>

                <div className="glass-panel-elevated overflow-hidden hover:border-white/20 transition-all duration-300 group">
                  {/* Card top bar */}
                  <div className="px-8 py-6 border-b border-white/5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight mb-3">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span className="text-zinc-300 font-semibold">{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      {exp.note && (
                        <div className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 rounded-xl text-sm font-semibold text-emerald-400">
                          <Sparkles className="w-4 h-4" />
                          {exp.note}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-8 py-6">
                    <p className="text-zinc-400 mb-8 leading-relaxed">{exp.description}</p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Key Contributions</h4>
                        <ul className="space-y-3.5">
                          {exp.achievements.map((a, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -12 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.08 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-3 group/item"
                            >
                              <ArrowRight className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0 group-hover/item:text-white transition-colors" />
                              <span className="text-zinc-400 text-sm leading-relaxed">{a}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 glass-panel border-white/10 text-zinc-400 text-xs font-medium tracking-wide hover:text-white hover:border-white/20 transition-colors cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
