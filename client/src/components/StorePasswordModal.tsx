import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  KeyRound,
  ShoppingBag,
  X,
} from "lucide-react";
import {
  OPEN_STORE_PASSWORD_EVENT,
  type StorePasswordPayload,
} from "@/data/agents";

export function StorePasswordModal() {
  const [payload, setPayload] = useState<StorePasswordPayload | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<StorePasswordPayload>).detail;
      setPayload(detail);
      setCopied(false);
      if (detail?.password && typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard
          .writeText(detail.password)
          .then(() => setCopied(true))
          .catch(() => {});
      }
    };
    window.addEventListener(OPEN_STORE_PASSWORD_EVENT, handler);
    return () => window.removeEventListener(OPEN_STORE_PASSWORD_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!payload) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPayload(null);
    };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [payload]);

  const handleCopy = () => {
    if (!payload) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(payload.password).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleContinue = () => {
    if (!payload) return;
    window.open(payload.href, "_blank", "noopener,noreferrer");
    setPayload(null);
  };

  return (
    <AnimatePresence>
      {payload && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setPayload(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-pw-title"
          >
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

            <button
              type="button"
              onClick={() => setPayload(null)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative px-6 pt-8 pb-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 mb-4">
                <ShoppingBag className="w-7 h-7 text-primary" />
              </div>
              <h2
                id="store-pw-title"
                className="text-xl font-heading font-bold text-white mb-1"
              >
                {payload.storeName}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {payload.description ||
                  "This store is password-protected. Copy the password to enter."}
              </p>
            </div>

            <div className="px-6 pb-2">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5 mb-2">
                <KeyRound className="w-3 h-3" />
                Store password
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className={`group w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                  copied
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <code className="font-mono text-lg font-bold text-white tracking-wider select-all">
                  {payload.password}
                </code>
                <span
                  className={`flex items-center gap-1.5 text-xs font-bold ${
                    copied ? "text-emerald-400" : "text-muted-foreground group-hover:text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </span>
              </button>
              <p className="text-[11px] text-muted-foreground/80 mt-2 px-1">
                {copied
                  ? "✓ Password copied to clipboard. Paste it on the next screen."
                  : "Tap to copy. Then paste it on the Shopify password page."}
              </p>
            </div>

            <div className="px-6 pt-4 pb-6 space-y-2">
              <button
                type="button"
                onClick={handleContinue}
                className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm transition-colors shadow-lg shadow-primary/20"
              >
                Continue to store
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPayload(null)}
                className="w-full h-10 rounded-xl text-xs font-medium text-muted-foreground hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
