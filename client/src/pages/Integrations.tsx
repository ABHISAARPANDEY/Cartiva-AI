import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageSquare, Database, Globe, Share2, Zap } from "lucide-react";

const integrations = [
  {
    category: "Ecommerce Platforms",
    apps: [
      { name: "Shopify", icon: <ShoppingBag className="text-[#96BF48]" />, status: "Official Partner", description: "One-click sync for orders, products, and inventory." },
      { name: "WooCommerce", icon: <ShoppingBag className="text-[#96588A]" />, status: "Coming Soon", description: "Native integration for WordPress-based stores." }
    ]
  },
  {
    category: "Messaging Channels",
    apps: [
      { name: "WhatsApp", icon: <MessageSquare className="text-[#25D366]" />, status: "Native", description: "Official Business API integration for seamless chat." },
      { name: "Instagram", icon: <Share2 className="text-[#E4405F]" />, status: "Beta", description: "Automate DMs and story replies with AI." },
      { name: "Website Chat", icon: <Globe className="text-primary" />, status: "Native", description: "Lightweight floating bubble for your storefront." }
    ]
  },
  {
    category: "CRM & Support",
    apps: [
      { name: "Gorgias", icon: <Database className="text-[#4D65F3]" />, status: "Beta", description: "Sync tickets and customer history effortlessly." },
      { name: "Zendesk", icon: <Database className="text-[#03363D]" />, status: "Upcoming", description: "Enterprise-grade support ticket synchronization." }
    ]
  }
];

export default function Integrations() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
              <Zap size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Expand your ecosystem</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              Built for your <span className="text-primary">tech stack</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cartiva AI integrates with the tools you already use. Connect your store and favorite apps in minutes.
            </p>
          </motion.div>

          <div className="space-y-16">
            {integrations.map((category, idx) => (
              <div key={idx} className="space-y-8">
                <h2 className="text-2xl font-heading font-bold px-4">{category.category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.apps.map((app, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-xl"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                          {app.icon}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                          app.status === 'Native' ? 'bg-green-100 text-green-700' : 'bg-secondary text-muted-foreground'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 font-heading">{app.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {app.description}
                      </p>
                      <Button variant="ghost" size="sm" className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-colors">
                        View Setup Guide
                        <Zap size={14} className="ml-2" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-32 p-12 rounded-3xl bg-primary/5 border border-primary/10 text-center"
          >
            <h2 className="text-2xl font-heading font-bold mb-4">Missing an integration?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              We're constantly adding new partners. Let us know what tools you need to connect and we'll prioritize them.
            </p>
            <Button size="lg" variant="outline" className="border-primary/20">
              Request Integration
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
