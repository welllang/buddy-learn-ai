import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Brain, 
  BookOpen, 
  Clock, 
  Target, 
  Calendar,
  Edit,
  CheckCircle,
  Circle,
  Play,
  Pause,
  SkipForward,
  TrendingUp,
  Lightbulb,
  Award,
  Star,
  Zap,
  Users,
  FileText,
  Link as LinkIcon,
  MessageSquare,
  BarChart3,
  Timer,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const StudyPlanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState("");

  // Mock data - in real app, this would come from API based on ID
  const studyPlan = {
    id: parseInt(id || "1"),
    title: "Computer Science Fundamentals",
    subject: "Computer Science",
    description: "Master the core concepts of computer science including data structures, algorithms, and computational thinking.",
    progress: 65,
    targetDate: "2024-03-15",
    dailyTime: 60,
    difficulty: "Intermediate",
    status: "active",
    timeInvested: 24,
    estimatedTime: 40,
    lastStudied: "2 hours ago",
    totalSessions: 12,
    completedTopics: 8,
    totalTopics: 15,
    weeks: [
      {
        week: 1,
        title: "Introduction to Programming",
        completed: true,
        days: [
          { day: 1, topic: "Variables and Data Types", subtopic: "Primitive types, arrays", time: 60, completed: true },
          { day: 2, topic: "Control Structures", subtopic: "If-else, loops", time: 60, completed: true },
          { day: 3, topic: "Functions", subtopic: "Function definition, parameters", time: 60, completed: true },
          { day: 4, topic: "Practice Problems", subtopic: "Basic algorithms", time: 60, completed: true },
          { day: 5, topic: "Review & Assessment", subtopic: "Week 1 quiz", time: 60, completed: true }
        ]
      },
      {
        week: 2,
        title: "Data Structures Basics",
        completed: false,
        days: [
          { day: 1, topic: "Arrays & Lists", subtopic: "Implementation, operations", time: 60, completed: true },
          { day: 2, topic: "Stacks & Queues", subtopic: "LIFO vs FIFO principles", time: 60, completed: true },
          { day: 3, topic: "Linked Lists", subtopic: "Singly, doubly linked", time: 60, completed: false },
          { day: 4, topic: "Trees Introduction", subtopic: "Binary trees, traversal", time: 60, completed: false },
          { day: 5, topic: "Practice & Review", subtopic: "Implementation exercises", time: 60, completed: false }
        ]
      },
      {
        week: 3,
        title: "Algorithm Analysis",
        completed: false,
        days: [
          { day: 1, topic: "Big O Notation", subtopic: "Time & space complexity", time: 60, completed: false },
          { day: 2, topic: "Sorting Algorithms", subtopic: "Bubble, selection, insertion", time: 60, completed: false },
          { day: 3, topic: "Search Algorithms", subtopic: "Linear, binary search", time: 60, completed: false },
          { day: 4, topic: "Advanced Sorting", subtopic: "Merge sort, quick sort", time: 60, completed: false },
          { day: 5, topic: "Analysis Practice", subtopic: "Algorithm comparison", time: 60, completed: false }
        ]
      }
    ]
  };

  const currentSession = {
    title: "Linked Lists Implementation",
    objectives: [
      "Understand singly and doubly linked list structures",
      "Implement basic operations (insert, delete, search)",
      "Compare linked lists with arrays",
      "Practice with coding exercises"
    ],
    techniques: [
      "Visual diagrams and drawings",
      "Step-by-step coding practice",
      "Memory visualization exercises",
      "Peer programming simulation"
    ],
    exercises: [
      "Implement a singly linked list class",
      "Write insertion and deletion methods",
      "Reverse a linked list algorithm",
      "Find the middle node efficiently"
    ],
    resources: [
      { type: "Video", title: "Linked Lists Explained", url: "#" },
      { type: "Article", title: "Data Structures Guide", url: "#" },
      { type: "Practice", title: "LeetCode Problems", url: "#" },
      { type: "Visualization", title: "Algorithm Visualizer", url: "#" }
    ]
  };

  const aiInsights = {
    performance: {
      score: 8.5,
      strengths: ["Consistent study schedule", "Good problem-solving approach"],
      improvements: ["Need more practice with complex algorithms", "Review previous concepts regularly"]
    },
    recommendations: {
      difficulty: "Consider increasing difficulty level",
      method: "Add more visual learning materials",
      schedule: "Extend sessions to 75 minutes for better retention"
    },
    motivation: "You're doing great! Your consistency is paying off. Keep up the excellent work!",
    nextSession: {
      topic: "Trees & Binary Search Trees",
      focus: "Understanding hierarchical data structures",
      estimated: 75
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
          <Button variant="ghost" size="sm" onClick={() => navigate('/study-plans')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Study Plans
          </Button>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{studyPlan.title}</span>
        </div>

        {/* Plan Header */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 via-background to-secondary/5 border-primary/20">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold">{studyPlan.title}</h1>
                  <Badge className={getDifficultyColor(studyPlan.difficulty)} variant="outline">
                    {studyPlan.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-lg mb-4">
                  {studyPlan.description}
                </CardDescription>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-medium">{studyPlan.subject}</span>
                </div>
              </div>
              
              <div className="lg:w-80">
                <ModernProgressBar progress={studyPlan.progress} />
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Timer className="h-3 w-3" />
                      <span>Time Invested</span>
                    </div>
                    <p className="font-semibold">{studyPlan.timeInvested}h / {studyPlan.estimatedTime}h</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Target className="h-3 w-3" />
                      <span>Target Date</span>
                    </div>
                    <p className="font-semibold">
                      {new Date(studyPlan.targetDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Plan
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Study Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Study Timeline
                </CardTitle>
                <CardDescription>Week-by-week breakdown of your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {studyPlan.weeks.map((week) => (
                  <div key={week.week} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        Week {week.week}: {week.title}
                        {week.completed && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                      </h3>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Reschedule
                      </Button>
                    </div>
                    
                    <div className="grid gap-3">
                      {week.days.map((day) => (
                        <div 
                          key={day.day} 
                          className={`p-4 rounded-lg border transition-all duration-200 ${
                            day.completed 
                              ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' 
                              : 'bg-background border-border hover:border-primary/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {day.completed ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                              <div>
                                <h4 className="font-medium">Day {day.day}: {day.topic}</h4>
                                <p className="text-sm text-muted-foreground">{day.subtopic}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{day.time} min</span>
                              </div>
                              {!day.completed && (
                                <Button size="sm" variant="outline" asChild>
                                  <Link to={`/study/session-${week.week}-${day.day}`}>
                                    <Play className="h-3 w-3" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Session Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Current Session Details
                </CardTitle>
                <CardDescription>{currentSession.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Learning Objectives */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Learning Objectives
                  </h4>
                  <ul className="space-y-2">
                    {currentSession.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 text-primary" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Study Techniques */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Recommended Study Techniques
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentSession.techniques.map((technique, index) => (
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
                    {currentSession.exercises.map((exercise, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded border">
                        <Circle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{exercise}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Resources */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Additional Resources
                  </h4>
                  <div className="space-y-2">
                    {currentSession.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-primary" />
                          <div>
                            <span className="font-medium text-sm">{resource.title}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {resource.type}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          Open
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Session Notes
                  </h4>
                  <Textarea
                    placeholder="Add your notes, insights, or questions about this session..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Coach Insights */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Coach Insights
                </CardTitle>
                <CardDescription>Personalized analysis and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Performance Analysis */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Performance Analysis
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overall Score</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{aiInsights.performance.score}/10</span>
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-emerald-600">Strengths:</span>
                      <ul className="text-xs space-y-1 mt-1">
                        {aiInsights.performance.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <CheckCircle className="h-3 w-3 mt-0.5 text-emerald-500" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-amber-600">Areas for Improvement:</span>
                      <ul className="text-xs space-y-1 mt-1">
                        {aiInsights.performance.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <TrendingUp className="h-3 w-3 mt-0.5 text-amber-500" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    AI Recommendations
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded bg-muted/50 border">
                      <span className="text-xs font-medium text-primary">Difficulty:</span>
                      <p className="text-sm mt-1">{aiInsights.recommendations.difficulty}</p>
                    </div>
                    <div className="p-3 rounded bg-muted/50 border">
                      <span className="text-xs font-medium text-primary">Study Method:</span>
                      <p className="text-sm mt-1">{aiInsights.recommendations.method}</p>
                    </div>
                    <div className="p-3 rounded bg-muted/50 border">
                      <span className="text-xs font-medium text-primary">Schedule:</span>
                      <p className="text-sm mt-1">{aiInsights.recommendations.schedule}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Motivation */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Motivation Boost
                  </h4>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                    <p className="text-sm italic">{aiInsights.motivation}</p>
                  </div>
                </div>

                <Separator />

                {/* Next Session Preview */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <SkipForward className="h-4 w-4" />
                    Next Session Preview
                  </h4>
                  <div className="space-y-2">
                    <h5 className="font-medium">{aiInsights.nextSession.topic}</h5>
                    <p className="text-sm text-muted-foreground">{aiInsights.nextSession.focus}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>Estimated time:</span>
                      <span className="font-medium">{aiInsights.nextSession.estimated} minutes</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    <Play className="h-3 w-3 mr-2" />
                    Start Next Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanDetail;