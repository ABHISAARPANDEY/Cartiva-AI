import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const steps = [
  {
    label: "Step 1",
    title: "Capture every lead across channels",
    description:
      "Your AI agent greets visitors on your website, WhatsApp, and phone the second they arrive—no wait times, no missed opportunities.",
    points: [
      "Instant replies on web chat, WhatsApp, and voice",
      "Pre-built playbooks for sales, support, and FAQs",
      "Qualifies intent before a human ever joins"
    ]
  },
  {
    label: "Step 2",
    title: "Understand, personalize, and recommend",
    description:
      "Commerce-Brain connects to your catalog, orders, and CRM so every answer and recommendation is grounded in your live data.",
    points: [
      "Understands orders, inventory, and customer history",
      "Personalized product recommendations in real time",
      "Multi-language support for global customers"
    ]
  },
  {
    label: "Step 3",
    title: "Take action and close the loop",
    description:
      "From placing orders to booking appointments and recovering abandoned carts, the AI doesn’t just reply—it acts.",
    points: [
      "Places orders and updates carts on your stack",
      "Books meetings and calls directly to your calendar",
      "Recovers lost revenue with tailored offers"
    ]
  },
  {
    label: "Step 4",
    title: "Learn, optimize, and scale",
    description:
      "Every interaction feeds into a central brain that continually improves scripts, responses, and routing to maximize ROI.",
    points: [
      "Live dashboards for conversion and CSAT",
      "Conversation analytics for your team",
      "Continuous improvement without extra headcount"
    ]
  }
];

export function InfographicsSection() {
  return (
    <section className="py-24 bg-black/60 overflow-visible">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            From first hello to closed sale
          </h2>
          <p className="text-lg text-muted-foreground">
            See how your AI agent handles the complete journey across web, WhatsApp, and
            voice—without adding more people to your team.
          </p>
        </motion.div>

        {/* Mobile / tablet: slider */}
        <div className="md:hidden">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="relative"
          >
            <CarouselContent>
              {steps.map((step) => (
                <CarouselItem key={step.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="h-full rounded-2xl border border-border bg-background p-6 shadow-sm"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-2">
                      {step.label}
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {step.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/70" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 bg-background/80 border-border/60" />
            <CarouselNext className="-right-2 bg-background/80 border-border/60" />
          </Carousel>
        </div>

        {/* Desktop: stepped layout, minimal scroll */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05 }}
              className="relative rounded-2xl border border-border bg-background/80 p-6 shadow-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  <span className="h-6 w-6 rounded-full border border-primary/40 flex items-center justify-center text-[11px]">
                    {index + 1}
                  </span>
                  <span>{step.label}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {step.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
