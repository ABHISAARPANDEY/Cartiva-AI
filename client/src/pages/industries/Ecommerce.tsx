import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  ArrowRight, 
  XCircle, 
  Clock, 
  Users, 
  TrendingDown,
  CheckCircle2,
  MessageSquare,
  Zap,
  Globe,
  ShoppingBag,
  Phone
} from "lucide-react";

import ecom1Image from "@/assets/ecom1.png";
import ecom2Image from "@/assets/ecom2.png";
import ecom3Image from "@/assets/ecom3.png";
import ecom4Image from "@/assets/ecom4.png";
import ecomsol1Image from "@/assets/ecomsol1.png";
import ecomsol2Image from "@/assets/ecomsol2.png";
import ecomsol3Image from "@/assets/ecomsol3.png";
import ecomsol4Image from "@/assets/ecomsol4.png";

const problems = [
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "High Cart Abandonment Rate",
    description: "70% of shoppers abandon their carts due to slow responses, complex checkout processes, or unanswered questions about products.",
    stat: "70%",
    statLabel: "carts abandoned",
    image: ecom1Image
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Slow Customer Support",
    description: "Customers expect instant responses. Delayed support leads to lost sales and negative reviews that damage your brand.",
    stat: "53%",
    statLabel: "leave without buying",
    image: ecom3Image
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Scaling Support is Expensive",
    description: "Hiring more support staff to handle peak seasons and growing demand quickly eats into profit margins.",
    stat: "3x",
    statLabel: "cost increase",
    image: ecom2Image
  },
  {
    icon: <XCircle className="w-6 h-6" />,
    title: "Poor Product Recommendations",
    description: "Generic recommendations fail to convert. Customers want personalized suggestions based on their unique preferences.",
    stat: "35%",
    statLabel: "revenue lost",
    image: ecom4Image
  }
];

const solutions = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI-Powered Cart Recovery",
    description: "Automatically reach out to customers who abandoned their carts via WhatsApp with personalized messages and incentives.",
    benefits: ["Recover up to 30% of abandoned carts", "Personalized follow-up messages", "Automated discount offers"],
    image: ecomsol1Image
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant 24/7 Support",
    description: "AI agent responds to customer queries in seconds via chat or voice calls, any time of day, handling 70% of conversations without human intervention.",
    benefits: ["Chat & voice support", "Handle unlimited conversations", "Seamless human handoff"],
    image: ecomsol3Image
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Cost-Effective Scaling",
    description: "Scale your support capacity without hiring more staff. Our AI handles peak loads effortlessly while maintaining quality.",
    benefits: ["80% reduction in support costs", "No seasonal hiring needed", "Consistent service quality"],
    image: ecomsol2Image
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Smart Product Recommendations",
    description: "AI learns customer preferences and browsing behavior to suggest products they're most likely to buy.",
    benefits: ["35% increase in average order value", "Personalized for each customer", "Real-time inventory awareness"],
    image: ecomsol4Image
  }
];

const integrations = [
  { name: "Shopify", icon: <ShoppingBag className="w-6 h-6" /> },
  { name: "WooCommerce", icon: <ShoppingCart className="w-6 h-6" /> },
  { name: "WhatsApp", icon: <MessageSquare className="w-6 h-6" /> },
  { name: "Voice Calls", icon: <Phone className="w-6 h-6" /> },
  { name: "Instagram", icon: <Globe className="w-6 h-6" /> },
  { name: "BigCommerce", icon: <ShoppingCart className="w-6 h-6" /> },
];

export default function EcommerceIndustry() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 mb-6 border border-blue-500/20">
              <ShoppingCart size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">E-commerce Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              Turn Browsers into <span className="text-primary">Buyers</span> with AI
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Recover abandoned carts, provide instant support, and boost sales with an AI agent that works 24/7 on your website, WhatsApp, and voice calls.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo">
                <Button size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90 shadow-xl">
                  Book My Free Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Problems Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                The <span className="text-destructive">Challenges</span> E-commerce Faces
              </h2>
              <p className="text-lg text-muted-foreground">
                These common pain points are costing online stores millions in lost revenue every year.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col rounded-2xl bg-background border border-border overflow-hidden"
                >
                  {/* Problem Infographic - Top */}
                  <div className="w-full h-56 bg-gradient-to-br from-secondary/50 to-secondary/30 flex items-center justify-center p-4">
                    <img 
                      src={problem.image} 
                      alt={`${problem.title} infographic`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content - Bottom */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                        {problem.icon}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-destructive">{problem.stat}</span>
                        <span className="text-sm text-muted-foreground">{problem.statLabel}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-3">{problem.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                How Cartiva AI <span className="text-primary">Solves</span> These Problems
              </h2>
              <p className="text-lg text-muted-foreground">
                Our AI agent is purpose-built to tackle e-commerce challenges and drive measurable results.
              </p>
            </motion.div>

            <div className="space-y-12">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                >
                  <div className="flex-1 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                      {solution.icon}
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-4">{solution.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{solution.description}</p>
                    <ul className="space-y-3">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Solution Infographic */}
                  <div className="flex-1 w-full max-w-lg rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/50 p-6 flex items-center justify-center">
                    <img 
                      src={solution.image} 
                      alt={`${solution.title} infographic`}
                      className="w-full h-auto max-h-80 object-contain"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations Banner */}
        <section className="py-16 bg-secondary/30 overflow-hidden">
          <div className="container mx-auto px-4 mb-8">
            <h3 className="text-center text-lg font-medium text-muted-foreground">
              Seamlessly integrates with your favorite e-commerce platforms
            </h3>
          </div>
          
          <div className="relative">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-12 items-center"
            >
              {[...integrations, ...integrations, ...integrations].map((integration, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-background border border-border whitespace-nowrap"
                >
                  <div className="text-primary">{integration.icon}</div>
                  <span className="font-medium">{integration.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[2rem] bg-gradient-to-br from-blue-600 to-primary overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                  Ready to Supercharge Your E-commerce Sales?
                </h2>
                <p className="text-white/80 text-lg mb-10">
                  Join 500+ e-commerce stores using Cartiva AI to recover carts, boost conversions, and scale support without increasing costs.
                </p>
                
                <Link href="/book-demo">
                  <Button size="lg" className="h-14 px-8 text-lg bg-white text-primary hover:bg-white/90">
                    Book My Free Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
