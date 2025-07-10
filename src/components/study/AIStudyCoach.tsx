import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Brain,
  Lightbulb,
  MessageSquare,
  HelpCircle,
  Coffee,
  TrendingUp,
  Clock,
  Zap
} from "lucide-react";

interface AIStudyCoachProps {
  topic: string;
  sessionTime: number;
  progress: number;
}

export const AIStudyCoach = ({ topic, sessionTime, progress }: AIStudyCoachProps) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [showBreakReminder, setShowBreakReminder] = useState(false);

  const studyTips = [
    {
      type: "technique",
      icon: <Lightbulb className="h-4 w-4" />,
      title: "Visual Learning",
      content: "Try drawing the linked list structure on paper. Visual representations help solidify understanding of pointer relationships."
    },
    {
      type: "practice",
      icon: <Zap className="h-4 w-4" />,
      title: "Active Practice",
      content: "Implement the code step by step. Don't just read - write out each function and test it mentally."
    },
    {
      type: "comprehension",
      icon: <HelpCircle className="h-4 w-4" />,
      title: "Self-Check",
      content: "Ask yourself: 'What happens if I insert at the beginning vs. the end?' Understanding edge cases is crucial."
    },
    {
      type: "break",
      icon: <Coffee className="h-4 w-4" />,
      title: "Break Time",
      content: "You've been studying for a while. Consider taking a 5-minute break to improve retention."
    }
  ];

  const comprehensionQuestions = [
    "What is the time complexity of inserting at the head of a linked list?",
    "How would you detect a cycle in a linked list?",
    "What are the advantages of linked lists over arrays?",
    "When would you choose a doubly linked list over a singly linked list?"
  ];

  const relatedConcepts = [
    { title: "Dynamic Memory Allocation", relevance: "High" },
    { title: "Pointer Arithmetic", relevance: "Medium" },
    { title: "Memory Management", relevance: "High" },
    { title: "Time Complexity Analysis", relevance: "Medium" }
  ];

  // Show break reminder every 25 minutes
  useEffect(() => {
    if (sessionTime > 0 && sessionTime % (25 * 60) === 0) {
      setShowBreakReminder(true);
      setCurrentTip(3); // Break tip
    }
  }, [sessionTime]);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % (studyTips.length - 1));
    setShowBreakReminder(false);
  };

  const getTipTypeColor = (type: string) => {
    switch (type) {
      case 'technique': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400';
      case 'practice': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case 'comprehension': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400';
      case 'break': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Study Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Study Tip */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Study Tip</h4>
            <Badge variant="outline" className={getTipTypeColor(studyTips[currentTip].type)}>
              {studyTips[currentTip].type}
            </Badge>
          </div>
          
          <div className="bg-background/80 rounded-lg p-4 border">
            <div className="flex items-start gap-3">
              <div className="text-primary mt-0.5">
                {studyTips[currentTip].icon}
              </div>
              <div>
                <h5 className="font-medium text-sm mb-1">{studyTips[currentTip].title}</h5>
                <p className="text-sm text-muted-foreground">{studyTips[currentTip].content}</p>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={nextTip} className="w-full">
            Next Tip
          </Button>
        </div>

        <Separator />

        {/* Comprehension Check */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Quick Check
          </h4>
          <div className="bg-background/80 rounded-lg p-3 border">
            <p className="text-sm font-medium mb-2">Think about this:</p>
            <p className="text-sm text-muted-foreground">
              {comprehensionQuestions[Math.floor(progress / 25) % comprehensionQuestions.length]}
            </p>
          </div>
        </div>

        <Separator />

        {/* Related Concepts */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Related Concepts
          </h4>
          <div className="space-y-2">
            {relatedConcepts.map((concept, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>{concept.title}</span>
                <Badge 
                  variant="outline" 
                  className={
                    concept.relevance === 'High' 
                      ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }
                >
                  {concept.relevance}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Session Analytics */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Session Analytics
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-background/80 rounded p-2 border">
              <p className="text-muted-foreground">Focus Score</p>
              <p className="font-semibold text-primary">8.5/10</p>
            </div>
            <div className="bg-background/80 rounded p-2 border">
              <p className="text-muted-foreground">Retention</p>
              <p className="font-semibold text-success">Good</p>
            </div>
          </div>
        </div>

        {/* AI Chat Interface */}
        <Button variant="outline" className="w-full gap-2">
          <MessageSquare className="h-4 w-4" />
          Ask AI a Question
        </Button>
      </CardContent>
    </Card>
  );
};