import { type Plan } from "@/data/plans";

const STORAGE_KEY = "cartiva:user-state";

export type Associate = {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
};

export type AgentLog = {
  id: string;
  timestamp: string;
  channel: "Web Chat" | "WhatsApp" | "Voice Call" | "Email";
  type: string;
  status: "Resolved" | "Escalated" | "In progress";
  customer: string;
  summary: string;
  durationSec?: number;
};

export type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  website: string;
  industry: string;
  agentName: string;
  agentLanguage: string;
};

export type UserState = {
  planId: string;
  paidAt: string;
  user: UserDetails;
  associate: Associate;
  usage: {
    conversationsUsed: number;
    voiceMinutesUsed: number;
  };
  logs: AgentLog[];
};

const ASSOCIATES_BY_PLAN: Record<string, Associate> = {
  starter: {
    name: "Aarav Mehta",
    role: "Onboarding Specialist",
    email: "aarav@cartiva.ai",
    phone: "+91 92176 76566",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aarav",
  },
  plus: {
    name: "Priya Sharma",
    role: "Customer Success Manager",
    email: "priya@cartiva.ai",
    phone: "+91 91196 71030",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
  },
  growth: {
    name: "Rohan Kapoor",
    role: "Senior Account Manager",
    email: "rohan@cartiva.ai",
    phone: "+91 92176 76566",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rohan",
  },
  enterprise: {
    name: "Neha Iyer",
    role: "Dedicated Account Director",
    email: "neha@cartiva.ai",
    phone: "+91 91196 71030",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
  },
};

const SAMPLE_LOG_TEMPLATES: Array<Omit<AgentLog, "id" | "timestamp">> = [
  {
    channel: "Web Chat",
    type: "Product Inquiry",
    status: "Resolved",
    customer: "Riya S.",
    summary: "Asked about size guide for cotton kurtas. Recommended size M.",
  },
  {
    channel: "WhatsApp",
    type: "Order Tracking",
    status: "Resolved",
    customer: "Aman P.",
    summary: "Shared live tracking link for order #4528.",
  },
  {
    channel: "Voice Call",
    type: "Cart Recovery",
    status: "Resolved",
    customer: "Sneha K.",
    summary: "Recovered abandoned cart of ₹2,499 after 5-min call.",
    durationSec: 312,
  },
  {
    channel: "Web Chat",
    type: "Lead Qualification",
    status: "Escalated",
    customer: "Karan B.",
    summary: "B2B bulk order — escalated to sales associate.",
  },
  {
    channel: "WhatsApp",
    type: "Returns",
    status: "Resolved",
    customer: "Pooja D.",
    summary: "Initiated return for damaged item, refund ETA 5 days.",
  },
  {
    channel: "Email",
    type: "FAQ",
    status: "Resolved",
    customer: "Vikram T.",
    summary: "Replied to query about COD availability in Tier-3 cities.",
  },
  {
    channel: "Voice Call",
    type: "Upsell",
    status: "Resolved",
    customer: "Manisha R.",
    summary: "Upsold premium subscription, added ₹899 to order.",
    durationSec: 248,
  },
  {
    channel: "Web Chat",
    type: "Order Tracking",
    status: "In progress",
    customer: "Aditya N.",
    summary: "Investigating delayed shipment with logistics partner.",
  },
  {
    channel: "WhatsApp",
    type: "Cross-sell",
    status: "Resolved",
    customer: "Tanvi G.",
    summary: "Suggested matching accessory; customer added to cart.",
  },
  {
    channel: "Voice Call",
    type: "Follow-up",
    status: "Resolved",
    customer: "Harsh M.",
    summary: "Confirmed delivery satisfaction, requested review.",
    durationSec: 142,
  },
];

function generateLogs(seed: number): AgentLog[] {
  const now = Date.now();
  return SAMPLE_LOG_TEMPLATES.map((tpl, i) => ({
    ...tpl,
    id: `log-${seed + i}`,
    timestamp: new Date(now - (i + 1) * (1000 * 60 * 17 + i * 3000)).toISOString(),
  }));
}

function generateUsage(plan: Plan) {
  const ratio = 0.18 + Math.random() * 0.22;
  return {
    conversationsUsed: Math.floor(plan.conversationsLimit * ratio),
    voiceMinutesUsed: Math.floor(plan.voiceMinutesLimit * (ratio - 0.05)),
  };
}

export function buildInitialUserState(plan: Plan, user: UserDetails): UserState {
  const associate =
    ASSOCIATES_BY_PLAN[plan.id] || ASSOCIATES_BY_PLAN.starter;
  return {
    planId: plan.id,
    paidAt: new Date().toISOString(),
    user,
    associate,
    usage: generateUsage(plan),
    logs: generateLogs(Date.now() % 1000),
  };
}

export function saveUserState(state: UserState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadUserState(): UserState | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserState;
  } catch {
    return null;
  }
}

export function clearUserState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

const PENDING_KEY = "cartiva:pending-plan";

export function setPendingPlanId(id: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PENDING_KEY, id);
}

export function getPendingPlanId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(PENDING_KEY);
}

export function clearPendingPlanId() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PENDING_KEY);
}
