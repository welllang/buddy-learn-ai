import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Play, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Zap,
  Brain,
  Target,
  Coffee,
  BookOpen,
  Monitor,
  Users,
  MapPin,
  Bell,
  Settings,
  Download,
  Upload,
  AlertCircle,
  CheckCircle2,
  Timer,
  BarChart3,
  TrendingUp,
  Calendar,
  User,
  Lightbulb,
  RefreshCw,
  Filter,
  Search,
  Globe,
  Mail,
  Smartphone,
  Watch,
  Pause,
  SkipForward,
  Edit,
  Trash2,
  Copy,
  Share,
  Star,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface StudySession {
  id: string;
  title: string;
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'completed' | 'current' | 'upcoming' | 'break';
  studyMethod: 'reading' | 'practice' | 'video' | 'notes' | 'group';
  location: string;
  priority: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  completionPercentage: number;
  energyLevel: 'low' | 'medium' | 'high';
}

interface CalendarIntegration {
  googleCalendar: boolean;
  outlookCalendar: boolean;
  appleCalendar: boolean;
  conflictDetection: boolean;
  autoRescheduling: boolean;
}

interface ReminderSettings {
  pushNotifications: boolean;
  emailReminders: boolean;
  smsAlerts: boolean;
  calendarNotifications: boolean;
  smartWatchSync: boolean;
  reminderTiming: string[];
}

