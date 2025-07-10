import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle,
  Mail,
  Video,
  Phone,
  Clock,
  AlertCircle,
  CheckCircle,
  Upload,
  Send,
  Zap,
  Users,
  Star,
  Calendar,
  FileText,
  HelpCircle,
  Shield,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react";

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'contact' | 'tickets' | 'ai-help' | 'status'>('contact');
  const [chatOpen, setChatOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
    attachments: []
  });

  // Demo Data
  const supportOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      available: true,
      waitTime: '< 2 minutes',
      color: 'bg-success/10 text-success border-success/20'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      available: true,
      waitTime: '< 24 hours',
      color: 'bg-primary/10 text-primary border-primary/20'
    },
    {
      id: 'video',
      title: 'Video Call',
      description: 'Schedule a screen sharing session',
      icon: Video,
      available: true,
      waitTime: 'Book appointment',
      color: 'bg-secondary/10 text-secondary border-secondary/20'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Premium plan subscribers only',
      icon: Phone,
      available: false,
      waitTime: 'Premium only',
      color: 'bg-muted/10 text-muted-foreground border-muted/20'
    }
  ];

  const tickets = [
    {
      id: 'TICK-2024-001',
      subject: 'Cannot access study plans',
      category: 'Technical Issue',
      priority: 'High',
      status: 'Open',
      created: '2024-04-12',
      lastUpdate: '2024-04-12',
      responses: 2,
      assignedTo: 'Sarah Johnson'
    },
    {
      id: 'TICK-2024-002',
      subject: 'Billing question about Pro plan',
      category: 'Billing',
      priority: 'Medium',
      status: 'In Progress',
      created: '2024-04-10',
      lastUpdate: '2024-04-11',
      responses: 5,
      assignedTo: 'Mike Chen'
    },
    {
      id: 'TICK-2024-003',
      subject: 'Feature request: Dark mode',
      category: 'Feature Request',
      priority: 'Low',
      status: 'Resolved',
      created: '2024-04-08',
      lastUpdate: '2024-04-09',
      responses: 3,
      assignedTo: 'Alex Rivera'
    }
  ];

  const aiSuggestions = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot Password'. Enter your email and check for a reset link.",
      category: "Account",
      helpful: 24,
      confidence: 95
    },
    {
      question: "Why can't I see my study progress?",
      answer: "Ensure you're logged in and your internet connection is stable. Try refreshing the page.",
      category: "Technical",
      helpful: 18,
      confidence: 88
    },
    {
      question: "How to upgrade my subscription?",
      answer: "Go to Settings > Billing and select 'Upgrade Plan' to choose a new subscription tier.",
      category: "Billing",
      helpful: 31,
      confidence: 97
    }
  ];

  const systemStatus = [
    {
      service: "API Gateway",
      status: "operational",
      uptime: "99.9%",
      lastIncident: "None"
    },
    {
      service: "Study Plans Service",
      status: "operational",
      uptime: "99.8%",
      lastIncident: "2 days ago"
    },
    {
      service: "AI Coaching Service",
      status: "degraded",
      uptime: "98.2%",
      lastIncident: "4 hours ago"
    },
    {
      service: "Payment Processing",
      status: "operational",
      uptime: "99.9%",
      lastIncident: "None"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-success/10 text-success border-success/20';
      case 'degraded': return 'bg-warning/10 text-warning border-warning/20';
      case 'outage': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'Low': return 'bg-muted/10 text-muted-foreground border-muted/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'In Progress': return 'bg-warning/10 text-warning border-warning/20';
      case 'Resolved': return 'bg-success/10 text-success border-success/20';
      case 'Closed': return 'bg-muted/10 text-muted-foreground border-muted/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const handleSubmitTicket = () => {
    if (!ticketForm.subject || !ticketForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ticket Created! 🎫",
      description: "Your support ticket has been submitted. We'll respond within 24 hours."
    });

    setTicketForm({
      subject: "",
      category: "",
      priority: "",
      description: "",
      attachments: []
    });
  };

  const startChat = () => {
    setChatOpen(true);
    toast({
      title: "Chat Started",
      description: "Connecting you with a support agent..."
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
                Contact Support
              </h1>
              <p className="text-muted-foreground">Get help when you need it - we're here to assist you</p>
            </div>
            <Button onClick={() => navigate('/help')} variant="outline">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Center
            </Button>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact Options
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                My Tickets
              </TabsTrigger>
              <TabsTrigger value="ai-help" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="status" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                System Status
              </TabsTrigger>
            </TabsList>

            {/* Contact Options Tab */}
            <TabsContent value="contact" className="space-y-6">
              {/* Support Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {supportOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <Card 
                      key={option.id}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        !option.available ? 'opacity-60' : ''
                      }`}
                      onClick={() => option.available && option.id === 'chat' && startChat()}
                    >
                      <CardContent className="p-6 text-center">
                        <IconComponent className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold mb-2">{option.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                        <Badge variant="outline" className={option.color}>
                          {option.waitTime}
                        </Badge>
                        {option.available && (
                          <Button className="w-full mt-3" size="sm">
                            {option.id === 'chat' ? 'Start Chat' : 
                             option.id === 'email' ? 'Send Email' :
                             option.id === 'video' ? 'Schedule Call' : 'Call Now'}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Create Support Ticket */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Create Support Ticket
                  </CardTitle>
                  <CardDescription>
                    Submit a detailed support request for complex issues
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={ticketForm.category} onValueChange={(value) => setTicketForm({...ticketForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="account">Account Management</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                        <SelectItem value="medium">Medium - Affecting workflow</SelectItem>
                        <SelectItem value="high">High - Blocking issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable"
                      rows={5}
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop files here or click to browse
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleSubmitTicket} className="w-full md:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ Quick Links */}
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardHeader>
                  <CardTitle>Before contacting support...</CardTitle>
                  <CardDescription>Check these common solutions first</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Login & Account Issues
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Billing & Subscriptions
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Technical Troubleshooting
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Feature Questions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Tickets Tab */}
            <TabsContent value="tickets" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Support Tickets</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {ticket.id}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </Badge>
                            <Badge variant="outline" className={getTicketStatusColor(ticket.status)}>
                              {ticket.status}
                            </Badge>
                          </div>
                          
                          <h4 className="font-semibold text-lg mb-2">{ticket.subject}</h4>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Category:</span> {ticket.category}
                            </div>
                            <div>
                              <span className="font-medium">Created:</span> {ticket.created}
                            </div>
                            <div>
                              <span className="font-medium">Last Update:</span> {ticket.lastUpdate}
                            </div>
                            <div>
                              <span className="font-medium">Responses:</span> {ticket.responses}
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Assigned to: <span className="font-medium">{ticket.assignedTo}</span>
                            </span>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {tickets.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">No support tickets yet</h3>
                    <p className="text-muted-foreground mb-4">
                      When you create support tickets, they'll appear here
                    </p>
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Create Your First Ticket
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* AI Help Tab */}
            <TabsContent value="ai-help" className="space-y-6">
              {/* AI Chat Interface */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    AI Help Assistant
                  </CardTitle>
                  <CardDescription>
                    Get instant answers to your questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Input 
                        placeholder="Ask me anything about StudyPal..." 
                        className="flex-1"
                      />
                      <Button>
                        <Send className="h-4 w-4 mr-2" />
                        Ask AI
                      </Button>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Try asking: "How do I reset my password?" or "Why can't I access my study plans?"
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Popular AI Answers */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Popular Questions & Answers</h3>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-lg">{suggestion.question}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {suggestion.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {suggestion.helpful} helpful
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{suggestion.answer}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {suggestion.confidence}% confident
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              👍 Helpful
                            </Button>
                            <Button variant="outline" size="sm">
                              👎 Not helpful
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Escalation */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Still need help?</h3>
                      <p className="text-sm text-muted-foreground">
                        If the AI couldn't answer your question, connect with a human agent
                      </p>
                    </div>
                    <Button onClick={() => setActiveTab('contact')}>
                      Talk to Human
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Status Tab */}
            <TabsContent value="status" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">System Status</h3>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  All Systems Operational
                </Badge>
              </div>

              <div className="space-y-4">
                {systemStatus.map((service, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            service.status === 'operational' ? 'bg-success' :
                            service.status === 'degraded' ? 'bg-warning' : 'bg-destructive'
                          }`} />
                          <div>
                            <h4 className="font-semibold">{service.service}</h4>
                            <p className="text-sm text-muted-foreground">
                              Uptime: {service.uptime} • Last incident: {service.lastIncident}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">AI Service Degradation</h4>
                        <p className="text-sm text-muted-foreground">
                          Some users experiencing slower AI response times
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          4 hours ago • Investigating
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">Login Issues Resolved</h4>
                        <p className="text-sm text-muted-foreground">
                          Authentication service fully restored
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          2 days ago • Resolved
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Live Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-background border rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="font-medium">Support Chat</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setChatOpen(false)}>
              ×
            </Button>
          </div>
          <div className="h-full p-4">
            <p className="text-sm text-muted-foreground">
              Hi! I'm here to help. What can I assist you with today?
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Support;