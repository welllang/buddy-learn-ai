import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Search,
  Eye,
  Play,
  Pause,
  BarChart3,
  Sparkles,
  Brain,
  Lightbulb,
  Flame,
  Timer,
  Users,
  ArrowUp,
  ArrowDown,
  Settings,
  Filter,
  MessageSquare,
  ArrowLeft
} from "lucide-react";

const ModernProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{progress}% Complete</span>
        <span className="text-xs text-muted-foreground">Goal: 100%</span>
      </div>
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-primary/80 to-secondary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse" />
      </div>
    </div>
  );
};

const Goals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Enhanced Demo Data following StudyPlanDetail style
  const demoGoals = [
    {
      id: 1,
      title: "Master Machine Learning Fundamentals",
      subject: "Artificial Intelligence",
      description: "Complete comprehensive ML course covering supervised/unsupervised learning, neural networks, and practical applications",
      category: "long-term",
      priority: "high",
      target_date: "2024-06-15",
      progress: 78,
      status: "active",
      estimated_time_hours: 120,
      time_invested_hours: 94,
      success_metrics: "Pass final project with 90%+, complete 8 hands-on projects",
      difficulty: "Advanced",
      lastStudied: "2 hours ago",
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
      techniques: [
        "Visual diagrams and mind maps",
        "Hands-on coding practice",
        "Peer study groups",
        "Regular progress reviews"
      ],
      exercises: [
        "Implement linear regression from scratch",
        "Build neural network classifier",
        "Complete Kaggle competition",
        "Create ML model portfolio"
      ],
      resources: [
        { type: "Video", title: "Deep Learning Specialization", url: "#" },
        { type: "Article", title: "ML Fundamentals Guide", url: "#" },
        { type: "Practice", title: "Kaggle Datasets", url: "#" },
        { type: "Book", title: "Pattern Recognition", url: "#" }
      ]
    },
    {
      id: 2,
      title: "Quantum Computing Certification",
      subject: "Quantum Physics",
      description: "Earn IBM Quantum Developer certification through structured learning path",
      category: "skill-development", 
      priority: "medium",
      target_date: "2024-05-20",
      progress: 45,
      status: "active",
      estimated_time_hours: 80,
      time_invested_hours: 36,
      success_metrics: "Pass certification exam with 85%+",
      difficulty: "Expert",
      lastStudied: "1 day ago",
      actionItems: [
        { title: "Quantum Mechanics Basics", completed: true },
        { title: "Qubit Operations", completed: true },
        { title: "Quantum Gates", completed: false },
        { title: "Quantum Algorithms", completed: false }
      ],
      milestones: 4,
      completedMilestones: 2,
      streak: 8,
      techniques: [
        "Mathematical notation practice",
        "Circuit diagram visualization",
        "Qiskit programming",
        "Theoretical study sessions"
      ],
      exercises: [
        "Build quantum circuits",
        "Implement quantum algorithms",
        "Practice exam questions",
        "Create quantum applications"
      ],
      resources: [
        { type: "Course", title: "IBM Quantum Experience", url: "#" },
        { type: "Documentation", title: "Qiskit Textbook", url: "#" },
        { type: "Practice", title: "Quantum Katas", url: "#" },
        { type: "Community", title: "Quantum Computing Stack Exchange", url: "#" }
      ]
    },
    {
      id: 3,
      title: "30-Day Data Science Challenge",
      subject: "Data Science",
      description: "Complete daily coding challenges to improve data analysis and visualization skills",
      category: "short-term",
      priority: "high", 
      target_date: "2024-04-30",
      progress: 90,
      status: "active",
      estimated_time_hours: 45,
      time_invested_hours: 41,
      success_metrics: "Complete all 30 challenges, build portfolio project",
      difficulty: "Intermediate",
      lastStudied: "30 minutes ago",
      actionItems: [
        { title: "Week 1 - Python Basics", completed: true },
        { title: "Week 2 - Pandas & NumPy", completed: true },
        { title: "Week 3 - Data Visualization", completed: true },
        { title: "Week 4 - Portfolio Project", completed: false }
      ],
      milestones: 4,
      completedMilestones: 3,
      streak: 27,
      techniques: [
        "Daily coding practice",
        "Data visualization",
        "Statistical analysis",
        "Portfolio development"
      ],
      exercises: [
        "Data cleaning challenges",
        "Visualization projects",
        "Statistical analysis tasks",
        "Machine learning models"
      ],
      resources: [
        { type: "Platform", title: "Kaggle Learn", url: "#" },
        { type: "Dataset", title: "Public Data APIs", url: "#" },
        { type: "Tool", title: "Jupyter Notebooks", url: "#" },
        { type: "Community", title: "Data Science Discord", url: "#" }
      ]
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
      reasoning: "Your advanced ML skills are ready for real-world application"
    }
  ];

  const filteredGoals = demoGoals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || goal.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'intermediate': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'advanced': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'expert': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'low': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'short-term': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'medium-term': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'long-term': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      case 'skill-development': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const currentGoal = selectedGoal ? demoGoals.find(g => g.id === selectedGoal) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">StudyBuddy AI</span>
            </button>
            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" asChild>
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
              </Button>
              <Button variant="ghost" asChild>
                <button onClick={() => navigate('/study-plans')}>Study Plans</button>
              </Button>
              <Button variant="ghost" asChild>
                <button onClick={() => navigate('/schedule')}>Schedule</button>
              </Button>
              <Button variant="ghost" asChild>
                <button onClick={() => navigate('/progress')}>Progress</button>
              </Button>
              <Button variant="ghost" className="bg-primary/10 text-primary">
                Goals
              </Button>
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
        {/* Breadcrumb & Header */}
        {selectedGoal ? (
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedGoal(null)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Goals
            </Button>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{currentGoal?.title}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Goals Management</h1>
              <p className="text-muted-foreground mt-1">Transform your learning ambitions into achievable milestones</p>
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
                  <SelectItem value="long-term">Long-term</SelectItem>
                  <SelectItem value="skill-development">Skill Dev</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-primary to-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Create Goal
              </Button>
            </div>
          </div>
        )}

        {selectedGoal && currentGoal ? (
          // Goal Detail View (following StudyPlanDetail style)
          <>
            {/* Goal Header */}
            <Card className="mb-8 bg-gradient-to-r from-primary/5 via-background to-secondary/5 border-primary/20">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h1 className="text-3xl font-bold">{currentGoal.title}</h1>
                      <Badge className={getDifficultyColor(currentGoal.difficulty)} variant="outline">
                        {currentGoal.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-lg mb-4">
                      {currentGoal.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-medium">{currentGoal.subject}</span>
                    </div>
                  </div>
                  
                  <div className="lg:w-80">
                    <ModernProgressBar progress={currentGoal.progress} />
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Timer className="h-3 w-3" />
                          <span>Time Invested</span>
                        </div>
                        <p className="font-semibold">{currentGoal.time_invested_hours}h / {currentGoal.estimated_time_hours}h</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Target className="h-3 w-3" />
                          <span>Target Date</span>
                        </div>
                        <p className="font-semibold">
                          {new Date(currentGoal.target_date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Goal
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Goal Timeline */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Action Items
                    </CardTitle>
                    <CardDescription>Track your progress with actionable milestones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentGoal.actionItems.map((item, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-200 ${
                          item.completed 
                            ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' 
                            : 'bg-background border-border hover:border-primary/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {item.completed ? (
                              <CheckCircle className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                            </div>
                          </div>
                          {!item.completed && (
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Goal Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Goal Details
                    </CardTitle>
                    <CardDescription>Learning plan and resources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Study Techniques */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Recommended Study Techniques
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {currentGoal.techniques.map((technique, index) => (
                          <Badge key={index} variant="outline" className="justify-start">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Practice Exercises */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Practice Exercises
                      </h4>
                      <div className="space-y-2">
                        {currentGoal.exercises.map((exercise, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded border">
                            <Circle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{exercise}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Resources
                      </h4>
                      <div className="space-y-2">
                        {currentGoal.resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded border hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="font-medium text-sm">{resource.title}</span>
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights Sidebar */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Brain className="h-5 w-5" />
                      AI Coach Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Performance Score</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'text-warning fill-warning' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                        <span className="font-bold">8.5/10</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2 text-emerald-600">Strengths</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Consistent study schedule</li>
                        <li>• Strong theoretical understanding</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-amber-600">Areas to Improve</h4>
                      <ul className="text-sm space-y-1">
                        <li>• More hands-on practice needed</li>
                        <li>• Consider peer collaboration</li>
                      </ul>
                    </div>

                    <Separator />

                    <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                      <h4 className="font-semibold mb-2">Motivation Boost</h4>
                      <p className="text-sm">You're making excellent progress! Your consistency is paying off. Keep up the great work!</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {achievements.filter(a => a.earned).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3 p-2 rounded bg-warning/10">
                        <achievement.icon className="h-5 w-5 text-warning" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{achievement.name}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          // Goals List View
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Goals</p>
                      <p className="text-2xl font-bold">{demoGoals.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-emerald-500">{demoGoals.filter(g => g.status === 'completed').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active</p>
                      <p className="text-2xl font-bold text-amber-500">{demoGoals.filter(g => g.status === 'active').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hours Invested</p>
                      <p className="text-2xl font-bold text-purple-500">{demoGoals.reduce((sum, g) => sum + g.time_invested_hours, 0)}h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Goals Grid */}
            <div className="grid gap-6">
              {filteredGoals.map((goal) => (
                <Card key={goal.id} className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <CardTitle className="text-xl">{goal.title}</CardTitle>
                          {goal.status === 'completed' && (
                            <CheckCircle className="h-6 w-6 text-emerald-500" />
                          )}
                          {goal.streak > 0 && (
                            <Badge className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                              <Flame className="h-3 w-3 mr-1" />
                              {goal.streak} day streak
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base leading-relaxed">{goal.description}</CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Badge className={getCategoryColor(goal.category)} variant="outline">
                          {goal.category.replace('-', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(goal.priority)} variant="outline">
                          {goal.priority} priority
                        </Badge>
                        <Badge className={getDifficultyColor(goal.difficulty)} variant="outline">
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
                            {new Date(goal.target_date).toLocaleDateString()}
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

                    <div className="flex gap-2 pt-4 border-t border-border/50">
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedGoal(goal.id)}
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
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Suggestions Section */}
            <Card className="mt-8 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  AI Goal Suggestions
                </CardTitle>
                <CardDescription>Personalized recommendations based on your learning progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="flex items-center">
                          <Lightbulb className="h-5 w-5 mr-2 text-warning" />
                          {suggestion.title}
                        </span>
                        <Badge className={getDifficultyColor(suggestion.difficulty)} variant="outline">
                          {suggestion.difficulty}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-base">{suggestion.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Timeline</p>
                          <p className="font-medium">{suggestion.timeline}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Est. Hours</p>
                          <p className="font-medium">{suggestion.estimatedTimeHours}h</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Priority</p>
                          <p className="font-medium">{suggestion.priority}</p>
                        </div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary"
                        onClick={() => toast({ title: "AI Goal Created! 🤖", description: `"${suggestion.title}" has been added to your goals` })}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create This Goal
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Goals;