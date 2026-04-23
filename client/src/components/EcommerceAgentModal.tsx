import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { OPEN_AGENT_EVENT, type AgentPopupPayload } from "@/data/agents";

export function AgentModal() {
  const [payload, setPayload] = useState<AgentPopupPayload | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const custom = e as CustomEvent<AgentPopupPayload>;
      if (custom.detail?.jotformId) {
        setPayload(custom.detail);
      }
    };
    window.addEventListener(OPEN_AGENT_EVENT, onOpen as EventListener);
    return () => {
      window.removeEventListener(OPEN_AGENT_EVENT, onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!payload) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPayload(null);
    };
    document.addEventListener("keydown", onEsc);
    const { style } = document.body;
    const prevOverflow = style.overflow;
    style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      style.overflow = prevOverflow;
    };
  }, [payload]);

  if (!payload) return null;

  const agentUrl = `https://agent.jotform.com/${payload.jotformId}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={payload.title}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setPayload(null)}
      />

      <div className="relative z-10 w-full max-w-3xl h-[85vh] max-h-[800px] bg-background border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-bold tracking-wide text-white">
              {payload.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setPayload(null)}
            className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <iframe
          key={payload.jotformId}
          src={agentUrl}
          title={payload.title}
          className="flex-1 w-full bg-white"
          allow="microphone; camera; clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
