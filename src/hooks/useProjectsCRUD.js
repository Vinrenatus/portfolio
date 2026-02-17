// hooks/useProjectsCRUD.js
import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

export const useProjectsCRUD = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAll('projects');
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new project
  const createProject = async (projectData) => {
    try {
      const newProject = await apiService.create('projects', {
        ...projectData,
        id: Date.now() // Simple ID generation
      });
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update a project
  const updateProject = async (id, projectData) => {
    try {
      const updatedProject = await apiService.update('projects', id, projectData);
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete a project
  const deleteProject = async (id) => {
    try {
      await apiService.delete('projects', id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
};