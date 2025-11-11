# Fix Workshop Judges Data Visibility

## Issue
The admin dashboard cannot display judges because of missing RLS policies on the `workshop_judges` table.

## Solution
Run the following SQL commands in your Supabase SQL Editor:

### Step 1: Add Foreign Key Relationship
```sql
-- Add foreign key relationship from workshop_judges to profiles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'workshop_judges_user_id_fkey'
    AND table_name = 'workshop_judges'
  ) THEN
    ALTER TABLE workshop_judges
    ADD CONSTRAINT workshop_judges_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
```

### Step 2: Setup RLS Policies
```sql
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can manage workshop judges" ON workshop_judges;
DROP POLICY IF EXISTS "Judges can view their assignments" ON workshop_judges;
DROP POLICY IF EXISTS "Admins can view all workshop judges" ON workshop_judges;
DROP POLICY IF EXISTS "Admins can insert workshop judges" ON workshop_judges;
DROP POLICY IF EXISTS "Admins can delete workshop judges" ON workshop_judges;

-- Enable RLS
ALTER TABLE workshop_judges ENABLE ROW LEVEL SECURITY;

-- Admins can SELECT all workshop judges
CREATE POLICY "Admins can view all workshop judges"
ON workshop_judges
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can INSERT workshop judges
CREATE POLICY "Admins can insert workshop judges"
ON workshop_judges
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can DELETE workshop judges
CREATE POLICY "Admins can delete workshop judges"
ON workshop_judges
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Judges can view their own assignments
CREATE POLICY "Judges can view their assignments"
ON workshop_judges
FOR SELECT
TO authenticated
USING (user_id = auth.uid() AND public.has_role(auth.uid(), 'judge'));
```

### Step 3: Fix Profiles Table RLS
```sql
-- Drop existing profile policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;

-- Admins can view all profiles (needed for joins)
CREATE POLICY "Admins can view all profiles"
ON profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own profile
CREATE POLICY "Users can view their own profile"
ON profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());
```

## How to Run
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste each step above
4. Run each query one by one
5. Refresh the admin dashboard

After running these commands, the judges data should be visible in the admin dashboard.
