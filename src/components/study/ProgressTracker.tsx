import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  CheckCircle,
  Circle,
  Target,
  Clock,
  Star,
  BarChart3,
  Brain,
  TrendingUp
} from "lucide-react";

interface ProgressTrackerProps {
  objectives: string[];
  exercises: Array<{
    title: string;
    description: string;
    difficulty: string;
    estimatedTime: number;
  }>;
  confidenceRating: number;
  onConfidenceChange: (rating: number) => void;
  sessionTime: number;
}

export const ProgressTracker = ({ 
  objectives, 
  exercises, 
  confidenceRating, 
  onConfidenceChange, 
  sessionTime 
}: ProgressTrackerProps) => {
  const [completedObjectives, setCompletedObjectives] = useState<boolean[]>(
    new Array(objectives.length).fill(false)
  );
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(
    new Array(exercises.length).fill(false)
  );

  const toggleObjective = (index: number) => {
    setCompletedObjectives(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const toggleExercise = (index: number) => {
    setCompletedExercises(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const objectiveProgress = (completedObjectives.filter(Boolean).length / objectives.length) * 100;
  const exerciseProgress = (completedExercises.filter(Boolean).length / exercises.length) * 100;
  const overallProgress = (objectiveProgress + exerciseProgress) / 2;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  const getConfidenceLabel = (rating: number) => {
    if (rating <= 2) return "Need Review";
    if (rating <= 3) return "Getting It";
    if (rating <= 4) return "Confident";
    return "Mastered";
  };

  const getConfidenceColor = (rating: number) => {
    if (rating <= 2) return "text-red-600";
    if (rating <= 3) return "text-yellow-600";
    if (rating <= 4) return "text-blue-600";
    return "text-green-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Session Progress</h4>
            <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span>Objectives: {completedObjectives.filter(Boolean).length}/{objectives.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary" />
              <span>Time: {Math.floor(sessionTime / 60)}m</span>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Target className="h-4 w-4" />
            Learning Objectives
          </h4>
          <div className="space-y-2">
            {objectives.map((objective, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-3 p-2 rounded cursor-pointer transition-colors ${
                  completedObjectives[index] ? 'bg-success/10' : 'hover:bg-muted/30'
                }`}
                onClick={() => toggleObjective(index)}
              >
                {completedObjectives[index] ? (
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                )}
                <span className={`text-sm ${completedObjectives[index] ? 'line-through text-muted-foreground' : ''}`}>
                  {objective}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Exercises */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Practice Exercises
          </h4>
          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <div 
                key={index} 
                className={`p-3 border rounded transition-colors ${
                  completedExercises[index] ? 'bg-success/10 border-success/20' : 'hover:bg-muted/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2">
                    <button onClick={() => toggleExercise(index)} className="mt-0.5">
                      {completedExercises[index] ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    <div>
                      <h5 className={`font-medium text-sm ${completedExercises[index] ? 'line-through text-muted-foreground' : ''}`}>
                        {exercise.title}
                      </h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        {exercise.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{exercise.estimatedTime}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence Rating */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Star className="h-4 w-4" />
            Understanding Level
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">How confident are you with this topic?</span>
              <span className={`text-sm font-medium ${getConfidenceColor(confidenceRating)}`}>
                {getConfidenceLabel(confidenceRating)}
              </span>
            </div>
            <Slider
              value={[confidenceRating]}
              onValueChange={(value) => onConfidenceChange(value[0])}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Confused</span>
              <span>Learning</span>
              <span>Confident</span>
              <span>Expert</span>
            </div>
          </div>
        </div>

        {/* Session Stats */}
        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <h5 className="font-medium text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Session Stats
          </h5>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Completion Rate</p>
              <p className="font-semibold">{Math.round(overallProgress)}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Focus Score</p>
              <p className="font-semibold text-primary">8.5/10</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};