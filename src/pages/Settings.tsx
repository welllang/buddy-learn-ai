import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Brain,
  User,
  Settings as SettingsIcon,
  Clock,
  Bell,
  Shield,
  Download,
  Trash2,
  Upload,
  Globe,
  Calendar,
  Zap,
  Eye,
  Lock,
  Smartphone,
  FileText,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Camera,
  Save,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfoSettings } from "@/components/settings/PersonalInfoSettings";
import { StudyPreferencesSettings } from "@/components/settings/StudyPreferencesSettings";
import { AIConfigurationSettings } from "@/components/settings/AIConfigurationSettings";
import { PrivacySecuritySettings } from "@/components/settings/PrivacySecuritySettings";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">StudyBuddy AI</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/study-plans">Study Plans</Link>
              </Button>
              <Button variant="ghost">Schedule</Button>
              <Button variant="ghost">Progress</Button>
              <Button variant="ghost">Goals</Button>
              <Button variant="ghost" className="bg-primary/10 text-primary">
                Settings
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">JS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Settings</span>
        </div>

        {/* Settings Header */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 via-background to-secondary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <SettingsIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Settings</CardTitle>
                <p className="text-muted-foreground">Customize your StudyBuddy AI experience</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/30">
            <TabsTrigger value="personal" className="flex flex-col gap-2 py-3">
              <User className="h-4 w-4" />
              <span className="text-xs">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="study" className="flex flex-col gap-2 py-3">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Study</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex flex-col gap-2 py-3">
              <Brain className="h-4 w-4" />
              <span className="text-xs">AI Config</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col gap-2 py-3">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Security</span>
            </TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Settings Content */}
            <div className="lg:col-span-2">
              <TabsContent value="personal" className="space-y-6">
                <PersonalInfoSettings onSave={handleSaveSettings} />
              </TabsContent>

              <TabsContent value="study" className="space-y-6">
                <StudyPreferencesSettings onSave={handleSaveSettings} />
              </TabsContent>

              <TabsContent value="ai" className="space-y-6">
                <AIConfigurationSettings onSave={handleSaveSettings} />
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <PrivacySecuritySettings onSave={handleSaveSettings} />
              </TabsContent>
            </div>

            {/* Settings Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Upload className="h-4 w-4" />
                    Import Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4" />
                    Privacy Policy
                  </Button>
                  <Separator />
                  <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>

              {/* Settings Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About Settings</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-3">
                  <p>
                    Customize your StudyBuddy AI experience to match your learning style and preferences.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Changes are saved automatically</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>AI learns from your preferences</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Data is encrypted and secure</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save All Button */}
              <Button onClick={handleSaveSettings} className="w-full bg-gradient-to-r from-primary to-secondary">
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;