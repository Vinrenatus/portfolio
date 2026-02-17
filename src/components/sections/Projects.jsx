import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../../context/AuthContext';
import ProjectCard from '../common/ProjectCard';
import { useProjectsCRUD } from '../../hooks/useProjectsCRUD';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { isAdmin } = useAuth();
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjectsCRUD();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    tags: [],
    year: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      setFormData({ title: '', type: '', description: '', tags: [], year: '', category: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const handleTagInput = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData({ ...formData, tags });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/30 to-teal-50/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-4xl font-bold text-emerald-800"
          >
            Featured Projects
          </motion.h2>
          
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {showForm ? 'Cancel' : 'Add Project'}
            </button>
          )}
        </div>

        {isAdmin && error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        {isAdmin && showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-4">Add New Project</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Type</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  onChange={handleTagInput}
                  className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Add Project
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
            <p className="mt-2 text-emerald-700 dark:text-emerald-300">Loading projects...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                type={project.type}
                description={project.description}
                tags={project.tags}
                onDelete={isAdmin ? () => deleteProject(project.id) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;