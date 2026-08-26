/* =============================================================
   SOS CTE Application Shell — Steel & Signal Design System
   Preserve graphite surfaces, steel-blue system cues, orange CTAs,
   and the exact live-site page shell across every route.
   ============================================================= */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Sprint from "./pages/Sprint";
import About from "./pages/About";
import Community from "./pages/Community";
import Results from "./pages/Results";
import Resources from "./pages/Resources";
import Scorecard from "./pages/Scorecard";

function Router() {
  return (
    <WouterRouter base="">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sprint" component={Sprint} />
        <Route path="/about" component={About} />
        <Route path="/community" component={Community} />
        <Route path="/results" component={Results} />
        <Route path="/resources" component={Resources} />
        <Route path="/scorecard" component={Scorecard} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
