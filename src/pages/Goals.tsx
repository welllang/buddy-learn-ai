import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  Plus, 
  Calendar, 
  Clock, 
  TrendingUp,
  CheckCircle,
  Circle,
  Edit,
  Trash2,
  Star,
  Trophy,
  Zap,
  BookOpen,
  Award,
  Filter,
  Search,
  Eye,
  Play,
  Pause,
  BarChart3,
  Sparkles,
  Share,
  Brain,
  Lightbulb,
  Flame,
  Timer,
  Users,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const Goals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'ai-suggestions' | 'analytics'>('overview');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Creative Demo Data
  const demoGoals = [
    {
      id: 1,
      title: "Master Machine Learning Fundamentals",
      description: "Complete comprehensive ML course covering supervised/unsupervised learning, neural networks, and practical applications",
      category: "long-term",
      priority: "high",
      target_date: "2024-06-15",
      progress: 78,
      status: "active",
      estimated_time_hours: 120,
      time_invested_hours: 94,
      success_metrics: "Pass final project with 90%+, complete 8 hands-on projects",
      subject: "Artificial Intelligence",
      actionItems: [
        { title: "Linear Regression Theory", completed: true },
        { title: "Classification Algorithms", completed: true },
        { title: "Neural Network Basics", completed: true },
        { title: "Deep Learning Project", completed: false },
        { title: "Final Capstone Project", completed: false }
      ],
      milestones: 5,
      completedMilestones: 3,
      streak: 12,
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "Quantum Computing Certification",
      description: "Earn IBM Quantum Developer certification through structured learning path",
      category: "skill-development", 
      priority: "medium",
      target_date: "2024-05-20",
      progress: 45,
      status: "active",
      estimated_time_hours: 80,
      time_invested_hours: 36,
      success_metrics: "Pass certification exam with 85%+",
      subject: "Quantum Physics",
      actionItems: [
        { title: "Quantum Mechanics Basics", completed: true },
        { title: "Qubit Operations", completed: true },
        { title: "Quantum Gates", completed: false },
        { title: "Quantum Algorithms", completed: false }
      ],
      milestones: 4,
      completedMilestones: 2,
      streak: 8,
      difficulty: "Expert"
    },
    {
      id: 3,
      title: "30-Day Data Science Challenge",
      description: "Complete daily coding challenges to improve data analysis and visualization skills",
      category: "short-term",
      priority: "high", 
      target_date: "2024-04-30",
      progress: 90,
      status: "active",
      estimated_time_hours: 45,
      time_invested_hours: 41,
      success_metrics: "Complete all 30 challenges, build portfolio project",
      subject: "Data Science",
      actionItems: [
        { title: "Week 1 - Python Basics", completed: true },
        { title: "Week 2 - Pandas & NumPy", completed: true },
        { title: "Week 3 - Data Visualization", completed: true },
        { title: "Week 4 - Portfolio Project", completed: false }
      ],
      milestones: 4,
      completedMilestones: 3,
      streak: 27,
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "Computer Vision Specialization",
      description: "Master computer vision techniques including image processing, object detection, and facial recognition",
      category: "long-term",
      priority: "medium",
      target_date: "2024-08-01",
      progress: 100,
      status: "completed",
      estimated_time_hours: 100,
      time_invested_hours: 98,
      success_metrics: "Complete 5 CV projects, achieve 95% accuracy on final model",
      subject: "Computer Vision",
      actionItems: [
        { title: "Image Processing Fundamentals", completed: true },
        { title: "CNN Architectures", completed: true },
        { title: "Object Detection Project", completed: true },
        { title: "Face Recognition System", completed: true },
        { title: "Final Portfolio Presentation", completed: true }
      ],
      milestones: 5,
      completedMilestones: 5,
      streak: 0,
      difficulty: "Advanced"
    }
  ];

  const achievements = [
    { 
      id: 1, 
      name: "First Goal", 
      description: "Created your first learning goal", 
      icon: Target, 
      earned: true, 
      rarity: "common",
      points: 10,
      earnedDate: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Goal Crusher", 
      description: "Completed 5 learning goals", 
      icon: Trophy, 
      earned: true, 
      rarity: "rare",
      points: 50,
      earnedDate: "2024-03-10"
    },
    { 
      id: 3, 
      name: "Consistency Master", 
      description: "30-day study streak", 
      icon: Flame, 
      earned: true, 
      rarity: "epic",
      points: 100,
      earnedDate: "2024-03-20"
    },
    { 
      id: 4, 
      name: "AI Specialist", 
      description: "Master 3 AI-related subjects", 
      icon: Brain, 
      earned: false, 
      rarity: "legendary",
      points: 200,
      earnedDate: null
    },
    { 
      id: 5, 
      name: "Time Wizard", 
      description: "Study 500+ hours total", 
      icon: Timer, 
      earned: false, 
      rarity: "epic",
      points: 150,
      earnedDate: null
    }
  ];

  const aiSuggestions = [
    {
      title: "Build a Personal AI Assistant",
      description: "Create an AI chatbot using OpenAI API and React to enhance your portfolio with practical AI experience",
      category: "skill-development",
      priority: "high",
      estimatedTimeHours: 60,
      difficulty: "Intermediate",
      timeline: "6-8 weeks",
      milestones: [
        "Set up OpenAI API integration",
        "Build conversation interface", 
        "Add memory and context",
        "Deploy and optimize"
      ],
      successMetrics: "Functional AI assistant with conversation memory, deployed on cloud platform",
      reasoning: "Based on your ML progress, this bridges theory with practical application"
    },
    {
      title: "Contribute to Open Source ML Project",
      description: "Make meaningful contributions to TensorFlow or PyTorch to build real-world experience and network",
      category: "skill-development", 
      priority: "medium",
      estimatedTimeHours: 40,
      difficulty: "Advanced",
      timeline: "4-6 weeks",
      milestones: [
        "Find suitable issues to work on",
        "Set up development environment",
        "Submit first pull request",
        "Complete 3 meaningful contributions"
      ],
      successMetrics: "3+ merged pull requests, positive community feedback",
      reasoning: "Your advanced ML skills are ready for real-world application"
    },
    {
      title: "Quantum ML Research Paper",
      description: "Research and write a paper on quantum machine learning applications, combining your two strongest areas",
      category: "long-term",
      priority: "high", 
      estimatedTimeHours: 100,
      difficulty: "Expert",
      timeline: "12-16 weeks",
      milestones: [
        "Literature review and research",
        "Experimental design and setup",
        "Data collection and analysis", 
        "Paper writing and submission"
      ],
      successMetrics: "Complete research paper, potential conference submission",
      reasoning: "Perfect synergy between your quantum and ML expertise"
    }
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "short-term",
    targetDate: "",
    priority: "medium",
    successMetrics: "",
    estimatedHours: ""
  });

  const createGoal = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate goal creation
    toast({
      title: "Success! 🎯",
      description: `Goal "${formData.title}" created successfully!`
    });
    
    setFormData({
      title: "",
      description: "",
      category: "short-term",
      targetDate: "",
      priority: "medium", 
      successMetrics: "",
      estimatedHours: ""
    });
    setShowCreateForm(false);
  };

  const createGoalFromAI = (suggestion: any) => {
    toast({
      title: "AI Goal Created! 🤖",
      description: `"${suggestion.title}" has been added to your goals`,
    });
  };

  const filteredGoals = demoGoals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || goal.category === filterCategory;
    const matchesStatus = filterStatus === "all" || goal.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'short-term': return 'bg-success/10 text-success border-success/20';
      case 'medium-term': return 'bg-warning/10 text-warning border-warning/20';
      case 'long-term': return 'bg-primary/10 text-primary border-primary/20';
      case 'exam-preparation': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'skill-development': return 'bg-secondary/10 text-secondary border-secondary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-muted/10 text-muted-foreground border-muted/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      case 'Intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced': return 'bg-primary/10 text-primary border-primary/20';
      case 'Expert': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'rare': return 'bg-primary/10 text-primary border-primary/20';
      case 'epic': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'legendary': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const totalGoals = demoGoals.length;
  const completedGoals = demoGoals.filter(g => g.status === 'completed').length;
  const activeGoals = demoGoals.filter(g => g.status === 'active').length;
  const totalHours = demoGoals.reduce((sum, g) => sum + g.time_invested_hours, 0);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Goals Management
              </h1>
              <p className="text-muted-foreground">Transform your learning ambitions into achievable milestones</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search goals..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="short-term">Short-term</SelectItem>
                  <SelectItem value="medium-term">Medium-term</SelectItem>
                  <SelectItem value="long-term">Long-term</SelectItem>
                  <SelectItem value="exam-preparation">Exam Prep</SelectItem>
                  <SelectItem value="skill-development">Skill Dev</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-primary to-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Create Goal
              </Button>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Goals Overview
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create & Manage
              </TabsTrigger>
              <TabsTrigger value="ai-suggestions" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Suggestions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Goals Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Goals</p>
                        <p className="text-2xl font-bold">{totalGoals}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-bold text-success">{completedGoals}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Play className="h-5 w-5 text-warning" />
                      <div>
                        <p className="text-sm text-muted-foreground">Active</p>
                        <p className="text-2xl font-bold text-warning">{activeGoals}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Hours Invested</p>
                        <p className="text-2xl font-bold text-accent">{totalHours}h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Achievements</p>
                        <p className="text-2xl font-bold text-secondary">{achievements.filter(a => a.earned).length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Goals List */}
              <div className="grid gap-6">
                {filteredGoals.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Target className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No goals found</h3>
                      <p className="text-muted-foreground mb-6">Create your first learning goal to start your journey</p>
                      <Button onClick={() => setActiveTab('create')} className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Goal
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  filteredGoals.map((goal) => (
                    <Card key={goal.id} className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-3">
                              <CardTitle className="text-xl">{goal.title}</CardTitle>
                              {goal.status === 'completed' && (
                                <CheckCircle className="h-6 w-6 text-success animate-pulse" />
                              )}
                              {goal.streak > 0 && (
                                <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                                  <Flame className="h-3 w-3 mr-1" />
                                  {goal.streak} day streak
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-base leading-relaxed">{goal.description}</CardDescription>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Badge className={getCategoryColor(goal.category)}>
                              {goal.category.replace('-', ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(goal.priority)}>
                              {goal.priority} priority
                            </Badge>
                            <Badge className={getDifficultyColor(goal.difficulty)}>
                              {goal.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-3" />
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Target Date</p>
                              <p className="font-medium">
                                {goal.target_date ? new Date(goal.target_date).toLocaleDateString() : 'Not set'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Time Progress</p>
                              <p className="font-medium">
                                {goal.time_invested_hours}h / {goal.estimated_time_hours}h
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Milestones</p>
                              <p className="font-medium">
                                {goal.completedMilestones}/{goal.milestones}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Subject</p>
                              <p className="font-medium">{goal.subject}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Items Preview */}
                        <div>
                          <h4 className="text-sm font-medium mb-3 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Action Items
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {goal.actionItems.map((item, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                {item.completed ? (
                                  <CheckCircle className="h-4 w-4 text-success" />
                                ) : (
                                  <Circle className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className={item.completed ? 'text-foreground line-through' : 'text-foreground'}>
                                  {item.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-border/50">
                          <Button 
                            size="sm" 
                            onClick={() => navigate(`/goals/${goal.id}`)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          {goal.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toast({ title: "Goal completed! 🎉", description: "Congratulations on your achievement!" })}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Complete
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Create & Manage Tab */}
            <TabsContent value="create" className="space-y-6">
              {showCreateForm ? (
                <Card className="border-primary/20 shadow-xl bg-gradient-to-br from-background to-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Target className="h-6 w-6 mr-3 text-primary" />
                      Create New Learning Goal
                    </CardTitle>
                    <CardDescription className="text-base">
                      Transform your learning ambitions into achievable, measurable milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="title" className="text-base font-medium">Goal Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Master Deep Learning Fundamentals"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="h-12"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="category" className="text-base font-medium">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short-term">🎯 Short-term (1-4 weeks)</SelectItem>
                            <SelectItem value="medium-term">📈 Medium-term (1-3 months)</SelectItem>
                            <SelectItem value="long-term">🚀 Long-term (3+ months)</SelectItem>
                            <SelectItem value="exam-preparation">📚 Exam Preparation</SelectItem>
                            <SelectItem value="skill-development">⚡ Skill Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="priority" className="text-base font-medium">Priority Level</Label>
                        <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">🔴 High Priority</SelectItem>
                            <SelectItem value="medium">🟡 Medium Priority</SelectItem>
                            <SelectItem value="low">🟢 Low Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="targetDate" className="text-base font-medium">Target Completion</Label>
                        <Input
                          id="targetDate"
                          type="date"
                          value={formData.targetDate}
                          onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="estimatedHours" className="text-base font-medium">Estimated Hours</Label>
                        <Input
                          id="estimatedHours"
                          type="number"
                          placeholder="e.g., 60"
                          value={formData.estimatedHours}
                          onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="description" className="text-base font-medium">Description & Objectives *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what you want to achieve, including specific learning outcomes and key skills..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="successMetrics" className="text-base font-medium">Success Criteria</Label>
                      <Textarea
                        id="successMetrics"
                        placeholder="How will you measure success? Define specific, measurable outcomes..."
                        value={formData.successMetrics}
                        onChange={(e) => setFormData({ ...formData, successMetrics: e.target.value })}
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={createGoal} className="bg-gradient-to-r from-primary to-secondary flex-1 h-12">
                        <Target className="h-5 w-5 mr-2" />
                        Create Learning Goal
                      </Button>
                      <Button variant="outline" onClick={() => setShowCreateForm(false)} className="h-12 px-8">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Ready to set a new goal?</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Transform your learning ambitions into structured, achievable milestones that drive real progress
                  </p>
                  <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-primary to-secondary h-12 px-8">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Goal
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* AI Suggestions Tab */}
            <TabsContent value="ai-suggestions" className="space-y-6">
              <Card className="border-primary/20 shadow-xl bg-gradient-to-br from-background to-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Sparkles className="h-6 w-6 mr-3 text-primary" />
                    AI-Powered Goal Suggestions
                  </CardTitle>
                  <CardDescription className="text-base">
                    Based on your learning history and progress, here are personalized goal recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {aiSuggestions.map((suggestion, index) => (
                    <Card key={index} className="border border-border/50 hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center">
                              <Lightbulb className="h-5 w-5 mr-2 text-warning" />
                              {suggestion.title}
                            </CardTitle>
                            <CardDescription className="mt-2 text-base leading-relaxed">
                              {suggestion.description}
                            </CardDescription>
                          </div>
                          <Badge className={getDifficultyColor(suggestion.difficulty)}>
                            {suggestion.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Timeline</p>
                              <p className="font-medium">{suggestion.timeline}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Est. Hours</p>
                              <p className="font-medium">{suggestion.estimatedTimeHours}h</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Category</p>
                              <p className="font-medium capitalize">{suggestion.category.replace('-', ' ')}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Priority</p>
                              <p className="font-medium capitalize">{suggestion.priority}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-3 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Key Milestones
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {suggestion.milestones.map((milestone: string, mIndex: number) => (
                              <div key={mIndex} className="flex items-center space-x-2 text-sm">
                                <Circle className="h-3 w-3 text-muted-foreground" />
                                <span>{milestone}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-muted/30 rounded-lg p-4">
                          <h4 className="text-sm font-medium mb-2 flex items-center">
                            <Brain className="h-4 w-4 mr-2" />
                            AI Reasoning
                          </h4>
                          <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                        </div>

                        <Button 
                          onClick={() => createGoalFromAI(suggestion)}
                          className="w-full bg-gradient-to-r from-primary to-secondary"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create This Goal
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Success Rate</p>
                          <p className="text-3xl font-bold text-success">75%</p>
                          <div className="flex items-center mt-1">
                            <ArrowUp className="h-3 w-3 text-success mr-1" />
                            <span className="text-xs text-success">+12% vs last month</span>
                          </div>
                        </div>
                        <Trophy className="h-8 w-8 text-success" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Avg. Completion Time</p>
                          <p className="text-3xl font-bold text-primary">4.2w</p>
                          <div className="flex items-center mt-1">
                            <ArrowDown className="h-3 w-3 text-success mr-1" />
                            <span className="text-xs text-success">-0.8w improvement</span>
                          </div>
                        </div>
                        <Timer className="h-8 w-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Streak</p>
                          <p className="text-3xl font-bold text-warning">23d</p>
                          <div className="flex items-center mt-1">
                            <Flame className="h-3 w-3 text-warning mr-1" />
                            <span className="text-xs text-warning">Personal best!</span>
                          </div>
                        </div>
                        <Flame className="h-8 w-8 text-warning" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Focus Score</p>
                          <p className="text-3xl font-bold text-secondary">8.7</p>
                          <div className="flex items-center mt-1">
                            <ArrowUp className="h-3 w-3 text-success mr-1" />
                            <span className="text-xs text-success">+0.5 this week</span>
                          </div>
                        </div>
                        <Brain className="h-8 w-8 text-secondary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Achievement Gallery */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Award className="h-6 w-6 mr-3 text-warning" />
                      Achievement Gallery
                    </CardTitle>
                    <CardDescription>
                      Your learning milestones and accomplishments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement) => (
                        <Card key={achievement.id} className={`border transition-all duration-300 ${
                          achievement.earned 
                            ? 'bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20 shadow-lg' 
                            : 'bg-muted/10 border-muted/20 opacity-60'
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                achievement.earned ? 'bg-warning/20' : 'bg-muted/30'
                              }`}>
                                <achievement.icon className={`h-6 w-6 ${
                                  achievement.earned ? 'text-warning' : 'text-muted-foreground'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <h4 className={`font-semibold ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {achievement.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge className={getRarityColor(achievement.rarity)}>
                                {achievement.rarity}
                              </Badge>
                              {achievement.earned && (
                                <div className="text-right">
                                  <p className="text-xs text-muted-foreground">+{achievement.points} XP</p>
                                  {achievement.earnedDate && (
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(achievement.earnedDate).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Brain className="h-6 w-6 mr-3 text-primary" />
                      AI Performance Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-success" />
                          Strengths Identified
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Excellent consistency with technical subjects
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Strong progress on long-term goals
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Effective time management for study sessions
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2 text-warning" />
                          Improvement Opportunities
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Circle className="h-4 w-4 text-warning" />
                            Consider breaking large goals into smaller milestones
                          </li>
                          <li className="flex items-center gap-2">
                            <Circle className="h-4 w-4 text-warning" />
                            Add more variety to study methods
                          </li>
                          <li className="flex items-center gap-2">
                            <Circle className="h-4 w-4 text-warning" />
                            Schedule regular progress reviews
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Goals;