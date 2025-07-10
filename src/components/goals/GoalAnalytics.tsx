import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  Activity,
  Brain,
  Lightbulb
} from "lucide-react";

interface AnalyticsData {
  totalGoals: number;
  completedGoals: number;
  activeGoals: number;
  totalTimeInvested: number;
  averageProgress: number;
  completionRate: number;
  categoryBreakdown: Record<string, number>;
  priorityBreakdown: Record<string, number>;
  monthlyProgress: Array<{ month: string; completed: number; created: number }>;
  successPatterns: string[];
  failurePatterns: string[];
  recommendations: string[];
}

export const GoalAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch all goals
      const { data: goals } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id);

      if (!goals) return;

      // Calculate analytics
      const totalGoals = goals.length;
      const completedGoals = goals.filter(g => g.status === 'completed').length;
      const activeGoals = goals.filter(g => g.status === 'active').length;
      const totalTimeInvested = goals.reduce((sum, g) => sum + (g.time_invested_hours || 0), 0);
      const averageProgress = totalGoals > 0 ? goals.reduce((sum, g) => sum + g.progress, 0) / totalGoals : 0;
      const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

      // Category breakdown
      const categoryBreakdown: Record<string, number> = {};
      goals.forEach(goal => {
        categoryBreakdown[goal.category] = (categoryBreakdown[goal.category] || 0) + 1;
      });

      // Priority breakdown
      const priorityBreakdown: Record<string, number> = {};
      goals.forEach(goal => {
        priorityBreakdown[goal.priority] = (priorityBreakdown[goal.priority] || 0) + 1;
      });

      // Monthly progress (last 6 months)
      const monthlyProgress = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const created = goals.filter(g => {
          const createdDate = new Date(g.created_at);
          return createdDate >= monthStart && createdDate <= monthEnd;
        }).length;
        
        const completed = goals.filter(g => {
          const completedDate = g.completed_at ? new Date(g.completed_at) : null;
          return completedDate && completedDate >= monthStart && completedDate <= monthEnd;
        }).length;

        monthlyProgress.push({
          month: date.toLocaleDateString('en', { month: 'short' }),
          created,
          completed
        });
      }

      // Generate insights
      const successPatterns = generateSuccessPatterns(goals);
      const failurePatterns = generateFailurePatterns(goals);
      const recommendations = generateRecommendations(goals);

      setAnalytics({
        totalGoals,
        completedGoals,
        activeGoals,
        totalTimeInvested,
        averageProgress,
        completionRate,
        categoryBreakdown,
        priorityBreakdown,
        monthlyProgress,
        successPatterns,
        failurePatterns,
        recommendations
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSuccessPatterns = (goals: any[]): string[] => {
    const patterns = [];
    const completed = goals.filter(g => g.status === 'completed');
    
    if (completed.length === 0) return ['No completed goals yet to analyze patterns.'];

    // Analyze by category
    const categorySuccess: Record<string, number> = {};
    completed.forEach(goal => {
      categorySuccess[goal.category] = (categorySuccess[goal.category] || 0) + 1;
    });
    
    const bestCategory = Object.keys(categorySuccess).reduce((a, b) => 
      categorySuccess[a] > categorySuccess[b] ? a : b
    );
    patterns.push(`Most successful with ${bestCategory.replace('-', ' ')} goals`);

    // Analyze by priority
    const prioritySuccess: Record<string, number> = {};
    completed.forEach(goal => {
      prioritySuccess[goal.priority] = (prioritySuccess[goal.priority] || 0) + 1;
    });
    
    const bestPriority = Object.keys(prioritySuccess).reduce((a, b) => 
      prioritySuccess[a] > prioritySuccess[b] ? a : b
    );
    patterns.push(`Higher completion rate with ${bestPriority} priority goals`);

    // Analyze completion time
    const avgTimeToComplete = completed
      .filter(g => g.completed_at && g.created_at)
      .map(g => {
        const created = new Date(g.created_at);
        const completed = new Date(g.completed_at);
        return (completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      })
      .reduce((sum, days, _, arr) => sum + days / arr.length, 0);

    if (avgTimeToComplete > 0) {
      patterns.push(`Average ${Math.round(avgTimeToComplete)} days to complete goals`);
    }

    return patterns;
  };

  const generateFailurePatterns = (goals: any[]): string[] => {
    const patterns = [];
    const incomplete = goals.filter(g => g.status === 'active' && g.progress < 50);
    
    if (incomplete.length === 0) return ['No concerning patterns detected!'];

    // Analyze stalled goals
    const stalledGoals = incomplete.filter(goal => {
      const daysSinceUpdate = (Date.now() - new Date(goal.updated_at).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceUpdate > 7;
    });

    if (stalledGoals.length > 0) {
      patterns.push(`${stalledGoals.length} goals haven't been updated in over a week`);
    }

    // Analyze overdue goals
    const overdueGoals = incomplete.filter(goal => {
      if (!goal.target_date) return false;
      return new Date(goal.target_date) < new Date();
    });

    if (overdueGoals.length > 0) {
      patterns.push(`${overdueGoals.length} goals are past their target date`);
    }

    // Analyze ambitious goals
    const ambitiousGoals = incomplete.filter(goal => {
      return goal.estimated_time_hours > 100 && goal.progress < 25;
    });

    if (ambitiousGoals.length > 0) {
      patterns.push('Large goals with low progress may need breaking down');
    }

    return patterns;
  };

  const generateRecommendations = (goals: any[]): string[] => {
    const recommendations = [];
    const active = goals.filter(g => g.status === 'active');
    
    if (active.length === 0) {
      recommendations.push('Consider creating some new goals to maintain momentum');
      return recommendations;
    }

    // Too many active goals
    if (active.length > 5) {
      recommendations.push('Focus on fewer goals (3-5) for better success rate');
    }

    // Goals without target dates
    const undatedGoals = active.filter(g => !g.target_date);
    if (undatedGoals.length > 0) {
      recommendations.push(`Add target dates to ${undatedGoals.length} goals for better accountability`);
    }

    // Goals without time estimates
    const unestimatedGoals = active.filter(g => !g.estimated_time_hours);
    if (unestimatedGoals.length > 0) {
      recommendations.push('Estimate time investment for better planning');
    }

    // Low progress goals
    const lowProgressGoals = active.filter(g => g.progress < 25);
    if (lowProgressGoals.length > 2) {
      recommendations.push('Break down large goals into smaller, actionable steps');
    }

    // Success-based recommendations
    const completed = goals.filter(g => g.status === 'completed');
    if (completed.length > 0) {
      const categorySuccess: Record<string, number> = {};
      completed.forEach(goal => {
        categorySuccess[goal.category] = (categorySuccess[goal.category] || 0) + 1;
      });
      
      const bestCategory = Object.keys(categorySuccess).reduce((a, b) => 
        categorySuccess[a] > categorySuccess[b] ? a : b
      );
      recommendations.push(`Consider more ${bestCategory.replace('-', ' ')} goals - you excel at these!`);
    }

    return recommendations;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No analytics data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <p className="text-2xl font-bold">{analytics.totalGoals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{analytics.completedGoals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-warning">{analytics.activeGoals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Hours Invested</p>
                <p className="text-2xl font-bold text-accent">{analytics.totalTimeInvested}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Goal Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Success Rate</span>
                    <span className="font-medium">{analytics.completionRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={analytics.completionRate} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Goals Progress</span>
                    <span className="font-medium">{analytics.averageProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={analytics.averageProgress} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Activity</CardTitle>
              <CardDescription>Goals created vs completed over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.monthlyProgress.map((month, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center">
                    <span className="font-medium">{month.month}</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      <span className="text-sm">{month.created} created</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success" />
                      <span className="text-sm">{month.completed} completed</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(month.created)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-primary rounded-full"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="h-4 w-4 mr-2 text-success" />
                  Success Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.successPatterns.map((pattern, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">{pattern}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingDown className="h-4 w-4 mr-2 text-warning" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.failurePatterns.map((pattern, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                      <span className="text-sm">{pattern}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Goals by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics.categoryBreakdown).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{category.replace('-', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{count}</Badge>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(count / analytics.totalGoals) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goals by Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics.priorityBreakdown).map(([priority, count]) => (
                    <div key={priority} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{priority}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{count}</Badge>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(count / analytics.totalGoals) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Personalized suggestions to improve your goal achievement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Lightbulb className="h-4 w-4 text-warning mt-0.5" />
                    <span className="text-sm">{recommendation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};