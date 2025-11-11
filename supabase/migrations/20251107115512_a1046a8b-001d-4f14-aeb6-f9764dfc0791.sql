-- Create announcements table for workshop updates
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workshop_id UUID NOT NULL REFERENCES public.workshops(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Admins can manage announcements
CREATE POLICY "Admins can manage announcements"
ON public.announcements
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'superadmin'::app_role));

-- Everyone can view announcements
CREATE POLICY "Everyone can view announcements"
ON public.announcements
FOR SELECT
USING (true);

-- Add index for performance
CREATE INDEX idx_announcements_workshop_id ON public.announcements(workshop_id);

-- Add is_ended column to workshop_tasks for "End Task" functionality
ALTER TABLE public.workshop_tasks ADD COLUMN IF NOT EXISTS is_ended BOOLEAN DEFAULT false;

-- Add workshop status field
ALTER TABLE public.workshops ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';

-- Create index for realtime performance
CREATE INDEX idx_workshop_tasks_workshop_id ON public.workshop_tasks(workshop_id);
CREATE INDEX idx_group_members_group_id ON public.group_members(group_id);