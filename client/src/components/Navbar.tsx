import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Bot, Menu, ChevronDown, ShoppingCart, Building2, Landmark, HeartPulse } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const industries = [
  { name: "E-commerce", href: "/industries/ecommerce", icon: <ShoppingCart className="w-4 h-4" />, color: "text-blue-600", colorDark: "text-blue-400" },
  { name: "Real Estate", href: "/industries/real-estate", icon: <Building2 className="w-4 h-4" />, color: "text-emerald-600", colorDark: "text-emerald-400" },
  { name: "Finance", href: "/industries/finance", icon: <Landmark className="w-4 h-4" />, color: "text-violet-600", colorDark: "text-violet-400" },
  { name: "Healthcare", href: "/industries/healthcare", icon: <HeartPulse className="w-4 h-4" />, color: "text-rose-600", colorDark: "text-rose-400" },
];

interface NavbarProps {
  variant?: "default" | "dark";
}

export function Navbar({ variant = "default" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const isDark = variant === "dark";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 ${
      isDark ? "bg-black/50 border-b border-white/10" : "bg-background/80 border-b border-border/50"
    }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Bot size={20} />
          </div>
          <span className={`font-heading font-bold text-xl tracking-tight ${isDark ? "text-white" : "text-foreground"}`}>Cartiva AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className={`text-sm font-medium transition-colors ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>Features</Link>
          <Link href="/how-it-works" className={`text-sm font-medium transition-colors ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>How it Works</Link>
          
          {/* Industries Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>
              Industries
              <ChevronDown className={`w-4 h-4 transition-transform ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {industriesOpen && (
              <div className={`absolute top-full left-0 mt-2 w-56 border rounded-xl shadow-xl py-2 z-50 ${isDark ? "bg-black/95 border-white/10" : "bg-background border-border"}`}>
                {industries.map((industry) => (
                  <Link 
                    key={industry.name} 
                    href={industry.href}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-secondary/50"}`}
                  >
                    <div className={isDark ? industry.colorDark : industry.color}>{industry.icon}</div>
                    <span className="text-sm font-medium">{industry.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link href="/integrations" className={`text-sm font-medium transition-colors ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>Integrations</Link>
          <Link href="/pricing" className={`text-sm font-medium transition-colors ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>Pricing</Link>
          <Link href="/about" className={`text-sm font-medium transition-colors ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>About</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/book-demo">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              Book a Demo
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isDark ? "text-white hover:bg-white/10" : ""}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={isDark ? "bg-black border-white/10" : ""}>
              <div className={`flex flex-col gap-4 mt-8 ${isDark ? "text-white" : ""}`}>
                <Link href="/#features" onClick={() => setIsOpen(false)} className={`text-sm font-medium transition-colors py-2 ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>Features</Link>
                <Link href="/how-it-works" onClick={() => setIsOpen(false)} className={`text-sm font-medium transition-colors py-2 ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>How it Works</Link>
                
                {/* Industries Section */}
                <div className="py-2">
                  <span className={`text-sm font-medium ${isDark ? "text-white" : "text-foreground"}`}>Industries</span>
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    {industries.map((industry) => (
                      <Link 
                        key={industry.name} 
                        href={industry.href}
                        className={`flex items-center gap-2 text-sm transition-colors py-1 ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <div className={isDark ? industry.colorDark : industry.color}>{industry.icon}</div>
                        <span>{industry.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link href="/integrations" onClick={() => setIsOpen(false)} className={`text-sm font-medium transition-colors py-2 ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>Integrations</Link>
                <Link href="/pricing" onClick={() => setIsOpen(false)} className={`text-sm font-medium transition-colors py-2 ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>Pricing</Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className={`text-sm font-medium transition-colors py-2 ${isDark ? "text-gray-300 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>
                  About
                </Link>
                
                <hr className={isDark ? "border-white/10 my-2" : "border-border my-2"} />
                <Link href="/book-demo" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Book a Demo</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
