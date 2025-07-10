import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Target, 
  Smartphone, 
  Trophy,
  Star,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  BookOpen,
  BarChart3,
  GraduationCap,
  Briefcase,
  BookmarkCheck,
  Sparkles,
  Timer,
  Award,
  DollarSign,
  ChevronRight,
  Calendar,
  TrendingUp as Growth
} from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">StudyBuddy AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            <Link to="/auth">
              <Button>Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Main Message */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 animate-pulse">
                <Sparkles className="w-3 h-3 mr-1" />
                Trusted by 10,000+ Students
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                Study Smarter, Not Harder
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl lg:max-w-none">
                AI-powered study plans that adapt to <span className="text-primary font-semibold">your learning style</span> and schedule. 
                Transform your academic performance in just 30 days.
              </p>

              {/* Quick Benefit Highlights */}
              <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-success/10 px-3 py-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full">
                  <Timer className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Setup in 2 minutes</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-full">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">89% improved grades</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all group px-8 py-4 text-lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="group px-8 py-4 text-lg border-2 hover:bg-muted/50">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo (2 min)
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                ✓ No credit card required  ✓ Cancel anytime  ✓ Student discounts available
              </p>
            </div>

            {/* Right Side - Social Proof Dashboard Preview */}
            <div className="relative">
              <Card className="border-border/50 shadow-2xl bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Your Study Dashboard
                    </CardTitle>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      Live Preview
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-xs text-muted-foreground">Active Goals</div>
                    </div>
                    <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20">
                      <div className="text-2xl font-bold text-success">89%</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-accent/5 rounded-lg border border-accent/20">
                      <div className="text-2xl font-bold text-accent">47h</div>
                      <div className="text-xs text-muted-foreground">This Week</div>
                    </div>
                  </div>

                  {/* Sample Study Plan */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium">Complete ML Fundamentals</span>
                      </div>
                      <Progress value={78} className="w-20" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="font-medium">Data Science Challenge</span>
                      </div>
                      <Progress value={90} className="w-20" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="font-medium">Quantum Computing Cert</span>
                      </div>
                      <Progress value={45} className="w-20" />
                    </div>
                  </div>

                  {/* AI Suggestion Preview */}
                  <div className="p-4 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg border border-secondary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-secondary" />
                      <span className="text-sm font-medium text-secondary">AI Suggestion</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on your progress, focus on practice problems for 30 minutes today to reinforce ML concepts.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Floating testimonial - Better positioned */}
              <div className="absolute -right-4 -bottom-4 bg-background border border-border rounded-lg p-3 shadow-lg max-w-[200px] hidden lg:block z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    S
                  </div>
                  <div>
                    <div className="font-medium text-xs text-foreground">Sarah J.</div>
                    <div className="text-xs text-muted-foreground">Psychology Student</div>
                  </div>
                </div>
                <p className="text-xs text-foreground mb-2">
                  "Improved my grades by 25% in one semester! The AI plans actually work."
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your study needs. Start free and upgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-gradient-to-br from-muted/5 to-background">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Free</h3>
                  <div className="text-3xl font-bold text-foreground mb-1">$0</div>
                  <div className="text-sm text-muted-foreground">Forever free</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Basic study planning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Progress tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">3 active study plans</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Mobile app access</span>
                  </li>
                </ul>
                <Link to="/auth" className="block">
                  <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan - Most Popular */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-primary shadow-lg relative bg-gradient-to-br from-primary/5 to-background">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white border-0 px-4 py-1">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Pro</h3>
                  <div className="text-3xl font-bold text-foreground mb-1">$19</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">AI-powered study plans</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Unlimited study plans</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Calendar integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Priority support</span>
                  </li>
                </ul>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Student Plan */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-gradient-to-br from-success/5 to-background">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Student</h3>
                  <div className="text-3xl font-bold text-foreground mb-1">$9</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                  <Badge className="bg-success/10 text-success border-success/20 mt-2">50% Off</Badge>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">All Pro features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Student discount pricing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Verify with .edu email</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">Extended trial period</span>
                  </li>
                </ul>
                <Link to="/auth" className="block">
                  <Button variant="outline" className="w-full border-success/50 text-success hover:bg-success/10 hover:text-success">
                    Claim Student Discount
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              ✓ 14-day free trial  ✓ No credit card required  ✓ Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Proof Points & Results */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              See Real Results in 30 Days
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI doesn't just create study plans—it creates measurable improvements. Here's what happens when you study smarter.
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Growth className="h-8 w-8 text-success" />
              </div>
              <div className="text-3xl font-bold text-success mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Students improved grades within 30 days</div>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Timer className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">2.5x</div>
              <div className="text-sm text-muted-foreground">Faster learning with AI optimization</div>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Goal completion rate with our system</div>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-warning" />
              </div>
              <div className="text-3xl font-bold text-warning mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Active students trust our platform</div>
            </Card>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-gradient-to-br from-primary/5 to-background hover:from-primary/10 hover:to-background">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">AI Study Plans</h3>
                <p className="text-muted-foreground mb-4">
                  Personalized schedules that adapt to your learning style, pace, and goals in real-time.
                </p>
                <div className="text-sm text-primary font-medium">
                  ✓ Adaptive scheduling  ✓ Learning style analysis  ✓ Goal optimization
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-gradient-to-br from-secondary/5 to-background hover:from-secondary/10 hover:to-background">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Progress Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed insights into study patterns, retention rates, and performance trends.
                </p>
                <div className="text-sm text-secondary font-medium">
                  ✓ Performance tracking  ✓ Retention analysis  ✓ Trend prediction
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-gradient-to-br from-accent/5 to-background hover:from-accent/10 hover:to-background">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Smart Scheduling</h3>
                <p className="text-muted-foreground mb-4">
                  Intelligent scheduling that finds your optimal study times and keeps you on track.
                </p>
                <div className="text-sm text-accent font-medium">
                  ✓ Optimal timing  ✓ Smart reminders  ✓ Calendar sync
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-gradient-to-br from-purple-500/5 to-background hover:from-purple-500/10 hover:to-background">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors">
                  <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Learning Techniques</h3>
                <p className="text-muted-foreground mb-4">
                  Spaced repetition, active recall, and proven methods tailored to your needs.
                </p>
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  ✓ Spaced repetition  ✓ Active recall  ✓ Feynman technique
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-gradient-to-br from-success/5 to-background hover:from-success/10 hover:to-background">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
                  <Smartphone className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Mobile Learning</h3>
                <p className="text-muted-foreground mb-4">
                  Study anywhere, anytime with responsive design and offline capabilities.
                </p>
                <div className="text-sm text-success font-medium">
                  ✓ Offline mode  ✓ Mobile first  ✓ Cross-device sync
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-gradient-to-br from-warning/5 to-background hover:from-warning/10 hover:to-background">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-colors">
                  <Trophy className="h-6 w-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Gamification</h3>
                <p className="text-muted-foreground mb-4">
                  Streaks, achievements, and rewards that keep you motivated and engaged.
                </p>
                <div className="text-sm text-warning font-medium">
                  ✓ Achievement system  ✓ Study streaks  ✓ Leaderboards
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real User Success Stories */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Real Students, Real Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. See how students like you are transforming their academic performance.
            </p>
          </div>

          {/* Testimonials with Photos */}
          <div id="testimonials" className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Sarah - College Student */}
            <Card className="relative border-border/50 hover:shadow-xl transition-all group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                  <Badge className="ml-auto bg-success/10 text-success border-success/20">Verified</Badge>
                </div>
                <p className="text-foreground mb-6 italic">
                  "I was struggling with 5 courses and part-time work. StudyBuddy AI created a plan that actually worked with my crazy schedule. Went from C's to A's in one semester!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-success to-success/80 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">SJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Psychology Major, State University</div>
                    <div className="text-xs text-success font-medium mt-1">↗ 25% grade improvement</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marcus - Professional */}
            <Card className="relative border-border/50 hover:shadow-xl transition-all group overflow-hidden border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Badge className="absolute top-4 right-4 bg-primary text-white">Featured</Badge>
              <CardContent className="p-6 relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                  <Badge className="ml-auto bg-primary/10 text-primary border-primary/20">Verified</Badge>
                </div>
                <p className="text-foreground mb-6 italic">
                  "Passed my PMP certification on the first try while working full-time and commuting 2 hours daily. The mobile app was a game-changer for studying on the train."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">MC</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Marcus Chen</div>
                    <div className="text-sm text-muted-foreground">Marketing Coordinator</div>
                    <div className="text-xs text-primary font-medium mt-1">✓ PMP Certified in 8 weeks</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Elena - Career Changer */}
            <Card className="relative border-border/50 hover:shadow-xl transition-all group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                  <Badge className="ml-auto bg-accent/10 text-accent border-accent/20">Verified</Badge>
                </div>
                <p className="text-foreground mb-6 italic">
                  "Transitioning from teaching to UX design felt overwhelming. The structured learning path gave me confidence and clear milestones. Now I'm a UX designer at a tech startup!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">EP</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Elena Parker</div>
                    <div className="text-sm text-muted-foreground">Former Teacher → UX Designer</div>
                    <div className="text-xs text-accent font-medium mt-1">✓ Career change in 6 months</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-background/50 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">10,247</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="text-center p-6 bg-background/50 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-success mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-background/50 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-accent mb-2">127</div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </div>
            <div className="text-center p-6 bg-background/50 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-secondary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Would Recommend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-12 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ready to Transform Your Study Habits?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who've already improved their grades with AI-powered study plans. 
              Start your free trial today - no credit card required.
            </p>

            {/* Urgency/Scarcity */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge className="bg-warning/10 text-warning border-warning/20">
                <Timer className="w-3 h-3 mr-1" />
                Limited Time: 50% Student Discount
              </Badge>
              <Badge className="bg-success/10 text-success border-success/20">
                <Users className="w-3 h-3 mr-1" />
                3,247 started this week
              </Badge>
            </div>

            {/* Primary CTA */}
            <div className="space-y-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all group px-12 py-6 text-xl">
                  Start Your Free Trial
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  14-day free trial
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  No credit card required
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Cancel anytime
                </div>
              </div>
            </div>

            {/* Risk Reversal */}
            <div className="mt-8 p-4 bg-background/50 rounded-lg border border-border/50">
              <h3 className="font-semibold mb-2 text-primary">30-Day Money-Back Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                Not satisfied? Get a full refund within 30 days, no questions asked. We're confident you'll love StudyBuddy AI.
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-border/50">
              <Award className="h-8 w-8 text-primary mb-2" />
              <div className="text-sm font-medium">Top Rated</div>
              <div className="text-xs text-muted-foreground">4.9/5 stars</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-border/50">
              <Users className="h-8 w-8 text-success mb-2" />
              <div className="text-sm font-medium">Trusted by</div>
              <div className="text-xs text-muted-foreground">10,000+ students</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-border/50">
              <GraduationCap className="h-8 w-8 text-accent mb-2" />
              <div className="text-sm font-medium">Universities</div>
              <div className="text-xs text-muted-foreground">127 institutions</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-border/50">
              <Trophy className="h-8 w-8 text-warning mb-2" />
              <div className="text-sm font-medium">Success Rate</div>
              <div className="text-xs text-muted-foreground">89% improved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">StudyBuddy AI</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8">
            © 2024 StudyBuddy AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;