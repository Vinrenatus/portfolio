-- Run this SQL in your Supabase SQL Editor to add image and link columns
-- Go to: https://app.supabase.com/project/ezhqztbqexzctjwbkbfg/sql/new

-- ============================================
-- ADD IMAGE AND LINK COLUMNS TO PROJECTS TABLE
-- ============================================

-- Add image column (for project screenshot/thumbnail)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS image TEXT;

-- Add link column (for live project URL)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS link TEXT;

-- ============================================
-- UPDATE EXISTING PROJECTS WITH IMAGES AND LINKS
-- ============================================

-- Update Project 1: Portfolio Website
UPDATE projects
SET
  image = 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
  link = 'https://victornjoroge1.netlify.app/',
  title = 'Portfolio Website',
  type = 'Web Development',
  description = 'A professional personal portfolio website showcasing my work and achievements as a Senior Software Engineer & AI Specialist. Built with modern technologies including React, Vite, and Tailwind CSS, featuring smooth animations with Framer Motion, responsive design for all devices, and a stunning animated pyramid visualization. The site includes project showcases, skills breakdown, experience timeline, and contact functionality.',
  tags = ARRAY['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
  year = '2024',
  category = 'Web Development'
WHERE id = 1;

-- Update Project 2: Ajali
UPDATE projects 
SET 
  image = 'https://images.pexels.com/photos/12002262/pexels-photo-12002262.jpeg',
  link = NULL,
  title = 'Ajali - Emergency Incident Reporting',
  type = 'Full-Stack Application',
  description = 'A localized platform designed to facilitate swift reporting and response to accidents and emergencies in Kenya. The system allows citizens to report incidents with geolocation data, images, and videos while ensuring the right authorities and public are informed in real-time. Features include user authentication, incident status tracking, media upload capabilities, Google Maps integration, and an admin dashboard for managing reports. Built with React/Redux and Flask/Python with SQLite.',
  tags = ARRAY['React', 'Redux Toolkit', 'Flask', 'Python', 'SQLite', 'Google Maps API'],
  year = '2023',
  category = 'Full-Stack Development'
WHERE id = 2;

-- Update Project 3: Sustainable Maasai Legacy
UPDATE projects 
SET 
  image = 'https://images.pexels.com/photos/13033124/pexels-photo-13033124.jpeg',
  link = NULL,
  title = 'Sustainable Maasai Legacy',
  type = 'E-commerce Platform',
  description = 'A custom marketplace platform connecting Maasai artisans to global markets, empowering local communities through e-commerce. Features secure payment processing, comprehensive inventory management, product catalog with search and filtering, user authentication, order tracking, and international shipping support. Built to preserve and promote traditional Maasai craftsmanship while providing artisans access to worldwide customers.',
  tags = ARRAY['E-commerce', 'Payments', 'Inventory Management', 'Global Markets'],
  year = '2022',
  category = 'E-commerce'
WHERE id = 3;

-- Update Project 4: Brian & Jones Automotive
UPDATE projects 
SET 
  image = 'https://images.pexels.com/photos/4480448/pexels-photo-4480448.jpeg',
  link = 'https://brianjones.netlify.app/',
  title = 'Brian & Jones Automotive',
  type = 'Full-Stack Application',
  description = 'A comprehensive automotive service website featuring service booking, vehicle inventory management, and customer dashboard. Customer features include 3-step booking wizard, vehicle browsing with filters, and appointment history. Admin features include appointment management, inventory CRUD, and user management. Services include mechanical work, electrical diagnostics, OBD-II scanning, and engine/transmission overhauls with 12-month warranty.',
  tags = ARRAY['React', 'CSS Modules', 'React Router', 'REST API'],
  year = '2024',
  category = 'Full-Stack Development'
WHERE id = 4;

-- Update Project 5: Ufugaji-BioID
UPDATE projects 
SET 
  image = 'https://images.pexels.com/photos/591/animal-countryside-agriculture-farm.jpg',
  link = 'https://aistudio.google.com/apps/drive/10VRTax38bkRyaSyx5KoamV0c-uMy17vo?fullscreenApplet=true&showPreview=true&showAssistant=true',
  title = 'Ufugaji-BioID: Livestock Muzzle Print Biometrics',
  type = 'AI/Computer Vision',
  description = 'KSEF 2026 award-winning system using AI-powered muzzle print biometrics to combat cattle rustling in Kenya''s ASAL regions. Features image processing pipeline with AI validation (LBP texture, symmetry, edge density), 28-D feature vector extraction, and cosine similarity matching. Offline-first architecture works without internet on Android. Four MVPs: Muzzle Mapper, Offline Enrollment, AI Matcher, and Digital Title Deed with PDF generation.',
  tags = ARRAY['React', 'AI', 'Computer Vision', 'Image Processing', 'Biometrics', 'Offline-First'],
  year = '2026',
  category = 'AI/ML'
WHERE id = 5;

-- ============================================
-- INSERT/UPDATE ALL PROJECTS
-- ============================================

-- Insert/Update Portfolio Website
INSERT INTO projects (id, title, type, description, tags, year, category, image, link)
VALUES (1, 'Portfolio Website', 'Web Development', 'A professional personal portfolio website showcasing my work and achievements as a Senior Software Engineer & AI Specialist. Built with React, Vite, Tailwind CSS, and Framer Motion with responsive design and animated pyramid visualization.', ARRAY['React', 'Vite', 'Tailwind CSS', 'Framer Motion'], '2024', 'Web Development', 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg', 'https://victornjoroge1.netlify.app/')
ON CONFLICT (id) DO UPDATE SET
  image = EXCLUDED.image, link = EXCLUDED.link, title = EXCLUDED.title, type = EXCLUDED.type,
  description = EXCLUDED.description, tags = EXCLUDED.tags, year = EXCLUDED.year, category = EXCLUDED.category;

-- Insert/Update Ajali
INSERT INTO projects (id, title, type, description, tags, year, category, image, link) 
VALUES (2, 'Ajali - Emergency Incident Reporting', 'Full-Stack Application', 'A localized platform for swift reporting and response to accidents/emergencies in Kenya with geolocation, media upload, and real-time admin dashboard. Built with React/Redux and Flask/Python.', ARRAY['React', 'Redux Toolkit', 'Flask', 'Python', 'SQLite', 'Google Maps API'], '2023', 'Full-Stack Development', 'https://images.pexels.com/photos/12002262/pexels-photo-12002262.jpeg', NULL)
ON CONFLICT (id) DO UPDATE SET
  image = EXCLUDED.image, link = EXCLUDED.link, title = EXCLUDED.title, type = EXCLUDED.type,
  description = EXCLUDED.description, tags = EXCLUDED.tags, year = EXCLUDED.year, category = EXCLUDED.category;

-- Insert/Update Sustainable Maasai Legacy
INSERT INTO projects (id, title, type, description, tags, year, category, image, link) 
VALUES (3, 'Sustainable Maasai Legacy', 'E-commerce Platform', 'Marketplace connecting Maasai artisans to global markets with payment processing, inventory management, and international shipping. Empowering local communities through e-commerce.', ARRAY['E-commerce', 'Payments', 'Inventory Management', 'Global Markets'], '2022', 'E-commerce', 'https://images.pexels.com/photos/13033124/pexels-photo-13033124.jpeg', NULL)
ON CONFLICT (id) DO UPDATE SET
  image = EXCLUDED.image, link = EXCLUDED.link, title = EXCLUDED.title, type = EXCLUDED.type,
  description = EXCLUDED.description, tags = EXCLUDED.tags, year = EXCLUDED.year, category = EXCLUDED.category;

-- Insert/Update Brian & Jones Automotive
INSERT INTO projects (id, title, type, description, tags, year, category, image, link) 
VALUES (4, 'Brian & Jones Automotive', 'Full-Stack Application', 'Automotive service website with 3-step booking wizard, vehicle inventory with filters, customer dashboard, and admin panel for appointment/inventory management. Features 12-month warranty on overhauls.', ARRAY['React', 'CSS Modules', 'React Router', 'REST API'], '2024', 'Full-Stack Development', 'https://images.pexels.com/photos/4480448/pexels-photo-4480448.jpeg', 'https://brianjones.netlify.app/')
ON CONFLICT (id) DO UPDATE SET
  image = EXCLUDED.image, link = EXCLUDED.link, title = EXCLUDED.title, type = EXCLUDED.type,
  description = EXCLUDED.description, tags = EXCLUDED.tags, year = EXCLUDED.year, category = EXCLUDED.category;

-- Insert/Update Ufugaji-BioID
INSERT INTO projects (id, title, type, description, tags, year, category, image, link) 
VALUES (5, 'Ufugaji-BioID: Livestock Muzzle Print Biometrics', 'AI/Computer Vision', 'KSEF 2026 award-winning AI system for cattle rustling prevention using muzzle print biometrics. Features LBP texture analysis, 28-D feature extraction, offline-first Android app with 4 MVPs.', ARRAY['React', 'AI', 'Computer Vision', 'Image Processing', 'Biometrics', 'Offline-First'], '2026', 'AI/ML', 'https://images.pexels.com/photos/591/animal-countryside-agriculture-farm.jpg', 'https://aistudio.google.com/apps/drive/10VRTax38bkRyaSyx5KoamV0c-uMy17vo?fullscreenApplet=true&showPreview=true&showAssistant=true')
ON CONFLICT (id) DO UPDATE SET
  image = EXCLUDED.image, link = EXCLUDED.link, title = EXCLUDED.title, type = EXCLUDED.type,
  description = EXCLUDED.description, tags = EXCLUDED.tags, year = EXCLUDED.year, category = EXCLUDED.category;

-- ============================================
-- DONE! ✅ Refresh your browser after running this
-- ============================================
