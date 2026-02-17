// hooks/useProjectsCRUD.js
import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { PROJECTS_DATA } from '../data/projects';

export const useProjectsCRUD = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Try to fetch from API, fallback to static data
      let data;
      try {
        data = await apiService.getAll('projects');
      } catch (apiError) {
        console.log('API unavailable, using static data');
        data = PROJECTS_DATA;
      }
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      // Fallback to static data
      setProjects(PROJECTS_DATA);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  // Create a new project
  const createProject = async (projectData) => {
    try {
      const newProject = await apiService.create('projects', {
        ...projectData,
        id: Date.now()
      });
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      console.error('Error creating project:', err);
      alert('Note: Project creation requires JSON Server to be running. In production, changes are local only.');
      // Add locally only
      const newProject = { ...projectData, id: Date.now() };
      setProjects(prev => [...prev, newProject]);
      return newProject;
    }
  };

  // Update a project
  const updateProject = async (id, projectData) => {
    try {
      const updatedProject = await apiService.update('projects', id, projectData);
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      console.error('Error updating project:', err);
      alert('Note: Project updates require JSON Server. In production, changes are local only.');
      // Update locally only
      const updatedProject = { ...projectData, id };
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
      return updatedProject;
    }
  };

  // Delete a project
  const deleteProject = async (id) => {
    try {
      await apiService.delete('projects', id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Note: Project deletion requires JSON Server. In production, changes are local only.');
      // Delete locally only
      setProjects(prev => prev.filter(p => p.id !== id));
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