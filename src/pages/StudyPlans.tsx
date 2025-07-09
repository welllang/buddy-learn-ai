import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Target, 
  Brain,
  Calendar,
  Play,
  Edit,
  Archive,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Star,
  Zap,
  Award,
  Users
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CircularProgress = ({ progress }: { progress: number }) => {
  const radius = 32;
  const strokeWidth = 4;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-20 h-20">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="hsl(var(--muted))"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="hsl(var(--primary))"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-primary">{progress}%</span>
      </div>
    </div>
  );
};

const StudyPlans = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("active");
  const { toast } = useToast();

  // Demo study plans data
  const studyPlans = [
    {
      id: 1,
      title: "Computer Science Fundamentals",
      subject: "Computer Science",
      progress: 65,
      targetDate: "2024-03-15",
      dailyTime: 60,
      difficulty: "Intermediate",
      status: "active",
      lastStudied: "2 hours ago",
      totalSessions: 12,
      completedTopics: 8,
      totalTopics: 15
    },
    {
      id: 2,
      title: "Calculus Mastery",
      subject: "Mathematics",
      progress: 40,
      targetDate: "2024-02-28",
      dailyTime: 45,
      difficulty: "Advanced",
      status: "active",
      lastStudied: "Yesterday",
      totalSessions: 8,
      completedTopics: 5,
      totalTopics: 12
    },
    {
      id: 3,
      title: "Physics Principles",
      subject: "Physics",
      progress: 100,
      targetDate: "2024-01-30",
      dailyTime: 30,
      difficulty: "Beginner",
      status: "completed",
      lastStudied: "1 week ago",
      totalSessions: 20,
      completedTopics: 10,
      totalTopics: 10
    },
    {
      id: 4,
      title: "Spanish Conversation",
      subject: "Languages",
      progress: 25,
      targetDate: "2024-04-20",
      dailyTime: 45,
      difficulty: "Intermediate",
      status: "paused",
      lastStudied: "3 days ago",
      totalSessions: 5,
      completedTopics: 3,
      totalTopics: 12
    }
  ];

  const [formData, setFormData] = useState({
    subject: "",
    goals: "",
    targetDate: "",
    dailyTime: "60",
    difficultyLevel: "intermediate",
    learningStyle: "visual"
  });

  const generateStudyPlan = async () => {
    if (!formData.subject || !formData.goals) {
      toast({
        title: "Missing Information",
        description: "Please fill in the subject and goals fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/functions/v1/generate-study-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate study plan');
      }

      const data = await response.json();
      
      toast({
        title: "Study Plan Generated! 🎉",
        description: "Your AI-powered study plan has been created successfully.",
      });
      
      setShowCreateForm(false);
      setFormData({
        subject: "",
        goals: "",
        targetDate: "",
        dailyTime: "60",
        difficultyLevel: "intermediate",
        learningStyle: "visual"
      });

    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your study plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'intermediate': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'advanced': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'paused': return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const filteredPlans = studyPlans.filter(plan => {
    if (activeFilter === "all") return true;
    return plan.status === activeFilter;
  });

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
              <Button variant="ghost" className="bg-primary/10 text-primary">Study Plans</Button>
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
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My Study Plans
            </h1>
            <p className="text-muted-foreground text-lg">Manage your AI-powered learning journeys</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 lg:mt-0">
            {/* Filter Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Filter:</span>
              <div className="flex gap-1">
                <Button 
                  variant={activeFilter === "active" ? "default" : "ghost"} 
                  size="sm" 
                  className={activeFilter === "active" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
                  onClick={() => setActiveFilter("active")}
                >
                  Active
                </Button>
                <Button 
                  variant={activeFilter === "completed" ? "default" : "ghost"} 
                  size="sm"
                  className={activeFilter === "completed" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
                  onClick={() => setActiveFilter("completed")}
                >
                  Completed
                </Button>
                <Button 
                  variant={activeFilter === "paused" ? "default" : "ghost"} 
                  size="sm"
                  className={activeFilter === "paused" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
                  onClick={() => setActiveFilter("paused")}
                >
                  Paused
                </Button>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Sort:</span>
              <Select defaultValue="recent">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Create New Plan
            </Button>
          </div>
        </div>

        {/* Create Form Modal */}
        {showCreateForm && (
          <Card className="mb-8 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                Create AI Study Plan
              </CardTitle>
              <CardDescription>
                Let our AI create a personalized study plan tailored to your goals and learning style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject/Topic *</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Data Structures, Calculus, Physics"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetDate">Target Completion Date</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyTime">Daily Study Time (minutes)</Label>
                  <Select value={formData.dailyTime} onValueChange={(value) => setFormData({ ...formData, dailyTime: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={formData.difficultyLevel} onValueChange={(value) => setFormData({ ...formData, difficultyLevel: value })}>
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

                <div className="space-y-2">
                  <Label htmlFor="learningStyle">Learning Style</Label>
                  <Select value={formData.learningStyle} onValueChange={(value) => setFormData({ ...formData, learningStyle: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visual">Visual</SelectItem>
                      <SelectItem value="auditory">Auditory</SelectItem>
                      <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Learning Goals & Objectives *</Label>
                <Textarea
                  id="goals"
                  placeholder="Describe what you want to achieve, any specific topics to focus on, or exams to prepare for..."
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={generateStudyPlan} 
                  disabled={loading}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  {loading ? "Generating..." : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate Study Plan
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Study Plans Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredPlans.map((plan) => (
            <Card key={plan.id} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {plan.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <BookOpen className="h-4 w-4" />
                      {plan.subject}
                    </CardDescription>
                  </div>
                  <CircularProgress progress={plan.progress} />
                </div>

                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(plan.difficulty)} variant="outline">
                    {plan.difficulty}
                  </Badge>
                  <Badge className={getStatusColor(plan.status)} variant="outline">
                    {plan.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Target:</span>
                  </div>
                  <span className="font-medium">{new Date(plan.targetDate).toLocaleDateString()}</span>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Daily:</span>
                  </div>
                  <span className="font-medium">{plan.dailyTime} min</span>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Sessions:</span>
                  </div>
                  <span className="font-medium">{plan.totalSessions}</span>
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Topics:</span>
                  </div>
                  <span className="font-medium">{plan.completedTopics}/{plan.totalTopics}</span>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-3">
                    Last studied: {plan.lastStudied}
                  </p>
                  
                  <div className="flex gap-2">
                    {plan.status === 'active' && (
                      <Button size="sm" className="flex-1">
                        <Play className="h-3 w-3 mr-1" />
                        Continue
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Archive className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Suggestions */}
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-2xl">
                  <Brain className="h-6 w-6 mr-3 text-primary" />
                  Recommended Study Plans
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  AI-curated plans based on your interests and trending topics in your field
                </CardDescription>
              </div>
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Advanced Algorithms", 
                  difficulty: "Advanced", 
                  time: "90 min/day",
                  icon: Target,
                  trending: true,
                  students: "2.4k",
                  description: "Master complex algorithms and data structures"
                },
                { 
                  title: "Machine Learning Basics", 
                  difficulty: "Intermediate", 
                  time: "60 min/day",
                  icon: Brain,
                  trending: true,
                  students: "5.7k",
                  description: "Introduction to ML concepts and practical applications"
                },
                { 
                  title: "Database Design", 
                  difficulty: "Intermediate", 
                  time: "45 min/day",
                  icon: Archive,
                  trending: false,
                  students: "1.8k",
                  description: "Learn to design efficient and scalable databases"
                }
              ].map((suggestion, index) => (
                <div key={index} className="group p-6 rounded-xl bg-background/80 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <suggestion.icon className="h-6 w-6 text-primary" />
                    </div>
                    {suggestion.trending && (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400" variant="outline">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {suggestion.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {suggestion.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>{suggestion.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{suggestion.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{suggestion.students}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-md group-hover:scale-105 transition-all duration-300">
                    <Plus className="h-3 w-3 mr-2" />
                    Create Plan
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">AI Insight</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on your learning pattern and current progress, we recommend starting with 
                <span className="font-medium text-foreground"> Machine Learning Basics</span> to complement your Computer Science studies.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyPlans;