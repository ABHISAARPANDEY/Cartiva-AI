import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageSquare, Database, Globe, Share2, Zap, CreditCard, Mail, BarChart3, Truck, FileText, Users, Phone, Calendar, Package } from "lucide-react";

const integrations = [
  {
    category: "Ecommerce Platforms",
    apps: [
      { name: "Shopify", icon: <ShoppingBag className="text-[#96BF48]" />, status: "Official Partner", description: "One-click sync for orders, products, and inventory.", url: "https://www.shopify.com/partners" },
      { name: "WooCommerce", icon: <ShoppingBag className="text-[#96588A]" />, status: "Native", description: "Native integration for WordPress-based stores.", url: "https://woocommerce.com/document/woocommerce-rest-api/" },
      { name: "Magento", icon: <ShoppingBag className="text-[#EE672F]" />, status: "Native", description: "Enterprise-level Adobe Commerce integration.", url: "https://developer.adobe.com/commerce/webapi/get-started/" },
      { name: "BigCommerce", icon: <ShoppingBag className="text-[#121118]" />, status: "Native", description: "Scalable ecommerce platform integration.", url: "https://developer.bigcommerce.com/docs/start" },
      { name: "Squarespace", icon: <ShoppingBag className="text-[#000000]" />, status: "Beta", description: "Beautiful storefront sync and automation.", url: "https://developers.squarespace.com/" },
      { name: "PrestaShop", icon: <ShoppingBag className="text-[#DF0067]" />, status: "Beta", description: "Open-source ecommerce platform integration.", url: "https://devdocs.prestashop-project.org/" }
    ]
  },
  {
    category: "Messaging Channels",
    apps: [
      { name: "WhatsApp", icon: <MessageSquare className="text-[#25D366]" />, status: "Native", description: "Official Business API integration for seamless chat.", url: "https://business.whatsapp.com/products/business-platform" },
      { name: "Instagram", icon: <Share2 className="text-[#E4405F]" />, status: "Native", description: "Automate DMs and story replies with AI.", url: "https://developers.facebook.com/docs/instagram-api/" },
      { name: "Facebook Messenger", icon: <MessageSquare className="text-[#0084FF]" />, status: "Native", description: "Connect with customers on Facebook.", url: "https://developers.facebook.com/docs/messenger-platform/" },
      { name: "Telegram", icon: <MessageSquare className="text-[#0088CC]" />, status: "Native", description: "Bot API integration for Telegram support.", url: "https://core.telegram.org/bots/api" },
      { name: "Website Chat", icon: <Globe className="text-primary" />, status: "Native", description: "Lightweight floating bubble for your storefront.", url: "https://docs.cartiva.ai/website-chat" },
      { name: "SMS/Twilio", icon: <Phone className="text-[#F22F46]" />, status: "Native", description: "Send SMS notifications and support messages.", url: "https://www.twilio.com/docs/messaging" },
      { name: "Slack", icon: <MessageSquare className="text-[#4A154B]" />, status: "Beta", description: "Internal team notifications and alerts.", url: "https://api.slack.com/messaging/webhooks" }
    ]
  },
  {
    category: "CRM & Support",
    apps: [
      { name: "Gorgias", icon: <Database className="text-[#4D65F3]" />, status: "Native", description: "Sync tickets and customer history effortlessly.", url: "https://developers.gorgias.com/" },
      { name: "Zendesk", icon: <Database className="text-[#03363D]" />, status: "Native", description: "Enterprise-grade support ticket synchronization.", url: "https://developer.zendesk.com/documentation" },
      { name: "Freshdesk", icon: <Database className="text-[#2AB97A]" />, status: "Native", description: "Omnichannel customer support integration.", url: "https://developers.freshdesk.com/" },
      { name: "Intercom", icon: <MessageSquare className="text-[#1F8DED]" />, status: "Native", description: "Customer messaging platform integration.", url: "https://developers.intercom.com/" },
      { name: "HubSpot", icon: <Users className="text-[#FF7A59]" />, status: "Native", description: "Marketing, sales, and service hub integration.", url: "https://developers.hubspot.com/docs/api/overview" },
      { name: "Salesforce", icon: <Database className="text-[#00A1E0]" />, status: "Beta", description: "Enterprise CRM sync for sales teams.", url: "https://developer.salesforce.com/docs" },
      { name: "Pipedrive", icon: <Users className="text-[#017737]" />, status: "Beta", description: "Sales pipeline and deal management.", url: "https://developers.pipedrive.com/docs/api/v1" }
    ]
  },
  {
    category: "Payments & Billing",
    apps: [
      { name: "Stripe", icon: <CreditCard className="text-[#635BFF]" />, status: "Native", description: "Payment processing and subscription management.", url: "https://stripe.com/docs/api" },
      { name: "PayPal", icon: <CreditCard className="text-[#003087]" />, status: "Native", description: "Global payment solution integration.", url: "https://developer.paypal.com/docs/api/overview/" },
      { name: "Razorpay", icon: <CreditCard className="text-[#072654]" />, status: "Native", description: "India's leading payment gateway.", url: "https://razorpay.com/docs/api/" },
      { name: "Square", icon: <CreditCard className="text-[#006AFF]" />, status: "Beta", description: "Unified commerce platform integration.", url: "https://developer.squareup.com/docs" },
      { name: "Klarna", icon: <CreditCard className="text-[#FFB3C7]" />, status: "Beta", description: "Buy now, pay later payment option.", url: "https://docs.klarna.com/" }
    ]
  },
  {
    category: "Email Marketing",
    apps: [
      { name: "Klaviyo", icon: <Mail className="text-[#2ECC71]" />, status: "Native", description: "Ecommerce marketing automation platform.", url: "https://developers.klaviyo.com/en" },
      { name: "Mailchimp", icon: <Mail className="text-[#FFE01B]" />, status: "Native", description: "Email marketing and automation.", url: "https://mailchimp.com/developer/" },
      { name: "SendGrid", icon: <Mail className="text-[#1A82E2]" />, status: "Native", description: "Email delivery and transactional emails.", url: "https://docs.sendgrid.com/" },
      { name: "Omnisend", icon: <Mail className="text-[#1E3A5F]" />, status: "Beta", description: "Omnichannel marketing automation.", url: "https://api-docs.omnisend.com/" },
      { name: "ActiveCampaign", icon: <Mail className="text-[#356AE6]" />, status: "Beta", description: "Email marketing and CRM automation.", url: "https://developers.activecampaign.com/reference" }
    ]
  },
  {
    category: "Analytics & Reporting",
    apps: [
      { name: "Google Analytics", icon: <BarChart3 className="text-[#F9AB00]" />, status: "Native", description: "Track customer journeys and conversions.", url: "https://developers.google.com/analytics" },
      { name: "Mixpanel", icon: <BarChart3 className="text-[#7856FF]" />, status: "Native", description: "Product analytics and user behavior tracking.", url: "https://developer.mixpanel.com/" },
      { name: "Segment", icon: <BarChart3 className="text-[#52BD95]" />, status: "Native", description: "Customer data platform integration.", url: "https://segment.com/docs/" },
      { name: "Amplitude", icon: <BarChart3 className="text-[#1E61E4]" />, status: "Beta", description: "Digital analytics and product intelligence.", url: "https://www.docs.developers.amplitude.com/" },
      { name: "Hotjar", icon: <BarChart3 className="text-[#FD3A5C]" />, status: "Beta", description: "Heatmaps and user behavior insights.", url: "https://developer.hotjar.com/" }
    ]
  },
  {
    category: "Shipping & Fulfillment",
    apps: [
      { name: "ShipStation", icon: <Truck className="text-[#84C225]" />, status: "Native", description: "Multi-carrier shipping management.", url: "https://www.shipstation.com/docs/api/" },
      { name: "Shippo", icon: <Truck className="text-[#2D9CDB]" />, status: "Native", description: "Shipping API for labels and tracking.", url: "https://goshippo.com/docs/intro" },
      { name: "EasyPost", icon: <Truck className="text-[#2F80ED]" />, status: "Native", description: "Shipping API for ecommerce.", url: "https://www.easypost.com/docs/api" },
      { name: "AfterShip", icon: <Package className="text-[#AA81F3]" />, status: "Beta", description: "Shipment tracking and notifications.", url: "https://www.aftership.com/docs/tracking" },
      { name: "ShipBob", icon: <Truck className="text-[#0B2447]" />, status: "Beta", description: "Fulfillment and logistics platform.", url: "https://developer.shipbob.com/" }
    ]
  },
  {
    category: "Inventory & Operations",
    apps: [
      { name: "Inventory Planner", icon: <FileText className="text-[#4CAF50]" />, status: "Native", description: "Demand forecasting and inventory optimization.", url: "https://www.inventory-planner.com/integrations/" },
      { name: "TradeGecko", icon: <FileText className="text-[#00BFA5]" />, status: "Native", description: "Inventory and order management.", url: "https://developer.tradegecko.com/" },
      { name: "Cin7", icon: <FileText className="text-[#FF6B00]" />, status: "Beta", description: "Connected inventory management.", url: "https://developer.cin7.com/" },
      { name: "Skubana", icon: <FileText className="text-[#1A237E]" />, status: "Beta", description: "Operations platform for high-volume sellers.", url: "https://www.extensiv.com/order-manager" }
    ]
  },
  {
    category: "Scheduling & Appointments",
    apps: [
      { name: "Calendly", icon: <Calendar className="text-[#006BFF]" />, status: "Native", description: "Appointment scheduling automation.", url: "https://developer.calendly.com/" },
      { name: "Acuity Scheduling", icon: <Calendar className="text-[#1F8CEB]" />, status: "Beta", description: "Online appointment scheduling.", url: "https://developers.acuityscheduling.com/" },
      { name: "Cal.com", icon: <Calendar className="text-[#292929]" />, status: "Beta", description: "Open-source scheduling infrastructure.", url: "https://cal.com/docs/api-reference" }
    ]
  }
];

export default function Integrations() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
              <Zap size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Expand your ecosystem</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              Built for your <span className="text-primary">tech stack</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cartiva AI integrates with the tools you already use. Connect your store and favorite apps in minutes.
            </p>
          </motion.div>

          <div className="space-y-16">
            {integrations.map((category, idx) => (
              <div key={idx} className="space-y-8">
                <h2 className="text-2xl font-heading font-bold px-4">{category.category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.apps.map((app, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-xl"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                          {app.icon}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                          app.status === 'Native' ? 'bg-green-100 text-green-700' : 'bg-secondary text-muted-foreground'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 font-heading">{app.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {app.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-colors"
                        onClick={() => window.open(app.url, '_blank', 'noopener,noreferrer')}
                      >
                        View Setup Guide
                        <Zap size={14} className="ml-2" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-32 p-12 rounded-3xl bg-primary/5 border border-primary/10 text-center"
          >
            <h2 className="text-2xl font-heading font-bold mb-4">Missing an integration?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              We're constantly adding new partners. Let us know what tools you need to connect and we'll prioritize them.
            </p>
            <Button size="lg" variant="outline" className="border-primary/20">
              Request Integration
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
