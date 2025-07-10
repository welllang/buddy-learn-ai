import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CalendarIcon, Download, FileText, BarChart3, TrendingUp, Clock, Target, Brain, Award } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Reports = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handleDateRangeChange = (range: any) => {
    setDateRange({
      from: range?.from,
      to: range?.to,
    });
  };

  // Mock data for reports
  const weeklyData = {
    studyHours: 32.5,
    goalProgress: 78,
    topSubjects: ["Mathematics", "Physics", "Chemistry"],
    improvements: ["Increase practice problems", "Review fundamentals", "Schedule regular breaks"],
    nextWeekFocus: "Advanced Calculus and Quantum Mechanics"
  };

  const monthlyData = {
    totalHours: 124,
    goalsAchieved: 8,
    retentionRate: 85,
    studyStreak: 23,
    improvementAreas: ["Time management", "Note-taking efficiency"]
  };

  const studyTimeChart = [
    { day: "Mon", hours: 4.5, efficiency: 85 },
    { day: "Tue", hours: 3.2, efficiency: 78 },
    { day: "Wed", hours: 5.1, efficiency: 92 },
    { day: "Thu", hours: 4.8, efficiency: 88 },
    { day: "Fri", hours: 3.7, efficiency: 82 },
    { day: "Sat", hours: 6.2, efficiency: 95 },
    { day: "Sun", hours: 5.0, efficiency: 90 }
  ];

  const subjectPerformance = [
    { subject: "Math", score: 92, improvement: +5 },
    { subject: "Physics", score: 88, improvement: +3 },
    { subject: "Chemistry", score: 85, improvement: -2 },
    { subject: "Biology", score: 91, improvement: +7 }
  ];

  const goalProgress = [
    { goal: "Complete Calculus Course", progress: 85, deadline: "Dec 31" },
    { goal: "Master Physics Fundamentals", progress: 72, deadline: "Jan 15" },
    { goal: "Chemistry Lab Reports", progress: 95, deadline: "Dec 20" }
  ];

  const retentionData = [
    { week: "Week 1", retention: 95 },
    { week: "Week 2", retention: 88 },
    { week: "Week 3", retention: 82 },
    { week: "Week 4", retention: 79 }
  ];

  const exportReport = (type: string, format: string) => {
    // Mock export functionality
    console.log(`Exporting ${type} report as ${format}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Detailed Reports</h1>
            <p className="text-muted-foreground">Comprehensive analysis of your learning progress</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportReport('current', 'PDF')}>
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={() => exportReport('current', 'CSV')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly Reports</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Reviews</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>

          {/* Weekly Reports */}
          <TabsContent value="weekly" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{weeklyData.studyHours}h</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{weeklyData.goalProgress}%</div>
                  <Progress value={weeklyData.goalProgress} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Subjects</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {weeklyData.topSubjects.map((subject, index) => (
                      <Badge key={subject} variant={index === 0 ? "default" : "secondary"}>
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">Average this week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Study Time & Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={studyTimeChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectPerformance.map((item) => (
                      <div key={item.subject} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{item.subject}</span>
                            <span className="text-sm text-muted-foreground">{item.score}%</span>
                          </div>
                          <Progress value={item.score} className="h-2" />
                        </div>
                        <Badge 
                          variant={item.improvement > 0 ? "default" : "destructive"}
                          className="ml-2"
                        >
                          {item.improvement > 0 ? '+' : ''}{item.improvement}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {weeklyData.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Next Week's Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{weeklyData.nextWeekFocus}</p>
                  <div className="mt-4 flex gap-2">
                    <Badge>High Priority</Badge>
                    <Badge variant="secondary">2 subjects</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monthly Reviews */}
          <TabsContent value="monthly" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyData.totalHours}h</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Goals Achieved</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyData.goalsAchieved}/10</div>
                  <Progress value={80} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyData.retentionRate}%</div>
                  <p className="text-xs text-muted-foreground">Knowledge retention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyData.studyStreak}</div>
                  <p className="text-xs text-muted-foreground">Days in a row</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Retention Curve</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={retentionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="retention" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Goal Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {goalProgress.map((goal) => (
                      <div key={goal.goal}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{goal.goal}</span>
                          <Badge variant="outline">{goal.deadline}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={goal.progress} className="flex-1" />
                          <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Study Habit Evolution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Positive Changes</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm">Increased focus duration by 25%</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm">Better note organization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm">More consistent study schedule</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Areas to Work On</h4>
                    <ul className="space-y-2">
                      {monthlyData.improvementAreas.map((area, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                          <span className="text-sm">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Custom Reports */}
          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Report</CardTitle>
                <CardDescription>
                  Generate detailed reports based on your specific criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange.from}
                          selected={dateRange}
                          onSelect={handleDateRangeChange}
                          numberOfMonths={2}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject Filter</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                        <SelectItem value="performance">Performance Focus</SelectItem>
                        <SelectItem value="goals">Goal-Oriented</SelectItem>
                        <SelectItem value="comparative">Comparative Study</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>Generate Report</Button>
                  <Button variant="outline">Preview</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subject-Specific Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deep dive into individual subject performance and trends
                  </p>
                  <Button variant="outline" className="w-full">
                    Create Subject Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Goal Achievement Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track progress toward specific learning objectives
                  </p>
                  <Button variant="outline" className="w-full">
                    Create Goal Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comparative Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Compare performance across different time periods
                  </p>
                  <Button variant="outline" className="w-full">
                    Create Comparison
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" onClick={() => exportReport('custom', 'PDF')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as PDF
                  </Button>
                  <Button variant="outline" onClick={() => exportReport('custom', 'CSV')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </Button>
                  <Button variant="outline" onClick={() => exportReport('custom', 'Excel')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Export as Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;