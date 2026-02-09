import React, { createContext, useContext, ReactNode } from "react";
import { useLightning } from "@/hooks/useLightning";

interface LightningContextType {
  mouseX: number;
  mouseY: number;
  isStriking: boolean;
  strikeIntensity: number;
  triggerStrike: () => void;
}

const LightningContext = createContext<LightningContextType | undefined>(undefined);

export function LightningProvider({ children }: { children: ReactNode }) {
  const lightning = useLightning();

  return (
    <LightningContext.Provider value={lightning}>
      {children}
    </LightningContext.Provider>
  );
}

export function useLightningContext() {
  const context = useContext(LightningContext);
  if (context === undefined) {
    throw new Error("useLightningContext must be used within a LightningProvider");
  }
  return context;
}
