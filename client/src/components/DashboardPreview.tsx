import { motion } from "framer-motion";
import info6 from "@assets/info6_1768935965844.png";
import { Check } from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 perspective-1000"
          >
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: 2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-border bg-slate-50 dark:bg-slate-900 p-2 transition-transform duration-500"
            >
               <img 
                src={info6} 
                alt="Real-Time ROI Dashboard" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-bold mb-6 tracking-tight"
            >
              Monitor Every Sale & Interaction
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Gain complete transparency with our real-time ROI dashboard. Track exactly how many leads your AI has captured and the revenue it has influenced.
            </motion.p>

            <ul className="space-y-4">
              {[
                "Track automated sales & lead qualification rates",
                "Monitor 24/7 engagement & response times",
                "Analyze customer sentiment on every interaction",
                "Measure total support cost savings & ROI"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-3 group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0"
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.div>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors cursor-default">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
