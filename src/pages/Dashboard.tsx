import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Calendar,
  Play,
  Plus,
  Flame,
  Award,
  ChevronRight,
  Brain,
  CheckCircle,
  Upload,
  MessageSquare,
  BarChart3,
  Search,
  Bell,
  User,
  Settings,
  MoreHorizontal,
  Coffee,
  Phone,
  Edit,
  CalendarDays,
  Star,
  Trophy,
  Zap,
  PieChart,
  Users,
  FileText,
  Globe,
  GraduationCap,
  BookMarked,
  Timer,
  TrendingDown,
  Activity,
  Lightbulb,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  
  // Enhanced Demo Data with more creativity
  const currentUser = {
    name: "Alexandra Chen",
    email: "alex.chen@university.edu",
    avatar: "AC",
    level: "Advanced Learner",
    plan: "Premium Student",
    streak: 23,
    totalHours: 342,
    rank: "Top 5%"
  };

  const todaySessions = [
    {
      id: 1,
      subject: "Artificial Intelligence",
      topic: "Neural Networks & Deep Learning",
      type: "Video Lecture",
      duration: 75,
      progress: 68,
      startTime: "09:00 AM",
      difficulty: "Advanced",
      instructor: "Dr. Sarah Kim",
      status: "in-progress"
    },
    {
      id: 2,
      subject: "Quantum Computing", 
      topic: "Quantum Algorithms",
      type: "Interactive Lab",
      duration: 90,
      progress: 0,
      startTime: "02:30 PM", 
      difficulty: "Expert",
      instructor: "Prof. Michael Zhang",
      status: "upcoming"
    },
    {
      id: 3,
      subject: "Data Science",
      topic: "Machine Learning Models",
      type: "Practice Session",
      duration: 60,
      progress: 100,
      startTime: "07:00 PM",
      difficulty: "Intermediate", 
      instructor: "Dr. Emma Wilson",
      status: "completed"
    }
  ];
  
  // Demo data
  const currentStreak = 7;
  const weeklyProgress = [65, 78, 82, 45, 90, 88, 75];
  const previousWeekProgress = [45, 60, 70, 35, 80, 75, 65];
  
  const upcomingDeadlines = [
    { id: 1, subject: "Computer Science", exam: "Data Structures Final", daysLeft: 12, priority: "high", date: "2024-03-15" },
    { id: 2, subject: "Mathematics", exam: "Calculus Midterm", daysLeft: 18, priority: "medium", date: "2024-03-21" },
    { id: 3, subject: "Physics", exam: "Quantum Mechanics Quiz", daysLeft: 25, priority: "low", date: "2024-03-28" },
  ];

  const todaySession = {
    subject: "Computer Science",
    topic: "Binary Search Trees",
    estimatedTime: 45,
    progress: 60
  };

  const recentAchievements = [
    { title: "Study Streak", description: "7 days in a row", icon: Flame, color: "text-destructive", badge: true },
    { title: "Quick Learner", description: "Completed 5 sessions", icon: Award, color: "text-warning", badge: true },
    { title: "Goal Crusher", description: "Achieved weekly target", icon: Target, color: "text-success", badge: true },
    { title: "Focus Master", description: "2h+ sessions", icon: Brain, color: "text-primary", badge: false },
  ];

  // Study calendar data for streak visualization
  const studyCalendar = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    studied: Math.random() > 0.3, // 70% chance of study day
    hours: Math.floor(Math.random() * 4) + 1
  }));

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", path: "/dashboard", active: true },
    { icon: BookOpen, label: "Study Plans", path: "/study-plans", active: false },
    { icon: CalendarDays, label: "Schedule", path: "/schedule", active: false },
    { icon: TrendingUp, label: "Progress", path: "/progress", active: false },
    { icon: Target, label: "Goals", path: "/goals", active: false },
    { icon: Settings, label: "Settings", path: "/settings", active: false },
  ];

  const notifications = [
    { id: 1, type: "reminder", message: "Study session starts in 15 minutes", time: "2 min ago", unread: true },
    { id: 2, type: "achievement", message: "You've earned the 'Study Streak' badge!", time: "1 hour ago", unread: true },
    { id: 3, type: "deadline", message: "Data Structures exam in 12 days", time: "3 hours ago", unread: false },
  ];

  const quickActions = [
    { icon: Play, label: "Start Study Session", action: "study", color: "bg-primary" },
    { icon: Target, label: "Add New Goal", action: "goal", color: "bg-success" },
    { icon: Upload, label: "Upload Materials", action: "upload", color: "bg-secondary" },
    { icon: Coffee, label: "Schedule Break", action: "break", color: "bg-warning" },
    { icon: MessageSquare, label: "AI Assistant", action: "ai", color: "bg-accent" },
    { icon: Phone, label: "Contact Support", action: "support", color: "bg-muted" },
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "ai":
        // AI Assistant is now handled globally
        break;
      case "study":
        // Navigate to study session
        break;
      case "goal":
        // Navigate to goals page
        break;
      case "upload":
        // Open file upload
        break;
      case "break":
        // Schedule break
        break;
      case "support":
        // Open support
        break;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b bg-background/95 backdrop-blur sticky top-0 z-40">
          <div className="h-full px-6 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search anything..." className="pl-10" />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">2</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <h4 className="font-semibold">Notifications</h4>
                  </div>
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-3 flex flex-col items-start space-y-1">
                      <div className="flex items-center space-x-2 w-full">
                        <div className={`w-2 h-2 rounded-full ${notification.unread ? 'bg-primary' : 'bg-muted'}`} />
                        <span className="flex-1 text-sm">{notification.message}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-3 text-center">
                    <span className="text-sm text-primary">View all notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">JS</span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">John Smith</p>
                      <p className="text-xs text-muted-foreground">Student</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-3 border-b">
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-muted-foreground">john.smith@university.edu</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Help & Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Globe className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Good morning, John! 👋</h1>
            <p className="text-muted-foreground">Ready to continue your learning journey? You're on a {currentStreak}-day study streak!</p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Study Session */}
              <Card className="border-primary/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      Today's Study Session
                    </span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      In Progress
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Continue where you left off
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{todaySession.subject}</span>
                      <span className="text-sm text-muted-foreground">{todaySession.estimatedTime} min remaining</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">{todaySession.topic}</span>
                      <span className="text-sm font-medium">{todaySession.progress}%</span>
                    </div>
                    <Progress value={todaySession.progress} className="h-2" />
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={() => handleQuickAction('study')}>
                      <Play className="h-4 w-4 mr-2" />
                      Continue Studying
                    </Button>
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Reschedule
                    </Button>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-success" />
                      Weekly Progress
                    </span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-success/10 text-success">
                        +15% vs last week
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    You've studied 6.5 hours this week (+2.3 from last week)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-32 mb-4">
                    {weeklyProgress.map((value, index) => (
                      <div key={index} className="flex flex-col items-center flex-1 group">
                        <div className="relative">
                          <div 
                            className="w-8 bg-gradient-to-t from-primary to-primary-glow rounded-t transition-all hover:opacity-80"
                            style={{ height: `${value}%` }}
                          />
                          <div 
                            className="w-8 bg-muted/30 rounded-t absolute inset-0 -z-10"
                            style={{ height: `${previousWeekProgress[index]}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground mt-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completion Rate:</span>
                      <span className="font-medium text-success">88%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Study Hours:</span>
                      <span className="font-medium">6.5h</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {recentAchievements.filter(a => a.badge).map((achievement, index) => (
                      <Badge key={index} variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        <Trophy className="h-3 w-3 mr-1" />
                        {achievement.title}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-warning" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Jump into your most common tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all"
                        onClick={() => handleQuickAction(action.action)}
                      >
                        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-center">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Study Streak */}
              <Card className="bg-gradient-to-r from-destructive/10 to-warning/10 border-destructive/20">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Flame className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-2xl font-bold">{currentStreak} Days</h3>
                    <p className="text-sm text-muted-foreground mb-3">Study Streak</p>
                    <p className="text-xs text-muted-foreground">Goal: 30 days 🎯</p>
                  </div>
                  
                  {/* Visual Calendar */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Last 30 days</p>
                    <div className="grid grid-cols-10 gap-1">
                      {studyCalendar.map((day, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-sm ${
                            day.studied 
                              ? 'bg-destructive' 
                              : 'bg-muted/30'
                          }`}
                          title={`Day ${day.day}: ${day.studied ? `${day.hours}h studied` : 'No study'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Keep it up! You're doing great 🔥</p>
                    <Progress value={(currentStreak / 30) * 100} className="h-2 mt-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Clock className="h-4 w-4 mr-2 text-warning" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{deadline.exam}</p>
                        <p className="text-xs text-muted-foreground">{deadline.subject}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={deadline.priority === 'high' ? 'destructive' : 
                                  deadline.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {deadline.daysLeft} days
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Deadline
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View All
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Award className="h-4 w-4 mr-2 text-warning" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-muted/30 flex items-center justify-center`}>
                        <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.badge && (
                        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                          New
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Brain className="h-4 w-4 mr-2 text-primary" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-sm font-medium mb-1">💡 Study Tip</p>
                    <p className="text-xs text-muted-foreground">
                      Your best study time is 9-11 AM. Consider scheduling complex topics during this window.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-sm font-medium mb-1">📊 Performance</p>
                    <p className="text-xs text-muted-foreground">
                      You retain 85% more when taking breaks every 25 minutes. Keep using the Pomodoro technique!
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-sm font-medium mb-1">🎯 Suggestion</p>
                    <p className="text-xs text-muted-foreground">
                      Based on your progress, consider adding a Machine Learning course to your plan.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    Chat with AI
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;