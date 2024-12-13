import React, { useState } from "react";
import { Linkedin, Mail, Briefcase, Github, Phone } from "lucide-react";

const ContactAndRates = () => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    deliverables: "",
    guidelines: "",
    deadline: "",
    urgency: "",
    files: null
  });

  const services = [
    {
      image: "https://images.pexels.com/photos/7605805/pexels-photo-7605805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Software Engineering",
      hourlyRate: <strong>$30/hr</strong>,
      details: ["Full-stack development: Back-end and Front-end", "Application development", "System integration","Debugging"]
    },
    {
      image: "https://images.pexels.com/photos/8653735/pexels-photo-8653735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "8-4-4 and IGCSE Tutoring",
      hourlyRate: <strong>$15/hr</strong>,
      details: ["Mathematics, Physics and Chemistry Syllabus Coverage & Revision", "Science Project Coaching and Mangement", "KCSE and IGCSE Test preparation","Basic Coding Classes; HTML & CSS, Text-based JS and Python"]
    },
    {
      image: "https://images.pexels.com/photos/5060985/pexels-photo-5060985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Professional Writing",
      hourlyRate: <strong>Project-based</strong>,
      details: [" Academic Writing: Assignments & Thesis/Proposals", "Editing and proofreading", "Technical writing","Content Writing; Crypto, forex & travel articles"]
    }
  ];
  

  const handleCreditCardPayment = () => {
    setShowCardForm(true);
  };

  const closeCardForm = () => {
    setShowCardForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    // Send formData to Cloudinary for file uploads
    // This is a placeholder function. Replace it with the actual API call to Cloudinary.
    const uploadFilesToCloudinary = async () => {
      // Example API call (this is not real code, replace with real API logic)
      try {
        const formDataToSend = new FormData();
        Array.from(formData.files).forEach(file => {
          formDataToSend.append('files', file);
        });
        // const response = await fetch('CLOUDINARY_UPLOAD_URL', {
        //   method: 'POST',
        //   body: formDataToSend,
        // });
        // const result = await response.json();
        // return result;
        return { success: true }; // Mock response
      } catch (error) {
        console.error("Error uploading files:", error);
        return { success: false };
      }
    };

    const uploadResult = await uploadFilesToCloudinary();
    if (uploadResult.success) {
      setShowPopup(true); // Show the confirmation popup after successful upload
      setShowCardForm(false); // Hide the form after submission
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'files') {
      setFormData((prev) => ({
        ...prev,
        files: files
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <section className="py-20 bg-emerald-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-emerald-800 text-center mb-16">
          Contact & Services
        </h2>

        {/* Contact Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-semibold text-emerald-800 mb-6 text-center">
            Contact Vincent Irungu
          </h3>
          <div className="flex flex-col items-center space-y-8">
            {/* Icons Section */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-8">
              {/* LinkedIn */}
              <div className="text-center">
                <a
                  href="https://www.linkedin.com/in/vincent-rugundu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 focus:ring focus:ring-blue-300 rounded-full p-2 transition duration-300 ease-in-out"
                  aria-label="LinkedIn"
                  title="Visit LinkedIn Profile"
                >
                  <Linkedin className="w-12 h-12 mx-auto" />
                </a>
              </div>
              {/* Gmail */}
              <div className="text-center">
                <a
                  href="mailto:vrugundu001@gmail.com"
                  className="text-red-600 hover:text-red-800 focus:ring focus:ring-red-300 rounded-full p-2 transition duration-300 ease-in-out"
                  aria-label="Gmail"
                  title="Send an Email"
                >
                  <Mail className="w-12 h-12 mx-auto" />
                </a>
              </div>
              {/* Phone */}
              <div className="text-center">
                <a
                  href="tel:+254795703997"
                  className="text-green-600 hover:text-green-800 focus:ring focus:ring-green-300 rounded-full p-2 transition duration-300 ease-in-out"
                  aria-label="Phone"
                  title="Call Now"
                >
                  <Phone className="w-12 h-12 mx-auto" />
                </a>
              </div>
              {/* Upwork */}
              <div className="text-center">
                <a
                  href="https://www.upwork.com/freelancers/~01bde9ee30b3e236f2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 focus:ring focus:ring-green-300 rounded-full p-2 transition duration-300 ease-in-out"
                  aria-label="Upwork"
                  title="View Upwork Profile"
                >
                  <Briefcase className="w-12 h-12 mx-auto" />
                </a>
              </div>
              {/* GitHub */}
              <div className="text-center">
                <a
                  href="https://github.com/Vinrenatus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-900 focus:ring focus:ring-gray-300 rounded-full p-2 transition duration-300 ease-in-out"
                  aria-label="GitHub"
                  title="Visit GitHub Profile"
                >
                  <Github className="w-12 h-12 mx-auto" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center" id="payment-methods">
            <h4 className="text-xl font-semibold text-emerald-700 mb-4">Payment Methods</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-8">
              {/* MPesa */}
              <a
                href="https://www.mpesa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 hover:text-yellow-800 focus:ring focus:ring-yellow-300 rounded-full p-2 transition duration-300 ease-in-out"
                aria-label="MPesa"
                title="MPesa Payment"
              >
                <img src="/path/to/mpesa-gif.gif" alt="MPesa" className="w-12 h-12 mx-auto" />
              </a>
              {/* Airtel Money */}
              <a
                href="https://www.airtelmoney.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-800 focus:ring focus:ring-red-300 rounded-full p-2 transition duration-300 ease-in-out"
                aria-label="Airtel Money"
                title="Airtel Money Payment"
              >
                <img src="/path/to/airtel-gif.gif" alt="Airtel Money" className="w-12 h-12 mx-auto" />
              </a>
              {/* PayPal */}
              <a
                href="https://www.paypal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 focus:ring focus:ring-blue-300 rounded-full p-2 transition duration-300 ease-in-out"
                aria-label="PayPal"
                title="PayPal Payment"
              >
                <img src="/path/to/paypal-gif.gif" alt="PayPal" className="w-12 h-12 mx-auto" />
              </a>
              {/* Quick Order */}
              <button
                onClick={handleCreditCardPayment}
                className="text-gray-800 hover:text-gray-900 focus:ring focus:ring-gray-300 rounded-full p-2 transition duration-300 ease-in-out bg-lime-500 text-white hover:bg-lime-600"
                aria-label="Quick Order"
                title="Make quick order"
              >
                <img src="/path/to/credit-card-icon.png" alt="Quick Order" className="w-12 h-12 mx-auto" />
              </button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-t-lg" />
              <h4 className="text-emerald-700 text-xl font-bold mt-4">{service.title}</h4>
              <p className="text-lg text-gray-600">Hourly Rate: {service.hourlyRate}</p>
              <ul className="list-disc pl-4 mt-2">
                {service.details.map((detail, i) => (
                  <li key={i} className="text-gray-600">{detail}</li>
                ))}
              </ul>
              <button
                onClick={() => setShowCardForm(true)}
                className="mt-4 w-full py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Pop-up Form */}
        {showCardForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-96 max-w-full">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">Book Your Service</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="projectTitle" className="block text-gray-700 font-semibold">Project Title</label>
                  <input
                    type="text"
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="deliverables" className="block text-gray-700 font-semibold">Deliverables</label>
                  <input
                    type="file"
                    id="deliverables"
                    name="files"
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500"
                    multiple
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="deadline" className="block text-gray-700 font-semibold">Booking Date</label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-300"
                >
                  Confirm Booking
                </button>
              </form>
              <button onClick={closeCardForm} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Pop-up */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-96 max-w-full text-center">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">Booking Confirmed</h3>
              <p className="text-gray-600">Your booking has been successfully submitted. We'll be in touch soon to discuss the details.</p>
              <button onClick={() => setShowPopup(false)} className="mt-4 py-2 px-4 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-300">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactAndRates;









