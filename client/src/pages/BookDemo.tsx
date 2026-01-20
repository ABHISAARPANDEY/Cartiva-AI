import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Calendar, Clock, Globe } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function BookDemo() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Demo Request Sent!",
      description: "We'll reach out within 24 hours to schedule your session.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Side: Content */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight text-foreground">
                    See Cartiva AI <span className="text-primary">in Action</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Schedule a 20-minute personalized demo to see how our AI can transform your sales and support.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">Personalized Walkthrough</h3>
                      <p className="text-muted-foreground">See how Cartiva works for your specific industry.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">ROI Calculation</h3>
                      <p className="text-muted-foreground">We'll help you estimate your potential cost savings.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Globe className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">Integration Support</h3>
                      <p className="text-muted-foreground">Get answers to your technical and platform questions.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
                  <p className="italic text-muted-foreground mb-4">
                    "The demo was eye-opening. We didn't realize how much revenue we were leaving on the table until we saw the AI's recovery features."
                  </p>
                  <p className="font-bold text-sm text-foreground">— Michael R., Founder of ShopSwift</p>
                </div>
              </motion.div>

              {/* Right Side: Form */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-[2rem] p-8 md:p-10 shadow-2xl">
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={40} />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">Request Received!</h2>
                      <p className="text-muted-foreground">
                        Thank you for your interest. A member of our team will contact you shortly to confirm your demo time.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline">
                        Send another request
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input id="email" type="email" placeholder="john@company.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website URL</Label>
                        <Input id="website" placeholder="https://example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select required onValueChange={() => {}}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ecommerce">Ecommerce</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="saas">SaaS</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Anything else?</Label>
                        <Textarea id="message" placeholder="Tell us about your goals..." className="h-24" />
                      </div>
                      <Button type="submit" className="w-full h-12 text-lg font-bold shadow-xl shadow-primary/20">
                        Book My Demo
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground">
                        By submitting, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
