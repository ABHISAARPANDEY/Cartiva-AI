import { Link, useLocation } from "wouter";
import { ReactNode, MouseEvent } from "react";
import { useLightningContext } from "@/contexts/LightningContext";

interface LightningLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}

export function LightningLink({ 
  href, 
  children, 
  className = "",
  onClick,
  ...props 
}: LightningLinkProps) {
  const [, setLocation] = useLocation();
  const { triggerStrike } = useLightningContext();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Trigger lightning strike
    triggerStrike();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }
    
    // Navigate after strike animation (400ms)
    setTimeout(() => {
      setLocation(href);
    }, 400);
  };

  return (
    <Link 
      href={href} 
      className={className} 
      onClick={handleClick} 
      data-lightning-link="true"
      {...props}
    >
      {children}
    </Link>
  );
}
