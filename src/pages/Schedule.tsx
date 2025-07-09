import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Play, Plus, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');

  // Demo schedule data
  const todaySchedule = [
    { id: 1, time: '09:00', duration: 60, subject: 'Computer Science', topic: 'Binary Search Trees', status: 'completed' },
    { id: 2, time: '14:00', duration: 45, subject: 'Mathematics', topic: 'Calculus Integration', status: 'current' },
    { id: 3, time: '16:30', duration: 30, subject: 'Physics', topic: 'Quantum Mechanics', status: 'upcoming' },
    { id: 4, time: '19:00', duration: 20, subject: 'Break', topic: 'Review Notes', status: 'upcoming' },
  ];

  const weeklySchedule = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + i);
    return {
      date,
      sessions: Math.floor(Math.random() * 4) + 1,
      hours: Math.floor(Math.random() * 6) + 2
    };
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Schedule</h1>
            <p className="text-muted-foreground">Manage your study sessions and optimize your time</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-muted/30 rounded-lg p-1">
              <Button 
                variant={viewMode === 'month' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Month
              </Button>
              <Button 
                variant={viewMode === 'week' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Week
              </Button>
              <Button 
                variant={viewMode === 'day' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('day')}
              >
                Day
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Week View */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {weeklySchedule.map((day, index) => (
                    <div key={index} className="min-h-[120px] border rounded-lg p-2 hover:bg-muted/30 transition-colors">
                      <div className="text-sm font-medium mb-2">
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {Array.from({ length: day.sessions }).map((_, i) => (
                          <div
                            key={i}
                            className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                          >
                            Study {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {day.hours}h total
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySchedule.map((session) => (
                  <div key={session.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium">{session.time}</span>
                      <span className="text-xs text-muted-foreground">{session.duration}m</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{session.subject}</p>
                      <p className="text-xs text-muted-foreground">{session.topic}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          session.status === 'completed' ? 'default' :
                          session.status === 'current' ? 'destructive' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {session.status}
                      </Badge>
                      {session.status === 'current' && (
                        <Button size="sm" variant="outline">
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Study Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Today's Progress</span>
                  <span className="font-medium">2h 15m / 4h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sessions Complete</span>
                  <span className="font-medium">1 / 4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Next Session</span>
                  <span className="font-medium">30 minutes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;