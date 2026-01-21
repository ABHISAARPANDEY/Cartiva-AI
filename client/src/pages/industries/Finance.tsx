import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Landmark, 
  ArrowRight, 
  Clock, 
  Shield, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Zap,
  Globe,
  CreditCard,
  PiggyBank,
  Phone
} from "lucide-react";

import fi1Image from "@/assets/fi1.png";
import fi2Image from "@/assets/fi2.png";
import fi3Image from "@/assets/fi3.png";
import fi4Image from "@/assets/fi4.png";
import fisol1Image from "@/assets/fisol1.png";
import fisol2Image from "@/assets/fisol2.png";
import fisol3Image from "@/assets/fisol3.png";
import fisol4Image from "@/assets/fisol4.png";

const problems = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Slow Loan Application Process",
    description: "Traditional loan applications take days or weeks. Customers expect instant decisions and get frustrated with lengthy processes.",
    stat: "67%",
    statLabel: "abandon slow applications",
    image: fi3Image
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "High Volume of Repetitive Queries",
    description: "Support teams spend most of their time answering the same questions about rates, eligibility, and account balances.",
    stat: "70%",
    statLabel: "queries are repetitive",
    image: fi4Image
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Compliance & Security Concerns",
    description: "Financial institutions must maintain strict compliance while still providing fast, efficient customer service.",
    stat: "24/7",
    statLabel: "compliance required",
    image: fi2Image
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Limited Availability",
    description: "Customers need financial advice and support outside business hours, but staffing 24/7 support is prohibitively expensive.",
    stat: "45%",
    statLabel: "inquiries after hours",
    image: fi1Image
  }
];

const solutions = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Pre-Qualification",
    description: "AI agent collects necessary information and provides instant loan pre-qualification decisions, dramatically speeding up the process.",
    benefits: ["Instant eligibility checks", "Reduce application time by 80%", "Higher completion rates"],
    image: fisol1Image
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Automated Query Resolution",
    description: "Handle 70% of customer inquiries instantly with AI that understands financial products and can provide accurate information.",
    benefits: ["Instant answers 24/7", "Reduce support tickets by 70%", "Consistent accurate responses"],
    image: fisol2Image
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Built-In Compliance",
    description: "AI agent is trained on compliance requirements and ensures every interaction meets regulatory standards.",
    benefits: ["GDPR & SOC2 compliant", "Audit trail for all conversations", "Secure data handling"],
    image: fisol3Image
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "24/7 Financial Guidance",
    description: "Provide round-the-clock support for account inquiries via chat or voice calls, product information, and financial guidance without additional staffing.",
    benefits: ["Chat & voice support", "Multilingual capabilities", "Seamless human handoff"],
    image: fisol4Image
  }
];

const integrations = [
  { name: "Banking APIs", icon: <Landmark className="w-6 h-6" /> },
  { name: "Credit Bureaus", icon: <FileText className="w-6 h-6" /> },
  { name: "WhatsApp", icon: <MessageSquare className="w-6 h-6" /> },
  { name: "Voice Calls", icon: <Phone className="w-6 h-6" /> },
  { name: "Payment Gateways", icon: <CreditCard className="w-6 h-6" /> },
  { name: "Website Chat", icon: <Globe className="w-6 h-6" /> },
];

export default function FinanceIndustry() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-600 mb-6 border border-violet-500/20">
              <Landmark size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Finance Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              Transform Financial Services with <span className="text-primary">Intelligent</span> AI
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Streamline loan applications, automate customer support via chat and voice calls, and maintain compliance with an AI agent built for financial institutions.
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
                The <span className="text-destructive">Challenges</span> Financial Institutions Face
              </h2>
              <p className="text-lg text-muted-foreground">
                These obstacles prevent financial services from delivering the fast, modern experience customers expect.
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
                Our AI agent is purpose-built for the financial industry with compliance and security at its core.
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
              Seamlessly integrates with your financial systems
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
                  <div className="text-violet-600">{integration.icon}</div>
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
              className="relative rounded-[2rem] bg-gradient-to-br from-violet-600 to-purple-600 overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                  Ready to Modernize Your Financial Services?
                </h2>
                <p className="text-white/80 text-lg mb-10">
                  Join forward-thinking financial institutions using Cartiva AI to deliver faster, compliant customer experiences.
                </p>
                
                <Link href="/book-demo">
                  <Button size="lg" className="h-14 px-8 text-lg bg-white text-violet-600 hover:bg-white/90">
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
