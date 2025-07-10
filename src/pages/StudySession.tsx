import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Brain, 
  Play,
  Pause,
  Square,
  Timer,
  BookOpen,
  FileText,
  Highlighter,
  MessageSquare,
  Search,
  Coffee,
  Target,
  Clock,
  CheckCircle,
  Circle,
  Star,
  Lightbulb,
  Zap,
  BarChart3,
  Settings,
  Volume2,
  Bookmark,
  RotateCcw,
  Eye,
  Pencil
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SessionHeader } from "@/components/study/SessionHeader";
import { StudyContent } from "@/components/study/StudyContent";
import { AIStudyCoach } from "@/components/study/AIStudyCoach";
import { StudyTechniques } from "@/components/study/StudyTechniques";
import { ProgressTracker } from "@/components/study/ProgressTracker";

const StudySession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [notes, setNotes] = useState("");
  const [currentTechnique, setCurrentTechnique] = useState("pomodoro");
  const [confidenceRating, setConfidenceRating] = useState(3);
  const [sessionProgress, setSessionProgress] = useState(0);

  // Mock session data - in real app would come from API
  const session = {
    id: sessionId,
    studyPlanId: "1",
    studyPlanTitle: "Computer Science Fundamentals",
    topic: "Linked Lists Implementation",
    subtopic: "Singly and Doubly Linked Lists",
    duration: 60, // minutes
    materials: [
      {
        type: "pdf",
        title: "Data Structures Textbook - Chapter 3",
        url: "/materials/ds-chapter3.pdf",
        pages: "45-67"
      },
      {
        type: "video",
        title: "Linked Lists Visual Guide",
        url: "https://example.com/video",
        duration: "15 min"
      },
      {
        type: "article",
        title: "Implementation Best Practices",
        url: "https://example.com/article"
      }
    ],
    objectives: [
      "Understand the structure of linked lists",
      "Implement basic operations (insert, delete, search)",
      "Compare performance with arrays",
      "Practice with coding exercises"
    ],
    exercises: [
      {
        title: "Implement Singly Linked List",
        description: "Create a complete singly linked list class with all operations",
        difficulty: "Medium",
        estimatedTime: 20
      },
      {
        title: "Reverse Linked List",
        description: "Write an algorithm to reverse a linked list in-place",
        difficulty: "Medium",
        estimatedTime: 15
      },
      {
        title: "Find Middle Node",
        description: "Efficiently find the middle node using two pointers",
        difficulty: "Easy",
        estimatedTime: 10
      }
    ]
  };

  const startSession = () => {
    setIsSessionActive(true);
    toast({
      title: "Study Session Started",
      description: "Good luck with your learning!",
    });
  };

  const pauseSession = () => {
    setIsSessionActive(false);
    toast({
      title: "Session Paused",
      description: "Take a break and come back when ready.",
    });
  };

  const endSession = () => {
    setIsSessionActive(false);
    toast({
      title: "Session Completed",
      description: `Great job! You studied for ${Math.floor(sessionTime / 60)} minutes.`,
    });
    navigate(`/study-plans/${session.studyPlanId}`);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        setSessionProgress(prev => Math.min(prev + (100 / (session.duration * 60)), 100));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, session.duration]);

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
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm" onClick={() => navigate(`/study-plans/${session.studyPlanId}`)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Plan
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="gap-1">
              <Timer className="h-3 w-3" />
              {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
            </Badge>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">JS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Session Header */}
        <SessionHeader 
          session={session}
          isActive={isSessionActive}
          sessionTime={sessionTime}
          progress={sessionProgress}
          onStart={startSession}
          onPause={pauseSession}
          onStop={endSession}
        />

        <div className="grid lg:grid-cols-12 gap-6 mt-6">
          {/* Main Content Area */}
          <div className="lg:col-span-7">
            <StudyContent 
              materials={session.materials}
              notes={notes}
              onNotesChange={setNotes}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* AI Study Coach */}
            <AIStudyCoach 
              topic={session.topic}
              sessionTime={sessionTime}
              progress={sessionProgress}
            />

            {/* Study Techniques */}
            <StudyTechniques 
              currentTechnique={currentTechnique}
              onTechniqueChange={setCurrentTechnique}
              isSessionActive={isSessionActive}
            />

            {/* Progress Tracker */}
            <ProgressTracker 
              objectives={session.objectives}
              exercises={session.exercises}
              confidenceRating={confidenceRating}
              onConfidenceChange={setConfidenceRating}
              sessionTime={sessionTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySession;