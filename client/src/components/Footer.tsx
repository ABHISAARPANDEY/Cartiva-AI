import { Bot } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black/80 pt-16 pb-8 border-t border-white/10 overflow-visible">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Bot size={20} />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">Cartiva AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making every D2C brand operate like a large enterprise using intelligent automation.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><Link href="/integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/gdpr" className="hover:text-primary transition-colors">GDPR</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cartiva AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
