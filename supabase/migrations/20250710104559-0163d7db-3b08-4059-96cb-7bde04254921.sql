-- Study Plans System
CREATE TABLE public.study_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert')) DEFAULT 'intermediate',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  category TEXT CHECK (category IN ('short-term', 'medium-term', 'long-term', 'exam-preparation', 'skill-development')) DEFAULT 'medium-term',
  target_date DATE,
  daily_time_minutes INTEGER DEFAULT 60,
  status TEXT CHECK (status IN ('active', 'paused', 'completed', 'draft')) DEFAULT 'active',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  estimated_time_hours INTEGER,
  time_invested_hours INTEGER DEFAULT 0,
  learning_style TEXT CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic', 'mixed')) DEFAULT 'mixed',
  ai_generated BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Study Plan Weeks/Modules
CREATE TABLE public.study_plan_weeks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  study_plan_id UUID NOT NULL REFERENCES public.study_plans(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Daily Study Topics
CREATE TABLE public.study_plan_days (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_id UUID NOT NULL REFERENCES public.study_plan_weeks(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  topic TEXT NOT NULL,
  subtopic TEXT,
  estimated_time_minutes INTEGER DEFAULT 60,
  completed BOOLEAN DEFAULT FALSE,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  study_method TEXT CHECK (study_method IN ('reading', 'practice', 'video', 'notes', 'group')) DEFAULT 'reading',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Study Sessions
CREATE TABLE public.study_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  study_plan_id UUID REFERENCES public.study_plans(id) ON DELETE SET NULL,
  day_id UUID REFERENCES public.study_plan_days(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  topic TEXT,
  subtopic TEXT,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  session_type TEXT CHECK (session_type IN ('regular', 'review', 'exam-prep', 'practice')) DEFAULT 'regular',
  study_method TEXT CHECK (study_method IN ('reading', 'practice', 'video', 'notes', 'group')) DEFAULT 'reading',
  location TEXT,
  status TEXT CHECK (status IN ('scheduled', 'active', 'paused', 'completed', 'cancelled')) DEFAULT 'scheduled',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  confidence_rating INTEGER CHECK (confidence_rating >= 1 AND confidence_rating <= 5),
  effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
  notes TEXT,
  energy_level TEXT CHECK (energy_level IN ('low', 'medium', 'high')),
  focus_level INTEGER CHECK (focus_level >= 1 AND focus_level <= 10),
  objectives TEXT[],
  completed_objectives TEXT[],
  breaks_taken INTEGER DEFAULT 0,
  distractions_count INTEGER DEFAULT 0,
  techniques_used TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Study Materials
CREATE TABLE public.study_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  study_plan_id UUID REFERENCES public.study_plans(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.study_sessions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  material_type TEXT CHECK (material_type IN ('pdf', 'video', 'article', 'book', 'course', 'notes', 'link')) NOT NULL,
  url TEXT,
  file_path TEXT,
  file_size INTEGER,
  duration_minutes INTEGER,
  page_start INTEGER,
  page_end INTEGER,
  author TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'intermediate',
  tags TEXT[],
  is_required BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Schedule Management
CREATE TABLE public.schedule_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.study_sessions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('study', 'break', 'review', 'exam', 'assignment', 'meeting')) NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  all_day BOOLEAN DEFAULT FALSE,
  location TEXT,
  reminder_minutes INTEGER[],
  recurring_pattern TEXT CHECK (recurring_pattern IN ('none', 'daily', 'weekly', 'monthly')),
  recurring_until DATE,
  color TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
  external_calendar_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Progress Analytics
CREATE TABLE public.study_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.study_sessions(id) ON DELETE CASCADE,
  study_plan_id UUID REFERENCES public.study_plans(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  week_start DATE NOT NULL,
  month_start DATE NOT NULL,
  total_study_time_minutes INTEGER DEFAULT 0,
  session_count INTEGER DEFAULT 0,
  completed_objectives INTEGER DEFAULT 0,
  total_objectives INTEGER DEFAULT 0,
  average_focus_level DECIMAL(3,2),
  average_confidence DECIMAL(3,2),
  average_effectiveness DECIMAL(3,2),
  break_time_minutes INTEGER DEFAULT 0,
  distraction_count INTEGER DEFAULT 0,
  subjects_studied TEXT[],
  techniques_used TEXT[],
  retention_score INTEGER CHECK (retention_score >= 0 AND retention_score <= 100),
  productivity_score INTEGER CHECK (productivity_score >= 0 AND productivity_score <= 100),
  streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Study Notes
CREATE TABLE public.study_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.study_sessions(id) ON DELETE CASCADE,
  study_plan_id UUID REFERENCES public.study_plans(id) ON DELETE CASCADE,
  material_id UUID REFERENCES public.study_materials(id) ON DELETE SET NULL,
  title TEXT,
  content TEXT NOT NULL,
  note_type TEXT CHECK (note_type IN ('summary', 'question', 'insight', 'todo', 'highlight', 'formula')) DEFAULT 'summary',
  tags TEXT[],
  is_favorite BOOLEAN DEFAULT FALSE,
  parent_note_id UUID REFERENCES public.study_notes(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  visibility TEXT CHECK (visibility IN ('private', 'shared', 'public')) DEFAULT 'private',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- AI Interactions
CREATE TABLE public.ai_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.study_sessions(id) ON DELETE SET NULL,
  interaction_type TEXT CHECK (interaction_type IN ('question', 'suggestion', 'coaching', 'explanation', 'quiz')) NOT NULL,
  user_input TEXT,
  ai_response TEXT NOT NULL,
  context_data JSONB,
  feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  was_helpful BOOLEAN,
  topic TEXT,
  difficulty_level TEXT,
  response_time_ms INTEGER,
  model_version TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Support System
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('technical', 'billing', 'feature', 'account', 'other')) NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('open', 'in_progress', 'waiting_response', 'resolved', 'closed')) DEFAULT 'open',
  assigned_to TEXT,
  resolution TEXT,
  satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Support Messages
CREATE TABLE public.support_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  sender_type TEXT CHECK (sender_type IN ('user', 'agent', 'system')) NOT NULL,
  sender_name TEXT,
  message_content TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  is_internal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Billing & Subscriptions
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_name TEXT CHECK (plan_name IN ('free', 'pro', 'team')) NOT NULL DEFAULT 'free',
  status TEXT CHECK (status IN ('active', 'cancelled', 'past_due', 'paused')) NOT NULL DEFAULT 'active',
  billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly')) DEFAULT 'monthly',
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  trial_end TIMESTAMP WITH TIME ZONE,
  usage_limits JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Usage Tracking
CREATE TABLE public.usage_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  study_plans_created INTEGER DEFAULT 0,
  ai_sessions_used INTEGER DEFAULT 0,
  storage_used_mb INTEGER DEFAULT 0,
  support_tickets_created INTEGER DEFAULT 0,
  api_calls_made INTEGER DEFAULT 0,
  features_used JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- System notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT CHECK (notification_type IN ('reminder', 'achievement', 'deadline', 'system', 'update')) NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plan_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plan_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Study Plans
CREATE POLICY "Users can manage their own study plans" ON public.study_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their plan weeks" ON public.study_plan_weeks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.study_plans WHERE id = study_plan_weeks.study_plan_id AND user_id = auth.uid())
);
CREATE POLICY "Users can manage their plan days" ON public.study_plan_days FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.study_plan_weeks w 
    JOIN public.study_plans p ON w.study_plan_id = p.id 
    WHERE w.id = study_plan_days.week_id AND p.user_id = auth.uid()
  )
);

-- RLS Policies for Study Sessions
CREATE POLICY "Users can manage their own study sessions" ON public.study_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage session materials" ON public.study_materials FOR ALL USING (
  (study_plan_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.study_plans WHERE id = study_materials.study_plan_id AND user_id = auth.uid())) OR
  (session_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.study_sessions WHERE id = study_materials.session_id AND user_id = auth.uid()))
);

-- RLS Policies for Schedule
CREATE POLICY "Users can manage their own schedule events" ON public.schedule_events FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Analytics
CREATE POLICY "Users can view their own analytics" ON public.study_analytics FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Notes
CREATE POLICY "Users can manage their own notes" ON public.study_notes FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for AI Interactions
CREATE POLICY "Users can view their own AI interactions" ON public.ai_interactions FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Support
CREATE POLICY "Users can manage their own support tickets" ON public.support_tickets FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view messages for their tickets" ON public.support_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.support_tickets WHERE id = support_messages.ticket_id AND user_id = auth.uid())
);

-- RLS Policies for Billing
CREATE POLICY "Users can view their own subscription" ON public.subscriptions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own usage tracking" ON public.usage_tracking FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Notifications
CREATE POLICY "Users can manage their own notifications" ON public.notifications FOR ALL USING (user_id IS NULL OR auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_study_plans_user_status ON public.study_plans(user_id, status);
CREATE INDEX idx_study_sessions_user_date ON public.study_sessions(user_id, start_time);
CREATE INDEX idx_schedule_events_user_time ON public.schedule_events(user_id, start_time, end_time);
CREATE INDEX idx_study_analytics_user_date ON public.study_analytics(user_id, date);
CREATE INDEX idx_notifications_user_read ON public.notifications(user_id, is_read, created_at);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status, created_at);

-- Trigger for automatic ticket numbering
CREATE OR REPLACE FUNCTION generate_ticket_number() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.ticket_number := 'TICK-' || to_char(now(), 'YYYY') || '-' || LPAD(nextval('ticket_sequence')::text, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE ticket_sequence START 1;

CREATE TRIGGER set_ticket_number
  BEFORE INSERT ON public.support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION generate_ticket_number();

-- Trigger for updating timestamps
CREATE TRIGGER update_study_plans_updated_at
  BEFORE UPDATE ON public.study_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_study_sessions_updated_at
  BEFORE UPDATE ON public.study_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_schedule_events_updated_at
  BEFORE UPDATE ON public.schedule_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_study_notes_updated_at
  BEFORE UPDATE ON public.study_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_usage_tracking_updated_at
  BEFORE UPDATE ON public.usage_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();