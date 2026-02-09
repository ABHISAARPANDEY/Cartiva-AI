import { useEffect } from "react";
import { useLightningContext } from "@/contexts/LightningContext";

export function GlobalLightningHandler() {
  const { triggerStrike } = useLightningContext();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger on links/buttons that already have LightningLink
      const target = e.target as HTMLElement;
      const isLink = target.closest('a[href]');
      const isButton = target.closest('button');
      
      // Only trigger if it's not already a LightningLink
      if (!isLink?.hasAttribute('data-lightning-link')) {
        triggerStrike();
      }
    };

    // Add click listener to document
    document.addEventListener('click', handleClick, true);
    
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [triggerStrike]);

  return null; // This component doesn't render anything
}
