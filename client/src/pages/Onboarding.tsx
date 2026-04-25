import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Globe,
  Loader2,
  Sparkles,
  User,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPlanById } from "@/data/plans";
import {
  buildInitialUserState,
  clearPendingPlanId,
  getPendingPlanId,
  saveUserState,
  type UserDetails,
} from "@/lib/userStore";

function getPlanIdFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const fromQuery = new URLSearchParams(window.location.search).get("plan");
  return fromQuery || getPendingPlanId();
}

const INDUSTRIES = [
  "E-commerce / D2C",
  "Real Estate",
  "Finance",
  "Healthcare",
  "Education",
  "Travel",
  "Other",
];

const LANGUAGES = ["English", "Hindi", "Spanish", "Arabic", "Multi-lingual"];

export default function Onboarding() {
  const [, navigate] = useLocation();
  const [planId, setPlanId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    website: "",
    industry: "E-commerce / D2C",
    agentName: "Cartiva Concierge",
    agentLanguage: "English",
  });

  useEffect(() => {
    setPlanId(getPlanIdFromUrl());
  }, []);

  const plan = getPlanById(planId);

  const update = (k: keyof UserDetails, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;
    setSubmitting(true);
    setTimeout(() => {
      const state = buildInitialUserState(plan, form);
      saveUserState(state);
      clearPendingPlanId();
      navigate("/dashboard");
    }, 900);
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navbar variant="dark" />
        <main className="pt-32 pb-20 container mx-auto px-4 text-center">
          <p className="text-muted-foreground">No active plan selected.</p>
          <Link href="/pricing">
            <Button className="mt-6">Pick a plan</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar variant="dark" />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-8 md:p-12"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold text-primary">
                Step 2 of 2
              </span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                {plan.name} plan
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Set up your AI agent
            </h1>
            <p className="text-muted-foreground mb-8">
              Tell us about your business so we can configure your agent and
              assign a dedicated associate to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Section title="Your details" icon={<User className="w-4 h-4" />}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name">
                    <Input
                      required
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      placeholder="Jane"
                    />
                  </Field>
                  <Field label="Last name">
                    <Input
                      required
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      placeholder="Doe"
                    />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Work email">
                    <Input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="jane@brand.com"
                    />
                  </Field>
                  <Field label="Phone">
                    <Input
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </Field>
                </div>
              </Section>

              <Section
                title="Business details"
                icon={<Briefcase className="w-4 h-4" />}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Business name">
                    <Input
                      required
                      value={form.businessName}
                      onChange={(e) => update("businessName", e.target.value)}
                      placeholder="Acme D2C"
                    />
                  </Field>
                  <Field label="Website">
                    <Input
                      required
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      placeholder="https://acme.com"
                    />
                  </Field>
                </div>
                <Field label="Industry">
                  <Select
                    value={form.industry}
                    onValueChange={(v) => update("industry", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((i) => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </Section>

              <Section
                title="Agent configuration"
                icon={<Bot className="w-4 h-4" />}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Agent display name">
                    <Input
                      value={form.agentName}
                      onChange={(e) => update("agentName", e.target.value)}
                    />
                  </Field>
                  <Field label="Primary language">
                    <Select
                      value={form.agentLanguage}
                      onValueChange={(v) => update("agentLanguage", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((l) => (
                          <SelectItem key={l} value={l}>
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </Section>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base font-bold"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting up your dashboard…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Launch my dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                <Globe className="w-3 h-3 inline mr-1" />
                Your data is stored locally in this demo session.
              </p>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-bold text-foreground">
        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        {title}
      </div>
      <div className="space-y-4 pl-9">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
