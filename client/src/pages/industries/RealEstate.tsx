import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  ArrowRight, 
  Clock, 
  Users, 
  Calendar,
  PhoneOff,
  CheckCircle2,
  MessageSquare,
  Zap,
  Globe,
  Home,
  MapPin,
  Phone
} from "lucide-react";

import reales1Image from "@/assets/reales1.png";
import reales2Image from "@/assets/reales2.png";
import reales3Image from "@/assets/reales3.png";
import reales4Image from "@/assets/reales4.png";
import realessol1Image from "@/assets/realessol1.png";
import realessol2Image from "@/assets/realessol2.png";
import realessol3Image from "@/assets/realessol3.png";
import realessol4Image from "@/assets/realessol4.png";

const problems = [
  {
    icon: <PhoneOff className="w-6 h-6" />,
    title: "Missed Lead Inquiries",
    description: "Potential buyers inquire at all hours. Missing these calls or delayed responses means losing them to competitors who respond first.",
    stat: "78%",
    statLabel: "leads go to first responder",
    image: reales2Image
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Time-Consuming Lead Qualification",
    description: "Agents spend hours qualifying leads manually, only to find many aren't serious buyers or don't meet financing criteria.",
    stat: "60%",
    statLabel: "of leads are unqualified",
    image: reales1Image
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Scheduling Chaos",
    description: "Coordinating property viewings between buyers, sellers, and agents creates endless back-and-forth communication.",
    stat: "5hrs",
    statLabel: "weekly on scheduling",
    image: reales4Image
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Repetitive Property Questions",
    description: "Agents answer the same questions about listings repeatedly - price, location, amenities, availability - consuming valuable time.",
    stat: "40%",
    statLabel: "time on repetitive Q&A",
    image: reales3Image
  }
];

const solutions = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "24/7 Lead Capture & Response",
    description: "Never miss a lead again. AI agent responds instantly to property inquiries via WhatsApp, website chat, or voice calls, any time of day.",
    benefits: ["Chat & voice support", "Capture leads while you sleep", "78% higher conversion rate"],
    image: realessol1Image
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Automated Lead Qualification",
    description: "AI asks the right questions to qualify leads based on budget, timeline, financing status, and property preferences.",
    benefits: ["Pre-qualified leads only", "Custom qualification criteria", "Save 10+ hours weekly"],
    image: realessol4Image
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Smart Viewing Scheduler",
    description: "AI handles the entire scheduling process, finding times that work for all parties and sending automatic reminders.",
    benefits: ["Zero scheduling conflicts", "Automatic reminders", "Calendar integration"],
    image: realessol2Image
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Instant Property Information",
    description: "AI provides detailed property information, neighborhood insights, and pricing instantly from your listing database.",
    benefits: ["Answer any property question", "Multilingual support", "Always accurate and updated"],
    image: realessol3Image
  }
];

const integrations = [
  { name: "Zillow", icon: <Home className="w-6 h-6" /> },
  { name: "Realtor.com", icon: <Building2 className="w-6 h-6" /> },
  { name: "WhatsApp", icon: <MessageSquare className="w-6 h-6" /> },
  { name: "Voice Calls", icon: <Phone className="w-6 h-6" /> },
  { name: "Google Calendar", icon: <Calendar className="w-6 h-6" /> },
  { name: "MLS", icon: <MapPin className="w-6 h-6" /> },
];

export default function RealEstateIndustry() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 mb-6 border border-emerald-500/20">
              <Building2 size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Real Estate Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              Close More Deals with <span className="text-primary">AI-Powered</span> Lead Management
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Qualify leads instantly, schedule viewings automatically, and never miss an inquiry with an AI agent that handles chat, WhatsApp, and voice calls around the clock.
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
                The <span className="text-destructive">Challenges</span> Real Estate Agents Face
              </h2>
              <p className="text-lg text-muted-foreground">
                These pain points are preventing agents from closing more deals and scaling their business.
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
                Our AI agent is purpose-built to help real estate professionals close more deals faster.
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
              Seamlessly integrates with your real estate tools
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
                  <div className="text-emerald-600">{integration.icon}</div>
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
              className="relative rounded-[2rem] bg-gradient-to-br from-emerald-600 to-teal-600 overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                  Ready to Close More Real Estate Deals?
                </h2>
                <p className="text-white/80 text-lg mb-10">
                  Join leading real estate professionals using Cartiva AI to qualify leads faster and never miss an opportunity.
                </p>
                
                <Link href="/book-demo">
                  <Button size="lg" className="h-14 px-8 text-lg bg-white text-emerald-600 hover:bg-white/90">
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
