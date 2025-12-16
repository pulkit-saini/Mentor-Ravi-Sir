-- Create contact_queries table for storing contact form submissions
CREATE TABLE public.contact_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  query_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_queries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact queries
CREATE POLICY "Anyone can submit contact queries" 
ON public.contact_queries 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view all contact queries
CREATE POLICY "Admins can view all contact queries" 
ON public.contact_queries 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'superadmin')
);

-- Only admins can update contact queries
CREATE POLICY "Admins can update contact queries" 
ON public.contact_queries 
FOR UPDATE 
USING (
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'superadmin')
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contact_queries_updated_at
BEFORE UPDATE ON public.contact_queries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();