import { motion, Variants } from "framer-motion";
import { 
  ShoppingBag, 
  MessageCircle, 
  RefreshCw, 
  TrendingUp, 
  Languages, 
  Clock 
} from "lucide-react";

const features = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Instant AI Responses",
    description: "Reply to customers in seconds on WhatsApp and Web Chat. 24/7 coverage for FAQs, status, and sales."
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Automated Returns & Tracking",
    description: "Deflect 70% of support tickets by automating order tracking, return requests, and refund status."
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Cart Recovery on WhatsApp",
    description: "Automatically message customers on WhatsApp to recover lost sales and boost conversion rates."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Smart Upsell Agent",
    description: "Let AI recommend products based on chat history to increase your Average Order Value (AOV)."
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: "Hindi & English Support",
    description: "Built for Indian D2C brands. Native support for English, Hindi, and regional dialects."
  },
  {
    icon: <Clock className="w-12 h-12" />,
    title: "Plug-and-Play Setup",
    description: "Connect your Shopify store and go live in under 10 minutes. No technical team required."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export function Features() {
  return (
    <section id="features" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">Everything You Need to Scale Fast</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cartiva AI replaces manual tasks with intelligent automation, turning your support team into a revenue engine.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
