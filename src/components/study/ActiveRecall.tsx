import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  X,
  Lightbulb,
  MessageSquare,
  Eye,
  EyeOff,
  Shuffle
} from "lucide-react";

interface ActiveRecallProps {
  topic: string;
  onComplete: () => void;
}

export const ActiveRecall = ({ topic, onComplete }: ActiveRecallProps) => {
  const [currentMode, setCurrentMode] = useState<'flashcards' | 'quiz' | 'mapping'>('flashcards');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [quizResults, setQuizResults] = useState<boolean[]>([]);

  // Mock flashcards data
  const flashcards = [
    {
      id: 1,
      question: "What is the time complexity of inserting at the head of a linked list?",
      answer: "O(1) - Constant time, as we only need to update the head pointer and the new node's next pointer.",
      difficulty: "Medium"
    },
    {
      id: 2,
      question: "How do you detect a cycle in a linked list?",
      answer: "Use Floyd's Cycle Detection Algorithm (tortoise and hare). Use two pointers moving at different speeds - if there's a cycle, they will eventually meet.",
      difficulty: "Hard"
    },
    {
      id: 3,
      question: "What are the main advantages of linked lists over arrays?",
      answer: "Dynamic size, efficient insertion/deletion at any position, no memory waste, and no need to declare size in advance.",
      difficulty: "Easy"
    }
  ];

  const quizQuestions = [
    {
      question: "What is the space complexity of a singly linked list with n elements?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: 2,
      explanation: "Each node requires constant space, and we have n nodes, so total space is O(n)."
    },
    {
      question: "Which operation is NOT efficient in a singly linked list?",
      options: ["Insert at head", "Delete at head", "Access by index", "Insert after given node"],
      correct: 2,
      explanation: "Accessing by index requires traversing from head, making it O(n) time complexity."
    }
  ];

  const conceptMappingPrompts = [
    "Draw the relationship between nodes and pointers",
    "Map out the steps for inserting a new node",
    "Visualize how memory is allocated for linked lists",
    "Connect linked lists to other data structures you know"
  ];

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      onComplete();
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const shuffleCards = () => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const submitQuizAnswer = (questionIndex: number, selectedOption: number) => {
    const newResults = [...quizResults];
    newResults[questionIndex] = selectedOption === quizQuestions[questionIndex].correct;
    setQuizResults(newResults);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Active Recall - {topic}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as any)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="mapping">Concept Map</TabsTrigger>
          </TabsList>

          <TabsContent value="flashcards" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Card {currentCardIndex + 1} of {flashcards.length}
                </span>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getDifficultyColor(flashcards[currentCardIndex].difficulty)}>
                    {flashcards[currentCardIndex].difficulty}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={shuffleCards}>
                    <Shuffle className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="bg-background/80 rounded-lg p-6 min-h-[200px] border-2 border-dashed border-primary/20">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Question:</h4>
                  <p className="text-muted-foreground">{flashcards[currentCardIndex].question}</p>
                  
                  {showAnswer && (
                    <div className="space-y-2 pt-4 border-t">
                      <h4 className="font-medium text-lg text-success">Answer:</h4>
                      <p className="text-sm">{flashcards[currentCardIndex].answer}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={prevCard} 
                  disabled={currentCardIndex === 0}
                >
                  Previous
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="gap-2"
                >
                  {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </Button>
                
                <Button 
                  onClick={nextCard}
                  disabled={currentCardIndex === flashcards.length - 1}
                  className="gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-4">
            <div className="space-y-6">
              {quizQuestions.map((question, index) => (
                <div key={index} className="bg-background/80 rounded-lg p-4 border">
                  <h4 className="font-medium mb-3">
                    Question {index + 1}: {question.question}
                  </h4>
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => submitQuizAnswer(index, optionIndex)}
                        className={`w-full text-left p-3 rounded border transition-colors ${
                          quizResults[index] !== undefined
                            ? optionIndex === question.correct
                              ? 'bg-success/10 border-success text-success'
                              : quizResults[index] === false && optionIndex === question.correct
                              ? 'bg-success/10 border-success text-success'
                              : 'bg-muted/30'
                            : 'hover:bg-muted/50 border-muted'
                        }`}
                        disabled={quizResults[index] !== undefined}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {quizResults[index] !== undefined && (
                    <div className="bg-muted/30 rounded p-3">
                      <p className="text-sm font-medium mb-1">Explanation:</p>
                      <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
              
              {quizResults.length === quizQuestions.length && (
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <h4 className="font-medium mb-2">Quiz Results</h4>
                  <p className="text-sm">
                    Score: {quizResults.filter(Boolean).length}/{quizQuestions.length} 
                    ({Math.round((quizResults.filter(Boolean).length / quizQuestions.length) * 100)}%)
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-background/80 rounded-lg p-4 border">
                <h4 className="font-medium mb-3">Concept Mapping Exercise</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a visual representation of the concepts and their relationships:
                </p>
                <div className="space-y-3">
                  {conceptMappingPrompts.map((prompt, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {index + 1}
                      </div>
                      <span className="text-sm">{prompt}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-background/80 rounded-lg p-4 border">
                <h4 className="font-medium mb-3">Your Concept Map</h4>
                <Textarea
                  placeholder="Draw or describe your concept map here... Think about how linked lists connect to memory management, pointers, and other data structures."
                  className="min-h-[150px] resize-none"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};