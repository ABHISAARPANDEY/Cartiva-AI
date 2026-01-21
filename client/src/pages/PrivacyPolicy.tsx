import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-12">Last updated: January 21, 2026</p>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Cartiva AI ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy 
                  Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                  AI-powered customer service platform and related services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Account information (name, email address, company name)</li>
                  <li>Payment and billing information</li>
                  <li>Communication data through our platform</li>
                  <li>Customer support interactions</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns to improve user experience</li>
                  <li>Train and improve our AI models (with anonymized data)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">4. Data Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell your personal information. We may share your information with third parties 
                  only in the following circumstances: with your consent, to comply with legal obligations, 
                  to protect our rights, or with service providers who assist in our operations under strict 
                  confidentiality agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. This includes 
                  encryption, secure servers, and regular security assessments.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes for 
                  which it was collected, comply with our legal obligations, resolve disputes, and enforce 
                  our agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">7. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">8. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to collect information about your browsing 
                  activities. You can control cookies through your browser settings, though disabling them may 
                  affect your experience with our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">9. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us 
                  at privacy@cartiva.ai.
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
