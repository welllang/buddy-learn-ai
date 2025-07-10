import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  timezone: string;
  language: string;
  goal: string | null;
  learning_style: string | null;
  study_time: string | null;
  onboarding_completed: boolean;
  session_length: number;
  break_length: number;
  daily_goal: number;
  reminder_time: string;
  study_methods: string[];
  notifications: any;
  calendar_integration: boolean;
  auto_breaks: boolean;
  sound_enabled: boolean;
  dark_mode: boolean;
  study_style: string;
  difficulty_preference: string;
  difficulty_level: number;
  reminder_frequency: string;
  motivation_style: string;
  feedback_type: string;
  personality_type: string;
  adaptive_learning: boolean;
  progress_tracking: boolean;
  smart_suggestions: boolean;
  two_factor: boolean;
  session_timeout: string;
  login_notifications: boolean;
  data_export: boolean;
  privacy_mode: boolean;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        await fetchProfile(user.id);
      } else {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Error updating profile",
          description: "Please try again.",
          variant: "destructive"
        });
        return false;
      }

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile updated! ✅",
        description: "Your changes have been saved successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    profile,
    user,
    loading,
    updateProfile,
    refetch: () => user ? fetchProfile(user.id) : Promise.resolve()
  };
};