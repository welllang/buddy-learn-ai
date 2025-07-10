import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  BookOpen,
  MessageSquare,
  Target,
  Users
} from "lucide-react";

interface FeynmanTechniqueProps {
  topic: string;
  onComplete: () => void;
}

export const FeynmanTechnique = ({ topic, onComplete }: FeynmanTechniqueProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>(["", "", "", ""]);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false]);

  const steps = [
    {
      title: "1. Choose Your Concept",
      description: "Write down what you want to learn about",
      prompt: `You've chosen: "${topic}". Write a brief summary of what you think you know about this topic.`,
      placeholder: "I think linked lists are...",
      icon: <Target className="h-5 w-5" />,
      color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      title: "2. Explain in Simple Terms",
      description: "Teach it like you're explaining to a child",
      prompt: "Explain linked lists as if you're teaching a 12-year-old who has never heard of them before. Use simple language and avoid technical jargon.",
      placeholder: "Imagine you have a chain of paper clips...",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      title: "3. Identify Knowledge Gaps",
      description: "Find what you don't understand",
      prompt: "Review your explanation. What parts were difficult to explain? What concepts do you need to research more? Where did you struggle?",
      placeholder: "I struggled to explain... I need to learn more about...",
      icon: <AlertCircle className="h-5 w-5" />,
      color: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400"
    },
    {
      title: "4. Simplify with Analogies",
      description: "Use analogies and examples",
      prompt: "Create analogies or real-world examples to make the concept even clearer. How is a linked list like something in everyday life?",
      placeholder: "A linked list is like a treasure hunt where each clue leads to the next...",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400"
    }
  ];

  const analogySuggestions = [
    "Train cars connected by couplers",
    "A chain of paper clips",
    "A scavenger hunt with clues",
    "A line of people holding hands",
    "A series of sticky notes with arrows"
  ];

  const teachingPrompts = [
    "How would you draw this on a whiteboard?",
    "What questions might a student ask?",
    "What common mistakes do people make?",
    "How does this relate to things they already know?",
    "What's the most important thing to remember?"
  ];

  const updateResponse = (stepIndex: number, value: string) => {
    const newResponses = [...responses];
    newResponses[stepIndex] = value;
    setResponses(newResponses);
    
    // Mark step as completed if there's substantial content
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[stepIndex] = value.trim().length > 50;
    setCompletedSteps(newCompletedSteps);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const completionRate = (completedSteps.filter(Boolean).length / steps.length) * 100;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Feynman Technique - {topic}
          </CardTitle>
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            {Math.round(completionRate)}% Complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Step */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${steps[currentStep].color}`}>
              {steps[currentStep].icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{steps[currentStep].title}</h3>
              <p className="text-muted-foreground text-sm">{steps[currentStep].description}</p>
            </div>
          </div>

          <div className="bg-background/80 rounded-lg p-4 border">
            <h4 className="font-medium mb-3">Your Task:</h4>
            <p className="text-sm text-muted-foreground mb-4">{steps[currentStep].prompt}</p>
            
            <Textarea
              placeholder={steps[currentStep].placeholder}
              value={responses[currentStep]}
              onChange={(e) => updateResponse(currentStep, e.target.value)}
              className="min-h-[120px] resize-none"
            />
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">
                {responses[currentStep].length} characters
              </span>
              {completedSteps[currentStep] && (
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Complete
                </Badge>
              )}
            </div>
          </div>

          {/* Step-specific helpers */}
          {currentStep === 1 && (
            <div className="bg-muted/30 rounded-lg p-3">
              <h5 className="font-medium text-sm mb-2">Teaching Prompts:</h5>
              <div className="space-y-1">
                {teachingPrompts.map((prompt, index) => (
                  <p key={index} className="text-xs text-muted-foreground">• {prompt}</p>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-muted/30 rounded-lg p-3">
              <h5 className="font-medium text-sm mb-2">Analogy Suggestions:</h5>
              <div className="flex flex-wrap gap-1">
                {analogySuggestions.map((analogy, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {analogy}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-primary'
                    : completedSteps[index]
                    ? 'bg-success'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={nextStep}
            disabled={!completedSteps[currentStep]}
            className="gap-2"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next Step'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Understanding Verification */}
        {currentStep === steps.length - 1 && completedSteps[currentStep] && (
          <div className="bg-success/10 rounded-lg p-4 border border-success/20">
            <h4 className="font-medium text-success mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Understanding Verification
            </h4>
            <p className="text-sm text-muted-foreground">
              Great job! You've completed all steps of the Feynman Technique. Your understanding of {topic} should now be much clearer. 
              Try explaining it to someone else to solidify your knowledge even further.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};