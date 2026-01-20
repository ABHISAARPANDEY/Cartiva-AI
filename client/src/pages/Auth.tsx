import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, ArrowRight, Github, Mail, Sparkles } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In mockup mode, we just redirect to home or dashboard
    setLocation("/");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 w-fit mb-4 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Bot size={20} />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">Cartiva AI</span>
            </Link>
            <h1 className="text-3xl font-heading font-bold">
              {isLogin ? "Welcome back" : "Scale your brand"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Enter your credentials to access your dashboard" 
                : "Join 500+ D2C brands automating their growth"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="name@company.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <button type="button" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full h-11 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              {isLogin ? "Sign in" : "Create account"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 border-border">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" className="h-11 border-border">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-primary hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right Side: Visual/Branding */}
      <div className="hidden lg:flex flex-col bg-slate-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 pointer-events-none" />
        
        {/* Animated Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%">
            <pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#auth-grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-auto">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Bot size={24} />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight">Cartiva AI</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-foreground text-xs font-bold uppercase tracking-widest border border-white/10">
              <Sparkles size={14} />
              Featured Partner of Shopify
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              Start automating your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">customer success.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-md leading-relaxed">
              "Cartiva AI has completely transformed our support operations. We've seen a 70% reduction in tickets within 2 weeks."
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" />
              </div>
              <div>
                <p className="font-bold">Sarah Jenkins</p>
                <p className="text-sm text-slate-500">COO, Modern Home D2C</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-auto pt-8 flex items-center justify-between text-sm text-slate-500">
            <p>&copy; 2026 Cartiva AI Inc.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
