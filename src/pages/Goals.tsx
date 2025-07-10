import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AIGoalSuggestions } from "@/components/goals/AIGoalSuggestions";
import { GoalAnalytics } from "@/components/goals/GoalAnalytics";
import { 
  Target, 
  Plus, 
  Calendar, 
  Clock, 
  TrendingUp,
  CheckCircle,
  Circle,
  Edit,
  Trash2,
  Star,
  Trophy,
  Zap,
  BookOpen,
  Award,
  Filter,
  Search,
  Eye,
  Play,
  Pause,
  BarChart3,
  Sparkles,
  Share
} from "lucide-react";

const Goals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [userAchievements, setUserAchievements] = useState<any[]>([]);
  const [streaks, setStreaks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'ai-suggestions' | 'analytics'>('overview');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "short-term",
    targetDate: "",
    priority: "medium",
    successMetrics: "",
    estimatedHours: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch goals
      const { data: goalsData } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setGoals(goalsData || []);

      // Fetch achievements
      const { data: achievementsData } = await supabase
        .from('achievements')
        .select('*');

      setAchievements(achievementsData || []);

      // Fetch user achievements
      const { data: userAchievementsData } = await supabase
        .from('user_achievements')
        .select('*, achievements(*)')
        .eq('user_id', user.id);

      setUserAchievements(userAchievementsData || []);

      // Fetch streaks
      const { data: streaksData } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id);

      setStreaks(streaksData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
          target_date: formData.targetDate || null,
          success_metrics: formData.successMetrics,
          estimated_time_hours: formData.estimatedHours ? parseInt(formData.estimatedHours) : null
        });

      if (error) throw error;

      // Track analytics
      await supabase.rpc('track_goal_event', {
        p_goal_id: null,
        p_event_type: 'created'
      });

      setFormData({
        title: "",
        description: "",
        category: "short-term",
        targetDate: "",
        priority: "medium",
        successMetrics: "",
        estimatedHours: ""
      });
      setShowCreateForm(false);
      fetchData();
      
      toast({
        title: "Success",
        description: "Goal created successfully!"
      });
    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: "Error",
        description: "Failed to create goal",
        variant: "destructive"
      });
    }
  };

  const updateGoalStatus = async (goalId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({ 
          status,
          completed_at: status === 'completed' ? new Date().toISOString() : null
        })
        .eq('id', goalId);

      if (error) throw error;

      // Track analytics
      await supabase.rpc('track_goal_event', {
        p_goal_id: goalId,
        p_event_type: status
      });

      fetchData();
      toast({
        title: "Success",
        description: `Goal ${status} successfully!`
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Error",
        description: "Failed to update goal",
        variant: "destructive"
      });
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Goal deleted successfully!"
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast({
        title: "Error",
        description: "Failed to delete goal",
        variant: "destructive"
      });
    }
  };

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || goal.category === filterCategory;
    const matchesStatus = filterStatus === "all" || goal.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'short-term': return 'bg-success/10 text-success border-success/20';
      case 'medium-term': return 'bg-warning/10 text-warning border-warning/20';
      case 'long-term': return 'bg-primary/10 text-primary border-primary/20';
      case 'exam-preparation': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'skill-development': return 'bg-secondary/10 text-secondary border-secondary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-muted/10 text-muted-foreground border-muted/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background p-6">
          <div className="container mx-auto max-w-7xl">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Goals Management</h1>
              <p className="text-muted-foreground">Set, track, and achieve your learning objectives with AI assistance</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search goals..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="short-term">Short-term</SelectItem>
                  <SelectItem value="medium-term">Medium-term</SelectItem>
                  <SelectItem value="long-term">Long-term</SelectItem>
                  <SelectItem value="exam-preparation">Exam Prep</SelectItem>
                  <SelectItem value="skill-development">Skill Dev</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-primary to-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Create Goal
              </Button>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Goals Overview
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create & Manage
              </TabsTrigger>
              <TabsTrigger value="ai-suggestions" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Suggestions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Goals Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Goals</p>
                        <p className="text-2xl font-bold">{goals.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-bold text-success">{goals.filter(g => g.status === 'completed').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Play className="h-5 w-5 text-warning" />
                      <div>
                        <p className="text-sm text-muted-foreground">Active</p>
                        <p className="text-2xl font-bold text-warning">{goals.filter(g => g.status === 'active').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Achievements</p>
                        <p className="text-2xl font-bold text-accent">{userAchievements.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Goals List */}
              <div className="grid gap-6">
                {filteredGoals.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No goals found</h3>
                      <p className="text-muted-foreground mb-6">Start your learning journey by creating your first goal</p>
                      <Button onClick={() => setActiveTab('create')} className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Goal
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  filteredGoals.map((goal) => (
                    <Card key={goal.id} className="group hover:shadow-lg transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <CardTitle className="text-lg">{goal.title}</CardTitle>
                              {goal.status === 'completed' && (
                                <CheckCircle className="h-5 w-5 text-success" />
                              )}
                            </div>
                            <CardDescription>{goal.description}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getCategoryColor(goal.category)}>
                              {goal.category.replace('-', ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(goal.priority)}>
                              {goal.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{goal.progress || 0}%</span>
                          </div>
                          <Progress value={goal.progress || 0} className="h-2" />
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Target:</span>
                            <span className="font-medium">
                              {goal.target_date ? new Date(goal.target_date).toLocaleDateString() : 'Not set'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Time:</span>
                            <span className="font-medium">
                              {goal.time_invested_hours || 0}h / {goal.estimated_time_hours || 0}h
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-border/50">
                          <Button 
                            size="sm" 
                            onClick={() => navigate(`/goals/${goal.id}`)}
                            className="flex-1"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          {goal.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateGoalStatus(goal.id, 'completed')}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateGoalStatus(goal.id, goal.status === 'paused' ? 'active' : 'paused')}
                          >
                            {goal.status === 'paused' ? (
                              <Play className="h-3 w-3" />
                            ) : (
                              <Pause className="h-3 w-3" />
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteGoal(goal.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Create & Manage Tab */}
            <TabsContent value="create" className="space-y-6">
              {showCreateForm && (
                <Card className="border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-primary" />
                      Create New Goal
                    </CardTitle>
                    <CardDescription>
                      Set a SMART goal to guide your learning journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Goal Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Master React Hooks"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short-term">Short-term (1-4 weeks)</SelectItem>
                            <SelectItem value="medium-term">Medium-term (1-3 months)</SelectItem>
                            <SelectItem value="long-term">Long-term (3+ months)</SelectItem>
                            <SelectItem value="exam-preparation">Exam Preparation</SelectItem>
                            <SelectItem value="skill-development">Skill Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="targetDate">Target Date</Label>
                        <Input
                          id="targetDate"
                          type="date"
                          value={formData.targetDate}
                          onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="estimatedHours">Estimated Hours</Label>
                        <Input
                          id="estimatedHours"
                          type="number"
                          placeholder="e.g., 40"
                          value={formData.estimatedHours}
                          onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your goal in detail..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="successMetrics">Success Criteria</Label>
                      <Textarea
                        id="successMetrics"
                        placeholder="How will you measure success? What are the specific outcomes?"
                        value={formData.successMetrics}
                        onChange={(e) => setFormData({ ...formData, successMetrics: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={createGoal} className="bg-gradient-to-r from-primary to-secondary">
                        <Target className="h-4 w-4 mr-2" />
                        Create Goal
                      </Button>
                      <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!showCreateForm && (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to create a new goal?</h3>
                  <p className="text-muted-foreground mb-6">
                    Set clear, measurable objectives to guide your learning journey
                  </p>
                  <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-primary to-secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Goal
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* AI Suggestions Tab */}
            <TabsContent value="ai-suggestions" className="space-y-6">
              <AIGoalSuggestions onGoalCreated={fetchData} />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <GoalAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Goals;