-- Add additional fields to internship_applications table for Mangalmay Group Internship
ALTER TABLE public.internship_applications 
ADD COLUMN IF NOT EXISTS course_branch text,
ADD COLUMN IF NOT EXISTS year_semester text,
ADD COLUMN IF NOT EXISTS selected_task text,
ADD COLUMN IF NOT EXISTS why_join text,
ADD COLUMN IF NOT EXISTS github_profile text,
ADD COLUMN IF NOT EXISTS portfolio_link text;

-- Insert Mangalmay Group Internship
INSERT INTO public.internships (
  title,
  company,
  description,
  duration,
  mode,
  location,
  requirements,
  responsibilities,
  skills
) VALUES (
  'Mangalmay Group Internship',
  'Mangalmay Group (Under the Aegis of MangosOrange Group)',
  'Work on real-world campus and industry projects under Mangalmay Group. Gain hands-on experience while contributing to high-impact technical and operational tasks. This is a task-based selection internship where you will complete one of four challenging projects within 5 days.',
  '3-6 Months',
  'Online',
  'Remote',
  ARRAY[
    'Complete any one task within 5 days',
    'Upload project code to GitHub (public repository)',
    'Deploy project on Vercel or Netlify',
    'Submit live project link and GitHub repository',
    'Create PDF report describing approach and learning experience',
    'Understanding of frontend and backend technologies',
    'Familiarity with Google Workspace tools recommended'
  ],
  ARRAY[
    'Complete chosen project task within timeline',
    'Develop functional prototype with clean code',
    'Document your approach and design choices',
    'Present and explain your code during interview',
    'Work on real-world campus and industry projects',
    'Contribute to high-impact technical tasks'
  ],
  ARRAY[
    'Frontend Development',
    'Backend Development',
    'Google Workspace APIs',
    'Gemini API',
    'Vision AI',
    'GitHub CI/CD',
    'Problem Solving',
    'Project Documentation'
  ]
) ON CONFLICT DO NOTHING;