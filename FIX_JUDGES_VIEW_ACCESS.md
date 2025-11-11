# Fix Judges View Access - SQL Setup

Run these SQL commands in your **Supabase SQL Editor** to fix the judges viewing issue:

## 1. Ensure Foreign Key Relationship

```sql
-- Add foreign key relationship if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'workshop_judges_user_id_fkey'
  ) THEN
    ALTER TABLE workshop_judges 
    ADD CONSTRAINT workshop_judges_user_id_fkey 
    FOREIGN KEY (user_id) 
    REFERENCES profiles(id) 
    ON DELETE CASCADE;
  END IF;
END $$;
```

## 2. Enable RLS on workshop_judges

```sql
ALTER TABLE workshop_judges ENABLE ROW LEVEL SECURITY;
```

## 3. Drop Existing Policies (if any)

```sql
DROP POLICY IF EXISTS "Judges can view their own assignments" ON workshop_judges;
DROP POLICY IF EXISTS "Judges can view other judges in same workshop" ON workshop_judges;
DROP POLICY IF EXISTS "Admins can view all workshop judges" ON workshop_judges;
DROP POLICY IF EXISTS "Admins can insert workshop judges" ON workshop_judges;
DROP POLICY IF EXISTS "Admins can delete workshop judges" ON workshop_judges;
DROP POLICY IF EXISTS "Judges can view other judges profiles" ON profiles;
```

## 4. Create RLS Policies for workshop_judges

```sql
-- Allow judges to view their own assignments
CREATE POLICY "Judges can view their own assignments" ON workshop_judges
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow judges to view other judges in the same workshop
CREATE POLICY "Judges can view other judges in same workshop" ON workshop_judges
FOR SELECT
TO authenticated
USING (
  workshop_id IN (
    SELECT workshop_id 
    FROM workshop_judges 
    WHERE user_id = auth.uid()
  )
);

-- Allow admins to manage all workshop judges
CREATE POLICY "Admins can view all workshop judges" ON workshop_judges
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

CREATE POLICY "Admins can insert workshop judges" ON workshop_judges
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

CREATE POLICY "Admins can delete workshop judges" ON workshop_judges
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);
```

## 5. Update profiles RLS for Judges

```sql
-- Allow judges to view other judges' profiles in their workshops
CREATE POLICY "Judges can view other judges profiles" ON profiles
FOR SELECT
TO authenticated
USING (
  -- Allow judges to see profiles of other judges in their workshops
  EXISTS (
    SELECT 1 FROM workshop_judges wj1
    WHERE wj1.user_id = auth.uid()
    AND wj1.workshop_id IN (
      SELECT wj2.workshop_id 
      FROM workshop_judges wj2 
      WHERE wj2.user_id = profiles.id
    )
  )
  OR
  -- Allow viewing own profile
  id = auth.uid()
  OR
  -- Allow admins to view all profiles
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);
```

## 6. Verify Setup

After running these commands, verify everything works:

```sql
-- Check if foreign key exists
SELECT constraint_name, table_name 
FROM information_schema.table_constraints 
WHERE constraint_name = 'workshop_judges_user_id_fkey';

-- Check RLS policies
SELECT tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('workshop_judges', 'profiles');
```

---

**After running these SQL commands**, refresh your application and the judges view should work properly! ✅
