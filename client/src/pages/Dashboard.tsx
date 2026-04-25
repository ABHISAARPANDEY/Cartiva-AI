import { motion } from "framer-motion";
import { Link } from "wouter";
import { useMemo, useState } from "react";
import {
  Activity,
  Bot,
  CheckCircle2,
  Clock,
  Copy,
  Filter,
  Globe,
  Headphones,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPlanById, type Plan } from "@/data/plans";
import { type AgentLog, type UserState } from "@/lib/userStore";
import {
  DashboardLayout,
  useDashboardState,
} from "@/components/dashboard/DashboardLayout";

const CHANNEL_ICONS: Record<AgentLog["channel"], React.ReactNode> = {
  "Web Chat": <MessageSquare className="w-3.5 h-3.5" />,
  WhatsApp: <Phone className="w-3.5 h-3.5" />,
  "Voice Call": <Headphones className="w-3.5 h-3.5" />,
  Email: <Mail className="w-3.5 h-3.5" />,
};

const CHANNEL_COLORS: Record<AgentLog["channel"], string> = {
  "Web Chat": "bg-blue-500/15 text-blue-300 border-blue-500/20",
  WhatsApp: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  "Voice Call": "bg-violet-500/15 text-violet-300 border-violet-500/20",
  Email: "bg-amber-500/15 text-amber-300 border-amber-500/20",
};

