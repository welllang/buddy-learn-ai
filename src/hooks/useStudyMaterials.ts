import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

export type StudyMaterial = Tables<"study_materials">;
export type StudyMaterialInsert = TablesInsert<"study_materials">;
export type StudyMaterialUpdate = TablesUpdate<"study_materials">;

// Fetch all study materials for the current user
export const useStudyMaterials = (studyPlanId?: string, sessionId?: string) => {
  return useQuery({
    queryKey: ["study-materials", studyPlanId, sessionId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      let query = supabase
        .from("study_materials")
        .select("*")
        .order("order_index", { ascending: true });

      if (studyPlanId) {
        query = query.eq("study_plan_id", studyPlanId);
      }
      if (sessionId) {
        query = query.eq("session_id", sessionId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as StudyMaterial[];
    },
  });
};

// Fetch a single study material
export const useStudyMaterial = (id: string) => {
  return useQuery({
    queryKey: ["study-material", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_materials")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as StudyMaterial;
    },
    enabled: !!id,
  });
};

// Create a new study material
export const useCreateStudyMaterial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (material: StudyMaterialInsert) => {
      const { data, error } = await supabase
        .from("study_materials")
        .insert(material)
        .select()
        .single();

      if (error) throw error;
      return data as StudyMaterial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-materials"] });
      toast({
        title: "Material Added! 📚",
        description: "Study material has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Add Material",
        description: error.message || "Failed to add study material",
        variant: "destructive",
      });
    },
  });
};

// Update a study material
export const useUpdateStudyMaterial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: StudyMaterialUpdate }) => {
      const { data, error } = await supabase
        .from("study_materials")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as StudyMaterial;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["study-materials"] });
      queryClient.invalidateQueries({ queryKey: ["study-material", data.id] });
      toast({
        title: "Material Updated! ✅",
        description: "Study material has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update study material",
        variant: "destructive",
      });
    },
  });
};

// Delete a study material
export const useDeleteStudyMaterial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      // First, get the material to check if it has a file
      const { data: material } = await supabase
        .from("study_materials")
        .select("file_path")
        .eq("id", id)
        .single();

      // Delete the file from storage if it exists
      if (material?.file_path) {
        const { error: storageError } = await supabase.storage
          .from(getBucketFromPath(material.file_path))
          .remove([material.file_path]);
        
        if (storageError) {
          console.warn("Failed to delete file from storage:", storageError);
        }
      }

      // Delete the material record
      const { error } = await supabase
        .from("study_materials")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-materials"] });
      toast({
        title: "Material Deleted",
        description: "Study material has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete study material",
        variant: "destructive",
      });
    },
  });
};

// Upload file to storage
export const useFileUpload = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file, materialType }: { file: File; materialType: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const bucket = getBucketFromMaterialType(materialType);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) throw error;
      
      return {
        path: data.path,
        bucket,
        publicUrl: supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl,
      };
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      });
    },
  });
};

// Get file URL from storage
export const getFileUrl = (filePath: string) => {
  if (!filePath) return null;
  
  const bucket = getBucketFromPath(filePath);
  return supabase.storage.from(bucket).getPublicUrl(filePath).data.publicUrl;
};

// Helper functions
const getBucketFromMaterialType = (materialType: string): string => {
  switch (materialType) {
    case 'pdf':
    case 'document':
    case 'ebook':
      return 'study-documents';
    case 'image':
    case 'diagram':
      return 'study-images';
    case 'video':
    case 'lecture':
      return 'study-videos';
    default:
      return 'study-documents';
  }
};

const getBucketFromPath = (filePath: string): string => {
  if (filePath.includes('study-documents')) return 'study-documents';
  if (filePath.includes('study-images')) return 'study-images';
  if (filePath.includes('study-videos')) return 'study-videos';
  return 'study-documents';
};