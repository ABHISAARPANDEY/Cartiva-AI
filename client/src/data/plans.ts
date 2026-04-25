export type Plan = {
  id: string;
  name: string;
  price: string;
  isCustom?: boolean;
  description: string;
  features: string[];
  buttonText: string;
  highlight: boolean;
  conversationsLimit: number;
  voiceMinutesLimit: number;
  seats: number;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "100",
    description: "Perfect for new D2C brands just getting started.",
    features: [
      "500 AI conversations/month (Web chat or WhatsApp)",
      "200 voice minutes/month",
      "Omnichannel (Website or WhatsApp)",
      "Basic AI workflow (FAQs, order tracking)",
      "1 GB knowledge base (catalogue, FAQs, policies)",
      "CRM / Google Sheets integration",
      "Basic analytics dashboard",
      "1 user seat",
      "Email support",
      "English language",
    ],
    buttonText: "Buy Now",
    highlight: false,
    conversationsLimit: 500,
    voiceMinutesLimit: 200,
    seats: 1,
  },
  {
    id: "plus",
    name: "Plus",
    price: "250",
    description: "For growing brands ready to automate more channels.",
    features: [
      "1,500 AI conversations/month",
      "600 voice minutes/month",
      "Omnichannel (Website + WhatsApp)",
      "Medium AI workflow (returns, COD, recommendations)",
      "5 GB knowledge base (catalogue, FAQs, policies)",
      "CRM integrations – Shopify, Zoho, HubSpot",
      "Advanced analytics (conversion, CSAT, insights)",
      "3 user seats",
      "Email + chat support",
      "Multi-language support",
    ],
    buttonText: "Buy Now",
    highlight: false,
    conversationsLimit: 1500,
    voiceMinutesLimit: 600,
    seats: 3,
  },
  {
    id: "growth",
    name: "Growth",
    price: "500",
    description: "For scaling brands that need the full automation stack.",
    features: [
      "3,500 AI conversations/month",
      "1,400 voice minutes/month",
      "Omnichannel (Website + WhatsApp + Voice + Email)",
      "Advanced workflows (cart recovery, upsell, cross-sell, follow-ups)",
      "15 GB knowledge base (catalogue, FAQs, policies)",
      "CRM integrations – Shopify, Zoho, HubSpot",
      "Advanced analytics (conversion, CSAT, insights)",
      "6 user seats",
      "Priority support",
      "Multi-language support",
    ],
    buttonText: "Buy Now",
    highlight: true,
    conversationsLimit: 3500,
    voiceMinutesLimit: 1400,
    seats: 6,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    isCustom: true,
    description: "For high-volume brands needing bespoke solutions.",
    features: [
      "Everything in the Growth plan",
      "High-volume usage with discounted pricing",
      "Dedicated account manager & priority support",
      "Custom APIs & webhooks (actions layer)",
    ],
    buttonText: "Contact Sales",
    highlight: false,
    conversationsLimit: 10000,
    voiceMinutesLimit: 5000,
    seats: 20,
  },
];

export function getPlanById(id: string | null | undefined): Plan | undefined {
  if (!id) return undefined;
  return plans.find((p) => p.id === id);
}
