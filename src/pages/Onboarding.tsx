import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  User, 
  Target, 
  Calendar, 
  BookOpen, 
  Clock, 
  Settings,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Play,
  Star,
  Lightbulb,
  Users,
  Trophy,
  Zap,
  Globe,
  HeadphonesIcon,
  Eye,
  Hand,
  Volume2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Welcome (no data needed)
    
    // Step 2: Profile
    name: "",
    age: "",
    location: "",
    timezone: "",
    educationLevel: "",
    background: "",
    primaryObjective: "",
    studyTimePerDay: "",
    studyTimePerWeek: "",
    preferredLanguages: [] as string[],
    
    // Step 3: Learning Style
    learningStyle: "",
    attentionSpan: "",
    sessionLength: "",
    bestStudyTimes: [] as string[],
    studyEnvironment: "",
    motivationTriggers: [] as string[],
    
    // Step 4: Goals & Subjects
    primarySubjects: [] as string[],
    secondaryInterests: [] as string[],
    specificObjectives: "",
    targetCompletionDate: "",
    successMetrics: [] as string[],
    
    // Step 5: Study Plan
    difficultyLevel: "",
    learningPathPreference: "",
    resourceTypes: [] as string[],
    practiceTheoryBalance: "",
    existingMaterials: "",
    
    // Step 6: Calendar
    calendarPlatform: "",
    schedulingPreferences: [] as string[],
    breakTime: "",
    bufferTime: "",
    reminderSettings: [] as string[],
    
    // Step 7: Final (review data)
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 7;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    toast({
      title: "Onboarding Complete!",
      description: "Welcome to StudyBuddy AI! Your personalized learning journey begins now.",
    });
    navigate("/dashboard");
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    const updatedArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateFormData(field, updatedArray);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">Welcome to StudyBuddy AI!</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get ready to transform your learning experience with AI-powered personalized study plans, 
              smart scheduling, and adaptive content that grows with you.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 border rounded-lg">
                <Target className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Personalized Learning</h3>
                <p className="text-sm text-muted-foreground">AI adapts to your learning style and pace</p>
              </div>
              <div className="p-6 border rounded-lg">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Smart Scheduling</h3>
                <p className="text-sm text-muted-foreground">Optimized study sessions that fit your life</p>
              </div>
              <div className="p-6 border rounded-lg">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">Visual insights into your learning journey</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                This onboarding will take about 5-10 minutes. We'll use this information to create 
                your perfect learning environment.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Tell Us About Yourself</h2>
              <p className="text-muted-foreground">Help us personalize your experience</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  placeholder="Your age"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select onValueChange={(value) => updateFormData('timezone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                    <SelectItem value="UTC+1">Central European (UTC+1)</SelectItem>
                    <SelectItem value="UTC+5:30">India Standard (UTC+5:30)</SelectItem>
                    <SelectItem value="UTC+8">China Standard (UTC+8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="educationLevel">Current Education Level *</Label>
              <Select onValueChange={(value) => updateFormData('educationLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryObjective">Primary Learning Objective *</Label>
              <Select onValueChange={(value) => updateFormData('primaryObjective', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="What's your main goal?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic Excellence</SelectItem>
                  <SelectItem value="certification">Professional Certification</SelectItem>
                  <SelectItem value="skill-development">Skill Development</SelectItem>
                  <SelectItem value="career-change">Career Change</SelectItem>
                  <SelectItem value="personal-growth">Personal Growth</SelectItem>
                  <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studyTimePerDay">Available Study Time Per Day</Label>
                <Select onValueChange={(value) => updateFormData('studyTimePerDay', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select daily time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="2hours">2 hours</SelectItem>
                    <SelectItem value="3hours">3 hours</SelectItem>
                    <SelectItem value="4+hours">4+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="studyTimePerWeek">Available Study Time Per Week</Label>
                <Select onValueChange={(value) => updateFormData('studyTimePerWeek', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select weekly time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5hours">5 hours</SelectItem>
                    <SelectItem value="10hours">10 hours</SelectItem>
                    <SelectItem value="15hours">15 hours</SelectItem>
                    <SelectItem value="20hours">20 hours</SelectItem>
                    <SelectItem value="25+hours">25+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Learning Style Assessment</h2>
              <p className="text-muted-foreground">Help us understand how you learn best</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Primary Learning Style *</Label>
                <RadioGroup 
                  value={formData.learningStyle} 
                  onValueChange={(value) => updateFormData('learningStyle', value)}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                    <RadioGroupItem value="visual" id="visual" />
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="visual" className="cursor-pointer font-medium">Visual</Label>
                        <p className="text-sm text-muted-foreground">Learn through images, diagrams, charts</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                    <RadioGroupItem value="auditory" id="auditory" />
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="auditory" className="cursor-pointer font-medium">Auditory</Label>
                        <p className="text-sm text-muted-foreground">Learn through listening and discussion</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                    <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                    <div className="flex items-center space-x-2">
                      <Hand className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="kinesthetic" className="cursor-pointer font-medium">Kinesthetic</Label>
                        <p className="text-sm text-muted-foreground">Learn through hands-on practice</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                    <RadioGroupItem value="reading" id="reading" />
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="reading" className="cursor-pointer font-medium">Reading/Writing</Label>
                        <p className="text-sm text-muted-foreground">Learn through text and writing</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Preferred Study Session Length</Label>
                <Select onValueChange={(value) => updateFormData('sessionLength', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How long can you focus?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15-20 minutes</SelectItem>
                    <SelectItem value="30min">25-30 minutes</SelectItem>
                    <SelectItem value="45min">45-50 minutes</SelectItem>
                    <SelectItem value="60min">60+ minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Best Study Times (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Early Morning (6-9 AM)', 'Morning (9-12 PM)', 'Afternoon (12-5 PM)', 'Evening (5-8 PM)', 'Night (8-11 PM)', 'Late Night (11+ PM)'].map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox
                        id={time}
                        checked={formData.bestStudyTimes.includes(time)}
                        onCheckedChange={() => toggleArrayItem('bestStudyTimes', time)}
                      />
                      <Label htmlFor={time} className="text-sm cursor-pointer">{time}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Study Environment Preference</Label>
                <Select onValueChange={(value) => updateFormData('studyEnvironment', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Where do you study best?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiet">Complete silence</SelectItem>
                    <SelectItem value="background-music">Background music</SelectItem>
                    <SelectItem value="nature-sounds">Nature sounds</SelectItem>
                    <SelectItem value="cafe-noise">Café/ambient noise</SelectItem>
                    <SelectItem value="varied">Varies by task</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">What Motivates You? (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Progress Tracking', 'Achievements/Badges', 'Competition', 'Rewards', 'Social Recognition', 'Personal Growth', 'Deadlines', 'Gamification'].map((motivation) => (
                    <div key={motivation} className="flex items-center space-x-2">
                      <Checkbox
                        id={motivation}
                        checked={formData.motivationTriggers.includes(motivation)}
                        onCheckedChange={() => toggleArrayItem('motivationTriggers', motivation)}
                      />
                      <Label htmlFor={motivation} className="text-sm cursor-pointer">{motivation}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Goals & Subject Selection</h2>
              <p className="text-muted-foreground">Define what you want to achieve</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Primary Subjects/Skills (Select up to 3)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Mathematics', 'Science', 'Programming', 'Languages', 'Business', 'Arts', 'History', 'Literature', 'Psychology', 'Engineering', 'Medicine', 'Finance'].map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={formData.primarySubjects.includes(subject)}
                        onCheckedChange={() => toggleArrayItem('primarySubjects', subject)}
                        disabled={!formData.primarySubjects.includes(subject) && formData.primarySubjects.length >= 3}
                      />
                      <Label htmlFor={subject} className="text-sm cursor-pointer">{subject}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Secondary Interests (Optional)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Philosophy', 'Music', 'Sports', 'Technology', 'Health', 'Cooking', 'Photography', 'Writing', 'Design', 'Environment'].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.secondaryInterests.includes(interest)}
                        onCheckedChange={() => toggleArrayItem('secondaryInterests', interest)}
                      />
                      <Label htmlFor={interest} className="text-sm cursor-pointer">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specificObjectives">Specific Learning Objectives</Label>
                <Textarea
                  id="specificObjectives"
                  value={formData.specificObjectives}
                  onChange={(e) => updateFormData('specificObjectives', e.target.value)}
                  placeholder="e.g., Pass calculus exam, Learn Python for data science, Improve Spanish conversation skills..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetCompletionDate">Target Completion Date</Label>
                <Input
                  id="targetCompletionDate"
                  type="date"
                  value={formData.targetCompletionDate}
                  onChange={(e) => updateFormData('targetCompletionDate', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">How Will You Measure Success? (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Test Scores', 'Practical Projects', 'Skill Assessments', 'Certifications', 'Portfolio', 'Real-world Application'].map((metric) => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric}
                        checked={formData.successMetrics.includes(metric)}
                        onCheckedChange={() => toggleArrayItem('successMetrics', metric)}
                      />
                      <Label htmlFor={metric} className="text-sm cursor-pointer">{metric}</Label>
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
            <div className="text-center mb-6">
              <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">AI-Powered Study Plan</h2>
              <p className="text-muted-foreground">Let's create your personalized learning path</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Current Difficulty Level</Label>
                <Select onValueChange={(value) => updateFormData('difficultyLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Where would you place yourself?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
                    <SelectItem value="elementary">Elementary - Basic understanding</SelectItem>
                    <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                    <SelectItem value="advanced">Advanced - Strong foundation</SelectItem>
                    <SelectItem value="expert">Expert - Deep knowledge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Learning Path Preference</Label>
                <RadioGroup 
                  value={formData.learningPathPreference} 
                  onValueChange={(value) => updateFormData('learningPathPreference', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="structured" id="structured" />
                    <Label htmlFor="structured" className="cursor-pointer">
                      <div className="font-medium">Structured & Sequential</div>
                      <p className="text-sm text-muted-foreground">Follow a predetermined curriculum step by step</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="flexible" id="flexible" />
                    <Label htmlFor="flexible" className="cursor-pointer">
                      <div className="font-medium">Flexible & Adaptive</div>
                      <p className="text-sm text-muted-foreground">AI adjusts based on your progress and interests</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="project-based" id="project-based" />
                    <Label htmlFor="project-based" className="cursor-pointer">
                      <div className="font-medium">Project-Based</div>
                      <p className="text-sm text-muted-foreground">Learn by building real projects and applications</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Preferred Resource Types (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Video Lectures', 'Interactive Exercises', 'Text/Articles', 'Audio/Podcasts', 'Flashcards', 'Quizzes', 'Practice Problems', 'Simulations', 'Group Discussions'].map((resource) => (
                    <div key={resource} className="flex items-center space-x-2">
                      <Checkbox
                        id={resource}
                        checked={formData.resourceTypes.includes(resource)}
                        onCheckedChange={() => toggleArrayItem('resourceTypes', resource)}
                      />
                      <Label htmlFor={resource} className="text-sm cursor-pointer">{resource}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Practice vs Theory Balance</Label>
                <Select onValueChange={(value) => updateFormData('practiceTheoryBalance', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How do you prefer to learn?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theory-heavy">Theory Heavy (70% theory, 30% practice)</SelectItem>
                    <SelectItem value="balanced">Balanced (50% theory, 50% practice)</SelectItem>
                    <SelectItem value="practice-heavy">Practice Heavy (30% theory, 70% practice)</SelectItem>
                    <SelectItem value="hands-on">Hands-on Learning (20% theory, 80% practice)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="existingMaterials">Import Existing Materials (Optional)</Label>
                <Textarea
                  id="existingMaterials"
                  value={formData.existingMaterials}
                  onChange={(e) => updateFormData('existingMaterials', e.target.value)}
                  placeholder="List any textbooks, courses, or resources you're already using..."
                  rows={2}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Smart Calendar Integration</h2>
              <p className="text-muted-foreground">Optimize your study schedule</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Calendar Platform</Label>
                <Select onValueChange={(value) => updateFormData('calendarPlatform', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your calendar platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Calendar</SelectItem>
                    <SelectItem value="outlook">Microsoft Outlook</SelectItem>
                    <SelectItem value="apple">Apple Calendar</SelectItem>
                    <SelectItem value="other">Other/Manual</SelectItem>
                    <SelectItem value="none">Skip integration for now</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Scheduling Preferences (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Automatic scheduling', 'Respect busy times', 'Prefer morning sessions', 'Prefer evening sessions', 'Weekend sessions', 'Avoid meal times', 'Buffer before meetings', 'Flexible timing'].map((pref) => (
                    <div key={pref} className="flex items-center space-x-2">
                      <Checkbox
                        id={pref}
                        checked={formData.schedulingPreferences.includes(pref)}
                        onCheckedChange={() => toggleArrayItem('schedulingPreferences', pref)}
                      />
                      <Label htmlFor={pref} className="text-sm cursor-pointer">{pref}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="breakTime">Break Time Between Sessions</Label>
                  <Select onValueChange={(value) => updateFormData('breakTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select break duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5min">5 minutes</SelectItem>
                      <SelectItem value="10min">10 minutes</SelectItem>
                      <SelectItem value="15min">15 minutes</SelectItem>
                      <SelectItem value="30min">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bufferTime">Buffer Time Before/After</Label>
                  <Select onValueChange={(value) => updateFormData('bufferTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select buffer time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0min">No buffer</SelectItem>
                      <SelectItem value="5min">5 minutes</SelectItem>
                      <SelectItem value="10min">10 minutes</SelectItem>
                      <SelectItem value="15min">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Reminder & Notification Settings (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['15 min before session', '1 hour before session', '1 day before session', 'Email reminders', 'Push notifications', 'SMS reminders', 'Progress reports', 'Weekly summaries'].map((reminder) => (
                    <div key={reminder} className="flex items-center space-x-2">
                      <Checkbox
                        id={reminder}
                        checked={formData.reminderSettings.includes(reminder)}
                        onCheckedChange={() => toggleArrayItem('reminderSettings', reminder)}
                      />
                      <Label htmlFor={reminder} className="text-sm cursor-pointer">{reminder}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {formData.calendarPlatform && formData.calendarPlatform !== 'none' && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    📅 After onboarding, you'll be guided to connect your {formData.calendarPlatform} calendar 
                    for seamless scheduling integration.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Setup Complete!</h2>
              <p className="text-muted-foreground">Review your preferences and start your learning journey</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Education:</strong> {formData.educationLevel}</p>
                      <p><strong>Daily Study Time:</strong> {formData.studyTimePerDay}</p>
                      <p><strong>Primary Goal:</strong> {formData.primaryObjective}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5" />
                      <span>Learning Style</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Style:</strong> {formData.learningStyle}</p>
                      <p><strong>Session Length:</strong> {formData.sessionLength}</p>
                      <p><strong>Best Times:</strong> {formData.bestStudyTimes.slice(0, 2).join(', ')}</p>
                      <p><strong>Environment:</strong> {formData.studyEnvironment}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Goals & Subjects</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Primary Subjects:</strong> {formData.primarySubjects.join(', ')}</p>
                      <p><strong>Difficulty Level:</strong> {formData.difficultyLevel}</p>
                      <p><strong>Learning Path:</strong> {formData.learningPathPreference}</p>
                      <p><strong>Target Date:</strong> {formData.targetCompletionDate}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Schedule & Integration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Calendar:</strong> {formData.calendarPlatform}</p>
                      <p><strong>Break Time:</strong> {formData.breakTime}</p>
                      <p><strong>Buffer Time:</strong> {formData.bufferTime}</p>
                      <p><strong>Reminders:</strong> {formData.reminderSettings.length} selected</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">What's Next?</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Play className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">First Study Session</h4>
                    <p className="text-sm text-muted-foreground">We'll schedule your first session based on your preferences</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">Join Community</h4>
                    <p className="text-sm text-muted-foreground">Connect with other learners and study groups</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">Track Progress</h4>
                    <p className="text-sm text-muted-foreground">Monitor your learning journey with detailed analytics</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Your AI study plan is being generated!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on your preferences, we're creating a personalized learning experience just for you.
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">StudyBuddy AI Setup</h1>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <Progress value={progressPercentage} className="w-32" />
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i + 1 === currentStep
                    ? 'bg-primary'
                    : i + 1 < currentStep
                    ? 'bg-primary/60'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === totalSteps ? 'Complete Setup' : 'Next'}</span>
            {currentStep === totalSteps ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;