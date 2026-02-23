import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useProjectsCRUD } from '../../hooks/useProjectsCRUD';
import { ExternalLink, FolderOpen, Folder, Trophy, Github, Star, Zap, Sparkles, Rocket, Code2, Layers } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjectsCRUD();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    tags: [],
    year: '',
    category: '',
    image: '',
    link: '',
    featured: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({
        ...formData,
        link: formData.link || null
      });
      setFormData({ title: '', type: '', description: '', tags: [], year: '', category: '', image: '', link: '', featured: false });
      setShowForm(false);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const handleTagInput = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData({ ...formData, tags });
  };

  // Separate featured and other projects
  const featuredProjects = projects?.filter((p) => p.featured) || projects.slice(0, 3) || [];
  const otherProjects = projects?.filter((p) => !p.featured) || projects.slice(3) || [];

  return (
    <section id="projects" className={`py-24 transition-colors duration-500 ${
      theme === 'light' ? 'bg-gradient-to-br from-white via-emerald-50 to-cyan-50' : 'bg-gradient-to-br from-gray-950 via-purple-950 to-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Enhanced */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-sm font-bold mb-2 ${
              theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
            }`}>
            ✨ Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-black mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
            🚀 Featured Projects
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto mt-4 shadow-lg"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-4 text-lg font-medium ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
            💡 Innovative solutions built with cutting-edge technology
          </motion.p>
        </motion.div>

        {isAdmin && error && (
          <div className={`mb-4 p-4 rounded-xl border-2 ${
            theme === 'light' ? 'bg-red-50 border-red-300 text-red-800' : 'bg-red-900/30 border-red-500 text-red-300'
          }`}>
            ⚠️ Error: {error}
          </div>
        )}

        {isAdmin && showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mb-8 p-8 rounded-2xl shadow-2xl border-2 ${
              theme === 'light' ? 'bg-white border-emerald-300' : 'bg-gray-800 border-emerald-500/30'
            }`}
          >
            <h3 className={`text-2xl font-black mb-6 flex items-center gap-3 ${
              theme === 'light' ? 'text-emerald-800' : 'text-emerald-300'
            }`}>
              <Sparkles className="w-6 h-6" />
              Add New Project
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block mb-2 font-bold ${
                    theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>📝 Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className={`w-full p-3 border-2 rounded-xl font-medium ${
                      theme === 'light' 
                        ? 'border-emerald-300 bg-white text-gray-900 focus:border-emerald-500' 
                        : 'border-gray-600 bg-gray-700 text-white focus:border-emerald-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block mb-2 font-bold ${
                    theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>🏷️ Type</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className={`w-full p-3 border-2 rounded-xl font-medium ${
                      theme === 'light' 
                        ? 'border-emerald-300 bg-white text-gray-900 focus:border-emerald-500' 
                        : 'border-gray-600 bg-gray-700 text-white focus:border-emerald-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block mb-2 font-bold ${
                    theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>📅 Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className={`w-full p-3 border-2 rounded-xl font-medium ${
                      theme === 'light' 
                        ? 'border-emerald-300 bg-white text-gray-900 focus:border-emerald-500' 
                        : 'border-gray-600 bg-gray-700 text-white focus:border-emerald-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block mb-2 font-bold ${
                    theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>📁 Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className={`w-full p-3 border-2 rounded-xl font-medium ${
                      theme === 'light' 
                        ? 'border-emerald-300 bg-white text-gray-900 focus:border-emerald-500' 
                        : 'border-gray-600 bg-gray-700 text-white focus:border-emerald-400'
                    }`}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className={`block mb-2 font-bold ${
                  theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                }`}>📄 Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full p-3 border-2 rounded-xl font-medium ${
                    theme === 'light' 
                      ? 'border-emerald-300 bg-white text-gray-900 focus:border-emerald-500' 
                      : 'border-gray-600 bg-gray-700 text-white focus:border-emerald-400'
                  }`}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className={`block mb-2 font-bold ${
                  theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                }`}>🏷️ Tags (comma separated)</label>
                <input
                  type="text"
                  onChange={handleTagInput}
                  className={`w-full p-3 border-2 rounded-xl font-medium ${
                    theme === 'light' 
                      ? 'border-emerald-300 bg-white text-gray-900 focus:border-emerald-500' 
                      : 'border-gray-600 bg-gray-700 text-white focus:border-emerald-400'
                  }`}
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block mb-2 font-bold ${
                    theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>🖼️ Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className={`w-full p-3 border-2 rounded-xl font-medium ${
                      theme === 'light' 
                        ? 'border-emerald-300 bg-white text-gray-900 focus:border-emerald-500' 
                        : 'border-gray-600 bg-gray-700 text-white focus:border-emerald-400'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className={`block mb-2 font-bold ${
                    theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>🔗 Project Link</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className={`w-full p-3 border-2 rounded-xl font-medium ${
                      theme === 'light' 
                        ? 'border-emerald-300 bg-white text-gray-900 focus:border-emerald-500' 
                        : 'border-gray-600 bg-gray-700 text-white focus:border-emerald-400'
                    }`}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-dashed hover:border-emerald-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className={`font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    ⭐ Mark as Featured Project
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
              >
                🚀 Add Project
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent shadow-lg"></div>
            <p className={`mt-4 text-lg font-bold ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'}`}>
              ⏳ Loading projects...
            </p>
          </div>
        ) : (
          <>
            {/* Featured Projects Grid - Enhanced */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className={`card overflow-hidden group rounded-2xl shadow-2xl transition-all duration-300 border-2 ${
                    theme === 'light' 
                      ? 'bg-white border-emerald-200 hover:border-emerald-400 shadow-emerald-500/10' 
                      : 'bg-gray-800 border-emerald-500/30 hover:border-emerald-400 shadow-emerald-500/20'
                  }`}
                >
                  {/* Project Image - Enhanced */}
                  <div className="relative h-56 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FolderOpen className="w-20 h-20 text-white/60" />
                      </div>
                    )}
                    
                    {/* Hover emoji overlay - Guy with laptop and google eyes */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-8 pointer-events-none">
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1.3, rotate: 10 }}
                        className="text-6xl"
                      >
                        👨‍💻
                      </motion.span>
                      <motion.span
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.5 }}
                        className="text-5xl"
                      >
                        👀
                      </motion.span>
                      <motion.span
                        initial={{ scale: 0, rotate: 180 }}
                        whileHover={{ scale: 1.3, rotate: -10 }}
                        className="text-6xl"
                      >
                        👨‍💻
                      </motion.span>
                    </div>
                    
                    {/* Hover overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-emerald-500/50 transition-all inline-flex items-center gap-3 hover:scale-105"
                        >
                          <Github className="w-5 h-5" />
                          View Code
                        </motion.a>
                      )}
                    </div>
                    {/* Featured badge */}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full text-sm shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4 fill-white" />
                      Featured
                    </div>
                  </div>

                  {/* Project Info - Enhanced */}
                  <div className="p-6">
                    <h3 className={`text-xl font-black mb-3 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      💻 {project.title}
                    </h3>
                    <p className={`text-sm mb-5 line-clamp-3 font-medium ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 text-xs font-bold rounded-full border-2 ${
                            theme === 'light'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                              : 'bg-emerald-900/30 border-emerald-500/50 text-emerald-300'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* More Projects - Enhanced */}
            {otherProjects.length > 0 && (
              <>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`text-3xl font-black mb-8 flex items-center gap-3 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  <Folder className="w-8 h-8 text-emerald-500" />
                  More Projects
                </motion.h3>
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                  {otherProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 8, scale: 1.01 }}
                      className={`card p-6 flex flex-col sm:flex-row gap-6 rounded-2xl border-2 shadow-xl transition-all duration-300 group ${
                        theme === 'light' 
                          ? 'bg-white border-gray-200 hover:border-emerald-300 shadow-gray-500/10' 
                          : 'bg-gray-800 border-gray-700 hover:border-emerald-500/50 shadow-gray-900/50'
                      }`}
                    >
                      <div className="relative w-full sm:w-32 h-32 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                        <Folder className="w-12 h-12 text-white/80" />
                        {/* Hover emoji overlay for More Projects */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 pointer-events-none">
                          <motion.span
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.3 }}
                            className="text-3xl"
                          >
                            👨‍💻
                          </motion.span>
                          <motion.span
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.5 }}
                            className="text-2xl"
                          >
                            👀
                          </motion.span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-black mb-2 ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          📁 {project.title}
                        </h3>
                        <p className={`text-sm mb-4 font-medium ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags?.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                                theme === 'light'
                                  ? 'bg-gray-100 text-gray-700'
                                  : 'bg-gray-700 text-gray-300'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-500 font-bold text-sm inline-flex items-center gap-2 transition-colors group"
                          >
                            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            View on GitHub
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
