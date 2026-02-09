import { motion, Variants } from "framer-motion";
import { 
  ShoppingBag, 
  MessageCircle, 
  RefreshCw, 
  TrendingUp, 
  Languages, 
  Zap,
  Target,
  Clock,
  Phone
} from "lucide-react";

const features = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "24/7 Instant Engagement",
    description: "Reply to every query instantly on WhatsApp, website chat, and voice calls. Never lose a lead to slow response times again."
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "AI Voice Agent",
    description: "Handle inbound and outbound calls with our intelligent voice agent. Natural conversations that qualify leads and close sales over the phone."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Lead Qualification AI",
    description: "Automatically qualify leads, book meetings, and capture data via chat or voice. Focus your team's time only on high-value prospects."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Sales & Upsell Automation",
    description: "Close more sales with an AI that proactively recommends products and recovers abandoned carts via WhatsApp and voice calls."
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Smart Support Deflection",
    description: "Automate up to 70% of repetitive questions, order tracking, and service requests across chat and voice without hiring more staff."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Universal Integration",
    description: "Works on any website—Shopify, WooCommerce, custom builds—plus WhatsApp and phone systems. Setup in under 10 minutes."
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
    <section id="features" className="py-20 bg-black/70 overflow-visible">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">Built for Maximum Conversion</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cartiva AI is your all-in-one agent for sales, lead capture, and instant support—designed to grow your revenue around the clock.
          </p>
        </motion.div>

        {/* On mobile: slider of cards to avoid long scrolling */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="md:hidden"
        >
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="min-w-[80%] snap-center group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: 3 }}
                    className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2 font-heading group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop grid, minimal extra scroll but high scan speed */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
