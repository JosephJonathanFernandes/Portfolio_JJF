'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Star, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/portfolio';

/* --- 3-D tilt wrapper for featured cards --- */
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const sY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });
  const rotateX = useTransform(sY, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(sX, [-0.5, 0.5], ['-5deg', '5deg']);
  const glowX  = useTransform(sX, [-0.5, 0.5], ['0%', '100%']);
  const glowY  = useTransform(sY, [-0.5, 0.5], ['0%', '100%']);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width  - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX, rotateY, perspective: 1200, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {/* moving spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 200px at ${glowX} ${glowY}, rgba(165,180,252,0.07), transparent)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.filter(p => p.featured);
  const others   = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-violet-500/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">What I've built</p>
          <h2 className="section-heading text-4xl text-white mb-6">Featured Projects</h2>
          <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
          <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed text-sm">
            Work spanning AI/ML, embedded systems, full-stack web, and systems programming.
          </p>
        </motion.div>

        {/* Featured grid with 3-D tilt */}
        <div className="grid lg:grid-cols-2 gap-6 mb-24">
          {featured.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}>

              <TiltCard className="relative glass-panel-elevated overflow-hidden flex flex-col group hover:border-white/22 transition-all duration-300 h-full"
                style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.03) 100%)' } as React.CSSProperties}>

                {/* Gradient top line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent group-hover:via-indigo-400/70 transition-all duration-500" />

                <div className="p-8 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-3">
                        <h3 className="text-xl font-bold text-white font-display tracking-tight">{project.title}</h3>
                        {project.achievement && <Star className="w-3.5 h-3.5 text-indigo-400/70" />}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold border border-white/10 bg-white/5 text-zinc-500 uppercase tracking-widest">
                          {project.category.replace('-', '/')}
                        </span>
                        {project.achievement && (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 uppercase tracking-widest">
                            {project.achievement}
                          </span>
                        )}
                      </div>
                      {(project.role || project.teamSize) && (
                        <p className="text-xs text-zinc-600 mt-2 font-medium">
                          {project.role}{project.teamSize ? ` · Team of ${project.teamSize}` : ''}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm mb-7 leading-relaxed flex-1">{project.longDescription}</p>

                  <div className="flex flex-wrap gap-2 mb-7">
                    {project.techStack.map(t => (
                      <span key={t} className="px-2.5 py-1 glass-panel text-zinc-400 text-xs font-medium tracking-wide hover:text-zinc-200 transition-colors cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 glass-panel text-white text-sm font-medium rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Other Notable Projects */}
        {others.length > 0 && (
          <>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-12">
              <h3 className="section-heading text-2xl text-white">Other Notable Projects</h3>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
              {others.map((project, i) => (
                <motion.div key={project.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="glass-panel p-6 flex flex-col group hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white font-display tracking-tight mb-2">{project.title}</h4>
                      <span className="px-2 py-1 rounded text-[10px] font-bold border border-white/8 bg-white/5 text-zinc-500 uppercase tracking-widest">
                        {project.category.replace('-', '/')}
                      </span>
                    </div>
                    {(project.githubUrl || project.demoUrl) && (
                      <a href={project.githubUrl || project.demoUrl} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg glass-panel text-zinc-600 hover:text-white hover:border-white/20 transition-all flex-shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-5 group-hover:text-zinc-400 transition-colors">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map(t => (
                      <span key={t} className="px-2 py-1 glass-panel text-zinc-500 text-xs font-medium">{t}</span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 text-zinc-600 text-xs font-medium">+{project.techStack.length - 3}</span>
                    )}
                  </div>
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600 hover:text-indigo-400 transition-colors font-medium">
                      <ExternalLink className="w-3 h-3" /> Live Demo
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* GitHub Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div className="glass-panel-elevated p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-indigo-400/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">On GitHub</p>
              <h3 className="section-heading text-3xl text-white mb-12">GitHub Activity</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {[['70+','Public Repos'],['4','Hackathon Projects'],['1','Hackathon Win'],['47','NPTEL Courses']].map(([v,l]) => (
                  <div key={l}>
                    <div className="text-4xl font-extrabold text-white mb-2 font-display tracking-tight">{v}</div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-zinc-600">{l}</div>
                  </div>
                ))}
              </div>
              <a href="https://github.com/JosephJonathanFernandes" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105">
                <Github className="w-5 h-5" /> View GitHub Profile
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
