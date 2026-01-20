import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquareText, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@assets/generated_images/abstract_ai_ecommerce_network_visualization.png";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <motion.div style={ { y, opacity } } className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-50" />
      </motion.div>

      <div className="container mx-auto px-4">
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
              <span className="text-[10px] font-bold uppercase tracking-wider">Setup in under 10 minutes</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.05] text-foreground tracking-tight">
              Scale Your Brand <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent animate-gradient-x">Without Scaling Support</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              Turn WhatsApp into your highest-converting sales channel. Automate 70% of support and recover abandoned carts with an AI agent built for Shopify.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <Button size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 group">
                Book My Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-primary/20 hover:bg-primary/5 group">
                <MessageSquareText className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                See Live Examples
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 text-sm text-muted-foreground mt-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="w-10 h-10 rounded-full border-2 border-background bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm"
                  >
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="Avatar" />
                  </motion.div>
                ))}
              </div>
              <p className="font-medium text-foreground">Trusted by <span className="font-bold">500+</span> Shopify store owners</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective-1000"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-white/20 bg-white/5 backdrop-blur-sm group">
              <img 
                src={heroImage} 
                alt="AI Sales & Support Platform" 
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay pointer-events-none" />
            </div>
            
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
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Revenue Recovered</p>
                <p className="text-2xl font-black text-foreground">+$12,450</p>
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
              <p className="text-sm font-bold">70% Support Automated</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
