import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Timer,
  Brain,
  RotateCcw,
  Play,
  Pause,
  Coffee,
  Clock,
  Target,
  Lightbulb,
  BookOpen,
  MessageSquare,
  Zap,
  Settings,
  TrendingUp
} from "lucide-react";
import { ActiveRecall } from "./ActiveRecall";
import { FeynmanTechnique } from "./FeynmanTechnique";

interface StudyTechniquesProps {
  currentTechnique: string;
  onTechniqueChange: (technique: string) => void;
  isSessionActive: boolean;
}

export const StudyTechniques = ({ currentTechnique, onTechniqueChange, isSessionActive }: StudyTechniquesProps) => {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isPomodoro, setIsPomodoro] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroSession, setPomodoroSession] = useState(1);
  const [pomodoroSettings, setPomodoroSettings] = useState({
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4
  });
  const [showActiveRecall, setShowActiveRecall] = useState(false);
  const [showFeynman, setShowFeynman] = useState(false);
  
  const [spacedRepetitionCards, setSpacedRepetitionCards] = useState([
    { id: 1, question: "What is a linked list?", difficulty: 1, nextReview: new Date() },
    { id: 2, question: "Time complexity of linked list insertion?", difficulty: 2, nextReview: new Date() },
    { id: 3, question: "Difference between singly and doubly linked lists?", difficulty: 1, nextReview: new Date() }
  ]);
  
  const [activeRecallPrompts] = useState([
    "Explain linked lists without looking at your notes",
    "What are the main operations and their complexities?",
    "Draw a linked list insertion process from memory",
    "Compare linked lists with arrays - pros and cons"
  ]);
  
  const [feynmanStep, setFeynmanStep] = useState(0);
  const feynmanSteps = [
    "Choose a concept: Linked Lists",
    "Explain it in simple terms",
    "Identify gaps in understanding",
    "Simplify and use analogies"
  ];

  // Pomodoro timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPomodoro && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      // Session ended
      if (isBreak) {
        setIsBreak(false);
        setPomodoroTime(pomodoroSettings.focusTime * 60);
        setPomodoroSession(prev => prev + 1);
      } else {
        setIsBreak(true);
        const isLongBreak = pomodoroSession % pomodoroSettings.sessionsUntilLongBreak === 0;
        setPomodoroTime((isLongBreak ? pomodoroSettings.longBreak : pomodoroSettings.shortBreak) * 60);
      }
      setIsPomodoro(false);
    }
    return () => clearInterval(interval);
  }, [isPomodoro, pomodoroTime, isBreak, pomodoroSession, pomodoroSettings]);

  const startPomodoro = () => {
    setIsPomodoro(true);
  };

  const pausePomodoro = () => {
    setIsPomodoro(false);
  };

  const resetPomodoro = () => {
    setIsPomodoro(false);
    if (isBreak) {
      const isLongBreak = pomodoroSession % pomodoroSettings.sessionsUntilLongBreak === 0;
      setPomodoroTime((isLongBreak ? pomodoroSettings.longBreak : pomodoroSettings.shortBreak) * 60);
    } else {
      setPomodoroTime(pomodoroSettings.focusTime * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const reviewSpacedCard = (cardId: number, difficulty: number) => {
    setSpacedRepetitionCards(prev => 
      prev.map(card => 
        card.id === cardId 
          ? { 
              ...card, 
              difficulty: Math.max(1, Math.min(5, difficulty)),
              // Simple spaced repetition algorithm
              nextReview: new Date(Date.now() + (difficulty * 24 * 60 * 60 * 1000)) // Days based on difficulty
            }
          : card
      )
    );
  };

  const updatePomodoroSettings = (newSettings: typeof pomodoroSettings) => {
    setPomodoroSettings(newSettings);
    // Reset timer with new settings if not currently running
    if (!isPomodoro) {
      setPomodoroTime(newSettings.focusTime * 60);
      setIsBreak(false);
    }
  };

  // Show Active Recall or Feynman Technique modals
  if (showActiveRecall) {
    return (
      <ActiveRecall 
        topic="Linked Lists" 
        onComplete={() => setShowActiveRecall(false)} 
      />
    );
  }

  if (showFeynman) {
    return (
      <FeynmanTechnique 
        topic="Linked Lists" 
        onComplete={() => setShowFeynman(false)} 
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Study Techniques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={currentTechnique} onValueChange={onTechniqueChange} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="spaced">Spaced Rep.</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pomodoro" className="space-y-4">
            <div className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
                <div 
                  className={`absolute inset-0 rounded-full border-8 border-t-transparent transition-all duration-1000 ${
                    isBreak ? 'border-orange-500' : 'border-primary'
                  }`}
                  style={{
                    transform: `rotate(${360 * (1 - pomodoroTime / (isBreak 
                      ? (pomodoroSession % pomodoroSettings.sessionsUntilLongBreak === 0 ? pomodoroSettings.longBreak : pomodoroSettings.shortBreak) * 60
                      : pomodoroSettings.focusTime * 60))}deg)`
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatTime(pomodoroTime)}</div>
                    <div className="text-xs text-muted-foreground">
                      {isBreak ? 'Break' : 'Focus'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Coffee className="h-4 w-4" />
                  <span className="text-sm">Session {pomodoroSession}</span>
                </div>
                
                <div className="flex gap-2 justify-center">
                  {!isPomodoro ? (
                    <Button onClick={startPomodoro} size="sm" className="gap-1">
                      <Play className="h-3 w-3" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={pausePomodoro} size="sm" variant="outline" className="gap-1">
                      <Pause className="h-3 w-3" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={resetPomodoro} size="sm" variant="outline" className="gap-1">
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  {isBreak 
                    ? "Take a break! Walk around or do some stretches." 
                    : "Focus time! Minimize distractions and dive deep into learning."
                  }
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="spaced" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Review Queue</h4>
                <Badge variant="outline">{spacedRepetitionCards.length} cards</Badge>
              </div>
              
              {spacedRepetitionCards.slice(0, 1).map((card) => (
                <div key={card.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{card.question}</p>
                    <Badge variant="outline" className="text-xs">
                      Level {card.difficulty}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next review: {card.nextReview.toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => reviewSpacedCard(card.id, 1)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Hard
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => reviewSpacedCard(card.id, 3)}
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      Good
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => reviewSpacedCard(card.id, 5)}
                      className="text-green-600 hover:text-green-700"
                    >
                      Easy
                    </Button>
                  </div>
                  
                  {/* Forgetting Curve Analysis */}
                  <div className="bg-background/80 rounded p-2 border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Retention Rate</span>
                      <span className="font-medium">{Math.max(20, 100 - (card.difficulty * 10))}%</span>
                    </div>
                    <Progress 
                      value={Math.max(20, 100 - (card.difficulty * 10))} 
                      className="h-1 mt-1" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Pomodoro Settings
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Focus Time (min)</label>
                  <input
                    type="number"
                    value={pomodoroSettings.focusTime}
                    onChange={(e) => updatePomodoroSettings({
                      ...pomodoroSettings,
                      focusTime: parseInt(e.target.value) || 25
                    })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    min="1"
                    max="60"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Short Break (min)</label>
                  <input
                    type="number"
                    value={pomodoroSettings.shortBreak}
                    onChange={(e) => updatePomodoroSettings({
                      ...pomodoroSettings,
                      shortBreak: parseInt(e.target.value) || 5
                    })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    min="1"
                    max="30"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Long Break (min)</label>
                  <input
                    type="number"
                    value={pomodoroSettings.longBreak}
                    onChange={(e) => updatePomodoroSettings({
                      ...pomodoroSettings,
                      longBreak: parseInt(e.target.value) || 15
                    })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    min="1"
                    max="60"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Sessions Until Long Break</label>
                  <input
                    type="number"
                    value={pomodoroSettings.sessionsUntilLongBreak}
                    onChange={(e) => updatePomodoroSettings({
                      ...pomodoroSettings,
                      sessionsUntilLongBreak: parseInt(e.target.value) || 4
                    })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-3">
                <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Productivity Tracking
                </h5>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Today's Sessions</p>
                    <p className="font-semibold">{pomodoroSession}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Focus Efficiency</p>
                    <p className="font-semibold text-success">92%</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-4" />
        
        {/* Quick Technique Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => setShowActiveRecall(true)}
          >
            <Zap className="h-3 w-3" />
            Active Recall
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => setShowFeynman(true)}
          >
            <Lightbulb className="h-3 w-3" />
            Feynman Tech.
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};