import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import AIAssistant from "./components/AIAssistant";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import StudyPlans from "./pages/StudyPlans";
import StudyPlanDetail from "./pages/StudyPlanDetail";
import CreateStudyPlan from "./pages/CreateStudyPlan";
import Schedule from "./pages/Schedule";
import Progress from "./pages/Progress";
import Goals from "./pages/Goals";
import { GoalDetailView } from "./components/goals/GoalDetailView";
import Reports from "./pages/Reports";
import StudySession from "./pages/StudySession";
import StudyMaterials from "./pages/StudyMaterials";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import Help from "./pages/Help";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Global Floating Chat Button */}
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl z-50 flex items-center justify-center"
            size="lg"
          >
            <MessageSquare className="h-6 w-6 text-white" />
          </Button>

          {/* Global AI Assistant */}
          <AIAssistant 
            isOpen={isAIAssistantOpen} 
            onClose={() => setIsAIAssistantOpen(false)} 
          />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study-plans" element={<StudyPlans />} />
            <Route path="/study-plans/create" element={<CreateStudyPlan />} />
            <Route path="/study-plans/:id" element={<StudyPlanDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/progress/reports" element={<Reports />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/goals/:goalId" element={<GoalDetailView />} />
            <Route path="/study/:sessionId" element={<StudySession />} />
            <Route path="/materials" element={<StudyMaterials />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/billing" element={<Billing />} />
            <Route path="/help" element={<Help />} />
            <Route path="/support" element={<Support />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
