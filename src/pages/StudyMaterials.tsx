import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useStudyMaterials, useCreateStudyMaterial, useUpdateStudyMaterial, useDeleteStudyMaterial, useFileUpload, getFileUrl } from "@/hooks/useStudyMaterials";
import { useStudyPlans } from "@/hooks/useStudyPlans";
import { 
  Plus, 
  FileText, 
  Video, 
  Image, 
  Link, 
  Download, 
  Edit, 
  Trash2, 
  Upload,
  BookOpen,
  Search,
  Filter,
  ExternalLink
} from "lucide-react";

export default function StudyMaterials() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStudyPlan, setFilterStudyPlan] = useState<string>("all");

  const { data: materials = [], isLoading } = useStudyMaterials();
  const { data: studyPlans = [] } = useStudyPlans();
  const createMaterial = useCreateStudyMaterial();
  const updateMaterial = useUpdateStudyMaterial();
  const deleteMaterial = useDeleteStudyMaterial();

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || material.material_type === filterType;
    const matchesStudyPlan = filterStudyPlan === "all" || material.study_plan_id === filterStudyPlan;
    return matchesSearch && matchesType && matchesStudyPlan;
  });

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
      case 'ebook':
        return <FileText className="h-4 w-4" />;
      case 'video':
      case 'lecture':
        return <Video className="h-4 w-4" />;
      case 'image':
      case 'diagram':
        return <Image className="h-4 w-4" />;
      case 'url':
      case 'website':
        return <Link className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (material: any) => {
    setEditingMaterial(material);
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this material?")) {
      await deleteMaterial.mutateAsync(id);
    }
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setEditingMaterial(null);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Loading study materials...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-primary" />
                Study Materials
              </h1>
              <p className="text-muted-foreground mt-2">
                Organize and manage your learning resources
              </p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Material
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingMaterial ? "Edit Material" : "Add New Material"}
                  </DialogTitle>
                  <DialogDescription>
                    Add study materials to enhance your learning experience
                  </DialogDescription>
                </DialogHeader>
                <MaterialForm 
                  material={editingMaterial}
                  onClose={handleCloseDialog}
                  studyPlans={studyPlans}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Materials</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by title or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div>
                    <Label htmlFor="type-filter">Type</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="url">Website</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="plan-filter">Study Plan</Label>
                    <Select value={filterStudyPlan} onValueChange={setFilterStudyPlan}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Plans</SelectItem>
                        {studyPlans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Materials Grid */}
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Materials Found</h3>
                <p className="text-muted-foreground mb-4">
                  {materials.length === 0 
                    ? "Start by adding your first study material" 
                    : "Try adjusting your search or filters"
                  }
                </p>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Material
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  studyPlans={studyPlans}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  getMaterialIcon={getMaterialIcon}
                  getDifficultyColor={getDifficultyColor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Material Card Component
function MaterialCard({ 
  material, 
  studyPlans, 
  onEdit, 
  onDelete, 
  getMaterialIcon, 
  getDifficultyColor 
}: any) {
  const studyPlan = studyPlans.find((plan: any) => plan.id === material.study_plan_id);
  const fileUrl = material.file_path ? getFileUrl(material.file_path) : null;

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getMaterialIcon(material.material_type)}
            <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(material)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(material.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {material.description && (
          <CardDescription className="line-clamp-2">
            {material.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metadata */}
        <div className="flex flex-wrap gap-2">
          <Badge className={getDifficultyColor(material.difficulty)}>
            {material.difficulty}
          </Badge>
          <Badge variant="outline">
            {material.material_type}
          </Badge>
          {material.duration_minutes && (
            <Badge variant="secondary">
              {material.duration_minutes}m
            </Badge>
          )}
        </div>

        {/* Study Plan */}
        {studyPlan && (
          <div className="text-sm text-muted-foreground">
            📚 {studyPlan.title}
          </div>
        )}

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          {material.url && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={material.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </a>
            </Button>
          )}
          
          {fileUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                View
              </a>
            </Button>
          )}
        </div>

        {/* Tags */}
        {material.tags && material.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {material.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {material.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{material.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Material Form Component
function MaterialForm({ material, onClose, studyPlans }: any) {
  const [formData, setFormData] = useState({
    title: material?.title || "",
    description: material?.description || "",
    material_type: material?.material_type || "document",
    difficulty: material?.difficulty || "intermediate",
    url: material?.url || "",
    study_plan_id: material?.study_plan_id || "",
    duration_minutes: material?.duration_minutes || "",
    tags: material?.tags?.join(", ") || "",
    author: material?.author || "",
    page_start: material?.page_start || "",
    page_end: material?.page_end || "",
    is_required: material?.is_required || false,
  });

  const [file, setFile] = useState<File | null>(null);
  const createMaterial = useCreateStudyMaterial();
  const updateMaterial = useUpdateStudyMaterial();
  const fileUpload = useFileUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let filePath = material?.file_path;
      
      // Upload file if provided
      if (file) {
        const uploadResult = await fileUpload.mutateAsync({
          file,
          materialType: formData.material_type,
        });
        filePath = uploadResult.path;
      }

      const materialData = {
        ...formData,
        duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
        page_start: formData.page_start ? parseInt(formData.page_start) : null,
        page_end: formData.page_end ? parseInt(formData.page_end) : null,
        tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(Boolean) : null,
        file_path: filePath,
        study_plan_id: formData.study_plan_id || null,
      };

      if (material) {
        await updateMaterial.mutateAsync({
          id: material.id,
          updates: materialData,
        });
      } else {
        await createMaterial.mutateAsync(materialData);
      }

      onClose();
    } catch (error) {
      console.error("Error saving material:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="material_type">Type *</Label>
          <Select 
            value={formData.material_type} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, material_type: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="url">Website/URL</SelectItem>
              <SelectItem value="ebook">E-book</SelectItem>
              <SelectItem value="lecture">Lecture</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select 
            value={formData.difficulty} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <Label htmlFor="study_plan">Study Plan (Optional)</Label>
          <Select 
            value={formData.study_plan_id} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, study_plan_id: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a study plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No study plan</SelectItem>
              {studyPlans.map((plan: any) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="url">URL (Optional)</Label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
            placeholder="https://..."
          />
        </div>

        <div>
          <Label htmlFor="duration_minutes">Duration (minutes)</Label>
          <Input
            id="duration_minutes"
            type="number"
            value={formData.duration_minutes}
            onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: e.target.value }))}
            placeholder="60"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="file">Upload File (Optional)</Label>
          <Input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp4,.mov,.avi"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Supported: PDF, DOC, Images, Videos
          </p>
        </div>

        <div className="col-span-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="algorithms, data structures, python"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={createMaterial.isPending || updateMaterial.isPending || fileUpload.isPending}>
          {fileUpload.isPending ? (
            <>
              <Upload className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              {material ? "Update" : "Create"} Material
            </>
          )}
        </Button>
      </div>
    </form>
  );
}