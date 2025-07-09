import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Demo data
  const currentStreak = 7;
  const weeklyProgress = [65, 78, 82, 45, 90, 88, 75];
  const upcomingDeadlines = [
    { subject: "Computer Science", exam: "Data Structures Final", daysLeft: 12, priority: "high" },
    { subject: "Mathematics", exam: "Calculus Midterm", daysLeft: 18, priority: "medium" },
    { subject: "Physics", exam: "Quantum Mechanics Quiz", daysLeft: 25, priority: "low" },
  ];

  const todaySession = {
    subject: "Computer Science",
    topic: "Binary Search Trees",
    estimatedTime: 45,
    progress: 60
  };

  const recentAchievements = [
    { title: "Study Streak", description: "7 days in a row", icon: Flame, color: "text-destructive" },
    { title: "Quick Learner", description: "Completed 5 sessions", icon: Award, color: "text-warning" },
    { title: "Goal Crusher", description: "Achieved weekly target", icon: Target, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">StudyBuddy AI</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" className="bg-primary/10 text-primary">Dashboard</Button>
              <Button variant="ghost">Study Plans</Button>
              <Button variant="ghost">Schedule</Button>
              <Button variant="ghost">Progress</Button>
              <Button variant="ghost">Goals</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">JS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Studying
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-success" />
                  Weekly Progress
                </CardTitle>
                <CardDescription>
                  You've studied 6.5 hours this week (+2.3 from last week)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32 mb-4">
                  {weeklyProgress.map((value, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-8 bg-gradient-to-t from-primary to-primary-glow rounded-t"
                        style={{ height: `${value}%` }}
                      />
                      <span className="text-xs text-muted-foreground mt-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completion Rate:</span>
                  <span className="font-medium text-success">88%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="group hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Create New Study Plan</h3>
                      <p className="text-sm text-muted-foreground">Set up AI-powered learning</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Plus className="h-5 w-5 text-primary group-hover:text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Upload Materials</h3>
                      <p className="text-sm text-muted-foreground">Add PDFs, notes, videos</p>
                    </div>
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                      <Upload className="h-5 w-5 text-secondary group-hover:text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Study Streak */}
            <Card className="bg-gradient-to-r from-destructive/10 to-warning/10 border-destructive/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Flame className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold">{currentStreak} Days</h3>
                <p className="text-sm text-muted-foreground mb-3">Study Streak</p>
                <p className="text-xs text-muted-foreground">Keep it up! You're doing great 🔥</p>
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
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{deadline.exam}</p>
                      <p className="text-xs text-muted-foreground">{deadline.subject}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={deadline.priority === 'high' ? 'destructive' : 
                                deadline.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {deadline.daysLeft} days
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Deadlines
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
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
                <Button variant="outline" size="sm" className="w-full">
                  View More Insights
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;