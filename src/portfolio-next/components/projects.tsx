'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { projects } from '@/data/portfolio';

export default function Projects() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-white/20 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            A showcase of my most impactful projects spanning AI/ML, web development, and embedded systems.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-panel overflow-hidden group flex flex-col"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      {project.achievement && (
                        <Star className="w-5 h-5 text-zinc-300" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 tracking-wide">
                        {project.category.toUpperCase().replace('-', '/')}
                      </span>
                      {project.achievement && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 tracking-wide">
                          {project.achievement}
                        </span>
                      )}
                    </div>
                    {(project.role || project.teamSize) && (
                      <p className="text-sm text-zinc-500 mb-3">
                        {project.role}{project.teamSize ? ` · Team of ${project.teamSize}` : ''}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-zinc-400 mb-8 leading-relaxed whitespace-pre-wrap flex-1">
                  {project.longDescription}
                </p>

                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 border border-white/5 text-zinc-300 rounded-md text-xs font-medium tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 mt-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-5 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-5 py-2.5 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-white tracking-tight">
                Other Notable Projects
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="glass-panel p-6 flex flex-col group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                      {project.title}
                    </h4>
                  </div>
                  
                  <div className="mb-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold border border-white/10 bg-white/5 text-zinc-400 uppercase tracking-widest">
                      {project.category.replace('-', '/')}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/5 border border-white/5 text-zinc-400 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 border border-white/5 text-zinc-500 rounded text-xs font-medium">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-auto">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 bg-white text-black font-semibold text-sm rounded-md hover:bg-zinc-200 transition-colors"
                      >
                        <Github className="w-4 h-4 inline mr-2" />
                        Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 bg-white/5 border border-white/10 text-white font-medium text-sm rounded-md hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 inline mr-2" />
                        Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-panel p-10 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-3xl font-bold mb-10 tracking-tight">GitHub Activity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-extrabold text-white mb-2">70+</div>
                <div className="text-zinc-400 font-medium tracking-wide text-sm uppercase">Public Repos</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-white mb-2">4</div>
                <div className="text-zinc-400 font-medium tracking-wide text-sm uppercase">Hackathon Projects</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-white mb-2">3</div>
                <div className="text-zinc-400 font-medium tracking-wide text-sm uppercase">2025 Top Finishes</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-white mb-2">47</div>
                <div className="text-zinc-400 font-medium tracking-wide text-sm uppercase">NPTEL Courses</div>
              </div>
            </div>
            <div className="mt-12 relative z-10">
              <a
                href="https://github.com/JosephJonathanFernandes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 transform duration-300"
              >
                <Github className="w-5 h-5" />
                <span>View GitHub Profile</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
