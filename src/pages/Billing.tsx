import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard,
  Download,
  Calendar,
  TrendingUp,
  Check,
  X,
  Star,
  Zap,
  Crown,
  Shield,
  Users,
  BarChart3,
  Clock,
  AlertTriangle,
  ChevronRight,
  Plus,
  Settings,
  RefreshCw
} from "lucide-react";

const Billing = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'payment' | 'billing'>('overview');

  // Demo Data
  const currentPlan = {
    name: "Pro Plan",
    price: 29.99,
    billing: "monthly",
    nextBilling: "2024-05-15",
    features: ["Advanced AI Coaching", "Unlimited Study Plans", "Progress Analytics", "Priority Support"],
    usage: {
      studyPlans: { used: 15, limit: 50 },
      aiSessions: { used: 127, limit: 500 },
      storage: { used: 2.3, limit: 10 }
    }
  };

  const plans = [
    {
      name: "Free",
      price: 0,
      billing: "forever",
      popular: false,
      features: [
        "3 Study Plans",
        "Basic AI Assistance",
        "Progress Tracking",
        "Community Support"
      ],
      limitations: [
        "Limited AI sessions (10/month)",
        "Basic analytics only",
        "No priority support"
      ]
    },
    {
      name: "Pro",
      price: 29.99,
      billing: "monthly",
      popular: true,
      features: [
        "Unlimited Study Plans",
        "Advanced AI Coaching",
        "Detailed Analytics",
        "Priority Support",
        "Custom Goal Templates",
        "Export Data"
      ],
      limitations: []
    },
    {
      name: "Team",
      price: 99.99,
      billing: "monthly",
      popular: false,
      features: [
        "Everything in Pro",
        "Team Management",
        "Shared Study Plans",
        "Admin Dashboard",
        "Bulk User Management",
        "Custom Integrations",
        "24/7 Support"
      ],
      limitations: []
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true
    },
    {
      id: 2,
      type: "paypal",
      email: "user@example.com",
      isDefault: false
    }
  ];

  const billingHistory = [
    {
      id: 1,
      date: "2024-04-15",
      amount: 29.99,
      status: "paid",
      description: "Pro Plan - Monthly",
      invoice: "INV-2024-04-001"
    },
    {
      id: 2,
      date: "2024-03-15",
      amount: 29.99,
      status: "paid",
      description: "Pro Plan - Monthly",
      invoice: "INV-2024-03-001"
    },
    {
      id: 3,
      date: "2024-02-15",
      amount: 29.99,
      status: "failed",
      description: "Pro Plan - Monthly",
      invoice: "INV-2024-02-001"
    }
  ];

  const handleUpgrade = (planName: string) => {
    toast({
      title: "Plan Upgrade",
      description: `Upgrading to ${planName}...`
    });
  };

  const handleCancel = () => {
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription has been cancelled. Access continues until next billing date.",
      variant: "destructive"
    });
  };

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'free': return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'pro': return 'bg-primary/10 text-primary border-primary/20';
      case 'team': return 'bg-secondary/10 text-secondary border-secondary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success/10 text-success border-success/20';
      case 'failed': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
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
                Billing & Subscriptions
              </h1>
              <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Billing Portal
              </Button>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Current Plan
              </TabsTrigger>
              <TabsTrigger value="plans" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Plans & Pricing
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Methods
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Billing History
              </TabsTrigger>
            </TabsList>

            {/* Current Plan Overview */}
            <TabsContent value="overview" className="space-y-6">
              {/* Current Plan Card */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-primary" />
                        {currentPlan.name}
                      </CardTitle>
                      <CardDescription>
                        ${currentPlan.price}/{currentPlan.billing} • Next billing: {currentPlan.nextBilling}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Plan Features</h4>
                      <ul className="space-y-2">
                        {currentPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-success" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Usage Statistics</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Study Plans</span>
                            <span>{currentPlan.usage.studyPlans.used}/{currentPlan.usage.studyPlans.limit}</span>
                          </div>
                          <Progress value={(currentPlan.usage.studyPlans.used / currentPlan.usage.studyPlans.limit) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>AI Sessions</span>
                            <span>{currentPlan.usage.aiSessions.used}/{currentPlan.usage.aiSessions.limit}</span>
                          </div>
                          <Progress value={(currentPlan.usage.aiSessions.used / currentPlan.usage.aiSessions.limit) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Storage</span>
                            <span>{currentPlan.usage.storage.used}GB/{currentPlan.usage.storage.limit}GB</span>
                          </div>
                          <Progress value={(currentPlan.usage.storage.used / currentPlan.usage.storage.limit) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel Subscription
                      </Button>
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Update Billing
                      </Button>
                    </div>
                    <Button onClick={() => setActiveTab('plans')} className="bg-gradient-to-r from-primary to-secondary">
                      Upgrade Plan
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-success" />
                      <div>
                        <p className="text-sm text-muted-foreground">This Month</p>
                        <p className="text-2xl font-bold text-success">$29.99</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-warning" />
                      <div>
                        <p className="text-sm text-muted-foreground">Days Until Renewal</p>
                        <p className="text-2xl font-bold text-warning">15</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Account Status</p>
                        <p className="text-2xl font-bold text-accent">Premium</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Plans & Pricing */}
            <TabsContent value="plans" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {plan.name === 'Free' && <Shield className="h-5 w-5" />}
                          {plan.name === 'Pro' && <Zap className="h-5 w-5" />}
                          {plan.name === 'Team' && <Users className="h-5 w-5" />}
                          {plan.name}
                        </CardTitle>
                        <Badge variant="outline" className={getPlanColor(plan.name)}>
                          {currentPlan.name === plan.name ? 'Current' : 'Available'}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/{plan.billing}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Features included:</h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-success" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {plan.limitations.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-muted-foreground">Limitations:</h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <X className="h-4 w-4" />
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Button 
                        className="w-full" 
                        variant={currentPlan.name === plan.name ? "outline" : "default"}
                        onClick={() => handleUpgrade(plan.name)}
                        disabled={currentPlan.name === plan.name}
                      >
                        {currentPlan.name === plan.name ? 'Current Plan' : `Upgrade to ${plan.name}`}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Student Discount */}
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Star className="h-6 w-6 text-secondary" />
                      <div>
                        <h3 className="font-semibold">Student Discount Available</h3>
                        <p className="text-sm text-muted-foreground">Get 50% off Pro plans with valid student email</p>
                      </div>
                    </div>
                    <Button variant="outline">
                      Verify Student Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods */}
            <TabsContent value="payment" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Payment Methods</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className={method.isDefault ? 'ring-2 ring-primary' : ''}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            {method.type === 'card' ? (
                              <>
                                <p className="font-medium">{method.brand} •••• {method.last4}</p>
                                <p className="text-sm text-muted-foreground">
                                  Expires {method.expiryMonth}/{method.expiryYear}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium">PayPal</p>
                                <p className="text-sm text-muted-foreground">{method.email}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Payment Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Payment Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Secure Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        All payments are processed securely using industry-standard encryption and PCI DSS compliance.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Automatic Backup</h4>
                      <p className="text-sm text-muted-foreground">
                        If your primary payment method fails, we'll automatically try your backup methods.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing History */}
            <TabsContent value="billing" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Billing History</h3>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {billingHistory.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-6 border-b last:border-b-0">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{invoice.description}</p>
                            <p className="text-sm text-muted-foreground">{invoice.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                          <span className="font-semibold">${invoice.amount}</span>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Issues */}
              <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Payment Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      If you experience any payment failures, we'll automatically retry the charge and notify you via email.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Update Payment Method
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Support
                      </Button>
                    </div>
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

export default Billing;