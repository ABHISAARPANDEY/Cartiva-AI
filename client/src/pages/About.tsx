import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Target, Lightbulb, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Customer-First",
    description: "Every decision we make starts with how it will benefit our customers and help them succeed."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible with AI to deliver cutting-edge solutions."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe the best results come from working together, both internally and with our partners."
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We operate with transparency and honesty in everything we do, building trust with our community."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              About <span className="text-primary">Cartiva AI</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to empower every D2C brand with enterprise-grade AI automation, 
              making exceptional customer experiences accessible to businesses of all sizes.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="bg-card rounded-3xl border border-border p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Cartiva AI was founded with a simple observation: while large enterprises had access to 
                  sophisticated customer support automation, smaller D2C brands were left struggling with 
                  manual processes and generic solutions that didn't understand their unique needs.
                </p>
                <p>
                  We set out to change that. Our team of AI researchers, e-commerce veterans, and customer 
                  experience specialists came together to build a platform that brings the power of advanced 
                  conversational AI to brands of all sizes.
                </p>
                <p>
                  Today, Cartiva AI powers customer conversations for hundreds of D2C brands, helping them 
                  deliver personalized, instant support across WhatsApp, web chat, and more—while dramatically 
                  reducing operational costs and increasing customer satisfaction.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon size={24} />
                  </div>
                  <h3 className="font-bold font-heading text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-primary/5 rounded-3xl border border-primary/20 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To democratize AI-powered customer experience, enabling every D2C brand to deliver 
                instant, personalized, and delightful support that builds lasting customer relationships 
                and drives sustainable growth.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
