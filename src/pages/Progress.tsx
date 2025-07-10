
import Navbar from "@/components/Navbar";
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
  ChevronRight,
  Activity,
  TrendingDown,
  PieChart,
  MapPin,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Star
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const ProgressPage = () => {
  // Enhanced analytics data
  const overallStats = {
    totalHours: 125.5,
    sessionsCompleted: 89,
    currentStreak: 7,
    goalsAchieved: 15,
    retentionRate: 87,
    avgSessionLength: 45,
    studyEfficiency: 82,
    weeklyGrowth: 12
  };

  const studyTimeData = [
    { date: '2024-01-01', hours: 3.2, sessions: 2, retention: 85 },
    { date: '2024-01-02', hours: 4.1, sessions: 3, retention: 88 },
    { date: '2024-01-03', hours: 2.8, sessions: 2, retention: 82 },
    { date: '2024-01-04', hours: 5.2, sessions: 4, retention: 91 },
    { date: '2024-01-05', hours: 3.9, sessions: 3, retention: 87 },
    { date: '2024-01-06', hours: 4.5, sessions: 3, retention: 89 },
    { date: '2024-01-07', hours: 3.1, sessions: 2, retention: 84 },
  ];

  const subjectBreakdown = [
    { subject: 'Computer Science', hours: 45, percentage: 36, color: '#3b82f6' },
    { subject: 'Mathematics', hours: 32, percentage: 26, color: '#10b981' },
    { subject: 'Physics', hours: 28, percentage: 22, color: '#f59e0b' },
    { subject: 'Chemistry', hours: 20, percentage: 16, color: '#ef4444' },
  ];

  const performanceMetrics = [
    { week: 'Week 1', retention: 75, quizScore: 78, efficiency: 72 },
    { week: 'Week 2', retention: 82, quizScore: 85, efficiency: 79 },
    { week: 'Week 3', retention: 87, quizScore: 88, efficiency: 85 },
    { week: 'Week 4', retention: 89, quizScore: 92, efficiency: 88 },
  ];

  const studyPatterns = {
    optimalTimes: [
      { time: '9:00 AM', effectiveness: 92, sessions: 15 },
      { time: '2:00 PM', effectiveness: 88, sessions: 12 },
      { time: '7:00 PM', effectiveness: 75, sessions: 8 }
    ],
    sessionLengths: [
      { duration: '25-30 min', effectiveness: 85, count: 23 },
      { duration: '45-60 min', effectiveness: 91, count: 18 },
      { duration: '90+ min', effectiveness: 76, count: 8 }
    ]
  };

  const aiInsights = [
    {
      type: 'improvement',
      icon: TrendingUp,
      title: 'Peak Performance Window',
      insight: 'Your retention rate is 23% higher during 9-11 AM sessions. Consider scheduling complex topics during this time.',
      priority: 'high',
      action: 'Reschedule advanced topics'
    },
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Study Session Length',
      insight: 'Sessions longer than 90 minutes show 15% decreased efficiency. Consider implementing the Pomodoro technique.',
      priority: 'medium',
      action: 'Adjust session planning'
    },
    {
      type: 'success',
      icon: CheckCircle2,
      title: 'Consistent Progress',
      insight: 'Your 7-day streak and steady improvement pattern indicate excellent habit formation. Keep it up!',
      priority: 'low',
      action: 'Maintain current routine'
    },
    {
      type: 'prediction',
      icon: Brain,
      title: 'Next Week Forecast',
      insight: 'Based on current patterns, you\'re projected to complete 12 hours of study time with 88% retention rate.',
      priority: 'info',
      action: 'Plan accordingly'
    }
  ];

  const achievements = [
    { title: 'Study Master', description: '100 sessions completed', date: '2024-01-15', icon: Award, rarity: 'gold' },
    { title: 'Streak Champion', description: '30-day study streak', date: '2024-01-20', icon: Zap, rarity: 'silver' },
    { title: 'Subject Expert', description: 'Mastered Data Structures', date: '2024-01-25', icon: Brain, rarity: 'bronze' },
    { title: 'Time Warrior', description: '100+ study hours', date: '2024-02-01', icon: Clock, rarity: 'platinum' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'platinum': return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'bronze': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getInsightStyle = (type: string) => {
    switch (type) {
      case 'improvement': return 'border-l-4 border-l-green-500 bg-green-50';
      case 'warning': return 'border-l-4 border-l-yellow-500 bg-yellow-50';
      case 'success': return 'border-l-4 border-l-blue-500 bg-blue-50';
      case 'prediction': return 'border-l-4 border-l-purple-500 bg-purple-50';
      default: return 'border-l-4 border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Progress Analytics
              </h1>
              <p className="text-muted-foreground">
                Track your learning journey with advanced insights and AI-powered recommendations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter Period
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Enhanced Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            <Card className="md:col-span-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Hours</p>
                    <p className="text-2xl font-bold text-primary">{overallStats.totalHours}h</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{overallStats.weeklyGrowth}% this week
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-primary/70" />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Sessions</p>
                    <p className="text-2xl font-bold text-secondary">{overallStats.sessionsCompleted}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <Activity className="h-3 w-3 mr-1" />
                      Avg {overallStats.avgSessionLength}min
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-secondary/70" />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-orange-500/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
                    <p className="text-2xl font-bold text-orange-600">{overallStats.currentStreak}</p>
                    <p className="text-xs text-muted-foreground mt-1">Best: 15 days</p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-500/70" />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-green-500/20 bg-gradient-to-br from-green-500/5 to-green-500/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Efficiency</p>
                    <p className="text-2xl font-bold text-green-600">{overallStats.studyEfficiency}%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <Star className="h-3 w-3 mr-1" />
                      Excellent
                    </p>
                  </div>
                  <Brain className="h-8 w-8 text-green-500/70" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Analytics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Study Time Trends */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                        Study Time Trends
                      </CardTitle>
                      <CardDescription>Daily study hours and session patterns</CardDescription>
                    </div>
                    <Badge variant="outline">Last 7 days</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={studyTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })} />
                        <YAxis />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          formatter={(value, name) => [value, name === 'hours' ? 'Study Hours' : 'Sessions']}
                        />
                        <Area type="monotone" dataKey="hours" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Subject Breakdown & Performance */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-secondary" />
                      Subject Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={subjectBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            dataKey="hours"
                          >
                            {subjectBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}h`, 'Study Hours']} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-4">
                      {subjectBreakdown.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                            <span>{subject.subject}</span>
                          </div>
                          <span className="font-medium">{subject.hours}h ({subject.percentage}%)</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-green-600" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceMetrics}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="retention" stroke="#3b82f6" name="Retention %" strokeWidth={2} />
                          <Line type="monotone" dataKey="quizScore" stroke="#10b981" name="Quiz Score %" strokeWidth={2} />
                          <Line type="monotone" dataKey="efficiency" stroke="#f59e0b" name="Efficiency %" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Study Patterns Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                    Study Patterns & Optimization
                  </CardTitle>
                  <CardDescription>Your most effective study habits and timing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Optimal Study Times</h4>
                      <div className="space-y-3">
                        {studyPatterns.optimalTimes.map((time, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <span className="font-medium">{time.time}</span>
                              <p className="text-xs text-muted-foreground">{time.sessions} sessions</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-green-600">{time.effectiveness}%</span>
                              <p className="text-xs text-muted-foreground">effectiveness</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Session Length Impact</h4>
                      <div className="space-y-3">
                        {studyPatterns.sessionLengths.map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <span className="font-medium">{session.duration}</span>
                              <p className="text-xs text-muted-foreground">{session.count} sessions</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-blue-600">{session.effectiveness}%</span>
                              <p className="text-xs text-muted-foreground">effectiveness</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Right Sidebar */}
            <div className="space-y-6">
              {/* AI Insights Panel */}
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    AI Insights & Recommendations
                  </CardTitle>
                  <CardDescription>Personalized analysis of your learning patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg ${getInsightStyle(insight.type)}`}>
                      <div className="flex items-start space-x-3">
                        <insight.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-semibold text-sm mb-1">{insight.title}</h5>
                          <p className="text-xs text-gray-700 mb-2">{insight.insight}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {insight.priority}
                            </Badge>
                            <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                              {insight.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Goal Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Target className="h-4 w-4 mr-2 text-green-600" />
                    Active Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Study 100 hours</span>
                        <span className="font-bold">125/100h</span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <Badge className="bg-green-100 text-green-800 border-green-200">Completed ✓</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>30-day streak</span>
                        <span className="font-bold">7/30 days</span>
                      </div>
                      <Progress value={23} className="h-2" />
                      <Badge variant="outline">23% Complete</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Master 5 subjects</span>
                        <span className="font-bold">3/5 subjects</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <Badge variant="outline">60% Complete</Badge>
                    </div>
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
                    <Award className="h-4 w-4 mr-2 text-yellow-600" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                        <achievement.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{achievement.title}</p>
                          <Badge className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View All Achievements
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressPage;
