
-- Extend profiles table with comprehensive user data
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'America/New_York';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';

-- Onboarding data
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS goal TEXT CHECK (goal IN ('academic', 'skill', 'career'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS learning_style TEXT CHECK (learning_style IN ('visual', 'audio', 'hands-on'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS study_time TEXT CHECK (study_time IN ('morning', 'afternoon', 'evening'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Study preferences
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS session_length INTEGER DEFAULT 45;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS break_length INTEGER DEFAULT 15;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_goal INTEGER DEFAULT 3;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS reminder_time TEXT DEFAULT '09:00';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS study_methods TEXT[] DEFAULT ARRAY['pomodoro', 'active-recall'];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notifications JSONB DEFAULT '{"email": true, "push": true, "reminders": true, "achievements": true}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS calendar_integration BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS auto_breaks BOOLEAN DEFAULT TRUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS sound_enabled BOOLEAN DEFAULT TRUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dark_mode BOOLEAN DEFAULT FALSE;

-- AI configuration
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS study_style TEXT DEFAULT 'balanced';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS difficulty_preference TEXT DEFAULT 'adaptive';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS difficulty_level INTEGER DEFAULT 3;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS reminder_frequency TEXT DEFAULT 'moderate';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS motivation_style TEXT DEFAULT 'encouraging';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS feedback_type TEXT DEFAULT 'detailed';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS personality_type TEXT DEFAULT 'supportive';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS adaptive_learning BOOLEAN DEFAULT TRUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS progress_tracking BOOLEAN DEFAULT TRUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS smart_suggestions BOOLEAN DEFAULT TRUE;

-- Security settings
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS two_factor BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS session_timeout TEXT DEFAULT '24';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS login_notifications BOOLEAN DEFAULT TRUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS data_export BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS privacy_mode BOOLEAN DEFAULT FALSE;

-- Update the handle_new_user function to include first_name and last_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
