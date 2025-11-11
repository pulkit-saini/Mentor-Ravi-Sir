-- Add unique constraint for workshop_id and group_id combination
-- This is needed for the leaderboard upsert operation
ALTER TABLE workshop_leaderboard 
DROP CONSTRAINT IF EXISTS workshop_leaderboard_workshop_id_group_id_key;

ALTER TABLE workshop_leaderboard 
ADD CONSTRAINT workshop_leaderboard_workshop_id_group_id_key 
UNIQUE (workshop_id, group_id);