import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

export type StudyPlanWeek = Tables<"study_plan_weeks">;
export type StudyPlanWeekInsert = TablesInsert<"study_plan_weeks">;
export type StudyPlanWeekUpdate = TablesUpdate<"study_plan_weeks">;

export type StudyPlanDay = Tables<"study_plan_days">;
export type StudyPlanDayInsert = TablesInsert<"study_plan_days">;
export type StudyPlanDayUpdate = TablesUpdate<"study_plan_days">;

// Fetch weeks for a study plan
export const useStudyPlanWeeks = (studyPlanId: string) => {
  return useQuery({
    queryKey: ["study-plan-weeks", studyPlanId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_plan_weeks")
        .select(`
          *,
          study_plan_days (*)
        `)
        .eq("study_plan_id", studyPlanId)
        .order("week_number", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!studyPlanId,
  });
};

// Create a new week
export const useCreateStudyPlanWeek = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (week: StudyPlanWeekInsert) => {
      const { data, error } = await supabase
        .from("study_plan_weeks")
        .insert(week)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ["study-plan-weeks", data.study_plan_id] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["study-plan", data.study_plan_id] 
      });
    },
  });
};

// Update a week
export const useUpdateStudyPlanWeek = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: StudyPlanWeekUpdate }) => {
      const { data, error } = await supabase
        .from("study_plan_weeks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ["study-plan-weeks", data.study_plan_id] 
      });
    },
  });
};

// Create a new day
export const useCreateStudyPlanDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (day: StudyPlanDayInsert) => {
      const { data, error } = await supabase
        .from("study_plan_days")
        .insert(day)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ["study-plan-weeks", data.week_id] 
      });
    },
  });
};

// Update a day
export const useUpdateStudyPlanDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: StudyPlanDayUpdate }) => {
      const { data, error } = await supabase
        .from("study_plan_days")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-plan-weeks"] });
    },
  });
};

// Mark day as completed
export const useMarkDayCompleted = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (dayId: string) => {
      const { data, error } = await supabase
        .from("study_plan_days")
        .update({ completed: true })
        .eq("id", dayId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-plan-weeks"] });
      toast({
        title: "Day Completed! 🎉",
        description: "Great job on completing today's study session!",
      });
    },
  });
};