import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What technologies do you specialize in for full-stack development?",
      answer: "I specialize in modern web technologies including React, Node.js, Express, MongoDB, and PostgreSQL. I also have extensive experience with cloud platforms like AWS and Azure."
    },
    {
      question: "What subjects do you tutor?",
      answer: "I provide tutoring in Mathematics, Physics, and Chemistry at all levels. My approach focuses on building strong fundamentals and problem-solving skills."
    },
    {
      question: "What types of writing services do you offer?",
      answer: "I offer technical documentation, academic paper writing, research articles, and content writing services. Each piece is thoroughly researched and professionally written."
    },
    {
      question: "How do you handle project deadlines?",
      answer: "I maintain strict adherence to deadlines through careful planning, regular updates, and efficient time management. I ensure transparent communication throughout the project lifecycle."
    },
    {
      question: "What is your approach to teaching complex subjects?",
      answer: "I break down complex concepts into manageable parts, use real-world examples, and adapt my teaching style to each student's learning preferences."
    },
    {
      question: "Do you offer remote services?",
      answer: "Yes, I offer remote services for all my work including development, tutoring, and writing. I use various collaboration tools to ensure effective communication."
    },
    {
      question: "What is your pricing structure?",
      answer: "My pricing varies based on the service and project requirements. I offer competitive rates with flexible packages to suit different needs and budgets."
    },
    {
      question: "How can I track the progress of my project?",
      answer: "I provide regular updates through your preferred communication channel and use project management tools to maintain transparency."
    },
    {
      question: "What is your revision policy?",
      answer: "I offer reasonable revisions to ensure client satisfaction. The specific number of revisions depends on the service and project scope."
    },
    {
      question: "How do I get started with your services?",
      answer: "You can contact me through email at vrugundu001@gmail.com or phone at 0795703997 to discuss your needs and get a customized quote."
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h3 className="text-2xl font-semibold text-emerald-800 mb-6">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-emerald-100 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-emerald-700">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-emerald-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-emerald-600" />
              )}
            </button>
            {openIndex === index && (
              <p className="text-emerald-600 pb-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;