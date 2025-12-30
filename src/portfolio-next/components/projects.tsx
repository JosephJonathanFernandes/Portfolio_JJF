'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { projects } from '@/data/portfolio';

export default function Projects() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai-ml':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'web':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'embedded':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'security':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'automation':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my most impactful projects spanning AI/ML, web development, and embedded systems
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.achievement && (
                        <Star className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(project.category)}`}>
                        {project.category.toUpperCase().replace('-', '/')}
                      </span>
                      {project.achievement && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          🏆 {project.achievement}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.longDescription}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
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
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Other Notable Projects
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(project.category)}`}>
                      {project.category.toUpperCase().replace('-', '/')}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Github className="w-4 h-4 inline mr-1" />
                      Code
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded hover:from-blue-700 hover:to-purple-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 inline mr-1" />
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
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-semibold mb-4">GitHub Activity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-400">400+</div>
                <div className="text-gray-300">Commits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">10+</div>
                <div className="text-gray-300">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">9.778</div>
                <div className="text-gray-300">CGPA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">3+</div>
                <div className="text-gray-300">Hackathons Won</div>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="https://github.com/JosephJonathanFernandes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
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
