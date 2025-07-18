import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import { 
  MessageSquare, 
  Send, 
  Brain, 
  Lightbulb, 
  BookOpen, 
  Target,
  Clock,
  Sparkles,
  X,
  Minimize2,
  Expand,
  ZoomIn
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  relatedQuestions?: string[];
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

const AIAssistant = ({ isOpen, onClose, context }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! 👋 I'm your StudyBuddy AI assistant. I'm here to help you study smarter, answer questions, provide study tips, and keep you motivated. What would you like to work on today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Mermaid
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true, 
      theme: 'base',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#3b82f6',
        lineColor: '#6b7280',
        sectionBkgColor: '#f3f4f6',
        altSectionBkgColor: '#ffffff',
        gridColor: '#e5e7eb',
        textColor: '#374151',
        taskBkgColor: '#f9fafb',
        taskTextColor: '#374151',
        activeTaskBkgColor: '#3b82f6',
        activeTaskBorderColor: '#3b82f6',
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    });
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          message: inputMessage,
          context: context
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get AI response');
      }

      // Extract related questions from the response
      const relatedQuestions = extractRelatedQuestions(data.response);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp || new Date().toISOString(),
        relatedQuestions
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      toast({
        title: "AI Assistant Error",
        description: "Sorry, I couldn't process your message. Please try again.",
        variant: "destructive"
      });
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment!",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const extractRelatedQuestions = (content: string): string[] => {
    const relatedSection = content.match(/(?:Related Questions?:|🤔.*?)\s*((?:🤔.*?(?:\n|$))+)/i);
    if (relatedSection) {
      return relatedSection[1]
        .split('\n')
        .map(q => q.replace(/^🤔\s*/, '').trim())
        .filter(q => q.length > 0);
    }
    return [];
  };

  const handleRelatedQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const MermaidRenderer = ({ code }: { code: string }) => {
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
      const renderMermaid = async () => {
        try {
          const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);
          setSvg(svg);
          setError('');
        } catch (err) {
          setError('Failed to render diagram');
          console.error('Mermaid render error:', err);
        }
      };
      renderMermaid();
    }, [code]);

    if (error) {
      return <div className="text-destructive text-sm">{error}</div>;
    }

    if (!svg) {
      return <div className="text-muted-foreground text-sm">Loading diagram...</div>;
    }

    return (
      <div className="my-3">
        {/* Small responsive version in chat */}
        <div className="relative group">
          <div 
            className="mermaid-container p-3 bg-muted/30 rounded-lg border overflow-hidden cursor-pointer hover:bg-muted/40 transition-colors"
            style={{ maxHeight: '200px' }}
          >
            <div 
              className="overflow-hidden"
              style={{ 
                transform: 'scale(0.6)', 
                transformOrigin: 'top left',
                width: '166.67%', // Compensate for scale
                height: '166.67%'
              }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
          
          {/* Expand button overlay */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Expand className="h-3 w-3 mr-1" />
                View Full Size
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ZoomIn className="h-4 w-4" />
                  Diagram - Full View
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div 
                  className="mermaid-container p-4 bg-muted/10 rounded-lg border overflow-auto"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Expand className="h-3 w-3" />
          Click to view in full size
        </p>
      </div>
    );
  };

  const quickActions = [
    { icon: Lightbulb, text: "Study tips", action: "Give me study tips for better focus" },
    { icon: BookOpen, text: "Explain concept", action: "Help me understand" },
    { icon: Target, text: "Set goals", action: "Help me set study goals" },
    { icon: Clock, text: "Time management", action: "How can I manage my study time better?" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-4 z-50">
      <Card className="w-96 h-[600px] flex flex-col shadow-2xl border-primary/20">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">StudyBuddy AI</CardTitle>
              <CardDescription className="text-xs">Your learning assistant</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea ref={scrollAreaRef} className="h-full">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      {message.role === 'user' ? (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">U</span>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                          <Brain className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm break-words ${
                        message.role === 'user'
                          ? 'bg-primary text-white ml-2'
                          : 'bg-muted mr-2'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="space-y-3">
                          <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted-foreground/10 prose-pre:text-foreground">
                            <ReactMarkdown
                              components={{
                                // Custom styling for different elements
                                h1: ({ children }) => <h1 className="text-base font-bold mb-2 text-foreground">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-sm font-semibold mb-1 text-foreground">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-sm font-medium mb-1 text-foreground">{children}</h3>,
                                p: ({ children }) => <p className="mb-2 text-foreground leading-relaxed">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                                li: ({ children }) => <li className="text-foreground">{children}</li>,
                                code: ({ children, className }) => {
                                  // Handle mermaid code blocks
                                  if (className === 'language-mermaid') {
                                    return <MermaidRenderer code={String(children)} />;
                                  }
                                  return <code className="bg-muted-foreground/10 px-1 py-0.5 rounded text-xs font-mono text-foreground">{children}</code>;
                                },
                                pre: ({ children }) => <pre className="bg-muted-foreground/10 p-2 rounded text-xs overflow-x-auto">{children}</pre>,
                                blockquote: ({ children }) => <blockquote className="border-l-2 border-primary pl-3 italic text-foreground/80">{children}</blockquote>,
                                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                                table: ({ children }) => <table className="w-full border-collapse text-xs mb-2">{children}</table>,
                                th: ({ children }) => <th className="border border-border p-1 bg-muted font-medium text-left">{children}</th>,
                                td: ({ children }) => <td className="border border-border p-1">{children}</td>,
                              }}
                            >
                              {message.content.replace(/(?:Related Questions?:|🤔.*?)\s*((?:🤔.*?(?:\n|$))+)/gi, '')}
                            </ReactMarkdown>
                          </div>
                          
                          {/* Related Questions */}
                          {message.relatedQuestions && message.relatedQuestions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border/50">
                              <p className="text-xs font-medium text-muted-foreground mb-2">💭 Related Questions:</p>
                              <div className="space-y-1">
                                {message.relatedQuestions.map((question, idx) => (
                                  <Button
                                    key={idx}
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-2 text-xs text-left justify-start hover:bg-muted/50 w-full"
                                    onClick={() => handleRelatedQuestionClick(question)}
                                  >
                                    <span className="text-primary mr-1">🤔</span>
                                    {question}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <Brain className="h-3 w-3 text-white" />
                      </div>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <>
            <Separator />
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-auto p-2 flex flex-col items-center space-y-1"
                    onClick={() => setInputMessage(action.action)}
                  >
                    <action.icon className="h-4 w-4" />
                    <span className="text-xs">{action.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Input */}
        <Separator />
        <div className="p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={loading || !inputMessage.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • AI responses may take a moment
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AIAssistant;