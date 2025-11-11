-- Add mobile_number field to profiles table
ALTER TABLE public.profiles
ADD COLUMN mobile_number TEXT;

-- Update the handle_new_user function to include mobile_number
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name, email, avatar_url, mobile_number)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'mobile_number'
  );
  
  -- Assign default role (student)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    'student'::app_role
  );
  
  RETURN NEW;
END;
$$;