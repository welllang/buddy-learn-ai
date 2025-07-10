import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  Target,
  TrendingUp,
  MessageSquare,
  Heart,
  Zap,
  RotateCcw,
  Settings
} from "lucide-react";

interface AIConfigurationSettingsProps {
  onSave: () => void;
}

export const AIConfigurationSettings = ({ onSave }: AIConfigurationSettingsProps) => {
  const [aiConfig, setAiConfig] = useState({
    studyStyle: "balanced",
    difficultyPreference: "adaptive",
    difficultyLevel: 3,
    reminderFrequency: "moderate",
    motivationStyle: "encouraging",
    feedbackType: "detailed",
    personalityType: "supportive",
    adaptiveLearning: true,
    progressTracking: true,
    smartSuggestions: true
  });

  const [assessmentResults, setAssessmentResults] = useState({
    visualLearner: 75,
    auditoryLearner: 60,
    kinestheticLearner: 45,
    readingLearner: 80
  });

  const retakeAssessment = () => {
    // Mock assessment retake
    setAssessmentResults({
      visualLearner: Math.floor(Math.random() * 40) + 60,
      auditoryLearner: Math.floor(Math.random() * 40) + 40,
      kinestheticLearner: Math.floor(Math.random() * 40) + 30,
      readingLearner: Math.floor(Math.random() * 40) + 60
    });
  };

  return (
    <div className="space-y-6">
      {/* Study Style Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Study Style Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Your Learning Profile</h4>
              <Button variant="outline" size="sm" onClick={retakeAssessment} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Retake Assessment
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Visual Learner</span>
                  <Badge variant="outline">{assessmentResults.visualLearner}%</Badge>
                </div>
                <Progress value={assessmentResults.visualLearner} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Reading/Writing Learner</span>
                  <Badge variant="outline">{assessmentResults.readingLearner}%</Badge>
                </div>
                <Progress value={assessmentResults.readingLearner} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Auditory Learner</span>
                  <Badge variant="outline">{assessmentResults.auditoryLearner}%</Badge>
                </div>
                <Progress value={assessmentResults.auditoryLearner} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Kinesthetic Learner</span>
                  <Badge variant="outline">{assessmentResults.kinestheticLearner}%</Badge>
                </div>
                <Progress value={assessmentResults.kinestheticLearner} className="h-2" />
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-4">
              <h5 className="font-medium text-sm mb-2">AI Recommendation</h5>
              <p className="text-sm text-muted-foreground">
                Based on your assessment, you learn best through visual materials and reading. 
                The AI will prioritize diagrams, charts, and text-based explanations in your study sessions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Difficulty & Adaptation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Difficulty & Adaptation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="difficultyPreference">Difficulty Management</Label>
            <Select value={aiConfig.difficultyPreference} onValueChange={(value) => setAiConfig(prev => ({ ...prev, difficultyPreference: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty style" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="adaptive">Adaptive - AI adjusts automatically</SelectItem>
                <SelectItem value="manual">Manual - You control difficulty</SelectItem>
                <SelectItem value="challenging">Always Challenging - Push my limits</SelectItem>
                <SelectItem value="comfortable">Comfortable - Steady progression</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {aiConfig.difficultyPreference === 'manual' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="difficultyLevel">Base Difficulty Level</Label>
                <Badge variant="outline">Level {aiConfig.difficultyLevel}</Badge>
              </div>
              <Slider
                id="difficultyLevel"
                min={1}
                max={5}
                step={1}
                value={[aiConfig.difficultyLevel]}
                onValueChange={([value]) => setAiConfig(prev => ({ ...prev, difficultyLevel: value }))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="adaptiveLearning">Adaptive Learning</Label>
              <p className="text-xs text-muted-foreground">AI learns from your performance and adjusts</p>
            </div>
            <Switch
              id="adaptiveLearning"
              checked={aiConfig.adaptiveLearning}
              onCheckedChange={(checked) => setAiConfig(prev => ({ ...prev, adaptiveLearning: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* AI Personality & Communication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            AI Personality & Communication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="motivationStyle">Motivation Style</Label>
            <Select value={aiConfig.motivationStyle} onValueChange={(value) => setAiConfig(prev => ({ ...prev, motivationStyle: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select motivation style" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="encouraging">Encouraging & Supportive</SelectItem>
                <SelectItem value="challenging">Direct & Challenging</SelectItem>
                <SelectItem value="casual">Casual & Friendly</SelectItem>
                <SelectItem value="professional">Professional & Focused</SelectItem>
                <SelectItem value="humorous">Light & Humorous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="feedbackType">Feedback Preference</Label>
            <Select value={aiConfig.feedbackType} onValueChange={(value) => setAiConfig(prev => ({ ...prev, feedbackType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="detailed">Detailed Explanations</SelectItem>
                <SelectItem value="concise">Quick & Concise</SelectItem>
                <SelectItem value="visual">Visual Feedback</SelectItem>
                <SelectItem value="stats">Data & Statistics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="reminderFrequency">AI Reminder Frequency</Label>
            <Select value={aiConfig.reminderFrequency} onValueChange={(value) => setAiConfig(prev => ({ ...prev, reminderFrequency: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select reminder frequency" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="minimal">Minimal - Only when needed</SelectItem>
                <SelectItem value="moderate">Moderate - Regular check-ins</SelectItem>
                <SelectItem value="frequent">Frequent - Active coaching</SelectItem>
                <SelectItem value="intensive">Intensive - Constant guidance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* AI Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="progressTracking">Enhanced Progress Tracking</Label>
              <p className="text-xs text-muted-foreground">AI analyzes patterns and provides insights</p>
            </div>
            <Switch
              id="progressTracking"
              checked={aiConfig.progressTracking}
              onCheckedChange={(checked) => setAiConfig(prev => ({ ...prev, progressTracking: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="smartSuggestions">Smart Study Suggestions</Label>
              <p className="text-xs text-muted-foreground">Get personalized study recommendations</p>
            </div>
            <Switch
              id="smartSuggestions"
              checked={aiConfig.smartSuggestions}
              onCheckedChange={(checked) => setAiConfig(prev => ({ ...prev, smartSuggestions: checked }))}
            />
          </div>

          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              AI Performance Summary
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Study Sessions Analyzed</p>
                <p className="font-semibold">147</p>
              </div>
              <div>
                <p className="text-muted-foreground">Learning Rate</p>
                <p className="font-semibold text-success">+23% this month</p>
              </div>
              <div>
                <p className="text-muted-foreground">Accuracy Prediction</p>
                <p className="font-semibold">94%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Recommendations Used</p>
                <p className="font-semibold">89%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};