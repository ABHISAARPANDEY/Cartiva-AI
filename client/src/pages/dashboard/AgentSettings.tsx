import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Bot,
  Check,
  Globe,
  Headphones,
  Mail,
  MessageSquare,
  Phone,
  Save,
  Sparkles,
  Volume2,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DashboardLayout,
  useDashboardState,
} from "@/components/dashboard/DashboardLayout";
import { saveUserState, type UserState } from "@/lib/userStore";

const LANGUAGES = [
  "English",
  "Hindi",
  "Hinglish",
  "Tamil",
  "Telugu",
  "Kannada",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Punjabi",
];

const VOICES = [
  { id: "aria", name: "Aria", description: "Warm, friendly female voice" },
  { id: "kai", name: "Kai", description: "Confident, professional male" },
  { id: "lumi", name: "Lumi", description: "Energetic, upbeat female" },
  { id: "ravi", name: "Ravi", description: "Calm, reassuring male" },
];

const TONES = [
  { id: "friendly", label: "Friendly" },
  { id: "professional", label: "Professional" },
  { id: "playful", label: "Playful" },
  { id: "formal", label: "Formal" },
];

const CHANNELS = [
  { id: "web", label: "Web Chat", icon: <MessageSquare className="w-4 h-4" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <Phone className="w-4 h-4" /> },
  { id: "voice", label: "Voice Call", icon: <Headphones className="w-4 h-4" /> },
  { id: "email", label: "Email", icon: <Mail className="w-4 h-4" /> },
];

const FEATURE_TOGGLES = [
  {
    id: "auto-reply",
    title: "Auto-reply 24/7",
    description: "Agent responds to messages instantly, around the clock.",
    defaultOn: true,
  },
  {
    id: "cart-recovery",
    title: "Cart recovery",
    description: "Follow up on abandoned carts with personalized nudges.",
    defaultOn: true,
  },
  {
    id: "upsell",
    title: "Upsell & cross-sell",
    description: "Recommend complementary products in the conversation.",
    defaultOn: false,
  },
  {
    id: "escalation",
    title: "Escalate to human",
    description: "Route complex queries to your associate automatically.",
    defaultOn: true,
  },
  {
    id: "sentiment",
    title: "Sentiment alerts",
    description: "Get notified when customers express frustration.",
    defaultOn: true,
  },
];

