import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Search,
  BookOpen,
  Video,
  MessageCircle,
  Star,
  Clock,
  TrendingUp,
  Play,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  Settings,
  CreditCard,
  Target,
  BarChart3,
  Users,
  Zap,
  Shield,
  Rocket,
  CheckCircle,
  ArrowRight,
  Download,
  Eye
} from "lucide-react";

const Help = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'articles' | 'tutorials' | 'popular' | 'contact'>('articles');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Demo Data
  const categories = [
    { id: "getting-started", name: "Getting Started", icon: Rocket, count: 12, color: "bg-success/10 text-success border-success/20" },
    { id: "study-plans", name: "Study Plan Creation", icon: Target, count: 8, color: "bg-primary/10 text-primary border-primary/20" },
    { id: "progress", name: "Progress Tracking", icon: BarChart3, count: 6, color: "bg-warning/10 text-warning border-warning/20" },
    { id: "troubleshooting", name: "Troubleshooting", icon: Settings, count: 15, color: "bg-destructive/10 text-destructive border-destructive/20" },
    { id: "account", name: "Account Management", icon: Users, count: 7, color: "bg-secondary/10 text-secondary border-secondary/20" },
    { id: "billing", name: "Billing Questions", icon: CreditCard, count: 9, color: "bg-accent/10 text-accent border-accent/20" }
  ];

  const articles = [
    {
      id: 1,
      title: "Getting Started with StudyPal",
      description: "A comprehensive guide to setting up your account and creating your first study plan",
      category: "getting-started",
      readTime: 5,
      views: 1234,
      rating: 4.8,
      lastUpdated: "2024-04-10",
      featured: true
    },
    {
      id: 2,
      title: "How to Create Effective Study Plans",
      description: "Best practices for organizing your learning materials and setting realistic goals",
      category: "study-plans",
      readTime: 8,
      views: 987,
      rating: 4.9,
      lastUpdated: "2024-04-08",
      featured: true
    },
    {
      id: 3,
      title: "Understanding Progress Analytics",
      description: "Learn how to interpret your study statistics and optimize your learning",
      category: "progress",
      readTime: 6,
      views: 756,
      rating: 4.7,
      lastUpdated: "2024-04-05",
      featured: false
    },
    {
      id: 4,
      title: "Troubleshooting Login Issues",
      description: "Common solutions for authentication and access problems",
      category: "troubleshooting",
      readTime: 3,
      views: 543,
      rating: 4.5,
      lastUpdated: "2024-04-12",
      featured: false
    },
    {
      id: 5,
      title: "Managing Your Subscription",
      description: "How to upgrade, downgrade, or cancel your subscription plan",
      category: "billing",
      readTime: 4,
      views: 432,
      rating: 4.6,
      lastUpdated: "2024-04-07",
      featured: false
    },
    {
      id: 6,
      title: "Customizing AI Study Coaching",
      description: "Personalizing your AI assistant for optimal learning support",
      category: "getting-started",
      readTime: 7,
      views: 889,
      rating: 4.8,
      lastUpdated: "2024-04-09",
      featured: true
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: "Product Tour: Complete Walkthrough",
      description: "15-minute guided tour of all StudyPal features",
      duration: "15 min",
      views: 2341,
      type: "video",
      difficulty: "Beginner",
      featured: true
    },
    {
      id: 2,
      title: "Creating Your First Study Plan",
      description: "Step-by-step tutorial for setting up effective study schedules",
      duration: "8 min",
      views: 1876,
      type: "interactive",
      difficulty: "Beginner",
      featured: true
    },
    {
      id: 3,
      title: "Advanced Goal Setting Techniques",
      description: "Master complex goal structures and tracking methods",
      duration: "12 min",
      views: 1234,
      type: "video",
      difficulty: "Advanced",
      featured: false
    },
    {
      id: 4,
      title: "AI Coaching Best Practices",
      description: "Learn how to get the most from your AI study assistant",
      duration: "10 min",
      views: 1567,
      type: "interactive",
      difficulty: "Intermediate",
      featured: true
    }
  ];

  const popularSearches = [
    "How to reset password",
    "Change study plan",
    "Cancel subscription",
    "Export study data",
    "AI not responding",
    "Progress not saving",
    "Payment failed",
    "Delete account"
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      case 'Intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const handleArticleClick = (articleId: number) => {
    toast({
      title: "Opening Article",
      description: "Loading article content..."
    });
  };

  const handleTutorialPlay = (tutorialId: number) => {
    toast({
      title: "Starting Tutorial",
      description: "Launching interactive tutorial..."
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
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Help Center
              </h1>
              <p className="text-muted-foreground">Find answers, tutorials, and get support when you need it</p>
            </div>
            <Button onClick={() => navigate('/support')} className="bg-gradient-to-r from-primary to-secondary">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>

          {/* Search Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for help articles, tutorials, or common questions..." 
                  className="pl-12 text-lg py-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {searchTerm === "" && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchTerm(search)}
                        className="text-xs"
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Help Articles
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Tutorials
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Popular
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Get Help
              </TabsTrigger>
            </TabsList>

            {/* Help Articles Tab */}
            <TabsContent value="articles" className="space-y-6">
              {/* Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.id}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? "all" : category.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <IconComponent className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">{category.name}</p>
                        <Badge variant="outline" className={category.color}>
                          {category.count} articles
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Featured Articles */}
              {selectedCategory === "all" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Featured Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.filter(article => article.featured).map((article) => (
                      <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <Badge variant="outline" className={getCategoryInfo(article.category).color}>
                              {getCategoryInfo(article.category).name}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {article.rating}
                            </div>
                          </div>
                          <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                          <CardDescription>{article.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {article.readTime} min
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {article.views}
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleArticleClick(article.id)}
                            >
                              Read
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All Articles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {selectedCategory === "all" ? "All Articles" : `${getCategoryInfo(selectedCategory).name} Articles`}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {filteredArticles.length} articles found
                  </span>
                </div>
                
                <div className="space-y-3">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className={getCategoryInfo(article.category).color}>
                                {getCategoryInfo(article.category).name}
                              </Badge>
                              {article.featured && (
                                <Badge variant="secondary">Featured</Badge>
                              )}
                            </div>
                            <h4 className="font-semibold mb-1">{article.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {article.readTime} min read
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {article.views} views
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {article.rating}
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleArticleClick(article.id)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tutorials Tab */}
            <TabsContent value="tutorials" className="space-y-6">
              {/* Featured Tutorials */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Featured Tutorials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tutorials.filter(tutorial => tutorial.featured).map((tutorial) => (
                    <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className={getDifficultyColor(tutorial.difficulty)}>
                            {tutorial.difficulty}
                          </Badge>
                          <Badge variant="secondary">
                            {tutorial.type === 'video' ? <Video className="h-3 w-3 mr-1" /> : <Zap className="h-3 w-3 mr-1" />}
                            {tutorial.type}
                          </Badge>
                        </div>
                        
                        <h4 className="font-semibold text-lg mb-2">{tutorial.title}</h4>
                        <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {tutorial.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {tutorial.views}
                            </div>
                          </div>
                          <Button onClick={() => handleTutorialPlay(tutorial.id)}>
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* All Tutorials */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">All Tutorials</h3>
                <div className="space-y-3">
                  {tutorials.map((tutorial) => (
                    <Card key={tutorial.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              {tutorial.type === 'video' ? (
                                <Video className="h-5 w-5 text-primary" />
                              ) : (
                                <Zap className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold">{tutorial.title}</h4>
                              <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <Badge variant="outline" className={getDifficultyColor(tutorial.difficulty)}>
                                  {tutorial.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{tutorial.duration}</span>
                                <span className="text-xs text-muted-foreground">{tutorial.views} views</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => handleTutorialPlay(tutorial.id)}>
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Popular Tab */}
            <TabsContent value="popular" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Most Viewed Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Most Viewed Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {articles.sort((a, b) => b.views - a.views).slice(0, 5).map((article, index) => (
                      <div key={article.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{article.title}</p>
                          <p className="text-xs text-muted-foreground">{article.views} views</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Highest Rated */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Highest Rated
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {articles.sort((a, b) => b.rating - a.rating).slice(0, 5).map((article, index) => (
                      <div key={article.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-sm font-semibold text-yellow-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{article.title}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{article.rating}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks our users perform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                      <Download className="h-5 w-5" />
                      <span>Export Data</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                      <Settings className="h-5 w-5" />
                      <span>Account Settings</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Billing Help</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                      <Shield className="h-5 w-5" />
                      <span>Privacy Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/support')}>
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mb-4">Get instant help from our support team</p>
                    <Button className="w-full">
                      Start Chat
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/support')}>
                  <CardContent className="p-6 text-center">
                    <HelpCircle className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Support Ticket</h3>
                    <p className="text-sm text-muted-foreground mb-4">Submit a detailed support request</p>
                    <Button variant="outline" className="w-full">
                      Create Ticket
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Community Forum</h3>
                    <p className="text-sm text-muted-foreground mb-4">Connect with other StudyPal users</p>
                    <Button variant="outline" className="w-full">
                      Visit Forum
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* AI Assistant */}
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    AI Help Assistant
                  </CardTitle>
                  <CardDescription>
                    Get instant answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Input 
                      placeholder="Ask me anything about StudyPal..." 
                      className="flex-1"
                    />
                    <Button>
                      <Zap className="h-4 w-4 mr-2" />
                      Ask AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Help;