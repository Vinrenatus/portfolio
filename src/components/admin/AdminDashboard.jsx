import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Users, 
  Briefcase, 
  Award, 
  FileText, 
  Edit2, 
  Trash2, 
  Plus, 
  X, 
  Save,
  Eye,
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  GraduationCap,
  User,
  Heart,
  MessageCircle
} from 'lucide-react';
import apiService from '../../services/apiService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [comments, setComments] = useState([]);
  const [about, setAbout] = useState({ id: 1, summary: "", competencies: [] });
  const [skills, setSkills] = useState([]);
  const [workHistory, setWorkHistory] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentModel, setCurrentModel] = useState('');

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [messagesData, projectsData, testimonialsData, commentsData, skillsData, workHistoryData, educationData] = await Promise.all([
        apiService.getAll('messages'),
        apiService.getAll('projects'),
        apiService.getAll('testimonials'),
        apiService.getAll('comments'),
        apiService.getAll('skills'),
        apiService.getAll('work_history'),  // Fixed: use snake_case
        apiService.getAll('education')
      ]);
      setMessages(messagesData || []);
      setProjects(projectsData || []);
      setTestimonials(testimonialsData || []);
      setComments(commentsData || []);
      setSkills(skillsData || []);
      setWorkHistory(workHistoryData || []);
      setEducation(educationData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle delete
  const handleDelete = async (model, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await apiService.delete(model, id);
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item');
    }
  };

  // Handle edit
  const handleEdit = (model, item) => {
    setCurrentModel(model);
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  // Handle create
  const handleCreate = (model) => {
    setCurrentModel(model);
    setEditingItem(null);
    setFormData({});
    setShowForm(true);
  };

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentModel === 'about') {
        // About is a single item, not a collection
        if (editingItem) {
          await apiService.update('about', editingItem.id, formData);
        } else {
          await apiService.create('about', { id: 1, ...formData });
        }
        setAbout({ id: 1, ...formData });
      } else {
        if (editingItem) {
          await apiService.update(currentModel, editingItem.id, formData);
        } else {
          await apiService.create(currentModel, formData);
        }
      }
      setShowForm(false);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving item');
    }
  };

  // Stats
  const stats = [
    { label: 'Total Projects', value: projects.length, icon: Briefcase, color: 'emerald' },
    { label: 'Testimonials', value: testimonials.length, icon: Users, color: 'cyan' },
    { label: 'Messages', value: messages.length, icon: MessageSquare, color: 'purple' },
    { label: 'Avg Project Value', value: '$5,000', icon: DollarSign, color: 'amber' }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage all content and view messages</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-emerald-400">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'messages', label: 'Messages', icon: Mail },
            { id: 'comments', label: 'Comments', icon: MessageCircle },
            { id: 'about', label: 'About', icon: User },
            { id: 'skills', label: 'Skills', icon: Award },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'workHistory', label: 'Work History', icon: FileText },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'testimonials', label: 'Testimonials', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'glass-dark text-gray-400 hover:text-emerald-400 border border-emerald-500/20'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading...</p>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                >
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">Recent Messages</h3>
                  <div className="space-y-4">
                    {messages.slice(0, 3).map((msg, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-lg">
                        <p className="text-gray-200 font-medium">{msg.name}</p>
                        <p className="text-gray-400 text-sm">{msg.email}</p>
                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{msg.message}</p>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <p className="text-gray-500">No messages yet</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                >
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">Recent Projects</h3>
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-lg">
                        <p className="text-gray-200 font-medium">{project.title}</p>
                        <p className="text-gray-400 text-sm">{project.type}</p>
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <p className="text-gray-500">No projects yet</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                >
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">Recent Testimonials</h3>
                  <div className="space-y-4">
                    {testimonials.slice(0, 3).map((test, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-lg">
                        <p className="text-gray-200 font-medium">{test.name}</p>
                        <p className="text-gray-400 text-sm">{test.role}</p>
                      </div>
                    ))}
                    {testimonials.length === 0 && (
                      <p className="text-gray-500">No testimonials yet</p>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-400">All Messages</h2>
                </div>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {msg.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-200">{msg.name}</h3>
                            <p className="text-gray-400 text-sm">{msg.email}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {msg.service && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <Briefcase className="w-4 h-4" />
                              <span>{msg.service}</span>
                            </div>
                          )}
                          {msg.priceRange && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <DollarSign className="w-4 h-4" />
                              <span>{msg.priceRange}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-300">{msg.message}</p>
                      </div>
                      <button
                        onClick={() => handleDelete('messages', msg.id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-20 glass-dark rounded-2xl">
                    <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No messages yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === 'comments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-400">Manage Comments</h2>
                  <div className="text-gray-400">
                    {comments.length} Total Comments
                  </div>
                </div>
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                              {comment.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-200">{comment.name}</h3>
                              <p className="text-gray-500 text-sm">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{comment.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{comment.reactions?.likes || 0} Likes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{comment.replies?.length || 0} Replies</span>
                            </div>
                          </div>
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4 pl-4 border-l-2 border-emerald-500/20 space-y-2">
                              <p className="text-sm text-emerald-400 font-medium">Replies:</p>
                              {comment.replies.map((reply, idx) => (
                                <div key={reply.id} className="text-sm text-gray-400">
                                  <span className="text-gray-300">{reply.name}:</span> {reply.content}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete('comments', comment.id)}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {comments.length === 0 && (
                    <div className="text-center py-20 glass-dark rounded-2xl">
                      <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No comments yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-400">Manage About Section</h2>
                  <button
                    onClick={() => {
                      setCurrentModel('about');
                      setEditingItem(about);
                      setFormData(about || { competencies: [] });
                      setShowForm(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit About
                  </button>
                </div>
                {about ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-dark rounded-2xl p-8 border border-emerald-500/20"
                  >
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">Professional Summary</h3>
                    <p className="text-gray-300 mb-6">{about.summary}</p>
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">Core Competencies</h3>
                    <ul className="space-y-2">
                      {about.competencies?.map((comp, idx) => (
                        <li key={idx} className="flex items-start text-gray-300">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {comp}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <div className="text-center py-20 glass-dark rounded-2xl">
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No about section configured</p>
                  </div>
                )}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-400">Manage Skills</h2>
                  <button
                    onClick={() => handleCreate('skills')}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Skill Category
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-emerald-400">{skill.category}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit('skills', skill)}
                            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete('skills', skill.id)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {skill.skills?.map((s, idx) => (
                          <li key={idx} className="text-gray-300 text-sm">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full inline-block mr-2"></span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Work History Tab */}
            {activeTab === 'workHistory' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-400">Manage Work History</h2>
                  <button
                    onClick={() => handleCreate('workHistory')}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Position
                  </button>
                </div>
                <div className="space-y-6">
                  {workHistory.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-emerald-400">{job.role}</h3>
                          <p className="text-gray-400">{job.company} | {job.location}</p>
                          <p className="text-gray-500 text-sm">{job.period}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit('workHistory', job)}
                            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete('workHistory', job.id)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {job.responsibilities?.map((resp, idx) => (
                          <li key={idx} className="text-gray-300 text-sm">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block mr-2"></span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-400">Manage Education</h2>
                  <button
                    onClick={() => handleCreate('education')}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Education
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-emerald-400">{edu.degree}</h3>
                          <p className="text-gray-400">{edu.institution}</p>
                          <p className="text-gray-500 text-sm">{edu.period}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit('education', edu)}
                            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete('education', edu.id)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      {edu.focus && (
                        <p className="text-gray-300 text-sm">{edu.focus}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-400">Manage Projects</h2>
                  <button
                    onClick={() => handleCreate('projects')}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Project
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                    >
                      <h3 className="text-xl font-semibold text-gray-200 mb-2">{project.title}</h3>
                      <p className="text-emerald-400 text-sm mb-3">{project.type}</p>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit('projects', project)}
                          className="flex-1 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('projects', project.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-400">Manage Testimonials</h2>
                  <button
                    onClick={() => handleCreate('testimonials')}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Testimonial
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((test, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {[...Array(test.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                      <p className="text-gray-300 italic mb-4 line-clamp-3">"{test.content}"</p>
                      <div>
                        <p className="text-emerald-400 font-semibold">{test.name}</p>
                        <p className="text-gray-500 text-sm">{test.role}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEdit('testimonials', test)}
                          className="flex-1 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('testimonials', test.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Edit/Create Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-emerald-400">
                  {editingItem ? 'Edit' : 'Add'} {currentModel.slice(0, -1)}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {currentModel === 'projects' && (
                  <>
                    <input
                      type="text"
                      placeholder="Title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Type"
                      value={formData.type || ''}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      rows="4"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Tags (comma separated)"
                      value={(formData.tags || []).join(', ')}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </>
                )}

                {currentModel === 'about' && (
                  <>
                    <textarea
                      placeholder="Professional Summary"
                      value={formData.summary || ''}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      rows="6"
                      required
                    />
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Core Competencies (one per line)</label>
                      <textarea
                        placeholder="Technical Leadership&#10;Technical Writing&#10;Cross-Functional Collaboration"
                        value={(formData.competencies || []).join('\n')}
                        onChange={(e) => setFormData({ ...formData, competencies: e.target.value.split('\n') })}
                        className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                        rows="6"
                      />
                    </div>
                  </>
                )}

                {currentModel === 'skills' && (
                  <>
                    <input
                      type="text"
                      placeholder="Category (e.g., AI & Data Training)"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Skills (comma separated)</label>
                      <input
                        type="text"
                        placeholder="RLHF, SFT, LLM Evaluation"
                        value={(formData.skills || []).join(', ')}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                        className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </>
                )}

                {currentModel === 'workHistory' && (
                  <>
                    <input
                      type="text"
                      placeholder="Role/Position"
                      value={formData.role || ''}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={formData.company || ''}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Period (e.g., Jul 2023 – Present)"
                      value={formData.period || ''}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Responsibilities (one per line)</label>
                      <textarea
                        placeholder="Responsibility 1&#10;Responsibility 2"
                        value={(formData.responsibilities || []).join('\n')}
                        onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value.split('\n') })}
                        className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                        rows="6"
                      />
                    </div>
                  </>
                )}

                {currentModel === 'education' && (
                  <>
                    <input
                      type="text"
                      placeholder="Degree/Certification"
                      value={formData.degree || ''}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={formData.institution || ''}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Period (e.g., 2019 – 2022)"
                      value={formData.period || ''}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Focus/Details"
                      value={formData.focus || ''}
                      onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </>
                )}

                {currentModel === 'testimonials' && (
                  <>
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={formData.role || ''}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <textarea
                      placeholder="Testimonial Content"
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      rows="4"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Rating (1-5)"
                      value={formData.rating || ''}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      min="1"
                      max="5"
                      className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                  </>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 glass-dark text-gray-400 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;