import React from 'react';
import { Phone, Mail, Clock, DollarSign } from 'lucide-react';

const ContactAndRates = () => {
  const services = [
    {
      title: "Full Stack Development",
      hourlyRate: "$80-120",
      details: [
        "Custom Web Applications",
        "API Development",
        "Database Design",
        "System Architecture",
        "Cloud Integration"
      ]
    },
    {
      title: "Academic Tutoring",
      hourlyRate: "$50-70",
      details: [
        "Mathematics (All levels)",
        "Physics",
        "Chemistry",
        "One-on-one Sessions",
        "Group Sessions Available"
      ]
    },
    {
      title: "Professional Writing",
      hourlyRate: "$60-90",
      details: [
        "Technical Documentation",
        "Academic Papers",
        "Research Articles",
        "Content Writing",
        "Editing Services"
      ]
    }
  ];

  return (
    <section className="py-20 bg-emerald-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-emerald-800 text-center mb-16">Contact & Services</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-emerald-800 mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-600" />
                <a href="tel:+254795703997" className="text-emerald-700 hover:text-emerald-800">
                  +254 795 703 997
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-600" />
                <a href="mailto:vrugundu001@gmail.com" className="text-emerald-700 hover:text-emerald-800">
                  vrugundu001@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700">Available 9 AM - 6 PM EAT</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-emerald-800 mb-6">Quick Contact</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-emerald-800">{service.title}</h3>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span className="text-lg font-semibold text-emerald-700">{service.hourlyRate}</span>
                  <span className="text-sm text-emerald-600 ml-1">/hr</span>
                </div>
              </div>
              <ul className="space-y-3">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-emerald-700">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactAndRates;