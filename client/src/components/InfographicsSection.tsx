import { motion } from "framer-motion";
import info1 from "@assets/info1_1768935544983.png";
import info2 from "@assets/info2_1768935545034.png";
import info3 from "@assets/info3_1768935545035.png";
import info4 from "@assets/info4_1768935545036.png";
import info5 from "@assets/info5_1768935545036.png";

const infographics = [
  {
    image: info1,
    title: "Instant AI Response 24/7",
    description: "Engage customers the moment they reach out on WhatsApp or your website."
  },
  {
    image: info2,
    title: "Understand Customer Intent",
    description: "Our AI instantly processes queries about tracking, returns, and products."
  },
  {
    image: info3,
    title: "Automated Sales Recovery",
    description: "Boost conversions with automated abandoned cart recovery and personalized offers."
  },
  {
    image: info4,
    title: "Seamless Platform Integration",
    description: "Real-time sync with Shopify and other major platforms for orders and inventory."
  },
  {
    image: info5,
    title: "Performance Dashboard",
    description: "Track revenue, conversation rates, and automation efficiency in real-time."
  }
];

export function InfographicsSection() {
  return (
    <section className="py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight">
            How Cartiva AI Transforms Your Business
          </h2>
          <p className="text-lg text-muted-foreground">
            A visual breakdown of how our AI agent handles the heavy lifting, from first contact to final sale.
          </p>
        </motion.div>

        <div className="space-y-32">
          {infographics.map((info, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1 space-y-6">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {info.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {info.description}
                </p>
                <div className="h-1 w-20 bg-primary rounded-full" />
              </div>
              
              <div className="flex-1 w-full">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-white"
                >
                  <img 
                    src={info.image} 
                    alt={info.title} 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
