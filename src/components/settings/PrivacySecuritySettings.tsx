import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Download,
  FileText,
  Monitor,
  AlertTriangle,
  Key,
  Globe,
  Clock
} from "lucide-react";

interface PrivacySecuritySettingsProps {
  onSave: () => void;
}

export const PrivacySecuritySettings = ({ onSave }: PrivacySecuritySettingsProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    analytics: true,
    marketingEmails: false,
    profileVisibility: "private",
    sessionTimeout: 60
  });

  const [activeSessions] = useState([
    {
      id: "1",
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "2 minutes ago",
      current: true
    },
    {
      id: "2", 
      device: "Safari on iPhone",
      location: "New York, NY",
      lastActive: "3 hours ago",
      current: false
    },
    {
      id: "3",
      device: "Chrome on MacBook",
      location: "Boston, MA",
      lastActive: "2 days ago", 
      current: false
    }
  ]);

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }
    // Handle password change logic
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleDataExport = () => {
    // Mock data export
    const data = {
      profile: "User profile data",
      studySessions: "Study session history",
      progress: "Learning progress data",
      settings: "User preferences"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studybuddy-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const terminateSession = (sessionId: string) => {
    // Handle session termination
    console.log(`Terminating session: ${sessionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Password & Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
              />
            </div>

            <Button onClick={handlePasswordChange} className="w-full">
              Update Password
            </Button>
          </div>

          <Separator />

          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                id="twoFactor"
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>

            {twoFactorEnabled && (
              <div className="bg-success/10 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="font-medium text-sm">2FA is enabled</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your account is protected with two-factor authentication
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Recovery Codes</Button>
                  <Button variant="outline" size="sm">Disable 2FA</Button>
                </div>
              </div>
            )}

            {!twoFactorEnabled && (
              <Button variant="outline" size="sm" className="gap-2">
                <Key className="h-4 w-4" />
                Set Up 2FA
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="dataSharing">Data Sharing</Label>
              <p className="text-xs text-muted-foreground">Share anonymized data to improve the platform</p>
            </div>
            <Switch
              id="dataSharing"
              checked={privacySettings.dataSharing}
              onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, dataSharing: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="analytics">Usage Analytics</Label>
              <p className="text-xs text-muted-foreground">Help us improve the app with usage statistics</p>
            </div>
            <Switch
              id="analytics"
              checked={privacySettings.analytics}
              onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, analytics: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="marketingEmails">Marketing Communications</Label>
              <p className="text-xs text-muted-foreground">Receive emails about new features and tips</p>
            </div>
            <Switch
              id="marketingEmails"
              checked={privacySettings.marketingEmails}
              onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, marketingEmails: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Auto-logout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={privacySettings.sessionTimeout}
              onChange={(e) => setPrivacySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 60 }))}
              min="5"
              max="480"
            />
            <p className="text-xs text-muted-foreground">
              Automatically log out after period of inactivity
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Export Your Data</Label>
                <p className="text-xs text-muted-foreground">
                  Download all your study data and preferences
                </p>
              </div>
              <Button variant="outline" onClick={handleDataExport} className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="bg-muted/30 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2">Included in export:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Profile information and preferences</li>
                <li>• Study session history and progress</li>
                <li>• Goals and achievements</li>
                <li>• AI configuration and feedback</li>
              </ul>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Privacy Policy</Label>
                <p className="text-xs text-muted-foreground">
                  Review how we handle your data
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                View Policy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Manage devices that are currently logged into your account
          </p>
          
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    <span className="font-medium text-sm">{session.device}</span>
                    {session.current && (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Last active: {session.lastActive}</span>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => terminateSession(session.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    Terminate
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full text-destructive hover:text-destructive">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Terminate All Other Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};