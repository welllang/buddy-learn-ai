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
  Zap
} from "lucide-react";

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
        setPomodoroTime(25 * 60); // Reset to 25 minutes
        setPomodoroSession(prev => prev + 1);
      } else {
        setIsBreak(true);
        setPomodoroTime(5 * 60); // 5 minute break
      }
      setIsPomodoro(false);
    }
    return () => clearInterval(interval);
  }, [isPomodoro, pomodoroTime, isBreak]);

  const startPomodoro = () => {
    setIsPomodoro(true);
  };

  const pausePomodoro = () => {
    setIsPomodoro(false);
  };

  const resetPomodoro = () => {
    setIsPomodoro(false);
    setPomodoroTime(isBreak ? 5 * 60 : 25 * 60);
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
          ? { ...card, difficulty: Math.max(1, Math.min(5, difficulty)) }
          : card
      )
    );
  };

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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="spaced">Spaced Rep.</TabsTrigger>
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
                    transform: `rotate(${360 * (1 - pomodoroTime / (isBreak ? 5 * 60 : 25 * 60))}deg)`
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
                  <p className="font-medium text-sm">{card.question}</p>
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
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-4" />
        
        {/* Quick Technique Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Zap className="h-3 w-3" />
            Active Recall
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Lightbulb className="h-3 w-3" />
            Feynman Tech.
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};