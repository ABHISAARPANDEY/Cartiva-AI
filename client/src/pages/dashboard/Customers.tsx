import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Crown,
  DollarSign,
  Download,
  Filter,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  TrendingDown,
  TrendingUp,
  Users,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DashboardLayout,
  useDashboardState,
} from "@/components/dashboard/DashboardLayout";
import {
  generateCustomers,
  summarize,
  type Customer,
  type CustomerChannel,
  type CustomerStatus,
} from "@/data/mockCustomers";

const STATUS_COLORS: Record<CustomerStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  VIP: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Lead: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Churned: "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

const CHANNEL_ICONS: Record<CustomerChannel, React.ReactNode> = {
  "Web Chat": <MessageSquare className="w-3 h-3" />,
  WhatsApp: <Phone className="w-3 h-3" />,
  "Voice Call": <Headphones className="w-3 h-3" />,
  Email: <Mail className="w-3 h-3" />,
};

const PAGE_SIZE = 12;

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.round(hr / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.round(d / 30);
  return `${mo}mo ago`;
}

export default function CustomersPage() {
  const { state } = useDashboardState();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">(
    "all"
  );
  const [channelFilter, setChannelFilter] = useState<CustomerChannel | "all">(
    "all"
  );
  const [page, setPage] = useState(1);

  const customers = useMemo<Customer[]>(() => generateCustomers(100), []);
  const stats = useMemo(() => summarize(customers), [customers]);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (channelFilter !== "all" && c.channel !== channelFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q)
      );
    });
  }, [customers, search, statusFilter, channelFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

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
      title="Customers"
      subtitle={`${stats.total} total contacts captured by your AI agent`}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total customers"
          value={stats.total.toLocaleString()}
          icon={<Users className="w-4 h-4" />}
          accent="bg-primary/15 text-primary"
          trend={
            <span className="text-emerald-400 flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3" /> +12% this month
            </span>
          }
        />
        <StatCard
          label="VIP customers"
          value={stats.counts.VIP.toString()}
          icon={<Crown className="w-4 h-4" />}
          accent="bg-amber-500/15 text-amber-300"
          trend={
            <span className="text-emerald-400 flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3" /> +3 new VIPs
            </span>
          }
        />
        <StatCard
          label="Total LTV"
          value={`₹${(stats.totalLtv / 1000).toFixed(1)}K`}
          icon={<DollarSign className="w-4 h-4" />}
          accent="bg-emerald-500/15 text-emerald-300"
          trend={
            <span className="text-emerald-400 flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3" /> +8.4%
            </span>
          }
        />
        <StatCard
          label="Churned"
          value={stats.counts.Churned.toString()}
          icon={<UserPlus className="w-4 h-4" />}
          accent="bg-rose-500/15 text-rose-300"
          trend={
            <span className="text-rose-400 flex items-center gap-1 text-xs">
              <TrendingDown className="w-3 h-3" /> needs win-back
            </span>
          }
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-white/5 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email, phone…"
              className="h-10 pl-10"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <FilterGroup
              label="Status"
              value={statusFilter}
              onChange={(v) => {
                setStatusFilter(v as typeof statusFilter);
                setPage(1);
              }}
              options={[
                { value: "all", label: "All" },
                { value: "Active", label: "Active" },
                { value: "VIP", label: "VIP" },
                { value: "Lead", label: "Lead" },
                { value: "Churned", label: "Churned" },
              ]}
            />
            <FilterGroup
              label="Channel"
              value={channelFilter}
              onChange={(v) => {
                setChannelFilter(v as typeof channelFilter);
                setPage(1);
              }}
              options={[
                { value: "all", label: "All" },
                { value: "Web Chat", label: "Web" },
                { value: "WhatsApp", label: "WhatsApp" },
                { value: "Voice Call", label: "Voice" },
                { value: "Email", label: "Email" },
              ]}
            />
            <Button size="sm" variant="outline" className="bg-white/5 h-9">
              <Download className="w-3.5 h-3.5 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <Th>Customer</Th>
                <Th>Channel</Th>
                <Th>Status</Th>
                <Th className="text-right">Conversations</Th>
                <Th className="text-right">LTV</Th>
                <Th>Last seen</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-12 text-sm text-muted-foreground"
                  >
                    No customers match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 overflow-hidden shrink-0">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.avatarSeed}`}
                            alt={c.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white leading-tight truncate">
                            {c.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {c.email}
                          </p>
                          <p className="text-[11px] text-muted-foreground/70 mt-0.5 inline-flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            {c.city}
                          </p>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <span className="inline-flex items-center gap-1.5 text-xs text-foreground/80">
                        <span className="text-muted-foreground">
                          {CHANNEL_ICONS[c.channel]}
                        </span>
                        {c.channel}
                      </span>
                    </Td>
                    <Td>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          STATUS_COLORS[c.status]
                        }`}
                      >
                        {c.status}
                      </span>
                    </Td>
                    <Td className="text-right tabular-nums">
                      <span className="text-sm font-semibold text-foreground">
                        {c.conversations}
                      </span>
                    </Td>
                    <Td className="text-right tabular-nums">
                      <span className="text-sm font-semibold text-foreground">
                        ₹{c.lifetimeValue.toLocaleString()}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(c.lastSeenIso)}
                      </span>
                    </Td>
                    <Td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`mailto:${c.email}`}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                          title={`Email ${c.name}`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${c.phone.replace(/\s/g, "")}`}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                          title={`Call ${c.name}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            Showing{" "}
            <span className="text-foreground font-semibold">
              {paged.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
              {(safePage - 1) * PAGE_SIZE + paged.length}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-semibold">
              {filtered.length}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 bg-white/5"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
            >
              Previous
            </Button>
            <span className="px-2 font-medium">
              Page {safePage} / {pageCount}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-8 bg-white/5"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={safePage >= pageCount}
            >
              Next
            </Button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
  trend,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
  trend?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
          {label}
        </p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl md:text-3xl font-black text-white">{value}</p>
      {trend && <div className="mt-2">{trend}</div>}
    </motion.div>
  );
}

function FilterGroup<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Filter className="w-3 h-3 text-muted-foreground" />
      <span className="text-xs text-muted-foreground mr-1">{label}:</span>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
            value === opt.value
              ? "bg-primary/20 text-primary border-primary/30"
              : "bg-white/5 text-muted-foreground border-white/10 hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={`text-left font-semibold py-3 px-6 ${className}`}>
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`py-3 px-6 ${className}`}>{children}</td>;
}
