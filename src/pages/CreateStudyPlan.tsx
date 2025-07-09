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
  Hand
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newYoutubeLink, setNewYoutubeLink] = useState("");

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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Study Plan Created! 🎉",
        description: "Your AI-powered study plan has been generated successfully.",
      });
      
      navigate("/study-plans");
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "There was an error creating your study plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => updateFormData('targetDate', e.target.value)}
                      className="text-lg py-6 px-6 border-2 border-border/50 rounded-2xl bg-background/50 focus:bg-background focus:border-primary/50 transition-all duration-300"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Target className="h-5 w-5 text-muted-foreground" />
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
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Content Upload</h2>
              <p className="text-muted-foreground">Add your study materials and resources</p>
            </div>

            <div className="space-y-8">
              {/* PDF Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Upload PDFs, Notes & Textbooks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-sm font-medium">Click to upload files</span>
                        <span className="text-sm text-muted-foreground block">or drag and drop</span>
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
                    
                    {formData.uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        {formData.uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFile(index, 'uploadedFiles')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* YouTube Links Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    YouTube Video Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="https://youtube.com/watch?v=..."
                        value={newYoutubeLink}
                        onChange={(e) => setNewYoutubeLink(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addYoutubeLink()}
                      />
                      <Button onClick={addYoutubeLink}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {formData.youtubeLinks.length > 0 && (
                      <div className="space-y-2">
                        {formData.youtubeLinks.map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm truncate">{link}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeYoutubeLink(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* LMS Import Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Import from LMS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <Label htmlFor="lms-upload" className="cursor-pointer">
                      <span className="text-sm font-medium">Upload LMS exports</span>
                      <span className="text-sm text-muted-foreground block">Canvas, Moodle, Blackboard files</span>
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
                </CardContent>
              </Card>

              {/* Manual Topic Entry */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Manual Topic Entry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter a topic or subtopic..."
                        value={newTopic}
                        onChange={(e) => setNewTopic(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTopic()}
                      />
                      <Button onClick={addTopic}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {formData.manualTopics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.manualTopics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            {topic}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeTopic(index)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">AI Configuration</h2>
              <p className="text-muted-foreground">Customize how AI will optimize your learning</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Study Style Preferences *</Label>
                <RadioGroup value={formData.studyStyle} onValueChange={(value) => updateFormData('studyStyle', value)}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                      <RadioGroupItem value="visual" id="visual-style" />
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-blue-500" />
                        <div>
                          <Label htmlFor="visual-style" className="cursor-pointer font-medium">Visual Learning</Label>
                          <p className="text-sm text-muted-foreground">Charts, diagrams, infographics</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                      <RadioGroupItem value="auditory" id="auditory-style" />
                      <div className="flex items-center space-x-2">
                        <Headphones className="h-5 w-5 text-purple-500" />
                        <div>
                          <Label htmlFor="auditory-style" className="cursor-pointer font-medium">Auditory Learning</Label>
                          <p className="text-sm text-muted-foreground">Videos, podcasts, discussions</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                      <RadioGroupItem value="kinesthetic" id="kinesthetic-style" />
                      <div className="flex items-center space-x-2">
                        <Hand className="h-5 w-5 text-green-500" />
                        <div>
                          <Label htmlFor="kinesthetic-style" className="cursor-pointer font-medium">Hands-on Learning</Label>
                          <p className="text-sm text-muted-foreground">Practice, experiments, simulations</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                      <RadioGroupItem value="mixed" id="mixed-style" />
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-orange-500" />
                        <div>
                          <Label htmlFor="mixed-style" className="cursor-pointer font-medium">Mixed Approach</Label>
                          <p className="text-sm text-muted-foreground">Combination of all methods</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Difficulty Level *</Label>
                <Select value={formData.difficultyLevel} onValueChange={(value) => updateFormData('difficultyLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner - I'm new to this subject</SelectItem>
                    <SelectItem value="intermediate">Intermediate - I have some knowledge</SelectItem>
                    <SelectItem value="advanced">Advanced - I'm quite experienced</SelectItem>
                    <SelectItem value="expert">Expert - I need challenging content</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Review Frequency *</Label>
                <Select value={formData.reviewFrequency} onValueChange={(value) => updateFormData('reviewFrequency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How often should AI schedule reviews?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily - Review every day</SelectItem>
                    <SelectItem value="every-2-days">Every 2 days</SelectItem>
                    <SelectItem value="weekly">Weekly - Once per week</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly - Every 2 weeks</SelectItem>
                    <SelectItem value="adaptive">Adaptive - Let AI decide based on performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Assessment Preferences</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Multiple Choice Quizzes',
                    'True/False Questions',
                    'Short Answer Tests',
                    'Essay Questions',
                    'Practical Exercises',
                    'Coding Challenges',
                    'Case Studies',
                    'Peer Reviews'
                  ].map((assessment) => (
                    <div key={assessment} className="flex items-center space-x-2">
                      <Checkbox
                        id={assessment}
                        checked={formData.assessmentPreferences.includes(assessment)}
                        onCheckedChange={() => toggleArrayItem('assessmentPreferences', assessment)}
                      />
                      <Label htmlFor={assessment} className="text-sm cursor-pointer">{assessment}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Review & Create</h2>
              <p className="text-muted-foreground">Review your study plan before generating</p>
            </div>

            <div className="space-y-6">
              {/* Plan Summary */}
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>Plan Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Basic Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Name:</strong> {formData.planName}</p>
                        <p><strong>Subject:</strong> {formData.subjectCategory}</p>
                        <p><strong>Priority:</strong> {formData.priorityLevel}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Timeline</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Target Date:</strong> {formData.targetDate ? new Date(formData.targetDate).toLocaleDateString() : 'Not set'}</p>
                        <p><strong>Daily Hours:</strong> {formData.studyHoursPerDay[0]} hours</p>
                        <p><strong>Preferred Times:</strong> {formData.preferredTimes.length} slots</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Content</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Files:</strong> {formData.uploadedFiles.length} uploaded</p>
                        <p><strong>Videos:</strong> {formData.youtubeLinks.length} links</p>
                        <p><strong>Topics:</strong> {formData.manualTopics.length} manual entries</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">AI Configuration</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Style:</strong> {formData.studyStyle}</p>
                        <p><strong>Level:</strong> {formData.difficultyLevel}</p>
                        <p><strong>Reviews:</strong> {formData.reviewFrequency}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Timeline Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Estimated Duration</span>
                      <span className="text-sm">
                        {formData.targetDate ? 
                          Math.ceil((new Date(formData.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
                          : 0} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Study Hours</span>
                      <span className="text-sm">
                        {formData.targetDate ? 
                          (Math.ceil((new Date(formData.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) * formData.studyHoursPerDay[0]).toFixed(0)
                          : 0} hours
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-4">
                      <div className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full w-0 animate-pulse"></div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      AI will optimize this timeline based on your preferences
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Edit Previous Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Need to make changes?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { step: 1, label: "Basic Info", icon: BookOpen },
                      { step: 2, label: "Timeline", icon: Calendar },
                      { step: 3, label: "Content", icon: Upload },
                      { step: 4, label: "AI Config", icon: Brain }
                    ].map(({ step, label, icon: Icon }) => (
                      <Button
                        key={step}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentStep(step)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg px-8 py-4"
                >
                  {isLoading ? (
                    <>
                      <Timer className="h-5 w-5 mr-2 animate-spin" />
                      Generating AI Study Plan...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Generate Study Plan
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  This may take a few moments while AI analyzes your content
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">StudyBuddy AI</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" className="bg-primary/10 text-primary" asChild>
                <Link to="/study-plans">Study Plans</Link>
              </Button>
              <Button variant="ghost">Schedule</Button>
              <Button variant="ghost">Progress</Button>
              <Button variant="ghost">Goals</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">JS</span>
            </div>
          </div>
        </div>
      </div>

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
  );
};

export default CreateStudyPlan;