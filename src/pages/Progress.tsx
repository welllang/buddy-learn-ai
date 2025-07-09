import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Clock, 
  Brain,
  Calendar,
  Award,
  BookOpen,
  Zap,
  Download,
  Filter,
  ChevronRight
} from "lucide-react";

const ProgressPage = () => {
  // Demo analytics data
  const overallStats = {
    totalHours: 125.5,
    sessionsCompleted: 89,
    currentStreak: 7,
    goalsAchieved: 15,
    retentionRate: 87
  };

  const monthlyProgress = [
    { month: 'Jan', hours: 45, sessions: 25, retention: 82 },
    { month: 'Feb', hours: 52, sessions: 30, retention: 85 },
    { month: 'Mar', hours: 38, sessions: 22, retention: 79 },
    { month: 'Apr', hours: 61, sessions: 35, retention: 89 },
    { month: 'May', hours: 48, sessions: 28, retention: 87 },
    { month: 'Jun', hours: 55, sessions: 32, retention: 91 },
  ];

  const subjectProgress = [
    { subject: 'Computer Science', hours: 45, progress: 75, grade: 'A-', trend: '+5%' },
    { subject: 'Mathematics', hours: 38, progress: 65, grade: 'B+', trend: '+12%' },
    { subject: 'Physics', hours: 32, progress: 55, grade: 'B', trend: '+8%' },
    { subject: 'Chemistry', hours: 28, progress: 45, grade: 'B-', trend: '+15%' },
  ];

  const studyPatterns = {
    optimalTimes: ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM'],
    averageSessionLength: 45,
    mostEffectiveMethod: 'Pomodoro Technique',
    weeklyPattern: [85, 92, 78, 88, 95, 82, 70] // Mon-Sun effectiveness
  };

  const achievements = [
    { title: 'Study Master', description: '100 sessions completed', date: '2024-01-15', icon: Award },
    { title: 'Streak Champion', description: '30-day study streak', date: '2024-01-20', icon: Zap },
    { title: 'Subject Expert', description: 'Mastered Data Structures', date: '2024-01-25', icon: Brain },
    { title: 'Time Warrior', description: '100+ study hours', date: '2024-02-01', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Progress Analytics</h1>
            <p className="text-muted-foreground">Track your learning journey and identify improvement areas</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{overallStats.totalHours}h</div>
              <p className="text-sm text-muted-foreground">Total Study Hours</p>
              <div className="text-xs text-success mt-1">+12% this month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-secondary">{overallStats.sessionsCompleted}</div>
              <p className="text-sm text-muted-foreground">Sessions Completed</p>
              <div className="text-xs text-success mt-1">+8% this month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-destructive">{overallStats.currentStreak}</div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <div className="text-xs text-warning mt-1">Best: 15 days</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success">{overallStats.goalsAchieved}</div>
              <p className="text-sm text-muted-foreground">Goals Achieved</p>
              <div className="text-xs text-success mt-1">75% completion rate</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-accent">{overallStats.retentionRate}%</div>
              <p className="text-sm text-muted-foreground">Retention Rate</p>
              <div className="text-xs text-success mt-1">+3% this month</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monthly Progress Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-success" />
                  Monthly Progress Trends
                </CardTitle>
                <CardDescription>
                  Study hours, sessions, and retention rates over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Study Hours Chart */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Study Hours per Month</h4>
                    <div className="flex items-end justify-between h-32">
                      {monthlyProgress.map((month, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className="w-8 bg-gradient-to-t from-primary to-primary-glow rounded-t hover:opacity-80 transition-opacity"
                            style={{ height: `${(month.hours / 70) * 100}%` }}
                            title={`${month.month}: ${month.hours}h`}
                          />
                          <span className="text-xs text-muted-foreground mt-2">{month.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Retention Rate Chart */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Knowledge Retention Rate</h4>
                    <div className="flex items-end justify-between h-24">
                      {monthlyProgress.map((month, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className="w-6 bg-gradient-to-t from-success to-success/60 rounded-t"
                            style={{ height: `${month.retention}%` }}
                            title={`${month.month}: ${month.retention}%`}
                          />
                          <span className="text-xs text-muted-foreground mt-1">{month.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Subject Performance
                </CardTitle>
                <CardDescription>
                  Progress and grades across all subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectProgress.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject.subject}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{subject.grade}</Badge>
                          <span className="text-sm text-success">{subject.trend}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Progress value={subject.progress} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground w-12">{subject.progress}%</span>
                        <span className="text-sm text-muted-foreground w-12">{subject.hours}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-accent" />
                  Study Patterns Analysis
                </CardTitle>
                <CardDescription>
                  Insights about your most effective study habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Weekly Effectiveness</h4>
                    <div className="flex items-end justify-between h-20 mb-2">
                      {studyPatterns.weeklyPattern.map((effectiveness, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-6 bg-gradient-to-t from-accent to-accent/60 rounded-t"
                            style={{ height: `${effectiveness}%` }}
                          />
                          <span className="text-xs text-muted-foreground mt-1">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Optimal Study Times</span>
                      <div className="text-sm font-medium">
                        {studyPatterns.optimalTimes.join(', ')}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Avg Session Length</span>
                      <div className="text-sm font-medium">{studyPatterns.averageSessionLength} minutes</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Most Effective Method</span>
                      <div className="text-sm font-medium">{studyPatterns.mostEffectiveMethod}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Goal Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Target className="h-4 w-4 mr-2 text-success" />
                  Goal Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Study 100 hours</span>
                    <span>125/100h</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>30-day streak</span>
                    <span>7/30 days</span>
                  </div>
                  <Progress value={23} className="h-2" />
                  <Badge variant="outline">In Progress</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Master 5 subjects</span>
                    <span>3/5 subjects</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <Badge variant="outline">In Progress</Badge>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  View All Goals
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="h-4 w-4 mr-2 text-warning" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                      <achievement.icon className="h-4 w-4 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" size="sm" className="w-full">
                  View All Achievements
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Brain className="h-4 w-4 mr-2 text-primary" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-sm font-medium mb-1">📈 Improvement</p>
                  <p className="text-xs text-muted-foreground">
                    Your retention rate improved by 12% when using active recall techniques.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-sm font-medium mb-1">⏰ Optimization</p>
                  <p className="text-xs text-muted-foreground">
                    You're 23% more focused during morning sessions. Consider scheduling complex topics then.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-sm font-medium mb-1">🎯 Recommendation</p>
                  <p className="text-xs text-muted-foreground">
                    Based on your progress, you're ready for advanced algorithms. Consider adding it to your plan.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;