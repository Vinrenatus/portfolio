// Project data for Hamman Muraya's portfolio

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Portfolio Website",
    type: "Web Development",
    description: "A professional personal portfolio website showcasing my work and achievements as a Senior Software Engineer & AI Specialist. Built with modern technologies including React, Vite, and Tailwind CSS, featuring smooth animations with Framer Motion, responsive design for all devices, and a stunning animated pyramid visualization. The site includes project showcases, skills breakdown, experience timeline, and contact functionality.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    year: "2024",
    category: "Web Development",
    link: "https://hamanmuraya1.netlify.app/",
    image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg"
  },
  {
    id: 2,
    title: "Ajali - Emergency Incident Reporting",
    type: "Full-Stack Application",
    description: "A localized platform designed to facilitate swift reporting and response to accidents and emergencies in Kenya. The system allows citizens to report incidents with geolocation data, images, and videos while ensuring the right authorities and public are informed in real-time. Features include user authentication, incident status tracking (under investigation, resolved, etc.), media upload capabilities, Google Maps integration for location display, and an admin dashboard for managing reports. Built with React/Redux on the frontend and Flask/Python with SQLite on the backend, following RESTful API design principles.",
    tags: ["React", "Redux Toolkit", "Flask", "Python", "SQLite", "Google Maps API"],
    year: "2023",
    category: "Full-Stack Development",
    link: null,
    image: "https://images.pexels.com/photos/12002262/pexels-photo-12002262.jpeg"
  },
  {
    id: 3,
    title: "Sustainable Maasai Legacy",
    type: "E-commerce Platform",
    description: "A custom marketplace platform connecting Maasai artisans to global markets, empowering local communities through e-commerce. The platform features secure payment processing integration, comprehensive inventory management, product catalog with search and filtering, user authentication and profiles, order tracking, and international shipping support. Built to preserve and promote traditional Maasai craftsmanship while providing artisans with access to worldwide customers. Includes admin dashboard for managing products, orders, and artisan partnerships.",
    tags: ["E-commerce", "Payments", "Inventory Management", "Global Markets"],
    year: "2022",
    category: "E-commerce",
    link: null,
    image: "https://images.pexels.com/photos/13033124/pexels-photo-13033124.jpeg"
  },
  {
    id: 4,
    title: "Brian & Jones Automotive",
    type: "Full-Stack Application",
    description: "A comprehensive automotive service website for Brian & Jones Automotive featuring a complete customer and admin experience. Customer features include a 3-step service booking wizard, vehicle inventory browsing with filters (by price, mileage, year), customer dashboard for viewing appointment history and service records, and secure user authentication. Admin features include appointment management with status updates (scheduled → in-progress → completed), vehicle inventory CRUD operations, and user management. Services showcased include mechanical work, electrical diagnostics, OBD-II scanning, and complete engine/transmission overhauls with 12-month warranty. Built with React 18, React Router v6, CSS Modules, and a mock REST API.",
    tags: ["React", "CSS Modules", "React Router", "REST API"],
    year: "2024",
    category: "Full-Stack Development",
    link: "https://brianjones.netlify.app/",
    image: "https://images.pexels.com/photos/4480448/pexels-photo-4480448.jpeg"
  },
  {
    id: 5,
    title: "Ufugaji-BioID: Livestock Muzzle Print Biometrics",
    type: "AI/Computer Vision",
    description: "KSEF 2026 award-winning system using AI-powered muzzle print biometrics to combat cattle rustling in Kenya's ASAL regions (Turkana, Pokot, Kajiado). The system features a cutting-edge image processing pipeline with AI validation using Local Binary Patterns (LBP) for texture analysis, bilateral symmetry detection, edge density analysis with Sobel operators, and contrast distribution validation. Implements CNN-inspired 28-dimensional feature vector extraction (grid mean, edge density, texture variance, radial patterns) and cosine similarity matching with confidence-adjusted scoring. The offline-first architecture works 100% without internet on standard Android smartphones. Four MVPs: Muzzle Mapper (camera/upload with AI validation), Offline Enrollment (localStorage database), AI Matcher (identification with confidence scoring), and Digital Title Deed (PDF certificate generation). Built with React 19, Vite, html2canvas, and jsPDF.",
    tags: ["React", "AI", "Computer Vision", "Image Processing", "Biometrics", "Offline-First"],
    year: "2026",
    category: "AI/ML",
    link: "https://aistudio.google.com/apps/drive/10VRTax38bkRyaSyx5KoamV0c-uMy17vo?fullscreenApplet=true&showPreview=true&showAssistant=true",
    image: "https://images.pexels.com/photos/591/animal-countryside-agriculture-farm.jpg"
  }
];

export const SKILLS_DATA = [
  {
    category: "AI & Data Training",
    skills: ["RLHF", "Supervised Fine-Tuning (SFT)", "LLM Evaluation", "Code Hallucination Detection", "Prompt Engineering", "Ground Truth Creation"]
  },
  {
    category: "Languages & Frameworks",
    skills: ["Python (Django, Flask, SQLAlchemy)", "JavaScript/TypeScript (React.js, Node.js, Redux, Express)", "Elixir (Phoenix)", "SQL", "HTML5/CSS3"]
  },
  {
    category: "Engineering Standards",
    skills: ["Agile/Scrum Methodologies", "Test-Driven Development (TDD)", "Pair Programming", "Code Reviews", "Git Flow Workflow", "MVC Architecture", "REST API Design"]
  },
  {
    category: "DevOps & Infrastructure",
    skills: ["AWS (EC2, S3)", "Docker", "Kubernetes", "CI/CD Pipelines (GitHub Actions)", "PostgreSQL", "Redis", "Linux/Bash"]
  }
];

export const SERVICES_DATA = [
  {
    title: "Software Engineering",
    details: [
      "Custom Application Development",
      "System Architecture Design",
      "Code Review & Optimization",
      "API Development",
      "Integration Solutions"
    ]
  },
  {
    title: "Data Science & Analytics",
    details: [
      "Predictive Modeling",
      "Statistical Analysis",
      "Data Visualization",
      "Machine Learning Solutions",
      "Business Intelligence"
    ]
  },
  {
    title: "Technical Consulting",
    details: [
      "Technology Strategy",
      "System Evaluation",
      "Performance Optimization",
      "Migration Planning",
      "Team Mentoring"
    ]
  }
];
