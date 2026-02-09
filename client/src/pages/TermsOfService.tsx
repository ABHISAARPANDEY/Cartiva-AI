import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-transparent overflow-visible">
      <Navbar variant="dark" />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-12">Last updated: January 21, 2026</p>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using Cartiva AI's services, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services. These terms apply to all 
                  users, including businesses and their authorized representatives.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">2. Description of Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cartiva AI provides an AI-powered customer service automation platform that enables businesses 
                  to manage customer interactions across multiple channels including WhatsApp, web chat, and other 
                  messaging platforms. Our services include conversational AI, order tracking, abandoned cart 
                  recovery, and analytics tools.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">3. Account Registration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To use our services, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly notify us of any unauthorized access</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">4. Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to use our services to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights of others</li>
                  <li>Send spam or unsolicited communications</li>
                  <li>Distribute malware or harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Engage in any activity that disrupts our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">5. Payment Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable 
                  except as required by law or as explicitly stated in our refund policy. We reserve the right to 
                  modify our pricing with 30 days' notice to existing customers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cartiva AI retains all rights, title, and interest in our platform, including all software, 
                  algorithms, designs, and documentation. You retain ownership of your data and content. By using 
                  our services, you grant us a limited license to process your data as necessary to provide our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">7. Data Processing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We process customer data in accordance with our Privacy Policy and applicable data protection 
                  laws. You are responsible for ensuring you have appropriate consent to share customer data with 
                  our platform and for complying with your own privacy obligations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">8. Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to maintain high availability but do not guarantee uninterrupted service. We may 
                  perform maintenance or updates that temporarily affect availability. We will provide reasonable 
                  notice for scheduled maintenance when possible.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Cartiva AI shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including loss of profits, data, 
                  or business opportunities, arising from your use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">10. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate this agreement with 30 days' written notice. We may suspend or 
                  terminate your access immediately if you violate these terms. Upon termination, your right 
                  to use our services will cease, and we will delete your data in accordance with our data 
                  retention policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">11. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may modify these terms at any time. We will notify you of material changes via email or 
                  through our platform. Your continued use of our services after changes take effect constitutes 
                  acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">12. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with applicable laws. Any disputes 
                  arising from these terms will be resolved through binding arbitration or in the courts of 
                  competent jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">13. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us at legal@cartiva.ai.
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
