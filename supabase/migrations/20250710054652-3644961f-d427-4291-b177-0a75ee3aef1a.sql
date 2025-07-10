-- Create comprehensive goals management system

-- Goals table
CREATE TABLE public.goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('short-term', 'medium-term', 'long-term', 'exam-preparation', 'skill-development')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  target_date DATE,
  success_metrics TEXT,
  related_study_plans TEXT[],
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  estimated_time_hours INTEGER,
  time_invested_hours INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Goal milestones/action items
CREATE TABLE public.goal_action_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  due_date DATE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Goal notes and reflections
CREATE TABLE public.goal_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  note_type TEXT DEFAULT 'reflection' CHECK (note_type IN ('reflection', 'progress', 'obstacle', 'insight')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Achievement definitions
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'goals', 'streaks', 'subjects', 'time')),
  criteria JSONB NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User achievements
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  progress INTEGER DEFAULT 100,
  UNIQUE(user_id, achievement_id)
);

-- Goal analytics tracking
CREATE TABLE public.goal_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  goal_id UUID REFERENCES public.goals(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('created', 'started', 'progress_updated', 'milestone_completed', 'completed', 'failed', 'paused', 'resumed')),
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User streaks tracking
CREATE TABLE public.user_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  streak_type TEXT NOT NULL CHECK (streak_type IN ('daily_goal', 'study_time', 'goal_completion')),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, streak_type)
);

-- Enable Row Level Security
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for goals
CREATE POLICY "Users can view their own goals" ON public.goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals" ON public.goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" ON public.goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals" ON public.goals
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for goal_action_items
CREATE POLICY "Users can view action items for their goals" ON public.goal_action_items
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.goals WHERE goals.id = goal_action_items.goal_id AND goals.user_id = auth.uid()
  ));

CREATE POLICY "Users can create action items for their goals" ON public.goal_action_items
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.goals WHERE goals.id = goal_action_items.goal_id AND goals.user_id = auth.uid()
  ));

CREATE POLICY "Users can update action items for their goals" ON public.goal_action_items
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.goals WHERE goals.id = goal_action_items.goal_id AND goals.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete action items for their goals" ON public.goal_action_items
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.goals WHERE goals.id = goal_action_items.goal_id AND goals.user_id = auth.uid()
  ));

-- RLS Policies for goal_notes
CREATE POLICY "Users can view their own goal notes" ON public.goal_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goal notes" ON public.goal_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goal notes" ON public.goal_notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goal notes" ON public.goal_notes
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for achievements (read-only for all users)
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can earn achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for goal_analytics
CREATE POLICY "Users can view their own analytics" ON public.goal_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analytics" ON public.goal_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_streaks
CREATE POLICY "Users can view their own streaks" ON public.user_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own streaks" ON public.user_streaks
  FOR ALL USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON public.goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_streaks_updated_at
  BEFORE UPDATE ON public.user_streaks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default achievements
INSERT INTO public.achievements (name, description, icon, category, criteria, points) VALUES
('First Goal', 'Created your first goal', 'Target', 'goals', '{"goals_created": 1}', 10),
('Goal Setter', 'Created 5 goals', 'Target', 'goals', '{"goals_created": 5}', 25),
('Goal Master', 'Created 20 goals', 'Target', 'goals', '{"goals_created": 20}', 100),
('First Achievement', 'Completed your first goal', 'Trophy', 'goals', '{"goals_completed": 1}', 20),
('Achiever', 'Completed 5 goals', 'Trophy', 'goals', '{"goals_completed": 5}', 50),
('Goal Crusher', 'Completed 25 goals', 'Trophy', 'goals', '{"goals_completed": 25}', 200),
('Week Warrior', 'Study streak of 7 days', 'Zap', 'streaks', '{"daily_streak": 7}', 30),
('Month Master', 'Study streak of 30 days', 'Zap', 'streaks', '{"daily_streak": 30}', 150),
('Subject Expert', 'Master 3 different subjects', 'BookOpen', 'subjects', '{"subjects_mastered": 3}', 75),
('Time Manager', 'Invest 100 hours in goals', 'Clock', 'time', '{"total_time_hours": 100}', 100);

-- Create function to track goal analytics
CREATE OR REPLACE FUNCTION public.track_goal_event(
  p_goal_id UUID,
  p_event_type TEXT,
  p_event_data JSONB DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.goal_analytics (user_id, goal_id, event_type, event_data)
  SELECT user_id, p_goal_id, p_event_type, p_event_data
  FROM public.goals WHERE id = p_goal_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update user streaks
CREATE OR REPLACE FUNCTION public.update_user_streak(
  p_user_id UUID,
  p_streak_type TEXT
)
RETURNS void AS $$
DECLARE
  current_date DATE := CURRENT_DATE;
  streak_record RECORD;
BEGIN
  SELECT * INTO streak_record 
  FROM public.user_streaks 
  WHERE user_id = p_user_id AND streak_type = p_streak_type;
  
  IF streak_record IS NULL THEN
    INSERT INTO public.user_streaks (user_id, streak_type, current_streak, longest_streak, last_activity_date)
    VALUES (p_user_id, p_streak_type, 1, 1, current_date);
  ELSE
    IF streak_record.last_activity_date = current_date - INTERVAL '1 day' THEN
      -- Continue streak
      UPDATE public.user_streaks 
      SET current_streak = current_streak + 1,
          longest_streak = GREATEST(longest_streak, current_streak + 1),
          last_activity_date = current_date,
          updated_at = now()
      WHERE user_id = p_user_id AND streak_type = p_streak_type;
    ELSIF streak_record.last_activity_date = current_date THEN
      -- Already counted today, do nothing
      RETURN;
    ELSE
      -- Reset streak
      UPDATE public.user_streaks 
      SET current_streak = 1,
          last_activity_date = current_date,
          updated_at = now()
      WHERE user_id = p_user_id AND streak_type = p_streak_type;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;