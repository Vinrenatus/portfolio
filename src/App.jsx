import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, User, LogOut } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/pages/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import WorkHistory from "./components/pages/WorkHistory";
import Testimonials from "./components/sections/Testimonials";
import ContactAndRates from "./components/sections/ContactAndRates";
import SearchBar from "./components/common/SearchBar";
import CommentBox from "./components/common/CommentBox";
import FAQ from "./components/common/FAQ";
import CommentsSection from "./components/common/CommentsSection";
import LoginModal from "./components/common/LoginModal";
import AdminDashboard from "./components/admin/AdminDashboard";
import { PROJECTS_DATA } from "./data/projects";
import { useSearch } from "./hooks/useSearch";
import "./index.css";

function App() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, isAdmin, login, logout, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { searchTerm, setSearchTerm, filteredData } = useSearch(PROJECTS_DATA);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className={`relative ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navbar */}
      <Navbar />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Admin Dashboard - Only visible when logged in as admin */}
        {currentUser && isAdmin && (
          <div className="py-12">
            <AdminDashboard />
          </div>
        )}

        {/* About Section */}
        <About />

        {/* Search Bar */}
        <div className="sticky top-20 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-4 px-4">
          <div className="container mx-auto">
            <SearchBar
              data={PROJECTS_DATA}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && filteredData.length > 0 && (
          <div className="container mx-auto px-4 mb-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((result, index) => (
                <motion.div
                  key={result.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                    {result.title}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-300 mb-2">{result.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {result.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-sm bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <Skills />
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <Projects />
          </div>
        </section>

        {/* Work History Section */}
        <div className="py-12">
          <WorkHistory />
        </div>

        {/* Testimonials Section */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800/30">
          <div className="container mx-auto px-4">
            <Testimonials />
          </div>
        </section>

        {/* Contact and Rates Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <ContactAndRates />
          </div>
        </section>

        {/* Comment Box */}
        <section className="py-12 bg-emerald-50 dark:bg-emerald-900/10">
          <div className="container mx-auto px-4">
            <CommentBox />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FAQ />
          </div>
        </section>

        {/* Comments Section */}
        <CommentsSection />
      </main>
    </div>
  );
}

export default App;
