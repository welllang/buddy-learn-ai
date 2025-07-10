import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  ArrowRight,
  Brain, 
  BookOpen, 
  Clock, 
  Target, 
  Calendar,
  Upload,
  Plus,
  X,
  CheckCircle,
  Star,
  Zap,
  Users,
  FileText,
  Video,
  Link as LinkIcon,
  Settings,
  BarChart3,
  Timer,
  Play,
  Award,
  Lightbulb,
  Eye,
  Headphones,
  Hand,
  Loader,
  Wand2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateStudyPlan } from "@/hooks/useStudyPlans";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  // Step 1: Basic Information
  planName: string;
  subjectCategory: string;
  description: string;
  priorityLevel: string;
  
  // Step 2: Timeline Setup
  targetDate: string;
  studyHoursPerDay: number[];
  preferredTimes: string[];
  bufferTime: string;
  
  // Step 3: Content Upload
  uploadedFiles: File[];
  youtubeLinks: string[];
  lmsFiles: File[];
  manualTopics: string[];
  
  // Step 4: AI Configuration
  studyStyle: string;
  difficultyLevel: string;
  reviewFrequency: string;
  assessmentPreferences: string[];
}

const CreateStudyPlan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [newTopic, setNewTopic] = useState("");
  const [newYoutubeLink, setNewYoutubeLink] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState<any>(null);
  
  const createStudyPlan = useCreateStudyPlan();

  const [formData, setFormData] = useState<FormData>({
    planName: "",
    subjectCategory: "",
    description: "",
    priorityLevel: "",
    targetDate: "",
    studyHoursPerDay: [2],
    preferredTimes: [],
    bufferTime: "30",
    uploadedFiles: [],
    youtubeLinks: [],
    lmsFiles: [],
    manualTopics: [],
    studyStyle: "",
    difficultyLevel: "",
    reviewFrequency: "",
    assessmentPreferences: []
  });

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[];
    const updatedArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateFormData(field, updatedArray);
  };

  const addTopic = () => {
    if (newTopic.trim()) {
      updateFormData('manualTopics', [...formData.manualTopics, newTopic.trim()]);
      setNewTopic("");
    }
  };

  const removeTopic = (index: number) => {
    const updatedTopics = formData.manualTopics.filter((_, i) => i !== index);
    updateFormData('manualTopics', updatedTopics);
  };

  const addYoutubeLink = () => {
    if (newYoutubeLink.trim()) {
      updateFormData('youtubeLinks', [...formData.youtubeLinks, newYoutubeLink.trim()]);
      setNewYoutubeLink("");
    }
  };

  const removeYoutubeLink = (index: number) => {
    const updatedLinks = formData.youtubeLinks.filter((_, i) => i !== index);
    updateFormData('youtubeLinks', updatedLinks);
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.planName || !formData.subjectCategory || !formData.priorityLevel) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields.",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 2:
        if (!formData.targetDate || formData.preferredTimes.length === 0) {
          toast({
            title: "Missing Information",
            description: "Please set a target date and select preferred study times.",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 4:
        if (!formData.studyStyle || !formData.difficultyLevel || !formData.reviewFrequency) {
          toast({
            title: "Missing Information",
            description: "Please complete all AI configuration settings.",
            variant: "destructive"
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleFileUpload = (files: FileList | null, field: 'uploadedFiles' | 'lmsFiles') => {
    if (files) {
      const fileArray = Array.from(files);
      updateFormData(field, [...formData[field], ...fileArray]);
    }
  };

  const removeFile = (index: number, field: 'uploadedFiles' | 'lmsFiles') => {
    const updatedFiles = formData[field].filter((_, i) => i !== index);
    updateFormData(field, updatedFiles);
  };

  const handleGenerateAIPlan = async () => {
    if (!formData.planName || !formData.subjectCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the plan name and subject before generating with AI",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingAI(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-study-plan', {
        body: {
          subject: formData.subjectCategory,
          targetDate: formData.targetDate,
          dailyTime: formData.studyHoursPerDay[0] * 60,
          difficultyLevel: formData.difficultyLevel || 'intermediate',
          learningStyle: formData.studyStyle || 'mixed',
          goals: formData.description
        }
      });

      if (error) throw error;

      setAiGeneratedPlan(data.studyPlan);
      toast({
        title: "AI Plan Generated! 🎉",
        description: "Your personalized study plan has been created. Review and customize it below.",
      });
    } catch (error) {
      console.error('Error generating AI plan:', error);
      toast({
        title: "Generation Failed",
        description: "Could not generate AI plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await createStudyPlan.mutateAsync({
        title: formData.planName,
        subject: formData.subjectCategory,
        description: formData.description,
        priority: formData.priorityLevel,
        target_date: formData.targetDate || null,
        daily_time_minutes: formData.studyHoursPerDay[0] * 60,
        difficulty: formData.difficultyLevel,
        learning_style: formData.studyStyle,
        ai_generated: !!aiGeneratedPlan,
        category: "medium-term",
        metadata: aiGeneratedPlan ? { aiPlan: aiGeneratedPlan } : {}
      });
      
      navigate("/study-plans");
    } catch (error) {
      // Error is handled by the hook's onError callback
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Let's Create Something Amazing
              </h2>
              <p className="text-lg text-muted-foreground">Tell us about your learning journey</p>
            </div>

            <div className="space-y-8">
              {/* Plan Name - Modern Input */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">What's your study plan called?</Label>
                <div className="relative">
                  <Input
                    placeholder="e.g., Master Machine Learning Fundamentals"
                    value={formData.planName}
                    onChange={(e) => updateFormData('planName', e.target.value)}
                    className="text-lg py-6 px-6 border-2 border-border/50 rounded-2xl bg-background/50 focus:bg-background focus:border-primary/50 transition-all duration-300"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Subject Category - Card Selection */}
              <div className="space-y-6">
                <Label className="text-lg font-semibold">Choose your subject category</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { value: 'computer-science', label: 'Computer Science', icon: '💻', gradient: 'from-blue-500 to-cyan-500' },
                    { value: 'mathematics', label: 'Mathematics', icon: '📐', gradient: 'from-purple-500 to-pink-500' },
                    { value: 'physics', label: 'Physics', icon: '⚛️', gradient: 'from-orange-500 to-red-500' },
                    { value: 'chemistry', label: 'Chemistry', icon: '🧪', gradient: 'from-green-500 to-teal-500' },
                    { value: 'biology', label: 'Biology', icon: '🧬', gradient: 'from-emerald-500 to-green-500' },
                    { value: 'engineering', label: 'Engineering', icon: '⚙️', gradient: 'from-gray-500 to-slate-500' },
                    { value: 'business', label: 'Business', icon: '💼', gradient: 'from-yellow-500 to-orange-500' },
                    { value: 'languages', label: 'Languages', icon: '🌍', gradient: 'from-indigo-500 to-purple-500' },
                    { value: 'arts', label: 'Arts & Humanities', icon: '🎨', gradient: 'from-pink-500 to-rose-500' },
                    { value: 'medicine', label: 'Medicine', icon: '🏥', gradient: 'from-red-500 to-pink-500' },
                    { value: 'other', label: 'Other', icon: '✨', gradient: 'from-violet-500 to-purple-500' }
                  ].map((subject) => (
                    <div
                      key={subject.value}
                      onClick={() => updateFormData('subjectCategory', subject.value)}
                      className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        formData.subjectCategory === subject.value
                          ? 'border-primary shadow-2xl bg-primary/5 scale-105'
                          : 'border-border/50 hover:border-primary/30 bg-background/50'
                      }`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${subject.gradient} rounded-xl flex items-center justify-center text-white text-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        {subject.icon}
                      </div>
                      <h3 className="text-center font-semibold text-sm">{subject.label}</h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description - Modern Textarea */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">What do you want to achieve?</Label>
                <Textarea
                  placeholder="Describe your learning goals, what you want to master, and any specific outcomes you're targeting..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                  className="text-base p-6 border-2 border-border/50 rounded-2xl bg-background/50 focus:bg-background focus:border-primary/50 transition-all duration-300 resize-none"
                />
              </div>

              {/* Priority Level - Enhanced Cards */}
              <div className="space-y-6">
                <Label className="text-lg font-semibold">How important is this to you?</Label>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { 
                      value: 'low', 
                      title: 'Take My Time', 
                      desc: 'Flexible learning pace',
                      icon: Clock, 
                      gradient: 'from-blue-500 to-cyan-500',
                      bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
                    },
                    { 
                      value: 'medium', 
                      title: 'Stay Focused', 
                      desc: 'Consistent progress needed',
                      icon: Target, 
                      gradient: 'from-amber-500 to-orange-500',
                      bg: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20'
                    },
                    { 
                      value: 'high', 
                      title: 'Make It Happen', 
                      desc: 'Urgent deadline ahead',
                      icon: Star, 
                      gradient: 'from-red-500 to-pink-500',
                      bg: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20'
                    }
                  ].map((priority) => (
                    <div
                      key={priority.value}
                      onClick={() => updateFormData('priorityLevel', priority.value)}
                      className={`group cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                        formData.priorityLevel === priority.value
                          ? 'border-primary shadow-2xl scale-105'
                          : 'border-border/50 hover:border-primary/30'
                      }`}
                    >
                      <div className={`bg-gradient-to-br ${priority.bg} rounded-2xl p-6 mb-6`}>
                        <div className={`w-16 h-16 bg-gradient-to-br ${priority.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                          <priority.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-center mb-2">{priority.title}</h3>
                        <p className="text-muted-foreground text-center">{priority.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Plan Your Timeline
              </h2>
              <p className="text-lg text-muted-foreground">Set up your perfect study schedule</p>
            </div>

            <div className="space-y-8">
              {/* Target Date & Buffer Time */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">When do you want to finish?</Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <Input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => updateFormData('targetDate', e.target.value)}
                      className="relative text-lg py-8 px-6 border-2 border-border/50 rounded-2xl bg-background/80 backdrop-blur-sm focus:bg-background focus:border-primary/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Buffer time for reviews</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '15', label: '15 min', icon: '⚡' },
                      { value: '30', label: '30 min', icon: '🔥' },
                      { value: '45', label: '45 min', icon: '💪' },
                      { value: '60', label: '1 hour', icon: '🚀' }
                    ].map((buffer) => (
                      <div
                        key={buffer.value}
                        onClick={() => updateFormData('bufferTime', buffer.value)}
                        className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 text-center ${
                          formData.bufferTime === buffer.value
                            ? 'border-primary shadow-lg bg-primary/5 scale-105'
                            : 'border-border/50 hover:border-primary/30 bg-background/50'
                        }`}
                      >
                        <div className="text-2xl mb-2">{buffer.icon}</div>
                        <div className="font-semibold text-sm">{buffer.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Study Hours Slider */}
              <div className="space-y-6">
                <Label className="text-lg font-semibold">How many hours can you study daily?</Label>
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border-2 border-primary/10">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {formData.studyHoursPerDay[0]} {formData.studyHoursPerDay[0] === 1 ? 'hour' : 'hours'}
                    </div>
                    <p className="text-muted-foreground mt-2">per day</p>
                  </div>
                  
                  <Slider
                    value={formData.studyHoursPerDay}
                    onValueChange={(value) => updateFormData('studyHoursPerDay', value)}
                    max={12}
                    min={0.5}
                    step={0.5}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-sm text-muted-foreground mt-4">
                    <span>30 min</span>
                    <span>3 hours</span>
                    <span>6 hours</span>
                    <span>12 hours</span>
                  </div>
                </div>
              </div>

              {/* Preferred Study Times */}
              <div className="space-y-6">
                <Label className="text-lg font-semibold">When do you learn best?</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { time: 'Early Morning (6-9 AM)', icon: '🌅', gradient: 'from-amber-400 to-orange-500' },
                    { time: 'Morning (9-12 PM)', icon: '☀️', gradient: 'from-yellow-400 to-amber-500' },
                    { time: 'Afternoon (12-3 PM)', icon: '🌞', gradient: 'from-orange-400 to-red-500' },
                    { time: 'Late Afternoon (3-6 PM)', icon: '🌇', gradient: 'from-red-400 to-pink-500' },
                    { time: 'Evening (6-9 PM)', icon: '🌆', gradient: 'from-purple-400 to-indigo-500' },
                    { time: 'Night (9-12 AM)', icon: '🌙', gradient: 'from-indigo-400 to-blue-500' }
                  ].map((timeSlot) => (
                    <div
                      key={timeSlot.time}
                      onClick={() => toggleArrayItem('preferredTimes', timeSlot.time)}
                      className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        formData.preferredTimes.includes(timeSlot.time)
                          ? 'border-primary shadow-2xl bg-primary/5 scale-105'
                          : 'border-border/50 hover:border-primary/30 bg-background/50'
                      }`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${timeSlot.gradient} rounded-xl flex items-center justify-center text-white text-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        {timeSlot.icon}
                      </div>
                      <h3 className="text-center font-semibold text-sm leading-tight">{timeSlot.time}</h3>
                    </div>
                  ))}
                </div>
                
                {formData.preferredTimes.length > 0 && (
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl dark:bg-emerald-900/20 dark:border-emerald-800">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 text-center">
                      ✨ You selected {formData.preferredTimes.length} time slot{formData.preferredTimes.length > 1 ? 's' : ''} - great choice!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Upload Your Content
              </h2>
              <p className="text-lg text-muted-foreground">Add materials that will fuel your learning journey</p>
            </div>

            <div className="space-y-8">
              {/* Upload Options Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* PDF Upload */}
                <div className="group space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Documents & PDFs</h3>
                      <p className="text-muted-foreground">Upload textbooks, notes, research papers</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <div className="relative border-2 border-dashed border-border/50 rounded-2xl p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 bg-background/80 backdrop-blur-sm">
                      <Label htmlFor="file-upload" className="cursor-pointer block">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <span className="text-lg font-semibold block mb-2">Click to upload files</span>
                        <span className="text-muted-foreground">or drag and drop</span>
                        <div className="text-xs text-muted-foreground mt-2">PDF, DOC, DOCX, TXT</div>
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files, 'uploadedFiles')}
                      />
                    </div>
                  </div>
                  
                  {formData.uploadedFiles.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Uploaded Files</span>
                        <Badge variant="secondary">{formData.uploadedFiles.length}</Badge>
                      </div>
                      {formData.uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-background/50 hover:bg-background transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium truncate">{file.name}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(index, 'uploadedFiles')}
                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Video Links */}
                <div className="group space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Video Content</h3>
                      <p className="text-muted-foreground">Add YouTube lectures and tutorials</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="https://youtube.com/watch?v=..."
                          value={newYoutubeLink}
                          onChange={(e) => setNewYoutubeLink(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addYoutubeLink()}
                          className="text-base py-4 px-6 border-2 border-border/50 rounded-2xl bg-background/50 focus:bg-background focus:border-primary/50 transition-all duration-300"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <LinkIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      <Button 
                        onClick={addYoutubeLink}
                        className="px-6 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    {formData.youtubeLinks.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Video Links</span>
                          <Badge variant="secondary">{formData.youtubeLinks.length}</Badge>
                        </div>
                        {formData.youtubeLinks.map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-background/50 hover:bg-background transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <Video className="h-4 w-4 text-red-600" />
                              </div>
                              <span className="text-sm font-medium truncate max-w-60">{link}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeYoutubeLink(index)}
                              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* LMS Import & Manual Topics */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* LMS Import */}
                <div className="group space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">LMS Import</h3>
                      <p className="text-muted-foreground">Canvas, Moodle, Blackboard exports</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <div className="relative border-2 border-dashed border-border/50 rounded-2xl p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 bg-background/80 backdrop-blur-sm">
                      <Label htmlFor="lms-upload" className="cursor-pointer block">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <span className="text-lg font-semibold block mb-2">Upload LMS exports</span>
                        <span className="text-muted-foreground">Course materials and assignments</span>
                        <div className="text-xs text-muted-foreground mt-2">ZIP, CSV, JSON</div>
                      </Label>
                      <Input
                        id="lms-upload"
                        type="file"
                        multiple
                        accept=".zip,.csv,.json"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files, 'lmsFiles')}
                      />
                    </div>
                  </div>
                  
                  {formData.lmsFiles.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">LMS Files</span>
                        <Badge variant="secondary">{formData.lmsFiles.length}</Badge>
                      </div>
                      {formData.lmsFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-background/50 hover:bg-background transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="text-sm font-medium truncate">{file.name}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(index, 'lmsFiles')}
                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Manual Topics */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Manual Topics</h3>
                      <p className="text-muted-foreground">Add specific subjects and concepts</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Enter a topic or subtopic..."
                          value={newTopic}
                          onChange={(e) => setNewTopic(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addTopic()}
                          className="text-base py-4 px-6 border-2 border-border/50 rounded-2xl bg-background/50 focus:bg-background focus:border-primary/50 transition-all duration-300"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <Lightbulb className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      <Button 
                        onClick={addTopic}
                        className="px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    {formData.manualTopics.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Your Topics</span>
                          <Badge variant="secondary">{formData.manualTopics.length}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {formData.manualTopics.map((topic, index) => (
                            <div key={index} className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl hover:from-purple-500/20 hover:to-indigo-600/20 transition-all duration-300">
                              <span className="text-sm font-medium">{topic}</span>
                              <button
                                onClick={() => removeTopic(index)}
                                className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors group-hover:scale-110"
                              >
                                <X className="h-3 w-3 text-red-600" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                AI Configuration
              </h2>
              <p className="text-lg text-muted-foreground">Customize how AI will optimize your learning experience</p>
            </div>

            <div className="space-y-10">
              {/* Study Style Preferences */}
              <div className="space-y-6">
                <Label className="text-xl font-semibold">How do you learn best? *</Label>
                <RadioGroup value={formData.studyStyle} onValueChange={(value) => updateFormData('studyStyle', value)}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { 
                        value: 'visual', 
                        title: 'Visual Learning', 
                        desc: 'Charts, diagrams, infographics',
                        icon: Eye, 
                        gradient: 'from-blue-500 to-cyan-500',
                        bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
                      },
                      { 
                        value: 'auditory', 
                        title: 'Auditory Learning', 
                        desc: 'Videos, podcasts, discussions',
                        icon: Headphones, 
                        gradient: 'from-purple-500 to-pink-500',
                        bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                      },
                      { 
                        value: 'kinesthetic', 
                        title: 'Hands-on Learning', 
                        desc: 'Practice, experiments, simulations',
                        icon: Hand, 
                        gradient: 'from-green-500 to-emerald-500',
                        bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                      },
                      { 
                        value: 'mixed', 
                        title: 'Mixed Approach', 
                        desc: 'Combination of all methods',
                        icon: Zap, 
                        gradient: 'from-orange-500 to-red-500',
                        bg: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
                      }
                    ].map((style) => (
                      <div
                        key={style.value}
                        className={`group cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                          formData.studyStyle === style.value
                            ? 'border-primary shadow-2xl scale-105'
                            : 'border-border/50 hover:border-primary/30'
                        }`}
                        onClick={() => updateFormData('studyStyle', style.value)}
                      >
                        <div className={`bg-gradient-to-br ${style.bg} rounded-2xl p-6 mb-6`}>
                          <div className="flex items-center space-x-4">
                            <RadioGroupItem value={style.value} id={style.value} className="hidden" />
                            <div className={`w-16 h-16 bg-gradient-to-br ${style.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <style.icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-2">{style.title}</h3>
                              <p className="text-muted-foreground">{style.desc}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Difficulty & Frequency */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Difficulty Level */}
                <div className="space-y-6">
                  <Label className="text-xl font-semibold">What's your level? *</Label>
                  <div className="space-y-4">
                    {[
                      { value: 'beginner', title: 'Beginner', desc: "I'm new to this subject", icon: '🌱', color: 'from-green-500 to-emerald-500' },
                      { value: 'intermediate', title: 'Intermediate', desc: 'I have some knowledge', icon: '🚀', color: 'from-blue-500 to-cyan-500' },
                      { value: 'advanced', title: 'Advanced', desc: "I'm quite experienced", icon: '⚡', color: 'from-purple-500 to-pink-500' },
                      { value: 'expert', title: 'Expert', desc: 'I need challenging content', icon: '🎯', color: 'from-red-500 to-orange-500' }
                    ].map((level) => (
                      <div
                        key={level.value}
                        onClick={() => updateFormData('difficultyLevel', level.value)}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          formData.difficultyLevel === level.value
                            ? 'border-primary shadow-lg bg-primary/5 scale-105'
                            : 'border-border/50 hover:border-primary/30 bg-background/50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                            {level.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{level.title}</h4>
                            <p className="text-muted-foreground text-sm">{level.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Frequency */}
                <div className="space-y-6">
                  <Label className="text-xl font-semibold">Review schedule? *</Label>
                  <div className="space-y-4">
                    {[
                      { value: 'daily', title: 'Daily', desc: 'Review every day', icon: '📅', color: 'from-blue-500 to-cyan-500' },
                      { value: 'every-2-days', title: 'Every 2 Days', desc: 'Moderate frequency', icon: '🗓️', color: 'from-green-500 to-emerald-500' },
                      { value: 'weekly', title: 'Weekly', desc: 'Once per week', icon: '📆', color: 'from-purple-500 to-pink-500' },
                      { value: 'bi-weekly', title: 'Bi-weekly', desc: 'Every 2 weeks', icon: '🗒️', color: 'from-orange-500 to-red-500' },
                      { value: 'adaptive', title: 'Adaptive', desc: 'Let AI decide', icon: '🤖', color: 'from-violet-500 to-purple-500' }
                    ].map((freq) => (
                      <div
                        key={freq.value}
                        onClick={() => updateFormData('reviewFrequency', freq.value)}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          formData.reviewFrequency === freq.value
                            ? 'border-primary shadow-lg bg-primary/5 scale-105'
                            : 'border-border/50 hover:border-primary/30 bg-background/50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${freq.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                            {freq.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{freq.title}</h4>
                            <p className="text-muted-foreground text-sm">{freq.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assessment Preferences */}
              <div className="space-y-6">
                <Label className="text-xl font-semibold">How do you want to be tested?</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Multiple Choice Quizzes', icon: '📝', color: 'from-blue-500 to-cyan-500' },
                    { name: 'True/False Questions', icon: '✅', color: 'from-green-500 to-emerald-500' },
                    { name: 'Short Answer Tests', icon: '📄', color: 'from-purple-500 to-pink-500' },
                    { name: 'Essay Questions', icon: '📖', color: 'from-orange-500 to-red-500' },
                    { name: 'Practical Exercises', icon: '🛠️', color: 'from-yellow-500 to-orange-500' },
                    { name: 'Coding Challenges', icon: '💻', color: 'from-indigo-500 to-purple-500' },
                    { name: 'Case Studies', icon: '🔍', color: 'from-teal-500 to-cyan-500' },
                    { name: 'Peer Reviews', icon: '👥', color: 'from-pink-500 to-rose-500' }
                  ].map((assessment) => (
                    <div
                      key={assessment.name}
                      onClick={() => toggleArrayItem('assessmentPreferences', assessment.name)}
                      className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center ${
                        formData.assessmentPreferences.includes(assessment.name)
                          ? 'border-primary shadow-lg bg-primary/5 scale-105'
                          : 'border-border/50 hover:border-primary/30 bg-background/50'
                      }`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${assessment.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 text-white text-xl`}>
                        {assessment.icon}
                      </div>
                      <h4 className="font-semibold text-sm leading-tight">{assessment.name}</h4>
                    </div>
                  ))}
                </div>
                
                {formData.assessmentPreferences.length > 0 && (
                  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl dark:bg-emerald-900/20 dark:border-emerald-800">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 text-center">
                      ✨ You selected {formData.assessmentPreferences.length} assessment type{formData.assessmentPreferences.length > 1 ? 's' : ''} - perfect for varied testing!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Almost There!
              </h2>
              <p className="text-lg text-muted-foreground">Review your personalized study plan and let AI work its magic</p>
            </div>

            <div className="space-y-8">
              {/* Plan Overview Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Basic Information Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative p-8 border-2 border-border/50 rounded-2xl bg-background/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Plan Details</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Name</span>
                        <span className="font-semibold text-sm truncate">{formData.planName || 'Not set'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Subject</span>
                        <span className="font-semibold text-sm capitalize">{formData.subjectCategory || 'Not set'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Priority</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm capitalize">{formData.priorityLevel || 'Not set'}</span>
                          {formData.priorityLevel === 'high' && <span className="text-red-500">🔥</span>}
                          {formData.priorityLevel === 'medium' && <span className="text-yellow-500">⭐</span>}
                          {formData.priorityLevel === 'low' && <span className="text-blue-500">🕒</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative p-8 border-2 border-border/50 rounded-2xl bg-background/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Target Date</span>
                        <span className="font-semibold text-sm">
                          {formData.targetDate ? new Date(formData.targetDate).toLocaleDateString() : 'Not set'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Daily Hours</span>
                        <span className="font-semibold text-sm">{formData.studyHoursPerDay[0]} hours/day</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Time Slots</span>
                        <span className="font-semibold text-sm">{formData.preferredTimes.length} selected</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Total Days</span>
                        <span className="font-semibold text-sm text-primary">
                          {formData.targetDate ? 
                            Math.ceil((new Date(formData.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
                            : 0} days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative p-8 border-2 border-border/50 rounded-2xl bg-background/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Content</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Documents</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-sm">{formData.uploadedFiles.length}</span>
                          <FileText className="h-4 w-4 text-blue-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Videos</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-sm">{formData.youtubeLinks.length}</span>
                          <Video className="h-4 w-4 text-red-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Manual Topics</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-sm">{formData.manualTopics.length}</span>
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">LMS Files</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-sm">{formData.lmsFiles.length}</span>
                          <BookOpen className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Configuration Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative p-8 border-2 border-border/50 rounded-2xl bg-background/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">AI Setup</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Learning Style</span>
                        <span className="font-semibold text-sm capitalize">{formData.studyStyle || 'Not set'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Difficulty</span>
                        <span className="font-semibold text-sm capitalize">{formData.difficultyLevel || 'Not set'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Reviews</span>
                        <span className="font-semibold text-sm capitalize">{formData.reviewFrequency || 'Not set'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Assessments</span>
                        <span className="font-semibold text-sm">{formData.assessmentPreferences.length} types</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Plan Preview */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative p-10 border-2 border-primary/20 rounded-3xl bg-gradient-to-br from-background/95 to-primary/5 backdrop-blur-xl">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <BarChart3 className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Your Study Plan Preview</h3>
                    <p className="text-muted-foreground">AI will create a personalized timeline optimized for your success</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {formData.targetDate ? 
                          Math.ceil((new Date(formData.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
                          : 0}
                      </div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wide">Days to Master</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">
                        {formData.targetDate ? 
                          (Math.ceil((new Date(formData.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) * formData.studyHoursPerDay[0]).toFixed(0)
                          : 0}
                      </div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wide">Total Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                        {formData.uploadedFiles.length + formData.youtubeLinks.length + formData.manualTopics.length + formData.lmsFiles.length}
                      </div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wide">Learning Resources</div>
                    </div>
                  </div>

                  {/* Progress Visualization */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Plan Completeness</span>
                      <span className="text-sm text-primary font-semibold">95%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-primary via-secondary to-primary h-3 rounded-full w-[95%] animate-pulse"></div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center italic">
                      ✨ AI is ready to create your optimal learning path
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Edit Navigation */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-gray-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className="relative p-8 border-2 border-border/50 rounded-2xl bg-background/80 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6 text-center">Need to make changes?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { step: 1, label: "Basic Info", icon: BookOpen, color: 'from-blue-500 to-purple-600' },
                      { step: 2, label: "Timeline", icon: Calendar, color: 'from-emerald-500 to-teal-600' },
                      { step: 3, label: "Content", icon: Upload, color: 'from-orange-500 to-red-600' },
                      { step: 4, label: "AI Config", icon: Brain, color: 'from-violet-500 to-purple-600' }
                    ].map(({ step, label, icon: Icon, color }) => (
                      <button
                        key={step}
                        onClick={() => setCurrentStep(step)}
                        className="group/btn p-6 border-2 border-border/50 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-background/50 hover:bg-background"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover/btn:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-sm font-semibold text-center">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate Buttons */}
              <div className="text-center space-y-4">
                {/* AI Generate Button */}
                <div className="relative inline-block">
                  <Button
                    size="lg"
                    onClick={handleGenerateAIPlan}
                    disabled={isGeneratingAI || !formData.planName || !formData.subjectCategory}
                    className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl text-white"
                  >
                    {isGeneratingAI ? (
                      <>
                        <Loader className="mr-2 h-5 w-5 animate-spin" />
                        Generating with AI...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate with AI
                      </>
                    )}
                  </Button>
                </div>

                {/* Traditional Create Button */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={createStudyPlan.isPending}
                    className="relative px-12 py-6 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl"
                  >
                    {createStudyPlan.isPending ? (
                      <>
                        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mr-3"></div>
                        Generating Your AI Study Plan...
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                          <Zap className="h-5 w-5 text-white" />
                        </div>
                        Generate My Study Plan
                      </>
                    )}
                  </Button>
                </div>

                {/* AI Generated Plan Preview */}
                {aiGeneratedPlan && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      AI Generated Study Plan Preview
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-purple-800 dark:text-purple-400">Title:</h4>
                        <p className="text-sm">{aiGeneratedPlan.title}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800 dark:text-purple-400">Duration:</h4>
                        <p className="text-sm">{aiGeneratedPlan.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800 dark:text-purple-400">Primary Technique:</h4>
                        <p className="text-sm">{aiGeneratedPlan.studyTechniques?.primary}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800 dark:text-purple-400">Weekly Breakdown:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          {aiGeneratedPlan.weeklyBreakdown?.slice(0, 4).map((week: any, index: number) => (
                            <div key={index} className="text-xs bg-white/50 dark:bg-gray-800/50 p-2 rounded">
                              <strong>Week {week.week}:</strong> {week.focus}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
                
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    🤖 AI is analyzing your content and preferences
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This may take a few moments to create your personalized learning experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/study-plans">
              <ArrowLeft className="h-4 w-4" />
              Back to Study Plans
            </Link>
          </Button>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Create New Plan</span>
        </div>

        {/* Progress Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create Study Plan
          </h1>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-sm font-medium text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <Progress value={progressPercentage} className="w-64 h-3" />
            <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-primary to-secondary flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i + 1 === currentStep
                  ? 'bg-gradient-to-r from-primary to-secondary scale-125'
                  : i + 1 < currentStep
                  ? 'bg-primary/60'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateStudyPlan;