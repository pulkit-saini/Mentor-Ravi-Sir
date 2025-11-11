-- Create judge_scores table for storing individual judge evaluations
CREATE TABLE IF NOT EXISTS public.judge_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judge_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES workshop_tasks(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES workshop_groups(id) ON DELETE CASCADE,
  submission_id UUID NOT NULL REFERENCES team_task_submissions(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 0),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(judge_id, submission_id)
);

-- Enable RLS
ALTER TABLE public.judge_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for judge_scores
CREATE POLICY "Judges can view own scores"
  ON public.judge_scores FOR SELECT
  USING (auth.uid() = judge_id OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

CREATE POLICY "Judges can insert own scores"
  ON public.judge_scores FOR INSERT
  WITH CHECK (auth.uid() = judge_id AND has_role(auth.uid(), 'judge'));

CREATE POLICY "Judges can update own scores"
  ON public.judge_scores FOR UPDATE
  USING (auth.uid() = judge_id AND has_role(auth.uid(), 'judge'));

CREATE POLICY "Admins can manage all scores"
  ON public.judge_scores FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

-- Add trigger for updated_at
CREATE TRIGGER update_judge_scores_updated_at
  BEFORE UPDATE ON public.judge_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Set replica identity for real-time updates
ALTER TABLE judge_scores REPLICA IDENTITY FULL;
ALTER TABLE team_task_submissions REPLICA IDENTITY FULL;

-- Create function to update leaderboard after scoring
CREATE OR REPLACE FUNCTION update_workshop_leaderboard()
RETURNS TRIGGER AS $$
BEGIN
  -- Update leaderboard entry for the team
  INSERT INTO workshop_leaderboard (workshop_id, group_id, total_score, tasks_completed)
  SELECT 
    NEW.workshop_id,
    NEW.group_id,
    COALESCE(SUM(js.score), 0) as total_score,
    COUNT(DISTINCT js.task_id) as tasks_completed
  FROM judge_scores js
  WHERE js.group_id = NEW.group_id AND js.workshop_id = NEW.workshop_id
  GROUP BY js.group_id, js.workshop_id
  ON CONFLICT (workshop_id, group_id) 
  DO UPDATE SET
    total_score = EXCLUDED.total_score,
    tasks_completed = EXCLUDED.tasks_completed,
    updated_at = NOW();

  -- Update ranks
  WITH ranked_teams AS (
    SELECT 
      id,
      ROW_NUMBER() OVER (PARTITION BY workshop_id ORDER BY total_score DESC, tasks_completed DESC) as new_rank
    FROM workshop_leaderboard
    WHERE workshop_id = NEW.workshop_id
  )
  UPDATE workshop_leaderboard wl
  SET rank = rt.new_rank
  FROM ranked_teams rt
  WHERE wl.id = rt.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update leaderboard when scores are added/updated
DROP TRIGGER IF EXISTS on_judge_score_change ON judge_scores;
CREATE TRIGGER on_judge_score_change
  AFTER INSERT OR UPDATE ON judge_scores
  FOR EACH ROW
  EXECUTE FUNCTION update_workshop_leaderboard();