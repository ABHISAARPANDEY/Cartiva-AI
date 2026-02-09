import { useState, useEffect, useCallback } from "react";

interface LightningState {
  mouseX: number;
  mouseY: number;
  isStriking: boolean;
  strikeIntensity: number;
}

export function useLightning() {
  const [state, setState] = useState<LightningState>({
    mouseX: 0.5, // Normalized 0-1
    mouseY: 0.5,
    isStriking: false,
    strikeIntensity: 0,
  });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setState((prev) => ({
        ...prev,
        mouseX: x,
        mouseY: y,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Trigger lightning strike
  const triggerStrike = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isStriking: true,
      strikeIntensity: 1,
    }));

    // Animate strike intensity
    const duration = 500; // Increased from 400ms for more visible strike
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out curve for strike effect - slower fade for more visibility
      const intensity = 1 - Math.pow(progress, 1.5);

      setState((prev) => ({
        ...prev,
        strikeIntensity: intensity,
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setState((prev) => ({
          ...prev,
          isStriking: false,
          strikeIntensity: 0,
        }));
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return {
    ...state,
    triggerStrike,
  };
}
