import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Submit from "@/pages/Submit";
import Verify from "@/pages/Verify";
import Protocol from "@/pages/Protocol";
import Settings from "@/pages/Settings";
import Support from "@/pages/Support";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
