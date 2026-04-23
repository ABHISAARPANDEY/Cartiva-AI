import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  Phone,
  ShoppingBag
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden"
    >
      {/* Background Particles + Glows */}
      <ParticlesBackground />
      <motion.div
        style={{ y, opacity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none"
      >
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] opacity-60" />
        <div className="absolute top-40 left-0 w-[420px] h-[420px] bg-accent/15 rounded-full blur-[120px] opacity-60" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit border border-primary/20"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Website • WhatsApp • Voice Calls</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.05] text-foreground tracking-tight">
              Scale Your Sales <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent animate-gradient-x">Without More Staff</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              Deploy an AI agent that captures leads, closes sales, and handles support 24/7 via chat, WhatsApp, and voice calls. Turn every visitor into a customer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <Link href="/book-demo">
                <Button size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 group">
                  Book My Free Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base border-primary/30 hover:bg-primary/10 group"
                >
                  <MessageCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  See How It Works
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 text-sm text-muted-foreground mt-4"
            >
              <div className="flex -space-x-2">
                {["AC", "BK", "DS", "LM"].map((initials, i) => (
                  <motion.div 
                    key={initials}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center shadow-sm text-xs font-semibold text-white"
                  >
                    {initials}
                  </motion.div>
                ))}
              </div>
              <p className="font-medium text-foreground">Trusted by <span className="font-bold">50+</span> growing businesses</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective-1000"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-white/20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 backdrop-blur-sm p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">AI PERFORMANCE</p>
                  <p className="text-2xl font-bold text-foreground">Revenue from AI</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-4 space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Automated</p>
                  <p className="text-3xl font-extrabold text-primary">70%</p>
                  <p className="text-xs text-muted-foreground">of conversations fully handled by Cartiva AI.</p>
                </div>
                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-4 space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Revenue Lift</p>
                  <p className="text-3xl font-extrabold text-emerald-400">+27%</p>
                  <p className="text-xs text-muted-foreground">incremental revenue from AI-led journeys.</p>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-900/80 border border-white/5 p-3 space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em]">Avg. Reply Time</p>
                  <p className="text-lg font-bold text-foreground">0.8s</p>
                  <p className="text-[11px] text-muted-foreground">across web & WhatsApp</p>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-white/5 p-3 space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em]">Leads Qualified</p>
                  <p className="text-lg font-bold text-foreground">2,840</p>
                  <p className="text-[11px] text-muted-foreground">last 30 days</p>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-white/5 p-3 space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em]">CSAT</p>
                  <p className="text-lg font-bold text-foreground">4.9</p>
                  <p className="text-[11px] text-muted-foreground">average rating</p>
                </div>
              </div>
            </div>

            {/* Channel Orbit Badges */}
            <motion.div
              className="pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div
                className="absolute -right-12 top-8 w-28 h-28 rounded-full bg-background/70 border border-primary/20 shadow-xl flex items-center justify-center"
                animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex flex-col items-center gap-1 text-xs">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <span className="font-semibold text-foreground">Website</span>
                  <span className="text-[10px] text-muted-foreground">
                    Live chat
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-10 top-1/2 w-24 h-24 rounded-full bg-background/80 border border-emerald-400/30 shadow-lg flex items-center justify-center"
                animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }}
              >
                <div className="flex flex-col items-center gap-1 text-xs">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="font-semibold text-foreground">Voice</span>
                  <span className="text-[10px] text-muted-foreground">
                    Inbound & outbound
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 right-6 w-28 h-28 rounded-3xl bg-background/80 border border-emerald-500/30 shadow-xl flex items-center justify-center"
                animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="flex flex-col items-center gap-1 text-xs">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-emerald-50 shadow-md">
                    <ShoppingBag className="w-4 h-4" />
                  </span>
                  <span className="font-semibold text-foreground">
                    Orders closed
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    +32% AOV
                  </span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Floating Card 1 */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute -bottom-10 -left-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/40 dark:border-white/10 flex items-center gap-4 max-w-xs z-20"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Leads Qualified</p>
                <p className="text-2xl font-black text-foreground">+2,840</p>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -top-10 -right-6 bg-primary/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 z-20 text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <p className="text-sm font-bold">24/7 Active Agent</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
