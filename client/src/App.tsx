import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import HowItWorks from "@/pages/HowItWorks";
import Integrations from "@/pages/Integrations";
import Pricing from "@/pages/Pricing";
import BookDemo from "@/pages/BookDemo";
import About from "@/pages/About";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import GDPR from "@/pages/GDPR";
import EcommerceIndustry from "@/pages/industries/Ecommerce";
import RealEstateIndustry from "@/pages/industries/RealEstate";
import FinanceIndustry from "@/pages/industries/Finance";
import HealthcareIndustry from "@/pages/industries/Healthcare";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/book-demo" component={BookDemo} />
      <Route path="/about" component={About} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/gdpr" component={GDPR} />
      <Route path="/industries/ecommerce" component={EcommerceIndustry} />
      <Route path="/industries/real-estate" component={RealEstateIndustry} />
      <Route path="/industries/finance" component={FinanceIndustry} />
      <Route path="/industries/healthcare" component={HealthcareIndustry} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
