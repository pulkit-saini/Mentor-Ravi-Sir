-- Add foreign key from user_workshops to profiles
-- This establishes the relationship for proper joins
ALTER TABLE public.user_workshops
ADD CONSTRAINT fk_user_workshops_profiles
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;