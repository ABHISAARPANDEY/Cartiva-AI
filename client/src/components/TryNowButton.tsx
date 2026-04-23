import { Link } from "wouter";
import { ChevronDown, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { agents, OPEN_AGENT_EVENT, type Agent } from "@/data/agents";

interface TryNowButtonProps {
  variant?: "navbar" | "hero" | "cta";
  isDark?: boolean;
}

export function TryNowButton({
  variant = "navbar",
  isDark = true,
}: TryNowButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const triggerClasses =
    variant === "hero"
      ? "min-w-[180px] px-8 py-3 bg-primary hover:bg-primary/90 rounded-full text-sm font-medium transition-colors text-primary-foreground flex items-center justify-center gap-2"
      : variant === "cta"
      ? "inline-flex items-center justify-center gap-2 h-14 px-8 rounded-md text-lg font-semibold bg-white text-primary hover:bg-white/90 transition-colors"
      : "inline-flex items-center gap-1 h-9 px-4 rounded-md text-sm font-medium bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-colors";

  const handleAgentClick = (agent: Agent) => {
    setOpen(false);
    if (agent.action.type === "popup") {
      window.dispatchEvent(
        new CustomEvent(OPEN_AGENT_EVENT, { detail: agent.action.payload })
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={triggerClasses}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Zap className="w-4 h-4" />
        Try Now
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute top-full ${
            variant === "hero" || variant === "cta"
              ? "left-1/2 -translate-x-1/2"
              : "right-0"
          } mt-2 w-72 border rounded-xl shadow-xl py-2 z-50 ${
            isDark
              ? "bg-black/95 border-white/10"
              : "bg-background border-border"
          }`}
        >
          <div
            className={`px-4 pt-2 pb-1 text-xs font-bold uppercase tracking-wider ${
              isDark ? "text-white/60" : "text-muted-foreground"
            }`}
          >
            Choose an agent
          </div>
          {agents.map((agent) => {
            const content = (
              <>
                <div
                  className={`mt-0.5 ${isDark ? agent.colorDark : agent.color}`}
                >
                  {agent.icon}
                </div>
                <div className="flex flex-col text-left">
                  <span
                    className={`text-sm font-semibold leading-tight ${
                      isDark ? "text-white" : "text-foreground"
                    }`}
                  >
                    {agent.name}
                  </span>
                  <span
                    className={`text-xs leading-snug ${
                      isDark ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    {agent.description}
                  </span>
                </div>
              </>
            );

            const itemClasses = `flex items-start gap-3 px-4 py-3 transition-colors w-full ${
              isDark ? "hover:bg-white/10" : "hover:bg-secondary/50"
            }`;

            if (agent.action.type === "link") {
              return (
                <Link
                  key={agent.id}
                  href={agent.action.href}
                  onClick={() => setOpen(false)}
                  className={itemClasses}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => handleAgentClick(agent)}
                className={itemClasses}
              >
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
