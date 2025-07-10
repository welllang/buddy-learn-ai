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
  Pencil,
  Loader
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStudySession, useStartStudySession, useCompleteStudySession, useUpdateStudySession } from "@/hooks/useStudySessions";
import { SessionHeader } from "@/components/study/SessionHeader";
import { StudyContent } from "@/components/study/StudyContent";
import { AIStudyCoach } from "@/components/study/AIStudyCoach";
import { StudyTechniques } from "@/components/study/StudyTechniques";
import { ProgressTracker } from "@/components/study/ProgressTracker";

const StudySession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Fetch session data
  const { data: session, isLoading, error } = useStudySession(sessionId || "");
  const startSessionMutation = useStartStudySession();
  const completeSessionMutation = useCompleteStudySession();
  const updateSessionMutation = useUpdateStudySession();
  
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [notes, setNotes] = useState("");
  const [currentTechnique, setCurrentTechnique] = useState("pomodoro");
  const [confidenceRating, setConfidenceRating] = useState(3);
  const [focusLevel, setFocusLevel] = useState(3);
  const [effectivenessRating, setEffectivenessRating] = useState(3);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);

  // Initialize state from session data
  useEffect(() => {
    if (session) {
      setNotes(session.notes || "");
      setConfidenceRating(session.confidence_rating || 3);
      setFocusLevel(session.focus_level || 3);
      setEffectivenessRating(session.effectiveness_rating || 3);
      setCompletedObjectives(session.completed_objectives || []);
      setIsSessionActive(session.status === 'active');
      
      // Calculate elapsed time if session is active
      if (session.start_time && session.status === 'active') {
        const startTime = new Date(session.start_time).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        setSessionTime(elapsed);
      }
    }
  }, [session]);

  // Create session objectives and materials arrays
  const objectives = session?.objectives || [];
  const materials = session?.study_materials || [];
  const exercises = [
    {
      title: "Practice Exercise 1",
      description: "Complete the main learning objective",
      difficulty: "Medium",
      estimatedTime: 20
    }
  ];

  const startSession = () => {
    if (!sessionId) return;
    
    startSessionMutation.mutate(sessionId, {
      onSuccess: () => {
        setIsSessionActive(true);
        setSessionTime(0);
      }
    });
  };

  const pauseSession = () => {
    if (!sessionId) return;
    
    updateSessionMutation.mutate({
      id: sessionId,
      updates: { status: 'paused' }
    }, {
      onSuccess: () => {
        setIsSessionActive(false);
        toast({
          title: "Session Paused",
          description: "Take a break and come back when ready.",
        });
      }
    });
  };

  const endSession = () => {
    if (!sessionId) return;
    
    completeSessionMutation.mutate({
      sessionId,
      notes,
      confidenceRating,
      focusLevel,
      effectivenessRating,
      completedObjectives,
      techniquesUsed: [currentTechnique]
    }, {
      onSuccess: () => {
        setIsSessionActive(false);
        if (session?.study_plan_id) {
          navigate(`/study-plans/${session.study_plan_id}`);
        } else {
          navigate('/study-plans');
        }
      }
    });
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        // Calculate progress based on estimated duration (60 minutes default)
        const estimatedDuration = 60 * 60; // 60 minutes in seconds
        setSessionProgress(prev => Math.min((sessionTime / estimatedDuration) * 100, 100));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, sessionTime]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="h-6 w-6 animate-spin" />
          <span>Loading study session...</span>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Session Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The study session you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button onClick={() => navigate('/study-plans')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Study Plans
          </Button>
        </div>
      </div>
    );
  }

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
            <Button variant="ghost" size="sm" onClick={() => navigate(session.study_plan_id ? `/study-plans/${session.study_plan_id}` : '/study-plans')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to {session.study_plan_id ? 'Plan' : 'Study Plans'}
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
          session={{
            studyPlanTitle: session.study_plans?.title || 'Study Session',
            topic: session.topic || 'General Study',
            subtopic: session.subtopic || '',
            duration: 60 // Default duration
          }}
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
              materials={materials.map(material => ({
                type: material.material_type,
                title: material.title,
                url: material.url || material.file_path || '',
                pages: material.page_start && material.page_end ? `${material.page_start}-${material.page_end}` : undefined,
                duration: material.duration_minutes ? `${material.duration_minutes} min` : undefined
              }))}
              notes={notes}
              onNotesChange={setNotes}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* AI Study Coach */}
            <AIStudyCoach 
              topic={session.topic || 'Study Session'}
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
              objectives={objectives}
              exercises={exercises}
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