import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Sparkles,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Calendar,
  Plus,
  Loader2,
  Lightbulb,
  CheckCircle
} from "lucide-react";

interface GoalSuggestion {
  title: string;
  description: string;
  category: string;
  priority: string;
  estimatedTimeHours: number;
  successMetrics: string;
  milestones: string[];
  timeline: string;
  difficulty: string;
}

interface AIGoalSuggestionsProps {
  onGoalCreated?: () => void;
}

export const AIGoalSuggestions = ({ onGoalCreated }: AIGoalSuggestionsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GoalSuggestion[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    goalType: "",
    subject: "",
    timeframe: "",
    userContext: ""
  });

  const generateSuggestions = async () => {
    if (!formData.goalType) {
      toast({
        title: "Missing Information",
        description: "Please select a goal type",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await supabase.functions.invoke('ai-goal-suggestions', {
        body: formData
      });

      if (response.error) throw response.error;

      setSuggestions(response.data.goals || []);
      setShowForm(false);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to generate goal suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createGoalFromSuggestion = async (suggestion: GoalSuggestion) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Calculate target date based on timeline
      const targetDate = new Date();
      const timeframe = suggestion.timeline.toLowerCase();
      if (timeframe.includes('week')) {
        const weeks = parseInt(timeframe) || 4;
        targetDate.setDate(targetDate.getDate() + (weeks * 7));
      } else if (timeframe.includes('month')) {
        const months = parseInt(timeframe) || 3;
        targetDate.setMonth(targetDate.getMonth() + months);
      } else {
        targetDate.setMonth(targetDate.getMonth() + 3); // Default 3 months
      }

      // Create goal
      const { data: goalData, error: goalError } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          title: suggestion.title,
          description: suggestion.description,
          category: suggestion.category,
          priority: suggestion.priority,
          target_date: targetDate.toISOString().split('T')[0],
          success_metrics: suggestion.successMetrics,
          estimated_time_hours: suggestion.estimatedTimeHours
        })
        .select()
        .single();

      if (goalError) throw goalError;

      // Create milestones as action items
      const actionItems = suggestion.milestones.map((milestone, index) => ({
        goal_id: goalData.id,
        title: milestone,
        order_index: index
      }));

      const { error: actionItemsError } = await supabase
        .from('goal_action_items')
        .insert(actionItems);

      if (actionItemsError) throw actionItemsError;

      // Track analytics
      await supabase.rpc('track_goal_event', {
        p_goal_id: goalData.id,
        p_event_type: 'created',
        p_event_data: { source: 'ai_suggestion', difficulty: suggestion.difficulty }
      });

      toast({
        title: "Success",
        description: `Goal "${suggestion.title}" created successfully!`
      });

      if (onGoalCreated) onGoalCreated();
      setSuggestions([]);
    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: "Error",
        description: "Failed to create goal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success/10 text-success border-success/20';
      case 'intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  if (suggestions.length > 0) {
    return (
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            AI Goal Suggestions
          </CardTitle>
          <CardDescription>
            Here are personalized goal suggestions based on your preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {suggestions.map((suggestion, index) => (
            <Card key={index} className="border border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                    <CardDescription className="mt-2">{suggestion.description}</CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(suggestion.difficulty)}>
                    {suggestion.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Timeline:</span>
                    <span className="font-medium">{suggestion.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Est. Time:</span>
                    <span className="font-medium">{suggestion.estimatedTimeHours}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium capitalize">{suggestion.category.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Priority:</span>
                    <span className="font-medium capitalize">{suggestion.priority}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    Milestones
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestion.milestones.map((milestone, mIndex) => (
                      <div key={mIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-muted-foreground" />
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Success Metrics</h4>
                  <p className="text-sm text-muted-foreground">{suggestion.successMetrics}</p>
                </div>

                <Button 
                  onClick={() => createGoalFromSuggestion(suggestion)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create This Goal
                </Button>
              </CardContent>
            </Card>
          ))}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setSuggestions([])}>
              Try Different Suggestions
            </Button>
            <Button variant="ghost" onClick={() => setShowForm(true)}>
              Modify Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          AI Goal Suggestions
        </CardTitle>
        <CardDescription>
          Get personalized, SMART goal recommendations based on your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showForm ? (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">Get AI-Powered Goal Suggestions</h3>
            <p className="text-muted-foreground mb-6">
              Let AI help you create SMART goals tailored to your learning objectives
            </p>
            <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-primary to-secondary">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Suggestions
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goalType">Goal Type *</Label>
                <Select value={formData.goalType} onValueChange={(value) => setFormData({ ...formData, goalType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skill-development">Skill Development</SelectItem>
                    <SelectItem value="exam-preparation">Exam Preparation</SelectItem>
                    <SelectItem value="project-completion">Project Completion</SelectItem>
                    <SelectItem value="habit-building">Habit Building</SelectItem>
                    <SelectItem value="career-advancement">Career Advancement</SelectItem>
                    <SelectItem value="academic-improvement">Academic Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject/Area</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics, Programming"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">Preferred Timeframe</Label>
                <Select value={formData.timeframe} onValueChange={(value) => setFormData({ ...formData, timeframe: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="1 year">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userContext">Current Level/Context</Label>
                <Select value={formData.userContext} onValueChange={(value) => setFormData({ ...formData, userContext: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Complete beginner">Complete beginner</SelectItem>
                    <SelectItem value="Some experience">Some experience</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert looking to specialize">Expert looking to specialize</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
              <Textarea
                id="additionalContext"
                placeholder="Tell us more about your specific goals, constraints, or preferences..."
                value={formData.userContext}
                onChange={(e) => setFormData({ ...formData, userContext: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={generateSuggestions} 
                disabled={loading}
                className="bg-gradient-to-r from-primary to-secondary flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Suggestions
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};