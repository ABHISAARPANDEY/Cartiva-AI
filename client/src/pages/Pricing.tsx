import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, Star, Shield } from "lucide-react";
import { useState } from "react";
import { plans } from "@/data/plans";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-transparent overflow-visible">
      <Navbar variant="dark" />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              Simple, <span className="text-primary">transparent</span> pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Choose the plan that fits your brand's growth. Scale up or down at any time.
            </p>

            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-14 h-7 rounded-full bg-secondary border border-border transition-colors focus:outline-none"
              >
                <motion.div
                  animate={{ x: billingCycle === 'monthly' ? 2 : 28 }}
                  className="absolute top-1 w-5 h-5 rounded-full bg-primary shadow-sm"
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly <span className="ml-1 text-accent font-bold text-xs uppercase tracking-wider">Save 20%</span>
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const buttonHref = plan.isCustom
                ? "/book-demo"
                : `/checkout?plan=${plan.id}`;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-8 rounded-3xl border ${
                    plan.highlight
                      ? 'border-primary shadow-2xl shadow-primary/20 bg-primary/[0.02]'
                      : 'border-border bg-card'
                  } flex flex-col`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                      <Star size={12} fill="currentColor" /> Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-xl font-bold font-heading mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      {plan.isCustom ? (
                        <span className="text-4xl font-black text-foreground">
                          Custom
                        </span>
                      ) : (
                        <>
                          <span className="text-4xl font-black text-foreground">
                            ${billingCycle === 'yearly' ? Math.floor(Number(plan.price) * 0.8) : plan.price}
                          </span>
                          <span className="text-muted-foreground font-medium">/mo</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <div className={`mt-0.5 w-5 h-5 rounded-full ${plan.highlight ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'} flex items-center justify-center shrink-0`}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-foreground/80 font-medium leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={buttonHref}>
                    <Button
                      size="lg"
                      className={`w-full h-12 text-base font-bold transition-all ${
                        plan.highlight
                          ? 'bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {plan.buttonText}
                      <Zap size={16} className="ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-12 border-t border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                <Shield size={20} />
              </div>
              <p className="text-sm font-medium">Secure Payment Processing</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Check size={20} />
              </div>
              <p className="text-sm font-medium">Cancel Anytime</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary text-muted-foreground flex items-center justify-center">
                <Star size={20} />
              </div>
              <p className="text-sm font-medium">7-Day Free Trial</p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
