import { Headphones, ShoppingBag } from "lucide-react";
import { ReactNode } from "react";

export const OPEN_AGENT_EVENT = "cartiva:open-agent";
export const OPEN_STORE_PASSWORD_EVENT = "cartiva:open-store-password";

export type AgentPopupPayload = {
  jotformId: string;
  title: string;
};

export type StorePasswordPayload = {
  storeName: string;
  href: string;
  password: string;
  description?: string;
};

export type AgentAction =
  | { type: "link"; href: string; external?: boolean }
  | { type: "popup"; payload: AgentPopupPayload }
  | { type: "password-gate"; payload: StorePasswordPayload };

export type Agent = {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  color: string;
  colorDark: string;
  action: AgentAction;
};

export const agents: Agent[] = [
  {
    id: "ecommerce",
    name: "Ecommerce Agent",
    description: "Try the live agent on our demo Shopify store",
    icon: <ShoppingBag className="w-4 h-4" />,
    color: "text-amber-600",
    colorDark: "text-amber-400",
    action: {
      type: "password-gate",
      payload: {
        storeName: "Cartiva Demo Store",
        href: "https://test-store-1-220321040922.myshopify.com/",
        password: "test123",
        description:
          "This is a password-protected Shopify demo store. Copy the password below and paste it on the storefront to enter.",
      },
    },
  },
  {
    id: "customer-support",
    name: "Customer Support Agent",
    description: "Try the live agent on our demo property hub store",
    icon: <Headphones className="w-4 h-4" />,
    color: "text-emerald-600",
    colorDark: "text-emerald-400",
    action: {
      type: "password-gate",
      payload: {
        storeName: "Property Hub Demo",
        href: "https://property-hub-368.myshopify.com/",
        password: "test123",
        description:
          "This is a password-protected Shopify demo store. Copy the password below and paste it on the storefront to enter.",
      },
    },
  },
];