export default function AgentSettingsPage() {
  const { state } = useDashboardState();
  const [agentName, setAgentName] = useState("");
  const [language, setLanguage] = useState("English");
  const [voice, setVoice] = useState("aria");
  const [tone, setTone] = useState("friendly");
  const [persona, setPersona] = useState(
    "You are a helpful, on-brand support assistant. Be concise, polite, and proactive."
  );
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hi there! I'm here to help with anything you need — orders, products, or general questions."
  );
  const [activeChannels, setActiveChannels] = useState<Record<string, boolean>>({
    web: true,
    whatsapp: true,
    voice: false,
    email: false,
  });
  const [features, setFeatures] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(FEATURE_TOGGLES.map((f) => [f.id, f.defaultOn]))
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (state) {
      setAgentName(state.user.agentName || "Cartiva Assistant");
      setLanguage(state.user.agentLanguage || "English");
    }
  }, [state]);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  const handleSave = () => {
    const next: UserState = {
      ...state,
      user: {
        ...state.user,
        agentName,
        agentLanguage: language,
      },
    };
    saveUserState(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <DashboardLayout
      state={state}
      title="Agent settings"
      subtitle="Customize how your AI agent talks, behaves, and connects with customers"
    >
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="space-y-6">
          <Section
            icon={<Bot className="w-4 h-4" />}
            iconColor="bg-primary/15 text-primary"
            title="Agent identity"
            description="Set your agent's name, language, and personality."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Agent name">
                <Input
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="h-10"
                />
              </Field>
              <Field label="Language">
                <SelectChips
                  value={language}
                  options={LANGUAGES}
                  onChange={setLanguage}
                />
              </Field>
            </div>

            <Field label="Tone of voice">
              <div className="flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <Chip
                    key={t.id}
                    active={tone === t.id}
                    onClick={() => setTone(t.id)}
                  >
                    {t.label}
                  </Chip>
                ))}
              </div>
            </Field>

            <Field label="System persona">
              <textarea
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Describes how your agent should think and respond. Visible to
                the model only.
              </p>
            </Field>

            <Field label="Welcome message">
              <textarea
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none"
              />
            </Field>
          </Section>

          <Section
            icon={<Volume2 className="w-4 h-4" />}
            iconColor="bg-violet-500/15 text-violet-300"
            title="Voice"
            description="Pick a voice for your phone & voice-chat agent."
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {VOICES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVoice(v.id)}
                  className={`text-left rounded-xl border p-4 transition-colors ${
                    voice === v.id
                      ? "border-primary/50 bg-primary/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">
                      {v.name}
                    </span>
                    {voice === v.id && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {v.description}
                  </p>
                </button>
              ))}
            </div>
          </Section>

          <Section
            icon={<Globe className="w-4 h-4" />}
            iconColor="bg-emerald-500/15 text-emerald-300"
            title="Active channels"
            description="Choose where your agent should be reachable."
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {CHANNELS.map((c) => {
                const on = activeChannels[c.id];
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() =>
                      setActiveChannels((prev) => ({
                        ...prev,
                        [c.id]: !prev[c.id],
                      }))
                    }
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                      on
                        ? "border-primary/50 bg-primary/10"
                        : "border-white/10 bg-white/[0.02] hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        on
                          ? "bg-primary/20 text-primary"
                          : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {c.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-white leading-tight">
                        {c.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {on ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                    <Toggle on={on} />
                  </button>
                );
              })}
            </div>
          </Section>

          <Section
            icon={<Wand2 className="w-4 h-4" />}
            iconColor="bg-amber-500/15 text-amber-300"
            title="Smart capabilities"
            description="Toggle premium AI behaviors for your agent."
          >
            <div className="space-y-2">
              {FEATURE_TOGGLES.map((f) => {
                const on = features[f.id];
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() =>
                      setFeatures((prev) => ({ ...prev, [f.id]: !prev[f.id] }))
                    }
                    className={`w-full flex items-center justify-between gap-4 px-4 py-3 rounded-xl border text-left transition-colors ${
                      on
                        ? "border-primary/30 bg-primary/[0.06]"
                        : "border-white/10 bg-white/[0.02] hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">
                        {f.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {f.description}
                      </p>
                    </div>
                    <Toggle on={on} />
                  </button>
                );
              })}
            </div>
          </Section>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden sticky top-24"
          >
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-xs uppercase tracking-wider text-primary font-bold">
                Live preview
              </p>
            </div>

            <div className="p-5 space-y-3 bg-gradient-to-b from-transparent to-white/[0.015] min-h-[280px]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  {agentName.charAt(0).toUpperCase() || "A"}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {agentName || "Agent"} • {language}
                  </p>
                  <p className="text-sm text-foreground leading-snug">
                    {welcomeMessage}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-end">
                <div className="bg-primary/15 border border-primary/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm text-foreground leading-snug">
                    Where's my order?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  {agentName.charAt(0).toUpperCase() || "A"}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm text-foreground leading-snug">
                    Sure! Could you share the order number — it usually starts
                    with #. I'll fetch the live status right away.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-white/5 space-y-2">
              <Button
                className="w-full h-11 font-bold"
                onClick={handleSave}
                disabled={saved}
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save changes
                  </>
                )}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                Changes go live instantly across all active channels.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Section({
  icon,
  iconColor,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-6 space-y-4"
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconColor}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <div className="space-y-4 pt-2">{children}</div>
    </motion.section>
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
    <div>
      <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold block mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectChips({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <Chip key={opt} active={value === opt} onClick={() => onChange(opt)}>
          {opt}
        </Chip>
      ))}
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        active
          ? "bg-primary/20 text-primary border-primary/30"
          : "bg-white/5 text-muted-foreground border-white/10 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border transition-colors ${
        on
          ? "bg-primary/40 border-primary/50"
          : "bg-white/10 border-white/15"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </span>
  );
}
