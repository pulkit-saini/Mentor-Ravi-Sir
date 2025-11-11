-- Create feedback table for post-workshop feedback
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workshop_id UUID NOT NULL REFERENCES public.workshops(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  suggestions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, workshop_id)
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for feedback
CREATE POLICY "Users can insert own feedback"
ON public.feedback FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own feedback"
ON public.feedback FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all feedback"
ON public.feedback FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'superadmin'::app_role));

-- Create mentorship_requests table
CREATE TABLE IF NOT EXISTS public.mentorship_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workshop_id UUID REFERENCES public.workshops(id) ON DELETE SET NULL,
  idea_title TEXT NOT NULL,
  idea_description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'contacted')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentorship_requests
CREATE POLICY "Users can insert own mentorship requests"
ON public.mentorship_requests FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own mentorship requests"
ON public.mentorship_requests FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own mentorship requests"
ON public.mentorship_requests FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all mentorship requests"
ON public.mentorship_requests FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'superadmin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_mentorship_requests_updated_at
BEFORE UPDATE ON public.mentorship_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add is_active flag to workshop_tasks if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'workshop_tasks' 
                 AND column_name = 'is_active') THEN
    ALTER TABLE public.workshop_tasks ADD COLUMN is_active BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Add start_time to workshop_tasks for timer functionality
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'workshop_tasks' 
                 AND column_name = 'start_time') THEN
    ALTER TABLE public.workshop_tasks ADD COLUMN start_time TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;