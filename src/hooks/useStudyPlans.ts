import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

export type StudyPlan = Tables<"study_plans">;
export type StudyPlanInsert = TablesInsert<"study_plans">;
export type StudyPlanUpdate = TablesUpdate<"study_plans">;

export type StudyPlanWithWeeks = StudyPlan & {
  study_plan_weeks: (Tables<"study_plan_weeks"> & {
    study_plan_days: Tables<"study_plan_days">[];
  })[];
};

// Fetch all study plans for the current user
export const useStudyPlans = () => {
  return useQuery({
    queryKey: ["study-plans"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as StudyPlan[];
    },
  });
};

// Fetch a single study plan with its weeks and days
export const useStudyPlan = (id: string) => {
  return useQuery({
    queryKey: ["study-plan", id],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("study_plans")
        .select(`
          *,
          study_plan_weeks (
            *,
            study_plan_days (*)
          )
        `)
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data as StudyPlanWithWeeks;
    },
  });
};

// Create a new study plan
export const useCreateStudyPlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (studyPlan: Omit<StudyPlanInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("study_plans")
        .insert({ ...studyPlan, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data as StudyPlan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-plans"] });
      toast({
        title: "Study Plan Created! 🎉",
        description: "Your new study plan has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create study plan",
        variant: "destructive",
      });
    },
  });
};

// Update a study plan
export const useUpdateStudyPlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: StudyPlanUpdate }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("study_plans")
        .update(updates)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data as StudyPlan;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["study-plans"] });
      queryClient.invalidateQueries({ queryKey: ["study-plan", data.id] });
      toast({
        title: "Study Plan Updated",
        description: "Your study plan has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update study plan",
        variant: "destructive",
      });
    },
  });
};

// Delete a study plan
export const useDeleteStudyPlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("study_plans")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-plans"] });
      toast({
        title: "Study Plan Deleted",
        description: "Your study plan has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete study plan",
        variant: "destructive",
      });
    },
  });
};

// Update study plan progress
export const useUpdateStudyPlanProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, progress }: { id: string; progress: number }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("study_plans")
        .update({ progress })
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data as StudyPlan;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["study-plans"] });
      queryClient.invalidateQueries({ queryKey: ["study-plan", data.id] });
    },
  });
};