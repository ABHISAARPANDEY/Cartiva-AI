import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Bot, MessageCircle, User, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type IndustryKey = "ecommerce" | "real-estate" | "finance" | "healthcare";
type ScenarioKey = "lead" | "support" | "cart" | "booking";

interface ConversationTurn {
  from: "user" | "agent";
  text: string;
  emphasis?: boolean;
}

const scenarios: Record<
  IndustryKey,
  {
    label: string;
    cases: {
      key: ScenarioKey;
      label: string;
      description: string;
      conversation: ConversationTurn[];
    }[];
  }
> = {
  ecommerce: {
    label: "E-commerce",
    cases: [
      {
        key: "lead",
        label: "New visitor → product fit",
        description: "See how the agent guides a first-time visitor to the right product.",
        conversation: [
          {
            from: "user",
            text: "Hi, I'm looking for running shoes for daily use.",
          },
          {
            from: "agent",
            text: "Great! Are you running mostly on roads or trails, and what's your usual budget range?",
          },
          {
            from: "user",
            text: "Mostly road running, budget around ₹4,000–₹5,000.",
          },
          {
            from: "agent",
            text: "Perfect. Based on your budget and use, I'd suggest our 'Velocity Road Runner' series. They have extra cushioning for daily runs and come with a 30-day comfort guarantee.",
          },
          {
            from: "agent",
            emphasis: true,
            text: "Would you like me to add your size to cart or share 2–3 options first?",
          },
        ],
      },
      {
        key: "cart",
        label: "Abandoned cart recovery",
        description: "How the agent recovers an abandoned cart on WhatsApp.",
        conversation: [
          {
            from: "agent",
            text: "Hey Abhisaar, you left your Bluetooth earbuds in the cart. Still thinking about them?",
          },
          {
            from: "user",
            text: "Yeah, I was not sure about the battery life.",
          },
          {
            from: "agent",
            text: "Totally fair. This model gives up to 32 hours total playtime, and we offer a 7-day no-questions return if they don't fit your use.",
          },
          {
            from: "agent",
            emphasis: true,
            text: "If you checkout in the next 30 minutes, I can apply an extra 5% off for you. Want me to send a secure payment link?",
          },
        ],
      },
      {
        key: "support",
        label: "Order support",
        description: "Order tracking and policies, handled without a human.",
        conversation: [
          {
            from: "user",
            text: "Where is my order #CB-4829?",
          },
          {
            from: "agent",
            text: "Checking that for you now… Found it! Order #CB-4829 was shipped yesterday via Bluedart and is expected to arrive by Friday.",
          },
          {
            from: "agent",
            text: "Here’s your live tracking link: [Open tracking].",
          },
          {
            from: "agent",
            emphasis: true,
            text: "If it doesn’t arrive by Friday, I’ll automatically open a follow-up with our logistics team and update you.",
          },
        ],
      },
    ],
  },
  "real-estate": {
    label: "Real Estate",
    cases: [
      {
        key: "lead",
        label: "Property lead qualification",
        description: "Agent qualifies a buyer lead and books a visit.",
        conversation: [
          {
            from: "user",
            text: "I'm interested in 2BHK flats in Bangalore around ₹80L.",
          },
          {
            from: "agent",
            text: "Noted. Which localities do you prefer, and are you looking for ready-to-move or under-construction?",
          },
          {
            from: "user",
            text: "Prefer Whitefield, ready-to-move.",
          },
          {
            from: "agent",
            text: "We have 3 projects in Whitefield that fit your budget and are ready-to-move. Would you like a virtual tour link, or should I book a site visit?",
          },
          {
            from: "agent",
            emphasis: true,
            text: "I can schedule a visit for this weekend and send you a calendar invite in under a minute.",
          },
        ],
      },
      {
        key: "booking",
        label: "Visit booking",
        description: "Scheduling and confirming a property visit.",
        conversation: [
          {
            from: "user",
            text: "Can I visit the Lakeside Residency project this week?",
          },
          {
            from: "agent",
            text: "Sure. We have open slots on Wednesday 4–6 PM and Saturday 11 AM–2 PM. Which one works better for you?",
          },
          {
            from: "user",
            text: "Saturday 11 AM.",
          },
          {
            from: "agent",
            text: "Done. I’ve blocked a slot for Saturday 11 AM and shared a calendar invite with directions and parking details.",
          },
        ],
      },
    ],
  },
  finance: {
    label: "Finance",
    cases: [
      {
        key: "lead",
        label: "Loan eligibility",
        description: "Pre-qualifying a user for a loan.",
        conversation: [
          {
            from: "user",
            text: "Am I eligible for a personal loan of ₹5L?",
          },
          {
            from: "agent",
            text: "I can help with that. May I know your net monthly income and if you already have ongoing EMIs?",
          },
          {
            from: "user",
            text: "Net income is ₹90k, I have one EMI of ₹10k.",
          },
          {
            from: "agent",
            text: "Got it. Based on your inputs, you’re likely eligible for up to ₹6.5L with a tenure of 24–48 months, subject to final checks.",
          },
          {
            from: "agent",
            emphasis: true,
            text: "Would you like me to start a quick pre-approval in the background? It only takes 2 minutes.",
          },
        ],
      },
      {
        key: "support",
        label: "Account support",
        description: "Simple account queries answered instantly.",
        conversation: [
          {
            from: "user",
            text: "What are the forex charges on my card?",
          },
          {
            from: "agent",
            text: "For your card type, forex markup is 2% + GST. International ATM withdrawals also include a flat ₹250 fee.",
          },
          {
            from: "agent",
            emphasis: true,
            text: "If you like, I can email you a one-page summary of all fees and limits for quick reference.",
          },
        ],
      },
    ],
  },
  healthcare: {
    label: "Healthcare",
    cases: [
      {
        key: "booking",
        label: "Appointment booking",
        description: "Agent books and confirms a clinic appointment.",
        conversation: [
          {
            from: "user",
            text: "I want to book a dental check-up this week.",
          },
          {
            from: "agent",
            text: "Sure. Which city are you in, and do you prefer morning or evening slots?",
          },
          {
            from: "user",
            text: "Mumbai, evenings.",
          },
          {
            from: "agent",
            text: "We have availability with Dr. Shah on Thursday and Friday between 5–8 PM. What day and time works best?",
          },
          {
            from: "user",
            text: "Thursday 6 PM.",
          },
          {
            from: "agent",
            text: "Booked for Thursday 6 PM with Dr. Shah. I’ve sent you a WhatsApp confirmation with location and instructions.",
          },
        ],
      },
      {
        key: "support",
        label: "Follow-up & FAQs",
        description: "Post-visit questions and basic triage.",
        conversation: [
          {
            from: "user",
            text: "Is it normal to have mild pain after a root canal?",
          },
          {
            from: "agent",
            text: "Mild discomfort for 1–3 days is common. However, severe pain, swelling, or fever are not. In those cases you should contact your dentist immediately.",
          },
          {
            from: "agent",
            emphasis: true,
            text: "Would you like me to book a quick follow-up call with the clinic or share after-care instructions?",
          },
        ],
      },
    ],
  },
};

export default function TestAgent() {
  const [industry, setIndustry] = useState<IndustryKey>("ecommerce");
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("lead");

  const currentScenario = useMemo(() => {
    const group = scenarios[industry];
    return (
      group.cases.find((c) => c.key === scenarioKey) ?? group.cases[0]
    );
  }, [industry, scenarioKey]);

  return (
    <div className="min-h-screen bg-transparent overflow-visible">
      <Navbar variant="dark" />
      <main className="pt-28 md:pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-10 md:mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Live agent demo</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 tracking-tight">
                Test the Agent for <span className="text-primary">Your Use Case</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose an industry and scenario to see how Commerce-Brain would talk
                to your customers across chat, WhatsApp, and voice.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_minmax(0,1.4fr)] gap-8 lg:gap-10 items-start">
            {/* Controls */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card/80 p-5 md:p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-[0.2em]">
                  Configure scenario
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-[0.18em]">
                      Industry
                    </label>
                    <Select
                      value={industry}
                      onValueChange={(value) =>
                        setIndustry(value as IndustryKey)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(scenarios).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-[0.18em]">
                      Conversation type
                    </label>
                    <Tabs
                      value={scenarioKey}
                      onValueChange={(v) =>
                        setScenarioKey(v as ScenarioKey)
                      }
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="lead" className="text-xs">
                          Lead / Sales
                        </TabsTrigger>
                        <TabsTrigger value="support" className="text-xs">
                          Support / FAQs
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="lead" />
                      <TabsContent value="support" />
                    </Tabs>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-[0.18em]">
                      Quick presets
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {scenarios[industry].cases.map((c) => (
                        <Button
                          key={c.key}
                          type="button"
                          size="sm"
                          variant={
                            c.key === scenarioKey ? "default" : "outline"
                          }
                          className="justify-start h-9 text-xs"
                          onClick={() => setScenarioKey(c.key)}
                        >
                          {c.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-xs text-muted-foreground leading-relaxed">
                This playground uses curated, realistic scripts so you can quickly
                understand tone, structure, and hand-offs without connecting your
                data. In production, Commerce-Brain connects to your catalog, CRM,
                and logistics to answer with live information.
              </div>
            </div>

            {/* Conversation panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] p-4 md:p-6 flex flex-col gap-4 max-h-[620px]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                      Commerce-Brain
                    </span>
                    <span className="text-sm text-foreground">
                      {scenarios[industry].label} · {currentScenario.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  24/7 active
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {currentScenario.conversation.map((turn, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      turn.from === "agent" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`flex max-w-[80%] items-end gap-2 ${
                        turn.from === "agent" ? "" : "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center border border-white/10 ${
                          turn.from === "agent"
                            ? "bg-primary/20 text-primary"
                            : "bg-slate-800 text-slate-100"
                        }`}
                      >
                        {turn.from === "agent" ? (
                          <Bot className="w-3.5 h-3.5" />
                        ) : (
                          <User className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-3 py-2 text-xs md:text-sm leading-relaxed ${
                          turn.from === "agent"
                            ? "bg-slate-800/90 text-slate-50 border border-slate-700"
                            : "bg-primary text-primary-foreground border border-primary/60"
                        } ${
                          turn.emphasis
                            ? "ring-1 ring-accent/50 shadow-[0_0_20px_rgba(45,212,191,0.25)]"
                            : ""
                        }`}
                      >
                        {turn.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 flex items-center gap-2 text-[11px] text-slate-300">
                <MessageCircle className="w-3.5 h-3.5 text-primary" />
                <span>
                  In a real deployment, this window would connect to your live
                  agent over web chat, WhatsApp, or voice.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

