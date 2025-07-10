import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Target,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Award,
  BarChart3,
  Save
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  target_date: string;
  progress: number;
  status: string;
  estimated_time_hours: number;
  time_invested_hours: number;
  success_metrics: string;
  created_at: string;
  updated_at: string;
}

interface ActionItem {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  due_date?: string;
  order_index: number;
}

interface Note {
  id: string;
  content: string;
  note_type: string;
  created_at: string;
}

export const GoalDetailView = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [goal, setGoal] = useState<Goal | null>(null);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  
  // Form states
  const [newActionItem, setNewActionItem] = useState({ title: "", description: "", due_date: "" });
  const [newNote, setNewNote] = useState({ content: "", note_type: "reflection" });
  const [editedGoal, setEditedGoal] = useState<Partial<Goal>>({});

  useEffect(() => {
    if (goalId) {
      fetchGoalData();
    }
  }, [goalId]);

  const fetchGoalData = async () => {
    try {
      // Fetch goal
      const { data: goalData, error: goalError } = await supabase
        .from('goals')
        .select('*')
        .eq('id', goalId)
        .single();

      if (goalError) throw goalError;
      setGoal(goalData);
      setEditedGoal(goalData);

      // Fetch action items
      const { data: actionItemsData, error: actionItemsError } = await supabase
        .from('goal_action_items')
        .select('*')
        .eq('goal_id', goalId)
        .order('order_index');

      if (actionItemsError) throw actionItemsError;
      setActionItems(actionItemsData || []);

      // Fetch notes
      const { data: notesData, error: notesError } = await supabase
        .from('goal_notes')
        .select('*')
        .eq('goal_id', goalId)
        .order('created_at', { ascending: false });

      if (notesError) throw notesError;
      setNotes(notesData || []);
      
    } catch (error) {
      console.error('Error fetching goal data:', error);
      toast({
        title: "Error",
        description: "Failed to load goal data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateGoal = async () => {
    try {
      const { error } = await supabase
        .from('goals')
        .update(editedGoal)
        .eq('id', goalId);

      if (error) throw error;

      setGoal({ ...goal!, ...editedGoal });
      setEditMode(false);
      toast({
        title: "Success",
        description: "Goal updated successfully"
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

  const addActionItem = async () => {
    if (!newActionItem.title.trim()) return;

    try {
      const { error } = await supabase
        .from('goal_action_items')
        .insert({
          goal_id: goalId,
          title: newActionItem.title,
          description: newActionItem.description,
          due_date: newActionItem.due_date || null,
          order_index: actionItems.length
        });

      if (error) throw error;

      setNewActionItem({ title: "", description: "", due_date: "" });
      fetchGoalData();
      toast({
        title: "Success",
        description: "Action item added"
      });
    } catch (error) {
      console.error('Error adding action item:', error);
      toast({
        title: "Error",
        description: "Failed to add action item",
        variant: "destructive"
      });
    }
  };

  const toggleActionItem = async (itemId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('goal_action_items')
        .update({ 
          is_completed: completed,
          completed_at: completed ? new Date().toISOString() : null
        })
        .eq('id', itemId);

      if (error) throw error;

      // Update progress
      const completedCount = actionItems.filter(item => 
        item.id === itemId ? completed : item.is_completed
      ).length;
      const newProgress = Math.round((completedCount / actionItems.length) * 100);
      
      await supabase
        .from('goals')
        .update({ progress: newProgress })
        .eq('id', goalId);

      fetchGoalData();
    } catch (error) {
      console.error('Error updating action item:', error);
      toast({
        title: "Error",
        description: "Failed to update action item",
        variant: "destructive"
      });
    }
  };

  const addNote = async () => {
    if (!newNote.content.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('goal_notes')
        .insert({
          goal_id: goalId,
          user_id: user.id,
          content: newNote.content,
          note_type: newNote.note_type
        });

      if (error) throw error;

      setNewNote({ content: "", note_type: "reflection" });
      fetchGoalData();
      toast({
        title: "Success",
        description: "Note added"
      });
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: "Failed to add note",
        variant: "destructive"
      });
    }
  };

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
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Goal not found</h2>
            <Button onClick={() => navigate('/goals')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Goals
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/goals')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Goals
          </Button>
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button onClick={updateGoal}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Goal
              </Button>
            )}
          </div>
        </div>

        {/* Goal Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {editMode ? (
                  <Input
                    value={editedGoal.title || ''}
                    onChange={(e) => setEditedGoal({ ...editedGoal, title: e.target.value })}
                    className="text-2xl font-bold mb-2"
                  />
                ) : (
                  <CardTitle className="text-2xl mb-2">{goal.title}</CardTitle>
                )}
                {editMode ? (
                  <Textarea
                    value={editedGoal.description || ''}
                    onChange={(e) => setEditedGoal({ ...editedGoal, description: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <CardDescription>{goal.description}</CardDescription>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <Badge className={getCategoryColor(goal.category)}>
                  {goal.category.replace('-', ' ')}
                </Badge>
                <Badge className={getPriorityColor(goal.priority)}>
                  {goal.priority}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Target Date</p>
                  <p className="font-medium">{goal.target_date ? new Date(goal.target_date).toLocaleDateString() : 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Time Invested</p>
                  <p className="font-medium">{goal.time_invested_hours}h / {goal.estimated_time_hours}h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Action Items</p>
                  <p className="font-medium">{actionItems.filter(item => item.is_completed).length}/{actionItems.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{goal.status}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="actions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="actions">Action Items</TabsTrigger>
            <TabsTrigger value="notes">Notes & Reflections</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Action Items Tab */}
          <TabsContent value="actions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Action Items</CardTitle>
                <CardDescription>Break down your goal into actionable steps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add new action item */}
                <div className="border border-dashed border-border rounded-lg p-4 space-y-3">
                  <Input
                    placeholder="Action item title..."
                    value={newActionItem.title}
                    onChange={(e) => setNewActionItem({ ...newActionItem, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Description (optional)..."
                    value={newActionItem.description}
                    onChange={(e) => setNewActionItem({ ...newActionItem, description: e.target.value })}
                    rows={2}
                  />
                  <div className="flex gap-3">
                    <Input
                      type="date"
                      value={newActionItem.due_date}
                      onChange={(e) => setNewActionItem({ ...newActionItem, due_date: e.target.value })}
                    />
                    <Button onClick={addActionItem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* Action items list */}
                <div className="space-y-3">
                  {actionItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                      <Checkbox
                        checked={item.is_completed}
                        onCheckedChange={(checked) => toggleActionItem(item.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${item.is_completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        )}
                        {item.due_date && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Due: {new Date(item.due_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {item.is_completed && (
                        <CheckCircle className="h-5 w-5 text-success mt-1" />
                      )}
                    </div>
                  ))}
                  {actionItems.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No action items yet. Add one above to get started!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notes & Reflections</CardTitle>
                <CardDescription>Track your thoughts, progress, and insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add new note */}
                <div className="border border-dashed border-border rounded-lg p-4 space-y-3">
                  <Select
                    value={newNote.note_type}
                    onValueChange={(value) => setNewNote({ ...newNote, note_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reflection">Reflection</SelectItem>
                      <SelectItem value="progress">Progress Update</SelectItem>
                      <SelectItem value="obstacle">Obstacle</SelectItem>
                      <SelectItem value="insight">Insight</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Write your note..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows={3}
                  />
                  <Button onClick={addNote}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>

                {/* Notes list */}
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div key={note.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="capitalize">
                          {note.note_type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{note.content}</p>
                    </div>
                  ))}
                  {notes.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No notes yet. Add a reflection above!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Goal Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{goal.progress}%</div>
                      <p className="text-xs text-muted-foreground">Completion</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{actionItems.filter(item => item.is_completed).length}</div>
                      <p className="text-xs text-muted-foreground">Completed Tasks</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">{goal.time_invested_hours}h</div>
                      <p className="text-xs text-muted-foreground">Time Invested</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">{notes.length}</div>
                      <p className="text-xs text-muted-foreground">Notes Created</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Success Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {goal.success_metrics || "No success metrics defined yet."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};