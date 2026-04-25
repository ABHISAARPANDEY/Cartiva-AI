import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPlanById, plans } from "@/data/plans";
import { setPendingPlanId } from "@/lib/userStore";

function getPlanFromQuery(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("plan");
}

export default function Checkout() {
  const [, navigate] = useLocation();
  const [planId, setPlanId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [card, setCard] = useState({
    name: "",
    number: "4242 4242 4242 4242",
    expiry: "12 / 28",
    cvc: "123",
  });

  useEffect(() => {
    const id = getPlanFromQuery();
    if (id) {
      setPlanId(id);
    } else {
      setPlanId("growth");
    }
  }, []);

  const plan = getPlanById(planId);
  const isCustom = plan?.isCustom;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
    }, 1600);
  };

  const handleContinue = () => {
    if (!plan) return;
    setPendingPlanId(plan.id);
    navigate(`/onboarding?plan=${plan.id}`);
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navbar variant="dark" />
        <main className="pt-32 pb-20 container mx-auto px-4 text-center text-white">
          <p className="text-lg text-muted-foreground">Plan not found.</p>
          <Link href="/pricing">
            <Button className="mt-6">Back to pricing</Button>
          </Link>
        </main>
      </div>
    );
  }

  if (isCustom) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navbar variant="dark" />
        <main className="pt-32 pb-20 container mx-auto px-4 max-w-2xl text-center">
          <div className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-10">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
              Let's tailor an Enterprise plan for you
            </h1>
            <p className="text-muted-foreground mb-8">
              Our team will reach out within 24 hours to scope your usage,
              integrations and pricing.
            </p>
            <Link href="/book-demo">
              <Button size="lg">Talk to Sales</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar variant="dark" />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/pricing">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to pricing
            </button>
          </Link>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="grid lg:grid-cols-[1.1fr_1fr] gap-8"
              >
                <div className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-8 md:p-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-foreground">
                        Secure checkout
                      </h2>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Lock className="w-3 h-3" /> Mock payment — no card is
                        charged
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handlePay} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on card</Label>
                      <Input
                        id="card-name"
                        placeholder="Jane Doe"
                        value={card.name}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, name: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card number</Label>
                      <Input
                        id="card-number"
                        value={card.number}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, number: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-exp">Expiry</Label>
                        <Input
                          id="card-exp"
                          value={card.expiry}
                          onChange={(e) =>
                            setCard((c) => ({ ...c, expiry: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvc">CVC</Label>
                        <Input
                          id="card-cvc"
                          value={card.cvc}
                          onChange={(e) =>
                            setCard((c) => ({ ...c, cvc: e.target.value }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isProcessing}
                      className="w-full h-12 text-base font-bold"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing payment…
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Pay ${plan.price} & activate plan
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> 256-bit SSL
                      </span>
                      <span className="flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> PCI-compliant
                      </span>
                    </div>
                  </form>
                </div>

                <div className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-8 md:p-10 h-fit">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    Order summary
                  </h3>

                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="text-2xl font-heading font-bold">
                      {plan.name}
                    </h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black">
                        ${plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /mo
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {plan.features.slice(0, 5).map((f) => (
                      <div
                        key={f}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${plan.price}.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Setup fee</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-foreground text-base pt-2 border-t border-white/10">
                      <span>Due today</span>
                      <span>${plan.price}.00</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto rounded-3xl border border-emerald-500/30 bg-card/60 backdrop-blur-xl p-10 text-center shadow-2xl shadow-emerald-500/10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 220,
                  }}
                  className="mx-auto w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-10 h-10" strokeWidth={2.5} />
                </motion.div>

                <h2 className="text-3xl font-heading font-bold text-foreground mb-3">
                  Payment successful!
                </h2>
                <p className="text-muted-foreground mb-2">
                  Your{" "}
                  <span className="text-foreground font-semibold">
                    {plan.name}
                  </span>{" "}
                  plan is now active.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  A receipt has been sent to your email. Let's set up your AI
                  agent.
                </p>

                <Button
                  size="lg"
                  className="w-full h-12 text-base font-bold"
                  onClick={handleContinue}
                >
                  Continue to setup
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>

                <div className="flex items-center justify-center gap-2 pt-4 text-xs text-muted-foreground">
                  Order ID • CV-{Date.now().toString().slice(-8)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!success && (
            <div className="mt-12 text-center text-xs text-muted-foreground/80">
              Need a different plan?{" "}
              <Link
                href="/pricing"
                className="underline hover:text-foreground transition-colors"
              >
                Browse all {plans.length} options
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
