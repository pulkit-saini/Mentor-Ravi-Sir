
-- Insert 3 internships
INSERT INTO internships (title, company, description, duration)
VALUES 
(
  'AI / ML Intern',
  'Ravi Rautela Mentorship Hub',
  'Work on real-world AI & ML projects, model training, and data operations. Remote / Hybrid opportunity.',
  '3–6 Months'
),
(
  'Full Stack Intern',
  'Ravi Rautela Mentorship Hub',
  'Build and maintain MERN-based applications with real mentors. Remote / Hybrid opportunity.',
  '3–6 Months'
),
(
  'Google Workspace Intern',
  'Ravi Rautela Mentorship Hub',
  'Assist in managing and automating Google Workspace tasks. Remote position.',
  '3 Months'
);

-- Insert Graphic Era Fest event
INSERT INTO events (title, description, banner_url, start_at, end_at, location, status)
VALUES (
  'Graphic Era Fest',
  'Join us for an exciting tech and cultural fest at Graphic Era University featuring competitions, workshops, performances, and networking opportunities.',
  '/src/assets/event-fest-o-fun.png',
  '2025-12-15 10:00:00+00',
  '2025-12-15 18:00:00+00',
  'Graphic Era University',
  'upcoming'
);
