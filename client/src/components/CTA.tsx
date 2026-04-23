import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TryNowButton } from "@/components/TryNowButton";

export function CTA() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] bg-primary px-6 py-16 md:px-16 md:py-20 text-center"
        >
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden opacity-10 pointer-events-none">
             <svg width="100%" height="100%">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
             </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Start Automating Your Growth Today
            </h2>
            <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Connect your Shopify store in minutes and let AI handle your support, recover carts, and close sales 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TryNowButton variant="cta" isDark />
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary-foreground/10 text-white hover:bg-primary-foreground/20 border border-white/20">
                Join the Waitlist
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