const Schedule = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');
  const [selectedSession, setSelectedSession] = useState<StudySession | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAIOptimizer, setShowAIOptimizer] = useState(false);
  const [draggedSession, setDraggedSession] = useState<string | null>(null);
  const [quickNotes, setQuickNotes] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextSessionCountdown, setNextSessionCountdown] = useState("");

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Demo data with modern structure
  const todaySchedule: StudySession[] = [
    {
      id: '1',
      title: 'Binary Search Trees Deep Dive',
      subject: 'Computer Science',
      topic: 'Data Structures & Algorithms',
      startTime: '09:00',
      endTime: '10:00',
      duration: 60,
      status: 'completed',
      studyMethod: 'practice',
      location: 'Study Room A',
      priority: 'high',
      difficulty: 'hard',
      completionPercentage: 100,
      energyLevel: 'high'
    },
    {
      id: '2',
      title: 'Calculus Integration Techniques',
      subject: 'Mathematics',
      topic: 'Advanced Calculus',
      startTime: '14:00',
      endTime: '14:45',
      duration: 45,
      status: 'current',
      studyMethod: 'reading',
      location: 'Library',
      priority: 'medium',
      difficulty: 'medium',
      completionPercentage: 65,
      energyLevel: 'medium'
    },
    {
      id: '3',
      title: 'Quantum Mechanics Fundamentals',
      subject: 'Physics',
      topic: 'Modern Physics',
      startTime: '16:30',
      endTime: '17:00',
      duration: 30,
      status: 'upcoming',
      studyMethod: 'video',
      location: 'Home Desk',
      priority: 'high',
      difficulty: 'hard',
      completionPercentage: 0,
      energyLevel: 'medium'
    },
    {
      id: '4',
      title: 'Break & Review',
      subject: 'Break',
      topic: 'Review Session',
      startTime: '19:00',
      endTime: '19:20',
      duration: 20,
      status: 'upcoming',
      studyMethod: 'notes',
      location: 'Cafe',
      priority: 'low',
      difficulty: 'easy',
      completionPercentage: 0,
      energyLevel: 'low'
    }
  ];

  const weeklySchedule = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + i);
    return {
      date,
      sessions: Math.floor(Math.random() * 4) + 1,
      hours: Math.floor(Math.random() * 6) + 2,
      isToday: date.toDateString() === new Date().toDateString()
    };
  });

  const subjectColors = {
    'Computer Science': 'from-blue-500 to-cyan-500',
    'Mathematics': 'from-purple-500 to-pink-500',
    'Physics': 'from-orange-500 to-red-500',
    'Chemistry': 'from-green-500 to-teal-500',
    'Break': 'from-gray-400 to-gray-500'
  };

  const studyMethodIcons = {
    reading: BookOpen,
    practice: Target,
    video: Monitor,
    notes: Edit,
    group: Users
  };

  const handleSessionDragStart = (sessionId: string) => {
    setDraggedSession(sessionId);
  };

  const handleSessionDrop = (newTime: string) => {
    if (draggedSession) {
      toast({
        title: "Session Rescheduled",
        description: `Study session moved to ${newTime}`,
      });
      setDraggedSession(null);
    }
  };

  const formatNextSessionCountdown = () => {
    const nextSession = todaySchedule.find(s => s.status === 'upcoming');
    if (!nextSession) return "No upcoming sessions";
    
    const [hours, minutes] = nextSession.startTime.split(':').map(Number);
    const sessionTime = new Date();
    sessionTime.setHours(hours, minutes, 0, 0);
    
    const timeDiff = sessionTime.getTime() - currentTime.getTime();
    if (timeDiff <= 0) return "Session starting now!";
    
    const minutesLeft = Math.floor(timeDiff / (1000 * 60));
    const hoursLeft = Math.floor(minutesLeft / 60);
    
    if (hoursLeft > 0) {
      return `${hoursLeft}h ${minutesLeft % 60}m`;
    }
    return `${minutesLeft}m`;
  };

  const renderCalendarContent = () => {
    if (viewMode === 'day') {
      return (
        <div className="space-y-6">
          {/* Time blocks for day view */}
          <div className="space-y-4">
            {Array.from({ length: 12 }, (_, i) => {
              const hour = i + 8; // Start from 8 AM
              const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
              const session = todaySchedule.find(s => s.startTime === timeSlot);
              
              return (
                <div
                  key={hour}
                  className="flex items-center space-x-4 p-4 border-l-4 border-border/20 hover:border-primary/50 transition-colors"
                  onDrop={() => handleSessionDrop(timeSlot)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="w-20 text-sm font-medium text-muted-foreground">
                    {timeSlot}
                  </div>
                  
                  {session ? (
                    <div
                      draggable
                      onDragStart={() => handleSessionDragStart(session.id)}
                      className={`flex-1 p-6 rounded-2xl border-2 cursor-move hover:scale-105 transition-all duration-300 ${
                        session.status === 'current' 
                          ? 'border-primary shadow-xl bg-primary/5' 
                          : 'border-border/50 hover:border-primary/30 bg-background/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{session.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center space-x-2">
                              <div className={`w-8 h-8 bg-gradient-to-br ${subjectColors[session.subject as keyof typeof subjectColors]} rounded-lg flex items-center justify-center`}>
                                <BookOpen className="h-4 w-4 text-white" />
                              </div>
                              <span>{session.subject}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Timer className="h-4 w-4" />
                              <span>{session.duration}m</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{session.location}</span>
                            </div>
                          </div>
                          
                          {session.status === 'current' && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span>Progress</span>
                                <span>{session.completionPercentage}%</span>
                              </div>
                              <Progress value={session.completionPercentage} className="h-2" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge variant={session.status === 'completed' ? 'default' : session.status === 'current' ? 'destructive' : 'secondary'}>
                            {session.status}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {session.status === 'current' && (
                            <>
                              <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                                <Play className="h-4 w-4 mr-2" />
                                Continue
                              </Button>
                              <Button size="sm" variant="outline">
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </Button>
                            </>
                          )}
                          {session.status === 'upcoming' && (
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4 mr-2" />
                              Start Early
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 p-4 border-2 border-dashed border-border/30 rounded-2xl text-center text-muted-foreground hover:border-primary/30 transition-colors">
                      <Plus className="h-6 w-6 mx-auto mb-2" />
                      <span>Add session</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Week and Month views
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-3">
          {weeklySchedule.map((day, index) => (
            <div 
              key={index} 
              className={`h-[160px] border-2 rounded-2xl p-3 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                day.isToday 
                  ? 'border-primary shadow-lg bg-primary/5' 
                  : 'border-border/50 hover:border-primary/30 bg-background/50'
              }`}
            >
              {/* Header with date */}
              <div className="flex items-center justify-between mb-3 h-6">
                <span className={`text-sm font-bold ${day.isToday ? 'text-primary' : 'text-foreground'}`}>
                  {day.date.getDate()}
                </span>
                {day.isToday && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0"></div>
                )}
              </div>
              
              {/* Sessions container with fixed height and scrolling */}
              <div className="h-[80px] space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                {Array.from({ length: Math.min(day.sessions, 4) }).map((_, i) => {
                  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'];
                  const subject = subjects[Math.floor(Math.random() * subjects.length)];
                  const shortName = subject === 'Computer Science' ? 'CS' : 
                                  subject === 'Mathematics' ? 'Math' : 
                                  subject === 'Physics' ? 'Physics' : 'Chem';
                  
                  return (
                    <div
                      key={i}
                      className={`text-xs px-2 py-1.5 rounded-lg bg-gradient-to-r ${subjectColors[subject as keyof typeof subjectColors]} text-white font-medium shadow-sm truncate min-h-[24px] flex items-center justify-center`}
                    >
                      {shortName}
                    </div>
                  );
                })}
                
                {day.sessions > 4 && (
                  <div className="text-xs text-muted-foreground text-center py-1">
                    +{day.sessions - 4} more
                  </div>
                )}
              </div>
              
              {/* Footer with total hours */}
              <div className="mt-3 pt-2 border-t border-border/20">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate">{day.hours}h total</span>
                  <BarChart3 className="h-3 w-3 flex-shrink-0 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Modern Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              Smart Schedule
            </h1>
            <p className="text-xl text-muted-foreground">AI-powered study session management</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-background/80 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-2 shadow-xl">
              {(['month', 'week', 'day'] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className={`capitalize px-6 py-3 rounded-xl transition-all duration-300 ${
                    viewMode === mode 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105' 
                      : 'hover:bg-primary/10'
                  }`}
                >
                  {mode}
                </Button>
              ))}
            </div>

            {/* Action Buttons */}
            <Button 
              onClick={() => setShowAIOptimizer(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl shadow-xl"
            >
              <Brain className="h-5 w-5 mr-2" />
              AI Optimize
            </Button>
            
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-3 rounded-2xl shadow-xl">
              <Plus className="h-5 w-5 mr-2" />
              Add Session
            </Button>

            <Button 
              variant="outline" 
              onClick={() => setShowSettings(true)}
              className="border-2 border-border/50 bg-background/80 backdrop-blur-sm px-4 py-3 rounded-2xl hover:border-primary/50 hover:bg-primary/5"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Calendar View */}
          <div className="lg:col-span-3">
            <Card className="border-2 border-border/50 rounded-3xl shadow-2xl bg-background/80 backdrop-blur-sm">
              <CardHeader className="border-b border-border/50 p-8">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mr-4">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </CardTitle>
                  
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-2 border-border/50 hover:border-primary/50 rounded-xl"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-2 border-border/50 hover:border-primary/50 rounded-xl px-6"
                    >
                      Today
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-2 border-border/50 hover:border-primary/50 rounded-xl"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                {renderCalendarContent()}
              </CardContent>
            </Card>

            {/* Calendar Integration & Controls */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="border-2 border-border/50 rounded-3xl shadow-xl bg-background/80">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-lg">
                    <Globe className="h-5 w-5 mr-3" />
                    Calendar Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Globe className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Google Calendar</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <Download className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Export to ICS</span>
                      </div>
                      <Button size="sm" variant="outline">Export</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Conflict Detection</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border/50 rounded-3xl shadow-xl bg-background/80">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="h-5 w-5 mr-3" />
                    AI Scheduling
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Energy Optimization</span>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Subject Rotation</span>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Break Calculation</span>
                      <Switch defaultChecked />
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl">
                      <Brain className="h-4 w-4 mr-2" />
                      Optimize Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Current Session Highlight */}
            <Card className="border-2 border-primary/50 rounded-3xl shadow-2xl bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader className="p-6">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  Current Session
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                {(() => {
                  const currentSession = todaySchedule.find(s => s.status === 'current');
                  return currentSession ? (
                    <div className="space-y-4">
                      <h3 className="font-bold text-xl">{currentSession.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{currentSession.startTime} - {currentSession.endTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Timer className="h-4 w-4" />
                          <span>{currentSession.duration}m</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{currentSession.completionPercentage}%</span>
                        </div>
                        <Progress value={currentSession.completionPercentage} className="h-3" />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500">
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                        <Button variant="outline">
                          <Pause className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Coffee className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No active session</p>
                      <Button className="mt-4" size="sm">Start Next Session</Button>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Next Session Countdown */}
            <Card className="border-2 border-border/50 rounded-3xl shadow-xl bg-background/80">
              <CardHeader className="p-6">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                    <Timer className="h-4 w-4 text-white" />
                  </div>
                  Next Session
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{formatNextSessionCountdown()}</div>
                  <p className="text-muted-foreground">until next session</p>
                  {(() => {
                    const nextSession = todaySchedule.find(s => s.status === 'upcoming');
                    return nextSession && (
                      <div className="mt-4 p-4 bg-muted/30 rounded-2xl">
                        <p className="font-medium">{nextSession.title}</p>
                        <p className="text-sm text-muted-foreground">{nextSession.subject}</p>
                      </div>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule Overview */}
            <Card className="border-2 border-border/50 rounded-3xl shadow-xl bg-background/80">
              <CardHeader className="p-6">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Today's Sessions
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {todaySchedule.map((session) => {
                    const MethodIcon = studyMethodIcons[session.studyMethod];
                    
                    return (
                      <div 
                        key={session.id} 
                        className={`flex items-center p-3 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden ${
                          session.status === 'current' 
                            ? 'border-primary shadow-lg bg-primary/5' 
                            : 'border-border/30 hover:border-primary/30 bg-background/50'
                        }`}
                        onClick={() => setSelectedSession(session)}
                      >
                        {/* Time column - fixed width */}
                        <div className="flex flex-col items-center justify-center w-14 flex-shrink-0">
                          <span className="text-xs font-bold text-center leading-tight">{session.startTime}</span>
                          <span className="text-xs text-muted-foreground">{session.duration}m</span>
                        </div>
                        
                        {/* Content column - flexible */}
                        <div className="flex-1 min-w-0 mx-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className={`w-5 h-5 bg-gradient-to-br ${subjectColors[session.subject as keyof typeof subjectColors]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <MethodIcon className="h-3 w-3 text-white" />
                            </div>
                            <p className="font-semibold text-xs truncate">
                              {session.subject === 'Computer Science' ? 'CS' : 
                               session.subject === 'Mathematics' ? 'Math' : 
                               session.subject}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground truncate leading-tight">{session.topic}</p>
                        </div>
                        
                        {/* Status column - fixed width */}
                        <div className="flex flex-col items-end space-y-1 w-16 flex-shrink-0">
                          <Badge
                            variant={
                              session.status === 'completed' ? 'default' :
                              session.status === 'current' ? 'destructive' : 'secondary'
                            }
                            className="text-xs px-1.5 py-0.5 h-auto whitespace-nowrap"
                          >
                            {session.status === 'current' && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-1" />}
                            {session.status === 'completed' ? '✓' : 
                             session.status === 'current' ? 'Now' : 
                             'Later'}
                          </Badge>
                          
                          {session.status === 'current' && (
                            <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card className="border-2 border-border/50 rounded-3xl shadow-xl bg-background/80">
              <CardHeader className="p-6">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  Progress Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Today's Progress</span>
                      <span className="font-bold">2h 15m / 4h</span>
                    </div>
                    <Progress value={56} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl overflow-hidden">
                      <div className="text-xl font-bold text-blue-600 mb-1">1</div>
                      <div className="text-xs text-muted-foreground truncate">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl overflow-hidden">
                      <div className="text-xl font-bold text-orange-600 mb-1">3</div>
                      <div className="text-xs text-muted-foreground truncate">Remaining</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">This Week</span>
                      <span className="font-medium">12h / 20h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Energy Level</span>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">High</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Focus Score</span>
                      <span className="font-medium">85%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Notes */}
            <Card className="border-2 border-border/50 rounded-3xl shadow-xl bg-background/80">
              <CardHeader className="p-6">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <Edit className="h-4 w-4 text-white" />
                  </div>
                  Quick Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Textarea
                  placeholder="Jot down quick thoughts, insights, or reminders..."
                  value={quickNotes}
                  onChange={(e) => setQuickNotes(e.target.value)}
                  className="border-2 border-border/50 rounded-2xl bg-background/50 focus:border-primary/50 resize-none"
                  rows={4}
                />
                <Button className="w-full mt-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white rounded-xl">
                  Save Notes
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-2 border-border/50 rounded-3xl shadow-xl bg-background/80">
              <CardHeader className="p-6">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-3">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Push Notifications</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Email Reminders</span>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Watch className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Smart Watch</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Remind me before</Label>
                    <Select defaultValue="15">
                      <SelectTrigger className="border-2 border-border/50 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Schedule;