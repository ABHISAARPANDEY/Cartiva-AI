export type CustomerStatus = "Active" | "VIP" | "Lead" | "Churned";
export type CustomerChannel = "Web Chat" | "WhatsApp" | "Voice Call" | "Email";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  channel: CustomerChannel;
  status: CustomerStatus;
  conversations: number;
  lifetimeValue: number;
  lastSeenIso: string;
  joinedIso: string;
  avatarSeed: string;
};

const FIRST_NAMES = [
  "Aarav", "Riya", "Aman", "Sneha", "Karan", "Pooja", "Vikram", "Tanvi",
  "Aditya", "Manisha", "Harsh", "Priya", "Rohan", "Neha", "Arjun", "Isha",
  "Kabir", "Anaya", "Dev", "Saanvi", "Yash", "Diya", "Ishaan", "Kiara",
  "Reyansh", "Aanya", "Atharv", "Myra", "Vihaan", "Pari",
];

const LAST_NAMES = [
  "Sharma", "Patel", "Singh", "Khan", "Kapoor", "Mehta", "Iyer", "Gupta",
  "Reddy", "Nair", "Desai", "Verma", "Joshi", "Bose", "Chopra", "Bhatia",
  "Malhotra", "Shah", "Saxena", "Agarwal", "Sinha", "Mishra",
];

const CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai",
  "Kolkata", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
  "Indore", "Coimbatore", "Chandigarh", "Goa",
];

const CHANNELS: CustomerChannel[] = [
  "Web Chat",
  "WhatsApp",
  "Voice Call",
  "Email",
];

const STATUSES: CustomerStatus[] = ["Active", "VIP", "Lead", "Churned"];

const STATUS_DISTRIBUTION: CustomerStatus[] = [
  "Active", "Active", "Active", "Active", "Active",
  "VIP", "VIP",
  "Lead", "Lead",
  "Churned",
];

export function generateCustomers(count = 100): Customer[] {
  const customers: Customer[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 7) % LAST_NAMES.length];
    const city = CITIES[(i * 3) % CITIES.length];
    const channel = CHANNELS[(i * 2) % CHANNELS.length];
    const status = STATUS_DISTRIBUTION[i % STATUS_DISTRIBUTION.length];
    const conversations = ((i * 11) % 28) + 1;
    const ltv = (((i * 137) % 950) + 50) * 10;
    const lastSeenOffset = (i + 1) * 1000 * 60 * (37 + (i % 19));
    const joinedOffset =
      lastSeenOffset + 1000 * 60 * 60 * 24 * ((i % 180) + 30);
    const phoneSuffix = String(9700000000 + i * 7).slice(-10);

    customers.push({
      id: `cust-${i + 1}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i + 1}@example.com`,
      phone: `+91 ${phoneSuffix.slice(0, 5)} ${phoneSuffix.slice(5)}`,
      city,
      channel,
      status,
      conversations,
      lifetimeValue: ltv,
      lastSeenIso: new Date(now - lastSeenOffset).toISOString(),
      joinedIso: new Date(now - joinedOffset).toISOString(),
      avatarSeed: `${first}-${last}-${i}`,
    });
  }

  return customers;
}

export function summarize(customers: Customer[]) {
  const total = customers.length;
  const counts: Record<CustomerStatus, number> = {
    Active: 0,
    VIP: 0,
    Lead: 0,
    Churned: 0,
  };
  let totalLtv = 0;
  let totalConversations = 0;

  for (const c of customers) {
    counts[c.status] += 1;
    totalLtv += c.lifetimeValue;
    totalConversations += c.conversations;
  }

  return {
    total,
    counts,
    statuses: STATUSES,
    totalLtv,
    avgLtv: total === 0 ? 0 : Math.round(totalLtv / total),
    totalConversations,
  };
}
