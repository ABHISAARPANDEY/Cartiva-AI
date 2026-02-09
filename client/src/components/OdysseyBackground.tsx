import { useState, useEffect } from "react";
import { Lightning } from "@/components/Lightning";
import { useLightningContext } from "@/contexts/LightningContext";

const HUE_CHANGE_INTERVAL_MS = 3500;

export function OdysseyBackground() {
  const [hue, setHue] = useState(220);
  const { mouseX, mouseY, strikeIntensity } = useLightningContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setHue(Math.floor(Math.random() * 360));
    }, HUE_CHANGE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-blue-500/20 to-purple-600/10 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-full h-full">
        <Lightning
          hue={hue}
          xOffset={0}
          speed={1.6}
          intensity={0.8}
          size={2}
          mouseX={mouseX}
          mouseY={mouseY}
          isStriking={strikeIntensity > 0}
          strikeIntensity={strikeIntensity}
          className="absolute inset-0"
        />
      </div>
      <div
        className="z-10 absolute top-[55%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] backdrop-blur-3xl rounded-full bg-[radial-gradient(circle_at_25%_90%,_#1e386b_15%,_#000000de_70%,_#000000ed_100%)]"
        aria-hidden="true"
      />
    </div>
  );
}
