import { motion } from "framer-motion";
import dashboardImage from "@assets/generated_images/modern_saas_analytics_dashboard_mockup.png";
import { Check } from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border bg-slate-50 dark:bg-slate-900 p-2">
               <img 
                src={dashboardImage} 
                alt="Cartiva Dashboard" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Real-time insights at your fingertips
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Track every conversation, sale, and support ticket in one unified dashboard. See exactly how much revenue AI is generating for your brand.
            </p>

            <ul className="space-y-4">
              {[
                "Monitor conversation volume and resolution rates",
                "Track revenue recovered from abandoned carts",
                "Analyze customer sentiment in real-time",
                "View operational savings and ROI instantly"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
