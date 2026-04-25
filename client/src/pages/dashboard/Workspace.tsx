import { motion } from "framer-motion";
import {
  BellRing,
  Hammer,
  Layers,
  Rocket,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DashboardLayout,
  useDashboardState,
} from "@/components/dashboard/DashboardLayout";

const FEATURES = [
  {
    icon: <Users className="w-4 h-4" />,
    title: "Multi-seat collaboration",
    description: "Invite teammates, assign roles, and review conversations together.",
  },
  {
    icon: <Workflow className="w-4 h-4" />,
    title: "Custom workflows",
    description: "Build no-code automations that connect your stack to the agent.",
  },
  {
    icon: <Layers className="w-4 h-4" />,
    title: "Knowledge layers",
    description: "Curate brand voice, product data, and policies in one place.",
  },
];

export default function WorkspacePage() {
  const { state } = useDashboardState();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <DashboardLayout
      state={state}
      title="Workspace"
      subtitle="Your collaborative command center for the AI agent"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-violet-500/10 to-transparent backdrop-blur-xl"
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-violet-500/30 blur-3xl pointer-events-none" />

        <div className="relative px-8 py-16 md:py-24 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 mb-6"
          >
            <Hammer className="w-9 h-9 text-primary" />
          </motion.div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] uppercase tracking-wider font-bold mb-4">
            <Sparkles className="w-3 h-3" />
            Coming soon
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4 tracking-tight">
            Your workspace is being crafted
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            We're building a collaborative space where your team can manage
            agents, workflows, and knowledge sources together. We'll ping you
            the moment it's live.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="font-bold h-12 px-6">
              <BellRing className="w-4 h-4 mr-2" />
              Notify me when it's ready
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 h-12 px-6"
              onClick={() => {
                window.location.href = "mailto:hello@cartiva.ai?subject=Workspace early access";
              }}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Request early access
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-6"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-3">
              {f.icon}
            </div>
            <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
