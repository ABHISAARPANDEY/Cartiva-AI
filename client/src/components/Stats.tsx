import { motion } from "framer-motion";

const stats = [
  { label: "Automated Conversations", value: "70%" },
  { label: "Setup Time", value: "< 10 min" },
  { label: "ROI Improvement", value: "3.5x" },
  { label: "Languages Supported", value: "12+" },
];

export function Stats() {
  return (
    <section className="py-12 border-y border-border/50 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading mb-1">{stat.value}</h3>
              <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
