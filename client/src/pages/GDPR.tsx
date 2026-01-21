import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Eye, Trash2, Download, UserCheck } from "lucide-react";

const rights = [
  {
    icon: Eye,
    title: "Right to Access",
    description: "You can request a copy of all personal data we hold about you at any time."
  },
  {
    icon: UserCheck,
    title: "Right to Rectification",
    description: "You can request corrections to any inaccurate or incomplete personal data."
  },
  {
    icon: Trash2,
    title: "Right to Erasure",
    description: "You can request deletion of your personal data under certain circumstances."
  },
  {
    icon: Lock,
    title: "Right to Restrict Processing",
    description: "You can request that we limit how we use your personal data."
  },
  {
    icon: Download,
    title: "Right to Data Portability",
    description: "You can request your data in a structured, commonly used format."
  },
  {
    icon: Shield,
    title: "Right to Object",
    description: "You can object to certain types of processing, including direct marketing."
  }
];

export default function GDPR() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">
              GDPR Compliance
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Cartiva AI is committed to protecting your privacy and ensuring compliance with the 
              General Data Protection Regulation (GDPR).
            </p>

            {/* Your Rights Section */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">Your Data Rights</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rights.map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl border border-border p-6"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <right.icon size={20} />
                    </div>
                    <h3 className="font-bold font-heading mb-2">{right.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{right.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Our Commitment to GDPR</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As a company that processes personal data, we take our responsibilities under GDPR seriously. 
                  We have implemented comprehensive measures to ensure that all personal data is processed 
                  lawfully, fairly, and transparently.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Legal Basis for Processing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We process personal data only when we have a valid legal basis, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Contractual necessity:</strong> Processing required to fulfill our service agreement</li>
                  <li><strong>Legitimate interests:</strong> Processing for our legitimate business purposes</li>
                  <li><strong>Consent:</strong> Where you have given explicit consent for specific processing</li>
                  <li><strong>Legal obligation:</strong> Processing required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Data Protection Measures</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement robust technical and organizational measures to protect personal data:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>End-to-end encryption for data in transit and at rest</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection practices</li>
                  <li>Incident response and breach notification procedures</li>
                  <li>Data minimization and purpose limitation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When we transfer personal data outside the European Economic Area (EEA), we ensure appropriate 
                  safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European 
                  Commission, or transfers to countries with adequate data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Data Processing Agreements</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For our business customers, we act as a data processor and provide comprehensive Data Processing 
                  Agreements (DPAs) that comply with GDPR Article 28 requirements. These agreements detail our 
                  obligations, security measures, and sub-processor arrangements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain personal data only for as long as necessary to fulfill the purposes for which it was 
                  collected, or as required by law. When data is no longer needed, it is securely deleted or 
                  anonymized in accordance with our retention policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Exercising Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To exercise any of your GDPR rights, you can:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Email our Data Protection team at dpo@cartiva.ai</li>
                  <li>Use the privacy settings in your account dashboard</li>
                  <li>Submit a request through our online form</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We will respond to your request within 30 days. In complex cases, we may extend this period 
                  by an additional 60 days, but we will inform you of any extension within the initial 30-day period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Supervisory Authority</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you are not satisfied with our response to your request, or believe we are processing your 
                  personal data unlawfully, you have the right to lodge a complaint with your local data protection 
                  supervisory authority.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Contact Our DPO</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For any questions about our GDPR compliance or to exercise your data rights, please contact 
                  our Data Protection Officer at dpo@cartiva.ai.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
