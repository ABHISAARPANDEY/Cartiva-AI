import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="py-20 bg-black/50 overflow-visible">
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
              whileHover={{ rotateY: 5, rotateX: 2, scale: 1.01 }}
              className="relative rounded-3xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(15,23,42,0.8)] border border-border/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 transition-transform duration-500 flex flex-col gap-4"
            >
              <div className="mb-1 flex items-center justify-between gap-2 text-xs text-slate-200">
                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex h-6 items-center rounded-full bg-emerald-500/10 px-3 text-emerald-300 font-medium">
                    +27% Revenue from AI
                  </span>
                  <span className="hidden md:inline text-slate-400">
                    Last 30 days · All channels
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-slate-100 text-xs">
                <div className="rounded-xl bg-slate-900/80 border border-slate-700 p-3 space-y-1">
                  <p className="uppercase tracking-[0.18em] text-[10px] text-slate-400">Automated Chats</p>
                  <p className="text-2xl font-bold text-emerald-400">70%</p>
                  <p className="text-[11px] text-slate-400">Handled without human agents.</p>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-slate-700 p-3 space-y-1">
                  <p className="uppercase tracking-[0.18em] text-[10px] text-slate-400">Leads Qualified</p>
                  <p className="text-2xl font-bold text-primary">2,840</p>
                  <p className="text-[11px] text-slate-400">Across web & WhatsApp.</p>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-slate-700 p-3 space-y-1">
                  <p className="uppercase tracking-[0.18em] text-[10px] text-slate-400">CSAT</p>
                  <p className="text-2xl font-bold text-amber-300">4.9</p>
                  <p className="text-[11px] text-slate-400">Average rating.</p>
                </div>
              </div>
              <div className="mt-1 h-32 rounded-2xl bg-slate-900/80 border border-slate-700 p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span>Daily AI-led revenue</span>
                  <span>Last 14 days</span>
                </div>
                <div className="relative h-16">
                  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-slate-700/80" />
                  <div className="absolute inset-y-0 left-0 w-[1px] bg-slate-700/80" />
                  <div className="absolute inset-2 flex items-end gap-1">
                    {[40, 55, 48, 70, 65, 80, 76, 90, 84, 95, 100, 88, 92, 98].map((value, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-full bg-gradient-to-t from-primary/30 via-primary/70 to-emerald-400"
                        style={{ height: `${value}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
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
