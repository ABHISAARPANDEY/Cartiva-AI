import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Bot, MessageCircle, ChevronDown } from "lucide-react";
import { TryNowButton } from "@/components/TryNowButton";

const industries = [
  { name: "E-commerce", href: "/industries/ecommerce" },
  { name: "Real Estate", href: "/industries/real-estate" },
  { name: "Finance", href: "/industries/finance" },
  { name: "Healthcare", href: "/industries/healthcare" },
];

interface HeroSectionProps {
  includeNav?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  includeNav = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="relative w-full bg-transparent text-white overflow-hidden">
      <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-screen ${!includeNav ? "pt-24" : ""}`}>
        {includeNav && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 backdrop-blur-3xl bg-black/50 rounded-2xl py-4 flex justify-between items-center mb-12"
          >
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                  <Bot size={20} />
                </div>
                <span className="font-heading font-bold text-xl tracking-tight text-white">
                  Cartiva AI
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <Link href="/#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="/how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  How it Works
                </Link>
                <div
                  className="relative"
                  onMouseEnter={() => setIndustriesOpen(true)}
                  onMouseLeave={() => setIndustriesOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Industries
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${industriesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {industriesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-black/95 border border-gray-700 rounded-xl shadow-xl py-2 z-50">
                      {industries.map((industry) => (
                        <Link
                          key={industry.name}
                          href={industry.href}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 transition-colors text-white"
                        >
                          <span className="text-sm font-medium">{industry.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link href="/integrations" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Integrations
                </Link>
                <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/test-agent" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Test the Agent
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/book-demo">
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-full text-sm font-medium transition-colors text-primary-foreground">
                  Book a Demo
                </button>
              </Link>
              <button
                className="md:hidden p-2 rounded-md focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {includeNav && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-lg">
              <button className="absolute top-6 right-6 p-2" onClick={() => setMobileMenuOpen(false)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-white hover:text-gray-300">
                Features
              </Link>
              <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-white hover:text-gray-300">
                How it Works
              </Link>
              {industries.map((industry) => (
                <Link
                  key={industry.name}
                  href={industry.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 text-white hover:text-gray-300"
                >
                  {industry.name}
                </Link>
              ))}
              <Link href="/integrations" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-white hover:text-gray-300">
                Integrations
              </Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-white hover:text-gray-300">
                Pricing
              </Link>
              <Link href="/test-agent" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-white hover:text-gray-300">
                Test the Agent
              </Link>
              <Link href="/book-demo" onClick={() => setMobileMenuOpen(false)}>
                <button className="px-6 py-3 bg-primary rounded-full text-primary-foreground font-medium">
                  Book a Demo
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-30 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 w-fit mb-6"
          >
            <MessageCircle size={14} className="animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white/90">
              Website • WhatsApp • Voice Calls
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-heading font-extrabold mb-2 leading-tight"
          >
            Cartiva AI for Marketing, Sales, & Support for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">
              Ecommerce & D2C
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl"
          >
            Deploy an AI agent that captures leads, closes sales, and handles support 24/7 via chat, WhatsApp, and voice calls. Turn every visitor into a customer.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <TryNowButton variant="hero" isDark />
            <Link href="/how-it-works">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="min-w-[180px] px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                See How It Works
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 text-sm text-gray-400 mt-6"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="w-10 h-10 rounded-full border-2 border-black bg-gray-700 flex items-center justify-center overflow-hidden shadow-sm"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`}
                    alt="Avatar"
                  />
                </motion.div>
              ))}
            </div>
            <p className="font-medium text-white/80">
              Trusted by <span className="font-bold text-white">50+</span> growing businesses
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
