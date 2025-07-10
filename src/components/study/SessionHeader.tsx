import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play,
  Pause,
  Square,
  Timer,
  BookOpen,
  Target,
  Clock,
  Settings,
  HelpCircle,
  Phone
} from "lucide-react";

interface SessionHeaderProps {
  session: {
    studyPlanTitle: string;
    topic: string;
    subtopic: string;
    duration: number;
  };
  isActive: boolean;
  sessionTime: number;
  progress: number;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export const SessionHeader = ({ 
  session, 
  isActive, 
  sessionTime, 
  progress, 
  onStart, 
  onPause, 
  onStop 
}: SessionHeaderProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gradient-to-r from-primary/5 via-background to-secondary/5 border-primary/20">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <BookOpen className="h-4 w-4" />
              <span>{session.studyPlanTitle}</span>
            </div>
            <CardTitle className="text-2xl mb-2">{session.topic}</CardTitle>
            <p className="text-muted-foreground">{session.subtopic}</p>
          </div>
          
          <div className="lg:w-80">
            <div className="space-y-4">
              {/* Session Timer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-lg">{formatTime(sessionTime)}</span>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Target className="h-3 w-3" />
                  {session.duration} min goal
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Session Progress</span>
                  <span className="text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Control Buttons */}
              <div className="flex gap-2">
                {!isActive ? (
                  <Button onClick={onStart} className="flex-1 bg-gradient-to-r from-primary to-secondary">
                    <Play className="h-4 w-4 mr-2" />
                    Start Session
                  </Button>
                ) : (
                  <Button onClick={onPause} variant="outline" className="flex-1">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={onStop} variant="outline" size="icon">
                  <Square className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="text-red-600 hover:text-red-700">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};