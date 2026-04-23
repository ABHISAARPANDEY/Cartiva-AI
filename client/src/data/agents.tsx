import { UserCheck, ShoppingBag } from "lucide-react";
import { ReactNode } from "react";

export const OPEN_AGENT_EVENT = "cartiva:open-agent";

export type AgentPopupPayload = {
  jotformId: string;
  title: string;
};

export type AgentAction =
  | { type: "link"; href: string }
  | { type: "popup"; payload: AgentPopupPayload };

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
    description: "Product search, order tracking, upsell & cart recovery",
    icon: <ShoppingBag className="w-4 h-4" />,
    color: "text-amber-600",
    colorDark: "text-amber-400",
    action: {
      type: "popup",
      payload: {
        jotformId: "019db8d8109b7e51b56d1462c4797924ab5e",
        title: "Cartiva Ecommerce Agent",
      },
    },
  },
  {
    id: "lead-qualification",
    name: "Lead Qualification Agent",
    description: "Capture & qualify leads around the clock",
    icon: <UserCheck className="w-4 h-4" />,
    color: "text-emerald-600",
    colorDark: "text-emerald-400",
    action: {
      type: "popup",
      payload: {
        jotformId: "019db98f832e7c9bafd3f6f1b063e8a985ca",
        title: "Cartiva Lead Qualification Agent",
      },
    },
  },
];
