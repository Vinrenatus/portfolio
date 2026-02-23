-- Run this SQL in your Supabase SQL Editor
-- Go to: https://app.supabase.com/project/ezhqztbqexzctjwbkbfg/sql/new

-- ============================================
-- CREATE ALL TABLES FOR VICTOR'S PORTFOLIO
-- ============================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  year TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  emoji TEXT,
  type TEXT DEFAULT 'professional',
  reactions JSONB DEFAULT '{"likes": 0}',
  replies JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table (from contact form)
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  priceRange TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- About section (single record)
CREATE TABLE IF NOT EXISTS about (
  id INTEGER PRIMARY KEY DEFAULT 1,
  summary TEXT,
  competencies TEXT[] DEFAULT '{}',
  CHECK (id = 1)
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Work History table
CREATE TABLE IF NOT EXISTS work_history (
  id BIGSERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  location TEXT,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  responsibilities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id BIGSERIAL PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT,
  focus TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE POLICIES (Allow all operations for now)
-- ============================================

-- Projects policies
DROP POLICY IF EXISTS "Public read access" ON projects;
DROP POLICY IF EXISTS "Enable all operations" ON projects;
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable all operations" ON projects FOR ALL USING (true);

-- Testimonials policies
DROP POLICY IF EXISTS "Public read access" ON testimonials;
DROP POLICY IF EXISTS "Enable all operations" ON testimonials;
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable all operations" ON testimonials FOR ALL USING (true);

-- Comments policies
DROP POLICY IF EXISTS "Public read access" ON comments;
DROP POLICY IF EXISTS "Enable all operations" ON comments;
CREATE POLICY "Public read access" ON comments FOR SELECT USING (true);
CREATE POLICY "Enable all operations" ON comments FOR ALL USING (true);

-- Messages policies
DROP POLICY IF EXISTS "Public read access" ON messages;
DROP POLICY IF EXISTS "Enable all operations" ON messages;
CREATE POLICY "Public read access" ON messages FOR SELECT USING (true);
CREATE POLICY "Enable all operations" ON messages FOR ALL USING (true);

-- About policies
DROP POLICY IF EXISTS "Public read access" ON about;
DROP POLICY IF EXISTS "Enable all operations" ON about;
CREATE POLICY "Public read access" ON about FOR SELECT USING (true);
CREATE POLICY "Enable all operations" ON about FOR ALL USING (true);

-- Skills policies
DROP POLICY IF EXISTS "Public read access" ON skills;
DROP POLICY IF EXISTS "Enable all operations" ON skills;
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Enable all operations" ON skills FOR ALL USING (true);

-- Work History policies
DROP POLICY IF EXISTS "Public read access" ON work_history;
DROP POLICY IF EXISTS "Enable all operations" ON work_history;
CREATE POLICY "Public read access" ON work_history FOR SELECT USING (true);
CREATE POLICY "Enable all operations" ON work_history FOR ALL USING (true);

-- Education policies
DROP POLICY IF EXISTS "Public read access" ON education;
DROP POLICY IF EXISTS "Enable all operations" ON education;
CREATE POLICY "Public read access" ON education FOR SELECT USING (true);
CREATE POLICY "Enable all operations" ON education FOR ALL USING (true);

-- ============================================
-- INSERT INITIAL DATA
-- ============================================

-- Insert projects
INSERT INTO projects (title, type, description, tags, year, category) VALUES
('Ajali Incident Reporting Platform', 'Software development', 
 'Real-time full-stack application for emergency incident tracking with Node.js and React',
 ARRAY['Node.js', 'React', 'Real-time Data', 'User-Centered Design'],
 '2023', 'Full-Stack Development'),

('Sustainable Maasai Legacy (E-commerce)', 'Software development',
 'Custom marketplace platform connecting artisans to global markets with payment processing',
 ARRAY['E-commerce', 'Payments', 'Inventory Management', 'Global Markets'],
 '2022', 'E-commerce'),

('CoinBase iOS Tracker', 'Mobile Development',
 'Native iOS app for real-time cryptocurrency tracking',
 ARRAY['iOS', 'Swift', 'Cryptocurrency', 'Real-time Data'],
 '2021', 'Mobile Development'),

('Large Language Model Training Platform', 'AI/ML',
 'Platform for RLHF and Supervised Fine-Tuning of LLMs',
 ARRAY['Python', 'AI', 'Machine Learning', 'LLM', 'RLHF'],
 '2024', 'AI/ML')
ON CONFLICT DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (name, role, content, rating) VALUES
('Amina Diallo', 'Software Engineering Lead',
 'Victor''s expertise in AI and full-stack development transformed our product. His ability to implement complex RLHF systems is remarkable.', 5),

('Kofi Asante', 'AI Startup Founder',
 'The LLM training platform Victor developed for our startup exceeded our expectations. Professional, efficient, and innovative.', 5),

('Fatima Okafor', 'Data Science Manager',
 'Victor''s technical skills in machine learning are exceptional. He helped us build robust models with outstanding performance.', 5)
ON CONFLICT DO NOTHING;

-- Insert skills
INSERT INTO skills (category, skills) VALUES
('AI & Data Training', ARRAY['RLHF', 'Supervised Fine-Tuning (SFT)', 'LLM Evaluation', 'Code Hallucination Detection', 'Prompt Engineering', 'Ground Truth Creation']),

('Languages & Frameworks', ARRAY['Python (Django, Flask, SQLAlchemy)', 'JavaScript/TypeScript (React.js, Node.js, Redux)', 'Elixir (Phoenix)', 'SQL', 'HTML5/CSS3']),

('Engineering Standards', ARRAY['Agile/Scrum Methodologies', 'Test-Driven Development (TDD)', 'Pair Programming', 'Code Reviews', 'Git Flow Workflow', 'MVC Architecture', 'REST API Design']),

('DevOps & Infrastructure', ARRAY['AWS (EC2, S3)', 'Docker', 'Kubernetes', 'CI/CD Pipelines (GitHub Actions)', 'PostgreSQL', 'Redis', 'Linux/Bash'])
ON CONFLICT DO NOTHING;

-- ============================================
-- DONE! ✅
-- ============================================