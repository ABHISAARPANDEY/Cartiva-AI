import { motion } from "framer-motion";
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
    title: "Instant WhatsApp Support",
    description: "Handle order tracking, delivery updates, and common queries automatically 24/7."
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Returns & Refunds",
    description: "Automate the return process with smart eligibility checks and instant labels."
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Abandoned Cart Recovery",
    description: "Send personalized reminders on WhatsApp to recover lost sales instantly."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Smart Upselling",
    description: "Recommend products based on customer history and preferences during chat."
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: "Multilingual AI",
    description: "Speak your customer's language. Support for English, Hindi, and regional dialects."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "10-Minute Setup",
    description: "Plug-and-play integration with Shopify. No coding required."
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Everything you need to scale</h2>
          <p className="text-lg text-muted-foreground">
            Cartiva AI replaces your manual support tasks with intelligent automation, letting you focus on growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
