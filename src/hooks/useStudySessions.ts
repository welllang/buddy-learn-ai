import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

export type StudySession = Tables<"study_sessions">;
export type StudySessionInsert = TablesInsert<"study_sessions">;
export type StudySessionUpdate = TablesUpdate<"study_sessions">;

// Fetch all study sessions for the current user
export const useStudySessions = () => {
  return useQuery({
    queryKey: ["study-sessions"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("study_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as StudySession[];
    },
  });
};

// Fetch a single study session with related data
export const useStudySession = (id: string) => {
  return useQuery({
    queryKey: ["study-session", id],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("study_sessions")
        .select(`
          *,
          study_plans (title, subject),
          study_materials (
            id,
            title,
            material_type,
            url,
            file_path,
            description,
            duration_minutes,
            page_start,
            page_end
          )
        `)
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

// Create a new study session
export const useCreateStudySession = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (session: Omit<StudySessionInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("study_sessions")
        .insert({ ...session, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data as StudySession;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-sessions"] });
      toast({
        title: "Study Session Created! 📚",
        description: "Your study session has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create study session",
        variant: "destructive",
      });
    },
  });
};

// Update a study session
export const useUpdateStudySession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: StudySessionUpdate }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("study_sessions")
        .update(updates)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data as StudySession;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["study-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["study-session", data.id] });
    },
  });
};

// Delete a study session
export const useDeleteStudySession = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("study_sessions")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-sessions"] });
      toast({
        title: "Session Deleted",
        description: "Study session has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete study session",
        variant: "destructive",
      });
    },
  });
};

// Start a study session
export const useStartStudySession = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("study_sessions")
        .update({ 
          status: 'active',
          start_time: now,
          updated_at: now
        })
        .eq("id", sessionId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data as StudySession;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-sessions"] });
      toast({
        title: "Study Session Started! 🚀",
        description: "Good luck with your learning!",
      });
    },
  });
};

// Complete a study session
export const useCompleteStudySession = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      sessionId, 
      notes, 
      confidenceRating,
      focusLevel,
      effectivenessRating,
      completedObjectives,
      techniquesUsed
    }: {
      sessionId: string;
      notes?: string;
      confidenceRating?: number;
      focusLevel?: number;
      effectivenessRating?: number;
      completedObjectives?: string[];
      techniquesUsed?: string[];
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const now = new Date().toISOString();
      
      // Calculate duration if session has start_time
      const sessionQuery = await supabase
        .from("study_sessions")
        .select("start_time")
        .eq("id", sessionId)
        .single();

      let duration_minutes = null;
      if (sessionQuery.data?.start_time) {
        const startTime = new Date(sessionQuery.data.start_time);
        const endTime = new Date(now);
        duration_minutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
      }

      const { data, error } = await supabase
        .from("study_sessions")
        .update({ 
          status: 'completed',
          end_time: now,
          notes,
          confidence_rating: confidenceRating,
          focus_level: focusLevel,
          effectiveness_rating: effectivenessRating,
          completed_objectives: completedObjectives,
          techniques_used: techniquesUsed,
          duration_minutes,
          updated_at: now
        })
        .eq("id", sessionId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data as StudySession;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["study-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["study-session", data.id] });
      
      const minutes = data.duration_minutes || 0;
      toast({
        title: "Session Completed! 🎉",
        description: `Great job! You studied for ${minutes} minutes.`,
      });
    },
  });
};