const STATUS_COLORS: Record<AgentLog["status"], string> = {
  Resolved: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Escalated: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "In progress": "bg-blue-500/15 text-blue-300 border-blue-500/30",
};

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.round(hr / 24);
  return `${d}d ago`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Dashboard() {
  const { state } = useDashboardState();
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState<string>("all");

  const plan = useMemo(() => getPlanById(state?.planId), [state]);

  const filteredLogs = useMemo(() => {
    if (!state) return [];
    return state.logs.filter((log) => {
      if (channelFilter !== "all" && log.channel !== channelFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        log.customer.toLowerCase().includes(q) ||
        log.summary.toLowerCase().includes(q) ||
        log.type.toLowerCase().includes(q)
      );
    });
  }, [state, search, channelFilter]);

  if (!state || !plan) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard…</p>
      </div>
    );
  }

  const { user, usage, logs } = state;
  const conversationsPct = Math.min(
    100,
    Math.round((usage.conversationsUsed / plan.conversationsLimit) * 100)
  );
  const minutesPct = Math.min(
    100,
    Math.round((usage.voiceMinutesUsed / plan.voiceMinutesLimit) * 100)
  );

  const resolvedCount = logs.filter((l) => l.status === "Resolved").length;
  const escalatedCount = logs.filter((l) => l.status === "Escalated").length;
  const csat = Math.max(85, 100 - escalatedCount * 3);

  return (
    <DashboardLayout
      state={state}
      title={`Welcome back, ${user.firstName || "there"} 👋`}
      subtitle={
        <>
          {user.businessName || "Your workspace"} •{" "}
          <span className="text-emerald-400">● Agent online</span>
        </>
      }
    >
      <PlanSummary plan={plan} state={state} />

      <div className="grid lg:grid-cols-[1fr_1fr_1fr] gap-4">
        <UsageCard
          title="AI conversations"
          used={usage.conversationsUsed}
          total={plan.conversationsLimit}
          pct={conversationsPct}
          icon={<MessageSquare className="w-4 h-4" />}
          accent="from-blue-500 to-cyan-400"
        />
        <UsageCard
          title="Voice minutes"
          used={usage.voiceMinutesUsed}
          total={plan.voiceMinutesLimit}
          pct={minutesPct}
          icon={<Headphones className="w-4 h-4" />}
          accent="from-violet-500 to-fuchsia-400"
        />
        <KpiCard
          label="CSAT this month"
          value={`${csat}%`}
          trend="+4.2%"
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
        <LogsPanel
          logs={filteredLogs}
          totalLogs={logs.length}
          resolvedCount={resolvedCount}
          escalatedCount={escalatedCount}
          search={search}
          onSearch={setSearch}
          channelFilter={channelFilter}
          onChannelFilter={setChannelFilter}
        />

        <div className="space-y-4">
          <AssociateCard associate={state.associate} />
          <AgentSetupCard
            user={user}
            agentName={user.agentName}
            agentLanguage={user.agentLanguage}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

function PlanSummary({ plan, state }: { plan: Plan; state: UserState }) {
  const renewsAt = useMemo(() => {
    const d = new Date(state.paidAt);
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [state.paidAt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent backdrop-blur-xl p-6 md:p-8"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
      </div>
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Active subscription
          </div>
          <h2 className="text-3xl font-heading font-bold text-white">
            {plan.name} Plan
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {plan.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            <Pill>
              <ShoppingBag className="w-3 h-3" />
              {plan.conversationsLimit.toLocaleString()} conv/mo
            </Pill>
            <Pill>
              <Headphones className="w-3 h-3" />
              {plan.voiceMinutesLimit.toLocaleString()} mins/mo
            </Pill>
            <Pill>
              <Users className="w-3 h-3" />
              {plan.seats} seats
            </Pill>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">
              ${plan.price}
            </span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Renews on{" "}
            <span className="text-foreground font-medium">{renewsAt}</span>
          </p>
          <div className="flex gap-2">
            <Link href="/pricing">
              <Button size="sm" variant="outline" className="bg-white/5">
                Change plan
              </Button>
            </Link>
            <Link href="/dashboard/billing">
              <Button size="sm">Manage billing</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/80">
      {children}
    </span>
  );
}

function UsageCard({
  title,
  used,
  total,
  pct,
  icon,
  accent,
}: {
  title: string;
  used: number;
  total: number;
  pct: number;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/5 text-foreground flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
        </div>
        <span className="text-xs text-muted-foreground">{pct}% used</span>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-black text-white">
          {used.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground">
          / {total.toLocaleString()}
        </span>
      </div>

      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${accent}`}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        {(total - used).toLocaleString()} remaining this cycle
      </p>
    </motion.div>
  );
}

function KpiCard({
  label,
  value,
  trend,
  icon,
}: {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-foreground">{label}</h3>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-black text-white">{value}</span>
        <span className="text-xs font-bold text-emerald-400">{trend}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Compared to last month
      </p>
    </motion.div>
  );
}

function AssociateCard({
  associate,
}: {
  associate: UserState["associate"];
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-foreground">
          Your plan associate
        </h3>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
          <img src={associate.avatar} alt={associate.name} className="w-full h-full" />
        </div>
        <div>
          <p className="text-base font-bold text-white leading-tight">
            {associate.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {associate.role}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <ContactRow
          icon={<Mail className="w-3.5 h-3.5" />}
          label="Email"
          value={associate.email}
          copied={copied === "email"}
          onCopy={() => copy(associate.email, "email")}
        />
        <ContactRow
          icon={<Phone className="w-3.5 h-3.5" />}
          label="Phone"
          value={associate.phone}
          copied={copied === "phone"}
          onCopy={() => copy(associate.phone, "phone")}
        />
      </div>

      <Button
        size="sm"
        className="w-full mt-5 h-9 text-xs font-bold"
        onClick={() => {
          window.location.href = `mailto:${associate.email}`;
        }}
      >
        <Mail className="w-3.5 h-3.5 mr-2" />
        Email {associate.name.split(" ")[0]}
      </Button>
    </motion.div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  copied,
  onCopy,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
      <div className="flex items-center gap-2 min-w-0">
        <div className="text-muted-foreground">{icon}</div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground/80">
            {label}
          </p>
          <p className="text-xs font-medium text-foreground truncate">
            {value}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
        title={copied ? "Copied" : "Copy"}
      >
        {copied ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}

function AgentSetupCard({
  user,
  agentName,
  agentLanguage,
}: {
  user: UserState["user"];
  agentName: string;
  agentLanguage: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-300 flex items-center justify-center">
          <Bot className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-foreground">Your AI agent</h3>
      </div>

      <div className="space-y-3 text-sm">
        <Row label="Agent name" value={agentName} />
        <Row
          label="Language"
          value={
            <span className="inline-flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {agentLanguage}
            </span>
          }
        />
        <Row label="Business" value={user.businessName || "—"} />
        <Row label="Industry" value={user.industry} />
        <Row label="Status" value={<span className="text-emerald-400">Online</span>} />
      </div>

      <Link href="/dashboard/agent">
        <Button size="sm" variant="outline" className="w-full mt-5 h-9 text-xs">
          <Settings className="w-3.5 h-3.5 mr-2" />
          Configure agent
        </Button>
      </Link>
    </motion.div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-white/5 last:border-0">
      <span className="text-xs uppercase tracking-wider text-muted-foreground/80">
        {label}
      </span>
      <span className="text-xs font-medium text-foreground text-right">
        {value}
      </span>
    </div>
  );
}

function LogsPanel({
  logs,
  totalLogs,
  resolvedCount,
  escalatedCount,
  search,
  onSearch,
  channelFilter,
  onChannelFilter,
}: {
  logs: AgentLog[];
  totalLogs: number;
  resolvedCount: number;
  escalatedCount: number;
  search: string;
  onSearch: (v: string) => void;
  channelFilter: string;
  onChannelFilter: (v: string) => void;
}) {
  const channels: AgentLog["channel"][] = [
    "Web Chat",
    "WhatsApp",
    "Voice Call",
    "Email",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden flex flex-col"
    >
      <div className="px-6 py-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Agent activity logs
              </h3>
              <p className="text-xs text-muted-foreground">
                {totalLogs} interactions • {resolvedCount} resolved •{" "}
                {escalatedCount} escalated
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search logs…"
              className="h-9 pl-9 pr-3 w-48 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-3 border-b border-white/5 flex items-center gap-2 flex-wrap">
        <Filter className="w-3 h-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground mr-1">Channel:</span>
        <FilterChip
          active={channelFilter === "all"}
          onClick={() => onChannelFilter("all")}
        >
          All
        </FilterChip>
        {channels.map((c) => (
          <FilterChip
            key={c}
            active={channelFilter === c}
            onClick={() => onChannelFilter(c)}
          >
            <span className="inline-flex items-center gap-1">
              {CHANNEL_ICONS[c]}
              {c}
            </span>
          </FilterChip>
        ))}
      </div>

      <div className="divide-y divide-white/5">
        {logs.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No logs match your filters.
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="px-6 py-4 hover:bg-white/[0.02] transition-colors flex items-start gap-4"
            >
              <div
                className={`mt-0.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${
                  CHANNEL_COLORS[log.channel]
                }`}
              >
                {CHANNEL_ICONS[log.channel]}
                {log.channel}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white">
                    {log.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • {log.customer}
                  </span>
                  {log.durationSec !== undefined && (
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.floor(log.durationSec / 60)}m {log.durationSec % 60}s
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {log.summary}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    STATUS_COLORS[log.status]
                  }`}
                >
                  {log.status}
                </span>
                <span
                  className="text-[10px] text-muted-foreground"
                  title={formatTime(log.timestamp)}
                >
                  {formatRelative(log.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function FilterChip({
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
      className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
        active
          ? "bg-primary/20 text-primary border-primary/30"
          : "bg-white/5 text-muted-foreground border-white/10 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
