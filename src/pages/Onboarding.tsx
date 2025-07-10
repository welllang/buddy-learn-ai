import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  Clock, 
  CheckCircle,
  Star,
  Lightbulb,
  Eye,
  Hand,
  Volume2,
  BookOpen,
  Code,
  Palette,
  Calculator,
  Globe2,
  Briefcase,
  GraduationCap,
  Users,
  Trophy,
  Calendar,
  Zap,
  Coffee,
  Moon,
  Sun,
  Sunset,
  Music,
  Headphones,
  Timer,
  ArrowRight,
  Sparkles,
  Rocket,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: string}>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const selectOption = (key: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [key]: value }));
    
    // Auto-advance to next step after a short delay
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        if (currentStep < totalSteps) {
          setCurrentStep(currentStep + 1);
        } else {
          handleComplete();
        }
        setIsTransitioning(false);
      }, 300);
    }, 800);
  };

  const handleComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            goal: selectedOptions.goal,
            learning_style: selectedOptions.learningStyle,
            study_time: selectedOptions.studyTime,
            onboarding_completed: true
          })
          .eq('user_id', user.id);

        if (error) {
          console.error('Error saving onboarding data:', error);
          toast({
            title: "Error saving preferences",
            description: "Please try again or contact support.",
            variant: "destructive"
          });
          return;
        }
      }

      toast({
        title: "🎉 Welcome to StudyBuddy AI!",
        description: "Your learning journey starts now. Let's make it amazing!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error completing setup",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const renderStepContent = () => {
    const stepClasses = `space-y-8 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`;
    
    switch (currentStep) {
      case 1:
        return (
          <div className={stepClasses}>
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                What's your main goal?
              </h2>
              <p className="text-lg text-muted-foreground">Choose what matters most to you</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { id: 'academic', icon: GraduationCap, title: 'Academic Success', desc: 'Excel in studies & exams', gradient: 'from-blue-500 to-blue-600' },
                { id: 'skill', icon: Code, title: 'Learn New Skills', desc: 'Master practical abilities', gradient: 'from-purple-500 to-purple-600' },
                { id: 'career', icon: Briefcase, title: 'Career Growth', desc: 'Advance professionally', gradient: 'from-emerald-500 to-emerald-600' }
              ].map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 group ${
                    selectedOptions.goal === option.id ? 'border-primary shadow-2xl scale-105' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => selectOption('goal', option.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                    <p className="text-muted-foreground">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className={stepClasses}>
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Brain className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
                How do you learn best?
              </h2>
              <p className="text-lg text-muted-foreground">Pick your natural learning style</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { id: 'visual', icon: Eye, title: 'Visual Learner', desc: 'Images, charts & diagrams', gradient: 'from-cyan-500 to-blue-500' },
                { id: 'audio', icon: Headphones, title: 'Audio Learner', desc: 'Listening & discussion', gradient: 'from-violet-500 to-purple-500' },
                { id: 'hands-on', icon: Hand, title: 'Hands-on Learner', desc: 'Practice & doing', gradient: 'from-orange-500 to-red-500' }
              ].map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 group ${
                    selectedOptions.learningStyle === option.id ? 'border-primary shadow-2xl scale-105' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => selectOption('learningStyle', option.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                    <p className="text-muted-foreground">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className={stepClasses}>
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Clock className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-4">
                When do you study best?
              </h2>
              <p className="text-lg text-muted-foreground">Choose your peak performance time</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { id: 'morning', icon: Sun, title: 'Morning Person', desc: '6AM - 12PM peak focus', gradient: 'from-yellow-400 to-orange-500' },
                { id: 'afternoon', icon: Coffee, title: 'Afternoon Focus', desc: '12PM - 6PM steady energy', gradient: 'from-amber-500 to-brown-500' },
                { id: 'evening', icon: Moon, title: 'Night Owl', desc: '6PM - 12AM deep work', gradient: 'from-indigo-500 to-purple-600' }
              ].map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 group ${
                    selectedOptions.studyTime === option.id ? 'border-primary shadow-2xl scale-105' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => selectOption('studyTime', option.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                    <p className="text-muted-foreground">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className={stepClasses}>
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-rose-500 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Rocket className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
                Ready to launch?
              </h2>
              <p className="text-lg text-muted-foreground">Let's create your perfect study plan</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
                <CardContent className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Your Goal</p>
                        <p className="text-sm text-muted-foreground capitalize">{selectedOptions.goal?.replace('-', ' ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Learning Style</p>
                        <p className="text-sm text-muted-foreground capitalize">{selectedOptions.learningStyle?.replace('-', ' ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Best Study Time</p>
                        <p className="text-sm text-muted-foreground capitalize">{selectedOptions.studyTime}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-primary">AI is working its magic!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Creating your personalized study plan based on your preferences...
                    </p>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="mt-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white px-8 py-4 rounded-2xl"
                    onClick={handleComplete}
                  >
                    <span className="mr-2">Start Learning</span>
                    <Heart className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              StudyBuddy AI
            </h1>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-sm font-medium text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <Progress value={progressPercentage} className="w-48 h-3" />
            <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-3">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i + 1 === currentStep
                  ? 'bg-gradient-to-r from-primary to-secondary scale-125'
                  : i + 1 < currentStep
                  ? 'bg-primary/60'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;