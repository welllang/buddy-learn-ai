import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Mail, Lock, User, Eye, EyeOff, ArrowLeft, Shield, CheckCircle, XCircle, AlertCircle, Users, Gift } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isStudentEmail, setIsStudentEmail] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isStudent: false,
    referralCode: "",
    termsAccepted: false,
    rememberMe: false
  });

  // Real-time validation
  useEffect(() => {
    validateForm();
  }, [formData, isLogin]);

  // Password strength calculation
  useEffect(() => {
    if (!isLogin && formData.password) {
      setPasswordStrength(calculatePasswordStrength(formData.password));
    }
  }, [formData.password, isLogin]);

  // Email validation and student detection
  useEffect(() => {
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(formData.email);
      setIsEmailValid(isValid);
      
      // Check for student email domains
      const studentDomains = ['.edu', '.ac.', 'student.', 'university.', 'college.'];
      const isStudent = studentDomains.some(domain => formData.email.toLowerCase().includes(domain));
      setIsStudentEmail(isStudent);
      
      if (isStudent && isValid) {
        setFormData(prev => ({ ...prev, isStudent: true }));
      }
    }
  }, [formData.email]);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 25) return "Very Weak";
    if (strength < 50) return "Weak";
    if (strength < 75) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-destructive";
    if (strength < 50) return "bg-warning";
    if (strength < 75) return "bg-primary";
    return "bg-success";
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!isLogin) {
      // Name validation
      if (!formData.name.trim()) {
        errors.name = "Full name is required";
      } else if (formData.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
      }

      // Password confirmation
      if (formData.password !== formData.confirmPassword && formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      // Terms acceptance
      if (!formData.termsAccepted) {
        errors.terms = "You must accept the terms and conditions";
      }

      // Password strength requirement
      if (formData.password && passwordStrength < 50) {
        errors.password = "Password must be at least 'Good' strength";
      }
    }

    // Email validation
    if (formData.email && !isEmailValid) {
      errors.email = "Please enter a valid email address";
    }

    // Password requirement
    if (!formData.password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkEmailExists = async (email: string) => {
    // Simulate email checking - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Demo: some emails already exist
    const existingEmails = ['john@example.com', 'test@test.com'];
    return existingEmails.includes(email.toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before continuing.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (!isLogin) {
        // Check for duplicate email
        const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
          setValidationErrors(prev => ({ ...prev, email: "An account with this email already exists" }));
          setLoading(false);
          return;
        }
      }

      // Demo authentication - redirect to onboarding for signup, dashboard for login
      setTimeout(() => {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin 
            ? "You've been logged in successfully." 
            : "Welcome to StudyBuddy AI! Let's set up your profile.",
        });
        
        if (isLogin) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }, 1000);
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    // Demo Google auth
    setTimeout(() => {
      toast({
        title: "Google Sign In",
        description: "Signed in with Google successfully!",
      });
      navigate("/dashboard");
    }, 1000);
  };

  const handleGuestMode = () => {
    toast({
      title: "Guest Mode",
      description: "Exploring StudyBuddy AI as a guest user.",
    });
    navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset instructions will be sent to your email.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <Card className="shadow-lg border-border/50">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Sign in to continue your learning journey" 
                : "Start your personalized study experience"
              }
            </CardDescription>
            
            {/* Progress indicator for signup */}
            {!isLogin && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Step 1 of 4: Account Setup</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-1" />
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`pl-10 ${validationErrors.name ? 'border-destructive' : ''}`}
                      required={!isLogin}
                    />
                    {validationErrors.name && (
                      <div className="flex items-center mt-1 text-xs text-destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        {validationErrors.name}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-10 pr-10 ${validationErrors.email ? 'border-destructive' : isEmailValid ? 'border-success' : ''}`}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {formData.email && (
                      isEmailValid ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )
                    )}
                  </div>
                </div>
                {validationErrors.email && (
                  <div className="flex items-center text-xs text-destructive">
                    <XCircle className="h-3 w-3 mr-1" />
                    {validationErrors.email}
                  </div>
                )}
                {isStudentEmail && isEmailValid && (
                  <div className="flex items-center text-xs text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Student email detected! 50% discount will be applied.
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 pr-10 ${validationErrors.password ? 'border-destructive' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {!isLogin && formData.password && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Password Strength:</span>
                      <span className={`font-medium ${
                        passwordStrength < 25 ? 'text-destructive' :
                        passwordStrength < 50 ? 'text-warning' :
                        passwordStrength < 75 ? 'text-primary' : 'text-success'
                      }`}>
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        {formData.password.length >= 8 ? (
                          <CheckCircle className="h-3 w-3 text-success mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 text-muted-foreground mr-1" />
                        )}
                        At least 8 characters
                      </div>
                      <div className="flex items-center">
                        {formData.password.match(/[a-z]/) && formData.password.match(/[A-Z]/) ? (
                          <CheckCircle className="h-3 w-3 text-success mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 text-muted-foreground mr-1" />
                        )}
                        Upper and lowercase letters
                      </div>
                      <div className="flex items-center">
                        {formData.password.match(/\d/) ? (
                          <CheckCircle className="h-3 w-3 text-success mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 text-muted-foreground mr-1" />
                        )}
                        At least one number
                      </div>
                    </div>
                  </div>
                )}
                
                {validationErrors.password && (
                  <div className="flex items-center text-xs text-destructive">
                    <XCircle className="h-3 w-3 mr-1" />
                    {validationErrors.password}
                  </div>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`pl-10 pr-10 ${validationErrors.confirmPassword ? 'border-destructive' : 
                        formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-success' : ''}`}
                      required={!isLogin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <div className="flex items-center text-xs text-destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      {validationErrors.confirmPassword}
                    </div>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div className="flex items-center text-xs text-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Passwords match
                    </div>
                  )}
                </div>
              )}

              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                    <div className="relative">
                      <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="referralCode"
                        type="text"
                        placeholder="Enter referral code"
                        value={formData.referralCode}
                        onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                    {formData.referralCode && (
                      <div className="text-xs text-muted-foreground">
                        💡 Referral codes may provide additional discounts or benefits
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isStudent"
                      checked={formData.isStudent}
                      onCheckedChange={(checked) => setFormData({ ...formData, isStudent: checked as boolean })}
                    />
                    <Label htmlFor="isStudent" className="text-sm flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      I'm a student (get 50% discount)
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                        className={validationErrors.terms ? 'border-destructive' : ''}
                      />
                      <Label htmlFor="termsAccepted" className="text-sm">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                      </Label>
                    </div>
                    {validationErrors.terms && (
                      <div className="flex items-center text-xs text-destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        {validationErrors.terms}
                      </div>
                    )}
                  </div>
                </>
              )}

              {isLogin && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me for 30 days
                  </Label>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading || Object.keys(validationErrors).length > 0}>
                {loading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            {/* Additional Options */}
            <div className="space-y-3">
              {isLogin && (
                <>
                  <div className="text-center">
                    <Button 
                      variant="link" 
                      className="text-sm text-muted-foreground"
                      onClick={handleForgotPassword}
                    >
                      Forgot your password?
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      className="text-sm"
                      onClick={handleGuestMode}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Try as Guest
                    </Button>
                  </div>
                </>
              )}

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary font-medium ml-1 p-0 h-auto"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </Button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Demo Mode: Use any email/password to continue
          </p>
          {!isLogin && (
            <p className="text-xs text-muted-foreground mt-2">
              Next: Profile setup → Learning assessment → Study plan creation
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;