import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/ui/hero-odyssey";
import { LogosStrip } from "@/components/LogosStrip";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { InfographicsSection } from "@/components/InfographicsSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { DashboardPreview } from "@/components/DashboardPreview";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans selection:bg-primary/20 overflow-visible">
      <Navbar variant="dark" />
      <HeroSection includeNav={false} />
      <LogosStrip />
      <Stats />
      <Features />
      <InfographicsSection />
      <IndustriesSection />
      <DashboardPreview />
      <CTA />
      <Footer />
    </div>
  );
}
