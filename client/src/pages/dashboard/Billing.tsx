import { motion } from "framer-motion";
import { Link } from "wouter";
import { useMemo } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Receipt,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DashboardLayout,
  useDashboardState,
} from "@/components/dashboard/DashboardLayout";
import { getPlanById, plans } from "@/data/plans";
import { type UserState } from "@/lib/userStore";

type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending";
  planName: string;
};

function buildInvoices(state: UserState): Invoice[] {
  const plan = getPlanById(state.planId);
  if (!plan || plan.isCustom) return [];
  const amount = parseInt(plan.price, 10);
  const paidAt = new Date(state.paidAt);
  const invoices: Invoice[] = [];
  for (let i = 0; i < 4; i++) {
    const d = new Date(paidAt);
    d.setMonth(d.getMonth() - i);
    invoices.push({
      id: `INV-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}-${plan.id.toUpperCase()}`,
      date: d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      amount,
      status: i === 0 ? "Paid" : "Paid",
      planName: plan.name,
    });
  }
  return invoices;
}

export default function BillingPage() {
  const { state } = useDashboardState();
  const plan = useMemo(() => getPlanById(state?.planId), [state]);
  const invoices = useMemo(
    () => (state ? buildInvoices(state) : []),
    [state]
  );

  if (!state || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  const renewsAt = new Date(state.paidAt);
  renewsAt.setMonth(renewsAt.getMonth() + 1);
  const renewsLabel = renewsAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const upgradeOptions = plans.filter(
    (p) =>
      p.id !== plan.id &&
      !p.isCustom &&
      parseInt(p.price, 10) > parseInt(plan.price, 10)
  );

  return (
    <DashboardLayout
      state={state}
      title="Billing & invoices"
      subtitle="Manage your subscription, payment method, and download invoices"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent backdrop-blur-xl p-6 md:p-8"
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
        <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Current plan
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-3xl font-heading font-bold text-white">
                {plan.name}
              </h2>
              <span className="text-sm text-muted-foreground">
                Active since{" "}
                {new Date(state.paidAt).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {plan.description}
            </p>

            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              <Stat label="Conversations">
                {plan.conversationsLimit.toLocaleString()} / mo
              </Stat>
              <Stat label="Voice minutes">
                {plan.voiceMinutesLimit.toLocaleString()} / mo
              </Stat>
              <Stat label="Seats">{plan.seats}</Stat>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/pricing">
                <Button size="sm" className="font-bold">
                  <Zap className="w-3.5 h-3.5 mr-2" />
                  Upgrade plan
                </Button>
              </Link>
              <Button size="sm" variant="outline" className="bg-white/5">
                Cancel subscription
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
              Next invoice
            </p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-black text-white">
                ${plan.price}
              </span>
              <span className="text-sm text-muted-foreground">.00</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Auto-charges on{" "}
              <span className="text-foreground font-medium">{renewsLabel}</span>
            </p>

            <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Visa •••• 4242</p>
                <p className="text-[11px] text-muted-foreground">
                  Expires 12 / 28
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-muted-foreground hover:text-white"
              >
                Update
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-3 text-[11px] text-muted-foreground">
              <Shield className="w-3 h-3" />
              Secured by 256-bit TLS encryption
            </div>
          </div>
        </div>
      </motion.div>

      {upgradeOptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-white">
                Available upgrades
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get more conversations, minutes, and advanced workflows.
              </p>
            </div>
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="text-primary">
                Compare all plans
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {upgradeOptions.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  <span className="text-lg font-black text-primary">
                    ${p.price}
                    <span className="text-xs text-muted-foreground font-normal">
                      /mo
                    </span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-snug">
                  {p.conversationsLimit.toLocaleString()} conv •{" "}
                  {p.voiceMinutesLimit.toLocaleString()} mins • {p.seats} seats
                </p>
                <Link href={`/checkout?plan=${p.id}`} className="mt-auto">
                  <Button size="sm" className="w-full h-9 text-xs">
                    Upgrade to {p.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Invoice history</h3>
              <p className="text-xs text-muted-foreground">
                Download past invoices for your records.
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="bg-white/5">
            <Download className="w-3.5 h-3.5 mr-2" />
            Export all
          </Button>
        </div>

        <div className="overflow-x-auto">
          {invoices.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              Custom plan — invoices are managed by your account director.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left font-semibold py-3 px-6">Invoice</th>
                  <th className="text-left font-semibold py-3 px-6">Plan</th>
                  <th className="text-left font-semibold py-3 px-6">Date</th>
                  <th className="text-right font-semibold py-3 px-6">Amount</th>
                  <th className="text-left font-semibold py-3 px-6">Status</th>
                  <th className="text-right font-semibold py-3 px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-mono text-xs text-foreground">
                          {inv.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-sm text-foreground">
                      {inv.planName}
                    </td>
                    <td className="py-3 px-6 text-sm text-muted-foreground">
                      {inv.date}
                    </td>
                    <td className="py-3 px-6 text-sm font-semibold text-foreground text-right tabular-nums">
                      ${inv.amount}.00
                    </td>
                    <td className="py-3 px-6">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" />
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-muted-foreground hover:text-white"
                      >
                        <Download className="w-3 h-3 mr-1.5" />
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

function Stat({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">
        {label}
      </p>
      <p className="text-sm font-bold text-white mt-0.5">{children}</p>
    </div>
  );
}
