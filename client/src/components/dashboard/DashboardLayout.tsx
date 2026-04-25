import { Link, useLocation } from "wouter";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bot,
  CreditCard,
  LineChart,
  LogOut,
  Settings,
  Sparkles,
  Users,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPlanById } from "@/data/plans";
import {
  clearUserState,
  loadUserState,
  type UserState,
} from "@/lib/userStore";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: <LineChart className="w-4 h-4" /> },
  { href: "/dashboard/customers", label: "Customers", icon: <Users className="w-4 h-4" /> },
  { href: "/dashboard/agent", label: "Agent settings", icon: <Bot className="w-4 h-4" /> },
  { href: "/dashboard/billing", label: "Billing", icon: <CreditCard className="w-4 h-4" /> },
  { href: "/dashboard/workspace", label: "Workspace", icon: <Settings className="w-4 h-4" /> },
];

interface DashboardLayoutProps {
  state: UserState;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}

export function DashboardLayout({
  state,
  title,
  subtitle,
  children,
  contentClassName,
}: DashboardLayoutProps) {
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const plan = getPlanById(state.planId);
  const { user } = state;

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleLogout = () => {
    clearUserState();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-white/5 bg-black/80 backdrop-blur-xl transition-transform lg:static lg:flex lg:translate-x-0 ${
            mobileOpen ? "flex translate-x-0" : "hidden -translate-x-full lg:flex"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Bot size={18} />
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-white">
                Cartiva AI
              </span>
            </Link>
            <button
              type="button"
              className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 px-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? location === "/dashboard"
                  : location.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {plan && (
            <div className="p-3 border-t border-white/5">
              <div className="rounded-xl bg-primary/10 border border-primary/20 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {plan.name} plan
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Need more capacity? Upgrade for more conversations & minutes.
                </p>
                <Link href="/pricing">
                  <Button size="sm" className="w-full text-xs h-8">
                    Upgrade
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </aside>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 lg:px-10 h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/5"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg font-heading font-bold text-white leading-tight truncate">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-muted-foreground truncate">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
              <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                {(user.firstName?.[0] || "C").toUpperCase()}
                {(user.lastName?.[0] || "A").toUpperCase()}
              </div>
            </div>
          </header>

          <div className={contentClassName ?? "p-6 lg:p-10 space-y-6 max-w-[1400px]"}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function useDashboardState() {
  const [, navigate] = useLocation();
  const [state, setState] = useState<UserState | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const s = loadUserState();
    if (!s) {
      navigate("/pricing");
      return;
    }
    setState(s);
    setHydrated(true);
  }, [navigate]);

  return { state, hydrated };
}
