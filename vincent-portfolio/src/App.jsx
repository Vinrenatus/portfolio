import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Testimonials from "./components/sections/Testimonials";
import ContactAndRates from "./components/sections/ContactAndRates";
import SearchBar from "./components/common/SearchBar";
import CommentBox from "./components/common/CommentBox";
import FAQ from "./components/common/FAQ";
import "./index.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const allData = [
    {
      title: "E-Commerce Platform",
      type: "Software development",
      description: "Full-stack e-commerce solution with React, Node.js and Python",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Ajali Platform",
      type: "Software development",
      description:
        "Full-stack development for incident reporting application with React, Node.js, Python, and Flask",
      tags: ["React.js", "Python", "Flask", "Express", "PostgreSQL"],
    },
    {
      title: "Professional Writing Papers",
      type: "Academic",
      description: "Research paper on quantum entanglement",
      tags: ["Physics", "Research", "Academic"],
    },
    {
      title: "Mathematics, Physics and Chemistry Study Resources",
      type: "Academic",
      description: "Analysis of reaction rates in organic compounds",
      tags: ["Chemistry", "Research", "STEM"],
    },
  ];

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Search Bar */}
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-sm py-4 px-4">
          <div className="container mx-auto">
            <SearchBar data={allData} onResultsChange={setSearchResults} />
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="container mx-auto px-4 mb-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                    {result.title}
                  </h3>
                  <p className="text-emerald-600 mb-2">{result.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {result.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full"
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
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Skills />
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Projects />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <Testimonials />
          </div>
        </section>

        {/* Contact and Rates Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <ContactAndRates />
          </div>
        </section>

        {/* Comment Box */}
        <section className="py-12 bg-emerald-50">
          <div className="container mx-auto px-4">
            <CommentBox />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <FAQ />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
