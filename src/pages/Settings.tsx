import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon,
  User,
  Clock,
  Brain,
  Shield,
  Camera,
  Upload,
  Globe,
  Bell,
  Calendar,
  Download,
  Trash2,
  Save,
  Key,
  Smartphone,
  FileText,
  AlertTriangle,
  Mail,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  RotateCcw,
  Heart,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Eye,
  Lock,
  Filter
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'personal' | 'study' | 'ai' | 'security'>('personal');

  // Demo data
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    timezone: "America/New_York",
    language: "en",
    profilePicture: ""
  });

  const [studyPrefs, setStudyPrefs] = useState({
    sessionLength: 45,
    breakLength: 15,
    dailyGoal: 3,
    reminderTime: "09:00",
    studyMethods: ["pomodoro", "active-recall"],
    notifications: {
      email: true,
      push: true,
      reminders: true,
      achievements: true
    },
    calendarIntegration: false,
    autoBreaks: true,
    soundEnabled: true,
    darkMode: false
  });

  const [aiConfig, setAiConfig] = useState({
    studyStyle: "balanced",
    difficultyPreference: "adaptive",
    difficultyLevel: 3,
    reminderFrequency: "moderate",
    motivationStyle: "encouraging",
    feedbackType: "detailed",
    personalityType: "supportive",
    adaptiveLearning: true,
    progressTracking: true,
    smartSuggestions: true
  });

  const [assessmentResults] = useState({
    visualLearner: 75,
    auditoryLearner: 60,
    kinestheticLearner: 45,
    readingLearner: 80
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    sessionTimeout: "24",
    loginNotifications: true,
    dataExport: false,
    privacyMode: false
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved! ✅",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPersonalInfo(prev => ({
          ...prev,
          profilePicture: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Shanghai", label: "China Standard Time (CST)" }
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" },
    { value: "zh", label: "中文" },
    { value: "ja", label: "日本語" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Settings & Preferences
              </h1>
              <p className="text-muted-foreground">Customize your StudyFlow experience to match your learning style</p>
            </div>
            <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-primary to-secondary">
              <Save className="h-4 w-4 mr-2" />
              Save All Settings
            </Button>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="study" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Study Preferences
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Configuration
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy & Security
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Profile Picture */}
                  <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5 text-primary" />
                        Profile Picture
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20 border-2 border-primary/20">
                          <AvatarImage src={personalInfo.profilePicture} />
                          <AvatarFallback className="text-lg bg-gradient-to-br from-primary to-secondary text-white">
                            {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Upload a profile picture to personalize your account
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2" asChild>
                              <label htmlFor="profile-upload" className="cursor-pointer">
                                <Upload className="h-4 w-4" />
                                Upload Photo
                              </label>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setPersonalInfo(prev => ({ ...prev, profilePicture: "" }))}
                            >
                              Remove
                            </Button>
                          </div>
                          <input 
                            id="profile-upload"
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={personalInfo.firstName}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={personalInfo.lastName}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                        />
                        <p className="text-xs text-muted-foreground">
                          Used for account notifications and study reminders
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Localization */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Localization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={personalInfo.timezone} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, timezone: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border shadow-lg z-50">
                            {timezones.map((timezone) => (
                              <SelectItem key={timezone.value} value={timezone.value}>
                                {timezone.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={personalInfo.language} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, language: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border shadow-lg z-50">
                            {languages.map((language) => (
                              <SelectItem key={language.value} value={language.value}>
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5 text-accent" />
                        Account Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Plan</span>
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white">Pro</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Level</span>
                        <span className="font-bold">15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Study Streak</span>
                        <span className="font-bold text-success">27 days</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-destructive/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Danger Zone
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-destructive/10 rounded-lg p-4 space-y-3">
                        <h4 className="font-medium text-sm">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Study Preferences Tab */}
            <TabsContent value="study" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Session Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Session Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sessionLength">Study Session Length</Label>
                            <Badge variant="outline">{studyPrefs.sessionLength} minutes</Badge>
                          </div>
                          <Slider
                            id="sessionLength"
                            min={15}
                            max={90}
                            step={5}
                            value={[studyPrefs.sessionLength]}
                            onValueChange={([value]) => setStudyPrefs(prev => ({ ...prev, sessionLength: value }))}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="breakLength">Break Length</Label>
                            <Badge variant="outline">{studyPrefs.breakLength} minutes</Badge>
                          </div>
                          <Slider
                            id="breakLength"
                            min={5}
                            max={30}
                            step={5}
                            value={[studyPrefs.breakLength]}
                            onValueChange={([value]) => setStudyPrefs(prev => ({ ...prev, breakLength: value }))}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="dailyGoal">Daily Study Goal</Label>
                          <Badge variant="outline">{studyPrefs.dailyGoal} sessions</Badge>
                        </div>
                        <Slider
                          id="dailyGoal"
                          min={1}
                          max={10}
                          step={1}
                          value={[studyPrefs.dailyGoal]}
                          onValueChange={([value]) => setStudyPrefs(prev => ({ ...prev, dailyGoal: value }))}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reminderTime">Daily Reminder Time</Label>
                        <Input
                          id="reminderTime"
                          type="time"
                          value={studyPrefs.reminderTime}
                          onChange={(e) => setStudyPrefs(prev => ({ ...prev, reminderTime: e.target.value }))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Study Methods */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Preferred Study Methods
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: "pomodoro", label: "Pomodoro Technique", desc: "Time-blocked study sessions" },
                          { id: "active-recall", label: "Active Recall", desc: "Question-based learning" },
                          { id: "spaced-repetition", label: "Spaced Repetition", desc: "Optimized review timing" },
                          { id: "feynman", label: "Feynman Technique", desc: "Explain to understand" }
                        ].map((method) => (
                          <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <Switch
                              checked={studyPrefs.studyMethods.includes(method.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setStudyPrefs(prev => ({
                                    ...prev,
                                    studyMethods: [...prev.studyMethods, method.id]
                                  }));
                                } else {
                                  setStudyPrefs(prev => ({
                                    ...prev,
                                    studyMethods: prev.studyMethods.filter(m => m !== method.id)
                                  }));
                                }
                              }}
                            />
                            <div>
                              <p className="font-medium text-sm">{method.label}</p>
                              <p className="text-xs text-muted-foreground">{method.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notifications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notification Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { key: "email", label: "Email Notifications", desc: "Study reminders and updates" },
                        { key: "push", label: "Push Notifications", desc: "Browser notifications" },
                        { key: "reminders", label: "Study Reminders", desc: "Daily study prompts" },
                        { key: "achievements", label: "Achievement Alerts", desc: "Goal completions and milestones" }
                      ].map((notification) => (
                        <div key={notification.key} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor={notification.key}>{notification.label}</Label>
                            <p className="text-xs text-muted-foreground">{notification.desc}</p>
                          </div>
                          <Switch
                            id={notification.key}
                            checked={studyPrefs.notifications[notification.key as keyof typeof studyPrefs.notifications]}
                            onCheckedChange={(checked) => setStudyPrefs(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, [notification.key]: checked }
                            }))}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-success" />
                        Study Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sessions This Week</span>
                        <span className="font-bold">18</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Hours</span>
                        <span className="font-bold">127</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Score</span>
                        <span className="font-bold text-success">92%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Quick Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="autoBreaks">Auto-start Breaks</Label>
                          <p className="text-xs text-muted-foreground">Automatically start break timers</p>
                        </div>
                        <Switch
                          id="autoBreaks"
                          checked={studyPrefs.autoBreaks}
                          onCheckedChange={(checked) => setStudyPrefs(prev => ({ ...prev, autoBreaks: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="soundEnabled">Sound Effects</Label>
                          <p className="text-xs text-muted-foreground">Timer and notification sounds</p>
                        </div>
                        <Switch
                          id="soundEnabled"
                          checked={studyPrefs.soundEnabled}
                          onCheckedChange={(checked) => setStudyPrefs(prev => ({ ...prev, soundEnabled: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="calendarIntegration">Calendar Sync</Label>
                          <p className="text-xs text-muted-foreground">Sync with external calendars</p>
                        </div>
                        <Switch
                          id="calendarIntegration"
                          checked={studyPrefs.calendarIntegration}
                          onCheckedChange={(checked) => setStudyPrefs(prev => ({ ...prev, calendarIntegration: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* AI Configuration Tab */}
            <TabsContent value="ai" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Study Style Assessment */}
                  <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        Study Style Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Your Learning Profile</h4>
                          <Button variant="outline" size="sm" className="gap-2">
                            <RotateCcw className="h-4 w-4" />
                            Retake Assessment
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            { label: "Visual Learner", value: assessmentResults.visualLearner },
                            { label: "Reading/Writing Learner", value: assessmentResults.readingLearner },
                            { label: "Auditory Learner", value: assessmentResults.auditoryLearner },
                            { label: "Kinesthetic Learner", value: assessmentResults.kinestheticLearner }
                          ].map((result) => (
                            <div key={result.label} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{result.label}</span>
                                <Badge variant="outline">{result.value}%</Badge>
                              </div>
                              <Progress value={result.value} className="h-2" />
                            </div>
                          ))}
                        </div>

                        <div className="bg-primary/10 rounded-lg p-4">
                          <h5 className="font-medium text-sm mb-2">AI Recommendation</h5>
                          <p className="text-sm text-muted-foreground">
                            Based on your assessment, you learn best through visual materials and reading. 
                            The AI will prioritize diagrams, charts, and text-based explanations in your study sessions.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Difficulty & Adaptation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Difficulty & Adaptation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="difficultyPreference">Difficulty Management</Label>
                        <Select value={aiConfig.difficultyPreference} onValueChange={(value) => setAiConfig(prev => ({ ...prev, difficultyPreference: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty style" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border shadow-lg z-50">
                            <SelectItem value="adaptive">Adaptive - AI adjusts automatically</SelectItem>
                            <SelectItem value="manual">Manual - You control difficulty</SelectItem>
                            <SelectItem value="challenging">Always Challenging - Push my limits</SelectItem>
                            <SelectItem value="comfortable">Comfortable - Steady progression</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {aiConfig.difficultyPreference === 'manual' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="difficultyLevel">Base Difficulty Level</Label>
                            <Badge variant="outline">Level {aiConfig.difficultyLevel}</Badge>
                          </div>
                          <Slider
                            id="difficultyLevel"
                            min={1}
                            max={5}
                            step={1}
                            value={[aiConfig.difficultyLevel]}
                            onValueChange={([value]) => setAiConfig(prev => ({ ...prev, difficultyLevel: value }))}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Beginner</span>
                            <span>Intermediate</span>
                            <span>Expert</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="adaptiveLearning">Adaptive Learning</Label>
                          <p className="text-xs text-muted-foreground">AI learns from your performance and adjusts</p>
                        </div>
                        <Switch
                          id="adaptiveLearning"
                          checked={aiConfig.adaptiveLearning}
                          onCheckedChange={(checked) => setAiConfig(prev => ({ ...prev, adaptiveLearning: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Personality */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        AI Personality & Communication
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="motivationStyle">Motivation Style</Label>
                        <Select value={aiConfig.motivationStyle} onValueChange={(value) => setAiConfig(prev => ({ ...prev, motivationStyle: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select motivation style" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border shadow-lg z-50">
                            <SelectItem value="encouraging">Encouraging & Supportive</SelectItem>
                            <SelectItem value="challenging">Direct & Challenging</SelectItem>
                            <SelectItem value="casual">Casual & Friendly</SelectItem>
                            <SelectItem value="professional">Professional & Focused</SelectItem>
                            <SelectItem value="humorous">Light & Humorous</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="feedbackType">Feedback Preference</Label>
                        <Select value={aiConfig.feedbackType} onValueChange={(value) => setAiConfig(prev => ({ ...prev, feedbackType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select feedback type" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border shadow-lg z-50">
                            <SelectItem value="detailed">Detailed Explanations</SelectItem>
                            <SelectItem value="concise">Quick & Concise</SelectItem>
                            <SelectItem value="visual">Visual Feedback</SelectItem>
                            <SelectItem value="stats">Data & Statistics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="reminderFrequency">AI Reminder Frequency</Label>
                        <Select value={aiConfig.reminderFrequency} onValueChange={(value) => setAiConfig(prev => ({ ...prev, reminderFrequency: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reminder frequency" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border shadow-lg z-50">
                            <SelectItem value="minimal">Minimal - Only when needed</SelectItem>
                            <SelectItem value="moderate">Moderate - Regular check-ins</SelectItem>
                            <SelectItem value="frequent">Frequent - Active coaching</SelectItem>
                            <SelectItem value="intensive">Intensive - Constant guidance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-secondary" />
                        AI Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sessions Analyzed</span>
                        <span className="font-bold">147</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Learning Rate</span>
                        <span className="font-bold text-success">+23%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Accuracy Prediction</span>
                        <span className="font-bold">94%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Recommendations Used</span>
                        <span className="font-bold">89%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        AI Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="progressTracking">Enhanced Progress Tracking</Label>
                          <p className="text-xs text-muted-foreground">AI analyzes patterns and provides insights</p>
                        </div>
                        <Switch
                          id="progressTracking"
                          checked={aiConfig.progressTracking}
                          onCheckedChange={(checked) => setAiConfig(prev => ({ ...prev, progressTracking: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smartSuggestions">Smart Study Suggestions</Label>
                          <p className="text-xs text-muted-foreground">Get personalized study recommendations</p>
                        </div>
                        <Switch
                          id="smartSuggestions"
                          checked={aiConfig.smartSuggestions}
                          onCheckedChange={(checked) => setAiConfig(prev => ({ ...prev, smartSuggestions: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Privacy & Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Account Security */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Account Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="changePassword">Password</Label>
                            <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Key className="h-4 w-4 mr-2" />
                            Change Password
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                          <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                        </div>
                        <Switch
                          id="twoFactor"
                          checked={securitySettings.twoFactor}
                          onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactor: checked }))}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="sessionTimeout">Session Timeout</Label>
                        <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeout duration" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border shadow-lg z-50">
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="8">8 hours</SelectItem>
                            <SelectItem value="24">24 hours</SelectItem>
                            <SelectItem value="168">1 week</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="loginNotifications">Login Notifications</Label>
                          <p className="text-xs text-muted-foreground">Get notified of new login attempts</p>
                        </div>
                        <Switch
                          id="loginNotifications"
                          checked={securitySettings.loginNotifications}
                          onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, loginNotifications: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Privacy Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Privacy Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="privacyMode">Privacy Mode</Label>
                          <p className="text-xs text-muted-foreground">Hide your activity from other users</p>
                        </div>
                        <Switch
                          id="privacyMode"
                          checked={securitySettings.privacyMode}
                          onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, privacyMode: checked }))}
                        />
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Data Management</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start gap-2">
                            <Download className="h-4 w-4" />
                            Export My Data
                          </Button>
                          <Button variant="outline" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" />
                            Privacy Policy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Session Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Active Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {[
                          { device: "Chrome on Windows", location: "New York, US", current: true, lastActive: "Now" },
                          { device: "Safari on iPhone", location: "New York, US", current: false, lastActive: "2 hours ago" },
                          { device: "Firefox on MacBook", location: "Boston, US", current: false, lastActive: "1 day ago" }
                        ].map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium text-sm flex items-center gap-2">
                                {session.device}
                                {session.current && <Badge variant="secondary" className="text-xs">Current</Badge>}
                              </p>
                              <p className="text-xs text-muted-foreground">{session.location} • {session.lastActive}</p>
                            </div>
                            {!session.current && (
                              <Button variant="outline" size="sm">
                                Revoke
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full">
                        Sign Out All Other Sessions
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5 text-warning" />
                        Security Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-warning">85%</div>
                        <p className="text-sm text-muted-foreground">Good Security</p>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>Strong password</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-warning rounded-full"></div>
                          <span>Enable 2FA to improve</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>Recent login activity</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-destructive/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Account Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Download className="h-4 w-4" />
                        Download Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Settings;