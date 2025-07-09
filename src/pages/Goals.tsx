import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  Search
} from "lucide-react";
import { useState } from "react";

const Goals = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  // Demo goals data
  const goals = [
    {
      id: 1,
      title: "Complete Data Structures Course",
      description: "Master all fundamental data structures including arrays, linked lists, trees, graphs, and hash tables",
      category: "long-term",
      targetDate: "2024-03-30",
      progress: 75,
      status: "active",
      priority: "high",
      milestones: ["Arrays & Strings", "Linked Lists", "Trees", "Graphs", "Hash Tables"],
      completedMilestones: 3,
      timeInvested: 45,
      estimatedTime: 60,
      subject: "Computer Science"
    },
    {
      id: 2,
      title: "Maintain 30-Day Study Streak",
      description: "Study consistently for 30 days without missing a single day",
      category: "short-term",
      targetDate: "2024-02-15",
      progress: 23,
      status: "active",
      priority: "medium",
      milestones: ["Week 1", "Week 2", "Week 3", "Week 4"],
      completedMilestones: 1,
      timeInvested: 23,
      estimatedTime: 30,
      subject: "General"
    },
    {
      id: 3,
      title: "Achieve 95% in Calculus Exam",
      description: "Prepare thoroughly for the final calculus exam and achieve an A+ grade",
      category: "exam-prep",
      targetDate: "2024-02-28",
      progress: 100,
      status: "completed",
      priority: "high",
      milestones: ["Review Notes", "Practice Problems", "Mock Exams", "Final Review"],
      completedMilestones: 4,
      timeInvested: 40,
      estimatedTime: 40,
      subject: "Mathematics"
    },
    {
      id: 4,
      title: "Read 5 Programming Books",
      description: "Expand knowledge by reading 5 technical books on programming and software development",
      category: "skill-development",
      targetDate: "2024-06-30",
      progress: 40,
      status: "active",
      priority: "low",
      milestones: ["Book 1", "Book 2", "Book 3", "Book 4", "Book 5"],
      completedMilestones: 2,
      timeInvested: 25,
      estimatedTime: 60,
      subject: "Programming"
    }
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "short-term",
    targetDate: "",
    priority: "medium",
    subject: "",
    estimatedHours: ""
  });

  const achievements = [
    { title: "Goal Setter", description: "Created 10 goals", icon: Target, earned: true },
    { title: "Achiever", description: "Completed 5 goals", icon: Trophy, earned: true },
    { title: "Streak Master", description: "30-day goal streak", icon: Zap, earned: false },
    { title: "Subject Expert", description: "Master 3 subjects", icon: BookOpen, earned: false },
  ];

  const filteredGoals = goals.filter(goal => {
    if (activeTab === 'active') return goal.status === 'active';
    if (activeTab === 'completed') return goal.status === 'completed';
    return true;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'short-term': return 'bg-success/10 text-success border-success/20';
      case 'long-term': return 'bg-primary/10 text-primary border-primary/20';
      case 'exam-prep': return 'bg-destructive/10 text-destructive border-destructive/20';
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

  const handleCreateGoal = () => {
    // Demo goal creation
    setShowCreateForm(false);
    setFormData({
      title: "",
      description: "",
      category: "short-term",
      targetDate: "",
      priority: "medium",
      subject: "",
      estimatedHours: ""
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Goals</h1>
            <p className="text-muted-foreground">Set, track, and achieve your learning objectives</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search goals..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Create Goal
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 mb-6 bg-muted/30 rounded-lg p-1 w-fit">
          <Button 
            variant={activeTab === 'all' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('all')}
          >
            All Goals ({goals.length})
          </Button>
          <Button 
            variant={activeTab === 'active' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('active')}
          >
            Active ({goals.filter(g => g.status === 'active').length})
          </Button>
          <Button 
            variant={activeTab === 'completed' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('completed')}
          >
            Completed ({goals.filter(g => g.status === 'completed').length})
          </Button>
        </div>

        {/* Create Goal Form */}
        {showCreateForm && (
          <Card className="mb-8 border-primary/20 shadow-lg">
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
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Computer Science"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                      <SelectItem value="long-term">Long-term (1-6 months)</SelectItem>
                      <SelectItem value="exam-prep">Exam Preparation</SelectItem>
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
                <Label htmlFor="description">Description & Success Criteria *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your goal and what success looks like..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleCreateGoal} className="bg-gradient-to-r from-primary to-secondary">
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Goals List */}
          <div className="lg:col-span-2 space-y-6">
            {filteredGoals.map((goal) => (
              <Card key={goal.id} className="group hover:shadow-lg transition-all duration-200 border-border/50">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        {goal.status === 'completed' && (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                      </div>
                      <CardDescription className="text-sm">{goal.description}</CardDescription>
                    </div>
                    <div className="flex gap-1">
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
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Target:</span>
                    </div>
                    <span className="font-medium">{new Date(goal.targetDate).toLocaleDateString()}</span>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Time:</span>
                    </div>
                    <span className="font-medium">{goal.timeInvested}h / {goal.estimatedTime}h</span>
                    
                    <div className="flex items-center gap-2">
                      <Target className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Milestones:</span>
                    </div>
                    <span className="font-medium">{goal.completedMilestones}/{goal.milestones.length}</span>
                    
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Subject:</span>
                    </div>
                    <span className="font-medium">{goal.subject}</span>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Milestones</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {goal.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          {index < goal.completedMilestones ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className={index < goal.completedMilestones ? 'text-foreground' : 'text-muted-foreground'}>
                            {milestone}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-border/50">
                    <Button size="sm" className="flex-1" disabled={goal.status === 'completed'}>
                      {goal.status === 'completed' ? 'Completed' : 'Continue'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Goal Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Goal Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{goals.length}</div>
                    <p className="text-xs text-muted-foreground">Total Goals</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">{goals.filter(g => g.status === 'completed').length}</div>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">{goals.filter(g => g.status === 'active').length}</div>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">75%</div>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="h-4 w-4 mr-2 text-warning" />
                  Goal Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      achievement.earned ? 'bg-warning/10' : 'bg-muted/30'
                    }`}>
                      <achievement.icon className={`h-4 w-4 ${
                        achievement.earned ? 'text-warning' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        <Star className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Progress Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Goal Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Goal Templates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Goals;