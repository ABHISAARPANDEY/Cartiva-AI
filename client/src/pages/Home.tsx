import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { DashboardPreview } from "@/components/DashboardPreview";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <DashboardPreview />
      <CTA />
      <Footer />
    </div>
  );
}
