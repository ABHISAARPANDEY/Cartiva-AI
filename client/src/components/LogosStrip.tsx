import { motion } from "framer-motion";

const logos = [
  "Shopify Brands",
  "Agencies",
  "Marketplaces",
  "Retail Chains",
  "D2C Leaders",
  "B2B SaaS"
];

export function LogosStrip() {
  return (
    <section className="border-y border-white/10 bg-black/50 overflow-visible">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            Trusted by modern commerce teams
          </p>
          <motion.div
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm text-muted-foreground/90"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {logos.map((logo) => (
              <div
                key={logo}
                className="px-3 py-1 rounded-full border border-border/40 bg-background/60 backdrop-blur-xs"
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

