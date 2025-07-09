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
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const StudyPlans = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
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
      case 'beginner': return 'bg-success/10 text-success border-success/20';
      case 'intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'paused': return 'bg-muted/10 text-muted-foreground border-muted/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Plans</h1>
            <p className="text-muted-foreground">Manage your AI-powered learning journeys</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search plans..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
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
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {studyPlans.map((plan) => (
            <Card key={plan.id} className="group hover:shadow-lg transition-all duration-200 border-border/50">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{plan.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <BookOpen className="h-3 w-3" />
                      {plan.subject}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Badge className={getDifficultyColor(plan.difficulty)}>
                      {plan.difficulty}
                    </Badge>
                    <Badge className={getStatusColor(plan.status)}>
                      {plan.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} className="h-2" />
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
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary" />
              AI Recommended Study Plans
            </CardTitle>
            <CardDescription>
              Based on your interests and current progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Advanced Algorithms", difficulty: "Advanced", time: "90 min/day" },
                { title: "Machine Learning Basics", difficulty: "Intermediate", time: "60 min/day" },
                { title: "Database Design", difficulty: "Intermediate", time: "45 min/day" }
              ].map((suggestion, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <h4 className="font-medium mb-2">{suggestion.title}</h4>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                    <span>{suggestion.difficulty}</span>
                    <span>{suggestion.time}</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="h-3 w-3 mr-1" />
                    Create Plan
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyPlans;