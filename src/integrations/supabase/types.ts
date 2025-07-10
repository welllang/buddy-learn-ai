export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string | null
          created_at: string
          criteria: Json
          description: string | null
          icon: string | null
          id: string
          name: string
          points: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          criteria: Json
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          points?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          criteria?: Json
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          points?: number | null
        }
        Relationships: []
      }
      ai_interactions: {
        Row: {
          ai_response: string
          context_data: Json | null
          created_at: string
          difficulty_level: string | null
          feedback_rating: number | null
          id: string
          interaction_type: string
          model_version: string | null
          response_time_ms: number | null
          session_id: string | null
          topic: string | null
          user_id: string
          user_input: string | null
          was_helpful: boolean | null
        }
        Insert: {
          ai_response: string
          context_data?: Json | null
          created_at?: string
          difficulty_level?: string | null
          feedback_rating?: number | null
          id?: string
          interaction_type: string
          model_version?: string | null
          response_time_ms?: number | null
          session_id?: string | null
          topic?: string | null
          user_id: string
          user_input?: string | null
          was_helpful?: boolean | null
        }
        Update: {
          ai_response?: string
          context_data?: Json | null
          created_at?: string
          difficulty_level?: string | null
          feedback_rating?: number | null
          id?: string
          interaction_type?: string
          model_version?: string | null
          response_time_ms?: number | null
          session_id?: string | null
          topic?: string | null
          user_id?: string
          user_input?: string | null
          was_helpful?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_action_items: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          goal_id: string
          id: string
          is_completed: boolean | null
          order_index: number | null
          title: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          goal_id: string
          id?: string
          is_completed?: boolean | null
          order_index?: number | null
          title: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          goal_id?: string
          id?: string
          is_completed?: boolean | null
          order_index?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_action_items_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_analytics: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          goal_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          goal_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          goal_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_analytics_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_notes: {
        Row: {
          content: string
          created_at: string
          goal_id: string
          id: string
          note_type: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          goal_id: string
          id?: string
          note_type?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          goal_id?: string
          id?: string
          note_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_notes_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          category: string
          completed_at: string | null
          created_at: string
          description: string | null
          estimated_time_hours: number | null
          id: string
          priority: string
          progress: number | null
          related_study_plans: string[] | null
          status: string
          success_metrics: string | null
          target_date: string | null
          time_invested_hours: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          estimated_time_hours?: number | null
          id?: string
          priority?: string
          progress?: number | null
          related_study_plans?: string[] | null
          status?: string
          success_metrics?: string | null
          target_date?: string | null
          time_invested_hours?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          estimated_time_hours?: number | null
          id?: string
          priority?: string
          progress?: number | null
          related_study_plans?: string[] | null
          status?: string
          success_metrics?: string | null
          target_date?: string | null
          time_invested_hours?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          notification_type: string
          priority: string | null
          scheduled_for: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          notification_type: string
          priority?: string | null
          scheduled_for?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          notification_type?: string
          priority?: string | null
          scheduled_for?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          adaptive_learning: boolean | null
          auto_breaks: boolean | null
          avatar_url: string | null
          break_length: number | null
          calendar_integration: boolean | null
          created_at: string
          daily_goal: number | null
          dark_mode: boolean | null
          data_export: boolean | null
          difficulty_level: number | null
          difficulty_preference: string | null
          display_name: string | null
          feedback_type: string | null
          first_name: string | null
          goal: string | null
          id: string
          language: string | null
          last_name: string | null
          learning_style: string | null
          login_notifications: boolean | null
          motivation_style: string | null
          notifications: Json | null
          onboarding_completed: boolean | null
          personality_type: string | null
          privacy_mode: boolean | null
          progress_tracking: boolean | null
          reminder_frequency: string | null
          reminder_time: string | null
          session_length: number | null
          session_timeout: string | null
          smart_suggestions: boolean | null
          sound_enabled: boolean | null
          study_methods: string[] | null
          study_style: string | null
          study_time: string | null
          timezone: string | null
          two_factor: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          adaptive_learning?: boolean | null
          auto_breaks?: boolean | null
          avatar_url?: string | null
          break_length?: number | null
          calendar_integration?: boolean | null
          created_at?: string
          daily_goal?: number | null
          dark_mode?: boolean | null
          data_export?: boolean | null
          difficulty_level?: number | null
          difficulty_preference?: string | null
          display_name?: string | null
          feedback_type?: string | null
          first_name?: string | null
          goal?: string | null
          id?: string
          language?: string | null
          last_name?: string | null
          learning_style?: string | null
          login_notifications?: boolean | null
          motivation_style?: string | null
          notifications?: Json | null
          onboarding_completed?: boolean | null
          personality_type?: string | null
          privacy_mode?: boolean | null
          progress_tracking?: boolean | null
          reminder_frequency?: string | null
          reminder_time?: string | null
          session_length?: number | null
          session_timeout?: string | null
          smart_suggestions?: boolean | null
          sound_enabled?: boolean | null
          study_methods?: string[] | null
          study_style?: string | null
          study_time?: string | null
          timezone?: string | null
          two_factor?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          adaptive_learning?: boolean | null
          auto_breaks?: boolean | null
          avatar_url?: string | null
          break_length?: number | null
          calendar_integration?: boolean | null
          created_at?: string
          daily_goal?: number | null
          dark_mode?: boolean | null
          data_export?: boolean | null
          difficulty_level?: number | null
          difficulty_preference?: string | null
          display_name?: string | null
          feedback_type?: string | null
          first_name?: string | null
          goal?: string | null
          id?: string
          language?: string | null
          last_name?: string | null
          learning_style?: string | null
          login_notifications?: boolean | null
          motivation_style?: string | null
          notifications?: Json | null
          onboarding_completed?: boolean | null
          personality_type?: string | null
          privacy_mode?: boolean | null
          progress_tracking?: boolean | null
          reminder_frequency?: string | null
          reminder_time?: string | null
          session_length?: number | null
          session_timeout?: string | null
          smart_suggestions?: boolean | null
          sound_enabled?: boolean | null
          study_methods?: string[] | null
          study_style?: string | null
          study_time?: string | null
          timezone?: string | null
          two_factor?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      schedule_events: {
        Row: {
          all_day: boolean | null
          color: string | null
          created_at: string
          description: string | null
          end_time: string
          event_type: string
          external_calendar_id: string | null
          id: string
          location: string | null
          metadata: Json | null
          priority: string | null
          recurring_pattern: string | null
          recurring_until: string | null
          reminder_minutes: number[] | null
          session_id: string | null
          start_time: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          all_day?: boolean | null
          color?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          event_type: string
          external_calendar_id?: string | null
          id?: string
          location?: string | null
          metadata?: Json | null
          priority?: string | null
          recurring_pattern?: string | null
          recurring_until?: string | null
          reminder_minutes?: number[] | null
          session_id?: string | null
          start_time: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          all_day?: boolean | null
          color?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          event_type?: string
          external_calendar_id?: string | null
          id?: string
          location?: string | null
          metadata?: Json | null
          priority?: string | null
          recurring_pattern?: string | null
          recurring_until?: string | null
          reminder_minutes?: number[] | null
          session_id?: string | null
          start_time?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      study_analytics: {
        Row: {
          average_confidence: number | null
          average_effectiveness: number | null
          average_focus_level: number | null
          break_time_minutes: number | null
          completed_objectives: number | null
          created_at: string
          date: string
          distraction_count: number | null
          id: string
          month_start: string
          productivity_score: number | null
          retention_score: number | null
          session_count: number | null
          session_id: string | null
          streak_days: number | null
          study_plan_id: string | null
          subjects_studied: string[] | null
          techniques_used: string[] | null
          total_objectives: number | null
          total_study_time_minutes: number | null
          user_id: string
          week_start: string
        }
        Insert: {
          average_confidence?: number | null
          average_effectiveness?: number | null
          average_focus_level?: number | null
          break_time_minutes?: number | null
          completed_objectives?: number | null
          created_at?: string
          date?: string
          distraction_count?: number | null
          id?: string
          month_start: string
          productivity_score?: number | null
          retention_score?: number | null
          session_count?: number | null
          session_id?: string | null
          streak_days?: number | null
          study_plan_id?: string | null
          subjects_studied?: string[] | null
          techniques_used?: string[] | null
          total_objectives?: number | null
          total_study_time_minutes?: number | null
          user_id: string
          week_start: string
        }
        Update: {
          average_confidence?: number | null
          average_effectiveness?: number | null
          average_focus_level?: number | null
          break_time_minutes?: number | null
          completed_objectives?: number | null
          created_at?: string
          date?: string
          distraction_count?: number | null
          id?: string
          month_start?: string
          productivity_score?: number | null
          retention_score?: number | null
          session_count?: number | null
          session_id?: string | null
          streak_days?: number | null
          study_plan_id?: string | null
          subjects_studied?: string[] | null
          techniques_used?: string[] | null
          total_objectives?: number | null
          total_study_time_minutes?: number | null
          user_id?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_analytics_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_analytics_study_plan_id_fkey"
            columns: ["study_plan_id"]
            isOneToOne: false
            referencedRelation: "study_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      study_materials: {
        Row: {
          author: string | null
          created_at: string
          description: string | null
          difficulty: string | null
          duration_minutes: number | null
          file_path: string | null
          file_size: number | null
          id: string
          is_required: boolean | null
          material_type: string
          order_index: number | null
          page_end: number | null
          page_start: number | null
          session_id: string | null
          study_plan_id: string | null
          tags: string[] | null
          title: string
          url: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_required?: boolean | null
          material_type: string
          order_index?: number | null
          page_end?: number | null
          page_start?: number | null
          session_id?: string | null
          study_plan_id?: string | null
          tags?: string[] | null
          title: string
          url?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_required?: boolean | null
          material_type?: string
          order_index?: number | null
          page_end?: number | null
          page_start?: number | null
          session_id?: string | null
          study_plan_id?: string | null
          tags?: string[] | null
          title?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_materials_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_materials_study_plan_id_fkey"
            columns: ["study_plan_id"]
            isOneToOne: false
            referencedRelation: "study_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      study_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          is_favorite: boolean | null
          material_id: string | null
          note_type: string | null
          order_index: number | null
          parent_note_id: string | null
          session_id: string | null
          study_plan_id: string | null
          tags: string[] | null
          title: string | null
          updated_at: string
          user_id: string
          visibility: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_favorite?: boolean | null
          material_id?: string | null
          note_type?: string | null
          order_index?: number | null
          parent_note_id?: string | null
          session_id?: string | null
          study_plan_id?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id: string
          visibility?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_favorite?: boolean | null
          material_id?: string | null
          note_type?: string | null
          order_index?: number | null
          parent_note_id?: string | null
          session_id?: string | null
          study_plan_id?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_notes_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_notes_parent_note_id_fkey"
            columns: ["parent_note_id"]
            isOneToOne: false
            referencedRelation: "study_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_notes_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_notes_study_plan_id_fkey"
            columns: ["study_plan_id"]
            isOneToOne: false
            referencedRelation: "study_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      study_plan_days: {
        Row: {
          completed: boolean | null
          created_at: string
          day_number: number
          difficulty: string | null
          estimated_time_minutes: number | null
          id: string
          study_method: string | null
          subtopic: string | null
          topic: string
          week_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          day_number: number
          difficulty?: string | null
          estimated_time_minutes?: number | null
          id?: string
          study_method?: string | null
          subtopic?: string | null
          topic: string
          week_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          day_number?: number
          difficulty?: string | null
          estimated_time_minutes?: number | null
          id?: string
          study_method?: string | null
          subtopic?: string | null
          topic?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_plan_days_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "study_plan_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      study_plan_weeks: {
        Row: {
          completed: boolean | null
          created_at: string
          description: string | null
          id: string
          study_plan_id: string
          title: string
          week_number: number
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          study_plan_id: string
          title: string
          week_number: number
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          study_plan_id?: string
          title?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "study_plan_weeks_study_plan_id_fkey"
            columns: ["study_plan_id"]
            isOneToOne: false
            referencedRelation: "study_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      study_plans: {
        Row: {
          ai_generated: boolean | null
          category: string | null
          created_at: string
          daily_time_minutes: number | null
          description: string | null
          difficulty: string | null
          estimated_time_hours: number | null
          id: string
          learning_style: string | null
          metadata: Json | null
          priority: string | null
          progress: number | null
          status: string | null
          subject: string
          target_date: string | null
          time_invested_hours: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_generated?: boolean | null
          category?: string | null
          created_at?: string
          daily_time_minutes?: number | null
          description?: string | null
          difficulty?: string | null
          estimated_time_hours?: number | null
          id?: string
          learning_style?: string | null
          metadata?: Json | null
          priority?: string | null
          progress?: number | null
          status?: string | null
          subject: string
          target_date?: string | null
          time_invested_hours?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_generated?: boolean | null
          category?: string | null
          created_at?: string
          daily_time_minutes?: number | null
          description?: string | null
          difficulty?: string | null
          estimated_time_hours?: number | null
          id?: string
          learning_style?: string | null
          metadata?: Json | null
          priority?: string | null
          progress?: number | null
          status?: string | null
          subject?: string
          target_date?: string | null
          time_invested_hours?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          breaks_taken: number | null
          completed_objectives: string[] | null
          confidence_rating: number | null
          created_at: string
          day_id: string | null
          distractions_count: number | null
          duration_minutes: number | null
          effectiveness_rating: number | null
          end_time: string | null
          energy_level: string | null
          focus_level: number | null
          id: string
          location: string | null
          notes: string | null
          objectives: string[] | null
          progress: number | null
          session_type: string | null
          start_time: string | null
          status: string | null
          study_method: string | null
          study_plan_id: string | null
          subtopic: string | null
          techniques_used: string[] | null
          title: string
          topic: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          breaks_taken?: number | null
          completed_objectives?: string[] | null
          confidence_rating?: number | null
          created_at?: string
          day_id?: string | null
          distractions_count?: number | null
          duration_minutes?: number | null
          effectiveness_rating?: number | null
          end_time?: string | null
          energy_level?: string | null
          focus_level?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          objectives?: string[] | null
          progress?: number | null
          session_type?: string | null
          start_time?: string | null
          status?: string | null
          study_method?: string | null
          study_plan_id?: string | null
          subtopic?: string | null
          techniques_used?: string[] | null
          title: string
          topic?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          breaks_taken?: number | null
          completed_objectives?: string[] | null
          confidence_rating?: number | null
          created_at?: string
          day_id?: string | null
          distractions_count?: number | null
          duration_minutes?: number | null
          effectiveness_rating?: number | null
          end_time?: string | null
          energy_level?: string | null
          focus_level?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          objectives?: string[] | null
          progress?: number | null
          session_type?: string | null
          start_time?: string | null
          status?: string | null
          study_method?: string | null
          study_plan_id?: string | null
          subtopic?: string | null
          techniques_used?: string[] | null
          title?: string
          topic?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "study_plan_days"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_study_plan_id_fkey"
            columns: ["study_plan_id"]
            isOneToOne: false
            referencedRelation: "study_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number | null
          billing_cycle: string | null
          cancel_at_period_end: boolean | null
          created_at: string
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_name: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string
          usage_limits: Json | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          billing_cycle?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          usage_limits?: Json | null
          user_id: string
        }
        Update: {
          amount?: number | null
          billing_cycle?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          usage_limits?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      support_messages: {
        Row: {
          attachments: Json | null
          created_at: string
          id: string
          is_internal: boolean | null
          message_content: string
          sender_name: string | null
          sender_type: string
          ticket_id: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string
          id?: string
          is_internal?: boolean | null
          message_content: string
          sender_name?: string | null
          sender_type: string
          ticket_id: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string
          id?: string
          is_internal?: boolean | null
          message_content?: string
          sender_name?: string | null
          sender_type?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string
          description: string
          id: string
          priority: string | null
          resolution: string | null
          resolved_at: string | null
          satisfaction_rating: number | null
          status: string | null
          subject: string
          ticket_number: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category: string
          created_at?: string
          description: string
          id?: string
          priority?: string | null
          resolution?: string | null
          resolved_at?: string | null
          satisfaction_rating?: number | null
          status?: string | null
          subject: string
          ticket_number: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          priority?: string | null
          resolution?: string | null
          resolved_at?: string | null
          satisfaction_rating?: number | null
          status?: string | null
          subject?: string
          ticket_number?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          ai_sessions_used: number | null
          api_calls_made: number | null
          created_at: string
          features_used: Json | null
          id: string
          period_end: string
          period_start: string
          storage_used_mb: number | null
          study_plans_created: number | null
          subscription_id: string | null
          support_tickets_created: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_sessions_used?: number | null
          api_calls_made?: number | null
          created_at?: string
          features_used?: Json | null
          id?: string
          period_end: string
          period_start: string
          storage_used_mb?: number | null
          study_plans_created?: number | null
          subscription_id?: string | null
          support_tickets_created?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_sessions_used?: number | null
          api_calls_made?: number | null
          created_at?: string
          features_used?: Json | null
          id?: string
          period_end?: string
          period_start?: string
          storage_used_mb?: number | null
          study_plans_created?: number | null
          subscription_id?: string | null
          support_tickets_created?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_tracking_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          progress: number | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          progress?: number | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          progress?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_streaks: {
        Row: {
          created_at: string
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          streak_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      track_goal_event: {
        Args: { p_goal_id: string; p_event_type: string; p_event_data?: Json }
        Returns: undefined
      }
      update_user_streak: {
        Args: { p_user_id: string; p_streak_type: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
