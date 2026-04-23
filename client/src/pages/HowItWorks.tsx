import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, Globe, MessageSquare, Rocket, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Connect Your Website",
    description: "Plug-and-play integration for any website. Whether it's Shopify, WooCommerce, or a custom build, sync your data in one click.",
    details: [
      "Works on any platform",
      "Real-time data sync",
      "Automatic content indexing",
      "Secure API connection"
    ]
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Customize Your AI Agent",
    description: "Train your agent on your knowledge base and define its personality to match your brand's unique voice across all channels.",
    details: [
      "Custom brand personality",
      "WhatsApp, Web Chat & Voice setup",
      "AI Voice Agent configuration",
      "Lead qualification rules"
    ]
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Go Live & Scale Revenue",
    description: "Activate your agent across chat, WhatsApp, and voice calls. Watch it handle 70% of conversations while closing sales 24/7.",
    details: [
      "Instant response on all channels",
      "Voice & chat lead capture",
      "Multilingual support",
      "Full ROI dashboard"
    ]
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-transparent overflow-visible">
      <Navbar variant="dark" />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              From Setup to <span className="text-primary">Sales</span> in 10 Minutes
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              No technical team or complex coding required. Cartiva AI is built to deliver immediate results for websites and WhatsApp-first businesses.
            </p>
          </motion.div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
              >
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                    {step.icon}
                  </div>
                  <h2 className="text-3xl font-heading font-bold">{step.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed italic">
                    {step.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="font-medium text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-1 w-full max-w-xl">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="aspect-square lg:aspect-video rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/10 border border-border flex items-center justify-center relative overflow-hidden group shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-70" />
                    <div className="relative z-10 flex flex-col items-center justify-center gap-4 p-8">
                      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                        Step 0{index + 1}
                      </div>
                      <div className="text-3xl font-heading font-bold text-foreground text-center">
                        {step.title}
                      </div>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        Visual journey of how Cartiva AI {index === 0 ? "connects to your stack" : index === 1 ? "adapts to your brand" : "goes live across all channels"}.
                      </p>
                      <div className="grid grid-cols-3 gap-3 w-full text-left text-xs text-muted-foreground/90">
                        <div className="rounded-xl bg-background/60 border border-border/60 p-3">
                          <p className="font-semibold text-foreground mb-1">
                            {index === 0 ? "Sources" : index === 1 ? "Playbooks" : "Channels"}
                          </p>
                          <p>{index === 0 ? "Website, catalog, orders" : index === 1 ? "Sales, support, FAQ" : "Web, WhatsApp, voice"}</p>
                        </div>
                        <div className="rounded-xl bg-background/60 border border-border/60 p-3">
                          <p className="font-semibold text-foreground mb-1">
                            {index === 0 ? "Sync" : index === 1 ? "Behaviour" : "Coverage"}
                          </p>
                          <p>{index === 0 ? "Real-time, secure" : index === 1 ? "Brand-safe & on-tone" : "24/7 global"}</p>
                        </div>
                        <div className="rounded-xl bg-background/60 border border-border/60 p-3">
                          <p className="font-semibold text-foreground mb-1">
                            Outcome
                          </p>
                          <p>{index === 0 ? "Unified customer context" : index === 1 ? "Consistent experiences" : "Always-on AI agent"}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 p-12 rounded-[2rem] bg-slate-900 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Ready to Automate Your Success?</h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                Join 50+ businesses using Cartiva AI to grow revenue and scale support without increasing headcount.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book-demo">
                  <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90">
                    Book My Free Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5">
                  See Case Studies
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
