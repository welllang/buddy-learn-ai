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
          <div className="space-y-6">
            <div className="text-center mb-8">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
              <p className="text-muted-foreground">Let's start with the fundamentals of your study plan</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="planName">Plan Name/Title *</Label>
                <Input
                  id="planName"
                  placeholder="e.g., Advanced Computer Science Fundamentals"
                  value={formData.planName}
                  onChange={(e) => updateFormData('planName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjectCategory">Subject Category *</Label>
                <Select value={formData.subjectCategory} onValueChange={(value) => updateFormData('subjectCategory', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="languages">Languages</SelectItem>
                    <SelectItem value="arts">Arts & Humanities</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description/Goals</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you want to achieve with this study plan, your learning objectives, and any specific areas of focus..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>Priority Level *</Label>
                <RadioGroup value={formData.priorityLevel} onValueChange={(value) => updateFormData('priorityLevel', value)}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                      <RadioGroupItem value="low" id="low" />
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <div>
                          <Label htmlFor="low" className="cursor-pointer font-medium">Low Priority</Label>
                          <p className="text-sm text-muted-foreground">Flexible timeline, casual learning</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                      <RadioGroupItem value="medium" id="medium" />
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-amber-500" />
                        <div>
                          <Label htmlFor="medium" className="cursor-pointer font-medium">Medium Priority</Label>
                          <p className="text-sm text-muted-foreground">Important goals, regular schedule</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                      <RadioGroupItem value="high" id="high" />
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-red-500" />
                        <div>
                          <Label htmlFor="high" className="cursor-pointer font-medium">High Priority</Label>
                          <p className="text-sm text-muted-foreground">Urgent deadlines, intensive study</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Timeline Setup</h2>
              <p className="text-muted-foreground">Configure your study schedule and timeline</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="targetDate">Target Completion Date *</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => updateFormData('targetDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bufferTime">Buffer Time for Reviews (minutes)</Label>
                  <Select value={formData.bufferTime} onValueChange={(value) => updateFormData('bufferTime', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Available Study Hours Per Day: {formData.studyHoursPerDay[0]} hours</Label>
                <Slider
                  value={formData.studyHoursPerDay}
                  onValueChange={(value) => updateFormData('studyHoursPerDay', value)}
                  max={12}
                  min={0.5}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>30 min</span>
                  <span>6 hours</span>
                  <span>12 hours</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Preferred Study Times *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Early Morning (6-9 AM)',
                    'Morning (9-12 PM)',
                    'Afternoon (12-3 PM)',
                    'Late Afternoon (3-6 PM)',
                    'Evening (6-9 PM)',
                    'Night (9-12 AM)'
                  ].map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox
                        id={time}
                        checked={formData.preferredTimes.includes(time)}
                        onCheckedChange={() => toggleArrayItem('preferredTimes', time)}
                      />
                      <Label htmlFor={time} className="text-sm cursor-pointer">{time}</Label>
                    </div>
                  ))}
                </div>
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