import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/pages/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import WorkHistory from "./components/pages/WorkHistory";
import Testimonials from "./components/sections/Testimonials";
import ContactAndRates from "./components/sections/ContactAndRates";
import CommentBox from "./components/common/CommentBox";
import FAQ from "./components/common/FAQ";
import CommentsSection from "./components/common/CommentsSection";
import LoginModal from "./components/common/LoginModal";
import AdminDashboard from "./components/admin/AdminDashboard";
import "./index.css";

function App() {
  const { theme } = useTheme();
  const { currentUser, isAdmin, login, logout, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${
      theme === 'light'
        ? 'bg-white text-gray-900'
        : 'bg-gray-900 text-gray-100'
    }`}>
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
        <div id="home">
          <Hero />
        </div>

        {/* Admin Dashboard - Only visible when logged in as admin */}
        {currentUser && isAdmin && (
          <div className={`py-12 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
            <AdminDashboard />
          </div>
        )}

        {/* About Section */}
        <div id="about">
          <About />
        </div>

        {/* Skills Section */}
        <div id="skills">
          <Skills />
        </div>

        {/* Projects Section */}
        <div id="projects">
          <Projects />
        </div>

        {/* Work History Section */}
        <div id="experience">
          <WorkHistory />
        </div>

        {/* Testimonials Section */}
        <section className={`py-12 ${
          theme === 'light'
            ? 'bg-gray-100'
            : 'bg-gray-800/30'
        }`}>
          <div className="container mx-auto px-4">
            <Testimonials />
          </div>
        </section>

        {/* Contact and Rates Section */}
        <div id="contact">
          <ContactAndRates />
        </div>

        {/* Comment Box */}
        <section className={`py-12 ${
          theme === 'light'
            ? 'bg-emerald-50'
            : 'bg-emerald-900/10'
        }`}>
          <div className="container mx-auto px-4">
            <CommentBox />
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`py-12 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}>
          <div className="container mx-auto px-4">
            <FAQ />
          </div>
        </section>

        {/* Comments Section */}
        <CommentsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
