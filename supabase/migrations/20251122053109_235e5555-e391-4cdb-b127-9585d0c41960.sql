-- Update the admin user's role from superadmin to admin
UPDATE user_roles 
SET role = 'admin' 
WHERE user_id = '5fdf8fb3-1eb5-4fd0-8967-fdd93f308d2b';