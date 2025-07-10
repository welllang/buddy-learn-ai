import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Clock,
  Bell,
  Calendar,
  Volume2,
  VolumeX,
  Smartphone,
  Zap,
  Coffee,
  Target,
  BookOpen
} from "lucide-react";

interface StudyPreferencesSettingsProps {
  onSave: () => void;
}

export const StudyPreferencesSettings = ({ onSave }: StudyPreferencesSettingsProps) => {
  const [studyPrefs, setStudyPrefs] = useState({
    sessionLength: 60,
    breakInterval: 15,
    longBreakInterval: 30,
    studyMethods: ["pomodoro", "spaced-repetition"],
    notifications: {
      studyReminders: true,
      breakReminders: true,
      goalDeadlines: true,
      weeklyProgress: true,
      sound: true,
      push: true,
      email: false
    },
    calendarIntegration: false,
    autoSchedule: true,
    reminderFrequency: "moderate"
  });

  const studyMethodOptions = [
    { id: "pomodoro", label: "Pomodoro Technique", icon: <Clock className="h-4 w-4" /> },
    { id: "spaced-repetition", label: "Spaced Repetition", icon: <Target className="h-4 w-4" /> },
    { id: "active-recall", label: "Active Recall", icon: <BookOpen className="h-4 w-4" /> },
    { id: "feynman", label: "Feynman Technique", icon: <Zap className="h-4 w-4" /> }
  ];

  const toggleStudyMethod = (methodId: string) => {
    setStudyPrefs(prev => ({
      ...prev,
      studyMethods: prev.studyMethods.includes(methodId)
        ? prev.studyMethods.filter(m => m !== methodId)
        : [...prev.studyMethods, methodId]
    }));
  };

  const updateNotificationSetting = (key: keyof typeof studyPrefs.notifications, value: boolean) => {
    setStudyPrefs(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Session Timing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Session Timing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="sessionLength">Default Session Length</Label>
              <Badge variant="outline">{studyPrefs.sessionLength} minutes</Badge>
            </div>
            <Slider
              id="sessionLength"
              min={15}
              max={120}
              step={15}
              value={[studyPrefs.sessionLength]}
              onValueChange={([value]) => setStudyPrefs(prev => ({ ...prev, sessionLength: value }))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>15 min</span>
              <span>1 hour</span>
              <span>2 hours</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="breakInterval">Short Break</Label>
                <Badge variant="outline">{studyPrefs.breakInterval} min</Badge>
              </div>
              <Slider
                id="breakInterval"
                min={5}
                max={30}
                step={5}
                value={[studyPrefs.breakInterval]}
                onValueChange={([value]) => setStudyPrefs(prev => ({ ...prev, breakInterval: value }))}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="longBreakInterval">Long Break</Label>
                <Badge variant="outline">{studyPrefs.longBreakInterval} min</Badge>
              </div>
              <Slider
                id="longBreakInterval"
                min={15}
                max={60}
                step={15}
                value={[studyPrefs.longBreakInterval]}
                onValueChange={([value]) => setStudyPrefs(prev => ({ ...prev, longBreakInterval: value }))}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Preferred Study Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select the study techniques you want to use most often
          </p>
          <div className="grid grid-cols-2 gap-3">
            {studyMethodOptions.map((method) => (
              <button
                key={method.id}
                onClick={() => toggleStudyMethod(method.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  studyPrefs.studyMethods.includes(method.id)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-muted hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {method.icon}
                  <span className="font-medium text-sm">{method.label}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="studyReminders">Study Reminders</Label>
                <p className="text-xs text-muted-foreground">Get notified when it's time to study</p>
              </div>
              <Switch
                id="studyReminders"
                checked={studyPrefs.notifications.studyReminders}
                onCheckedChange={(checked) => updateNotificationSetting('studyReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="breakReminders">Break Reminders</Label>
                <p className="text-xs text-muted-foreground">Get reminded to take breaks</p>
              </div>
              <Switch
                id="breakReminders"
                checked={studyPrefs.notifications.breakReminders}
                onCheckedChange={(checked) => updateNotificationSetting('breakReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="goalDeadlines">Goal Deadlines</Label>
                <p className="text-xs text-muted-foreground">Notifications about upcoming deadlines</p>
              </div>
              <Switch
                id="goalDeadlines"
                checked={studyPrefs.notifications.goalDeadlines}
                onCheckedChange={(checked) => updateNotificationSetting('goalDeadlines', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="weeklyProgress">Weekly Progress</Label>
                <p className="text-xs text-muted-foreground">Weekly summary of your achievements</p>
              </div>
              <Switch
                id="weeklyProgress"
                checked={studyPrefs.notifications.weeklyProgress}
                onCheckedChange={(checked) => updateNotificationSetting('weeklyProgress', checked)}
              />
            </div>
          </div>

          <div className="border-t pt-4 space-y-4">
            <h4 className="font-medium text-sm">Notification Types</h4>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {studyPrefs.notifications.sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <Label htmlFor="sound" className="text-sm">Sound</Label>
                </div>
                <Switch
                  id="sound"
                  checked={studyPrefs.notifications.sound}
                  onCheckedChange={(checked) => updateNotificationSetting('sound', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <Label htmlFor="push" className="text-sm">Push</Label>
                </div>
                <Switch
                  id="push"
                  checked={studyPrefs.notifications.push}
                  onCheckedChange={(checked) => updateNotificationSetting('push', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="email" className="text-sm">Email</Label>
                </div>
                <Switch
                  id="email"
                  checked={studyPrefs.notifications.email}
                  onCheckedChange={(checked) => updateNotificationSetting('email', checked)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="reminderFrequency">Reminder Frequency</Label>
            <Select value={studyPrefs.reminderFrequency} onValueChange={(value) => setStudyPrefs(prev => ({ ...prev, reminderFrequency: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="minimal">Minimal - Only important deadlines</SelectItem>
                <SelectItem value="moderate">Moderate - Daily study reminders</SelectItem>
                <SelectItem value="frequent">Frequent - Multiple daily reminders</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="calendarIntegration">Connect Calendar</Label>
              <p className="text-xs text-muted-foreground">Sync study sessions with your calendar</p>
            </div>
            <Switch
              id="calendarIntegration"
              checked={studyPrefs.calendarIntegration}
              onCheckedChange={(checked) => setStudyPrefs(prev => ({ ...prev, calendarIntegration: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="autoSchedule">Auto-Schedule Sessions</Label>
              <p className="text-xs text-muted-foreground">Automatically find optimal study times</p>
            </div>
            <Switch
              id="autoSchedule"
              checked={studyPrefs.autoSchedule}
              onCheckedChange={(checked) => setStudyPrefs(prev => ({ ...prev, autoSchedule: checked }))}
            />
          </div>

          {studyPrefs.calendarIntegration && (
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">Available Integrations</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Google Calendar</Button>
                <Button variant="outline" size="sm">Outlook</Button>
                <Button variant="outline" size="sm">Apple Calendar</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};