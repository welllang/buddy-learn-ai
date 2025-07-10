import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
