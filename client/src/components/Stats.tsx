import { motion } from "framer-motion";

const stats = [
  { label: "Automated Conversations", value: "70%" },
  { label: "Setup Time", value: "< 10 min" },
  { label: "ROI Improvement", value: "3.5x" },
  { label: "Languages Supported", value: "12+" },
];

export function Stats() {
  return (
    <section className="py-12 border-y border-white/10 bg-black/60 relative overflow-visible">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1 
              }}
              className="text-center group"
            >
              <motion.h3 
                whileHover={{ scale: 1.1 }}
                className="text-3xl md:text-4xl font-bold text-primary font-heading mb-1 cursor-default"
              >
                {stat.value}
              </motion.h3>
              <p className="text-sm md:text-base text-muted-foreground font-medium group-hover:text-foreground transition-colors">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
