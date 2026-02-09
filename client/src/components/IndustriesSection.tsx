import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShoppingCart, Building2, Landmark, HeartPulse, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "E-commerce",
    description: "Recover abandoned carts, automate product recommendations, and provide 24/7 customer support.",
    href: "/industries/ecommerce",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    iconBg: "bg-blue-500/20 text-blue-600"
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Real Estate",
    description: "Qualify leads instantly, schedule property viewings, and answer property inquiries around the clock.",
    href: "/industries/real-estate",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    iconBg: "bg-emerald-500/20 text-emerald-600"
  },
  {
    icon: <Landmark className="w-8 h-8" />,
    title: "Finance",
    description: "Streamline loan applications, provide instant account support, and automate financial consultations.",
    href: "/industries/finance",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    iconBg: "bg-violet-500/20 text-violet-600"
  },
  {
    icon: <HeartPulse className="w-8 h-8" />,
    title: "Healthcare",
    description: "Schedule appointments, answer patient queries, and provide health information securely 24/7.",
    href: "/industries/healthcare",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    iconBg: "bg-rose-500/20 text-rose-600"
  }
];

export function IndustriesSection() {
  return (
    <section className="py-24 px-4 bg-black/60 overflow-visible">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Built for <span className="text-primary">Every Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cartiva AI adapts to your industry's unique challenges, delivering tailored solutions that drive real results.
          </p>
        </motion.div>

        {/* Mobile: horizontal cards to avoid long scroll */}
        <div className="md:hidden mb-4">
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
            {industries.map((industry) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                className="min-w-[80%] snap-center"
              >
                <Link href={industry.href}>
                  <div
                    className={`group h-full p-6 rounded-2xl border ${industry.borderColor} ${industry.bgColor} hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl ${industry.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {industry.icon}
                    </div>

                    <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                      {industry.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {industry.description}
                    </p>

                    <div className="flex items-center text-primary font-medium text-xs group-hover:gap-2 transition-all">
                      <span>See playbook</span>
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={industry.href}>
                <div className={`group h-full p-6 rounded-2xl border ${industry.borderColor} ${industry.bgColor} hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer`}>
                  <div className={`w-14 h-14 rounded-xl ${industry.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {industry.icon}
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                    {industry.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {industry.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
