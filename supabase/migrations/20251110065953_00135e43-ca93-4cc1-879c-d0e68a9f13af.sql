-- Add additional fields to internship_applications table for complete application data
ALTER TABLE internship_applications 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS resume_url TEXT,
ADD COLUMN IF NOT EXISTS cover_letter TEXT;

-- Add more fields to internships table for complete job descriptions
ALTER TABLE internships
ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Remote',
ADD COLUMN IF NOT EXISTS mode TEXT DEFAULT 'Remote',
ADD COLUMN IF NOT EXISTS skills TEXT[],
ADD COLUMN IF NOT EXISTS responsibilities TEXT[],
ADD COLUMN IF NOT EXISTS requirements TEXT[];

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_internship_applications_user_id ON internship_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_internship_applications_internship_id ON internship_applications(internship_id);