import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, Calendar, MapPin } from 'lucide-react';

const WorkHistory = () => {
  const workHistory = [
    {
      id: 1,
      company: "DATA ANNOTATION / TELUS DIGITAL",
      location: "Remote, USA",
      role: "Senior AI Trainer & Software Engineer",
      period: "Jul 2023 – Present",
      responsibilities: [
        "Lead Code Evaluator: Conduct rigorous technical reviews of AI-generated code snippets in Python and TypeScript, identifying logic errors, security vulnerabilities, and inefficiencies.",
        "RLHF Strategy: Rank model responses and author 'Gold Standard' rewrites to train models on best practices, code readability, and modular design.",
        "Model Optimization: Design complex, adversarial prompts to test model reasoning capabilities in edge cases (e.g., race conditions, memory leaks).",
        "Technical Documentation: Provide detailed, pedagogical rationales for every evaluation, teaching the model why specific solutions were superior."
      ]
    },
    {
      id: 2,
      company: "STANDARD CHARTERED BANK",
      location: "UK (Remote)",
      role: "Senior Backend Engineer",
      period: "Dec 2022 – Jun 2023",
      responsibilities: [
        "Regulated Systems: Built secure, high-performance backend services for a global banking platform using Elixir and Python.",
        "API Architecture: Designed versioned, backwards-compatible APIs consumed by millions of users, focusing on data consistency and latency reduction.",
        "Observability: Implemented advanced logging and monitoring to diagnose system bottlenecks in a distributed architecture."
      ]
    },
    {
      id: 3,
      company: "POWER FINANCIAL WELLNESS",
      location: "Nairobi, Kenya",
      role: "Senior Backend Engineer (FinTech)",
      period: "Jul 2021 – Nov 2022",
      responsibilities: [
        "Scalable Architecture: Led the backend engineering for a high-traffic fintech platform serving thousands of users across East Africa.",
        "Security Integration: Built secure integrations with third-party payment gateways and mobile money providers.",
        "Product Strategy: Translated complex financial product requirements into reliable, bug-free code, aligning technical decisions with business goals."
      ]
    },
    {
      id: 4,
      company: "ALSOUG.COM",
      location: "Khartoum, Sudan",
      role: "Senior Backend Engineer",
      period: "Apr 2020 – Jun 2021",
      responsibilities: [
        "System Modernization: Led the migration from a monolithic legacy system to a modern service-oriented architecture, improving system uptime.",
        "CI/CD Implementation: Established automated testing pipelines to ensure code quality during rapid release cycles."
      ]
    },
    {
      id: 5,
      company: "GLADYS TECHNOLOGIES",
      location: "Nairobi, Kenya",
      role: "Software Engineer",
      period: "Apr 2017 – Mar 2020",
      responsibilities: [
        "API Development: Developed core REST and GraphQL APIs using Elixir and Phoenix that formed the backbone of multiple client applications.",
        "Security: Implemented robust authentication (OAuth/JWT) systems for client applications."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Work History
            </h2>
          </div>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Over 8 years of experience building scalable systems and leading technical initiatives
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-emerald-500 to-cyan-500"></div>

            {workHistory.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0 md:right-auto md:-right-3' : 'left-0 md:left-auto md:-left-3'} w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 border-4 border-gray-900 z-10`}></div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`glass-dark rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 ml-12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                >
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-emerald-400">{job.role}</h3>
                      <div className="flex items-center gap-2 text-gray-400 mt-1">
                        <Building className="w-4 h-4" />
                        <span className="text-sm">{job.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{job.period}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start text-gray-300">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkHistory;