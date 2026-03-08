import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Menu, X, FileText, Users, Shield, Bell, HelpCircle, Phone, Scale } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Shield },
    { path: '/customers', label: 'Customers', icon: Users },
    { path: '/policies', label: 'Policies', icon: FileText },
    { path: '/alerts', label: 'Alerts', icon: Bell },
    { path: '/help', label: 'Help', icon: HelpCircle },
    { path: '/support', label: 'Support', icon: Phone },
    { path: '/legal', label: 'Legal', icon: Scale },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/logo.dim_200x200.png"
                alt="KRISHNA TECH AND SOLUTIONS"
                className="h-10 w-10"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-insurance-primary">KRISHNA TECH AND SOLUTIONS</h1>
                <p className="text-xs text-muted-foreground">IRDAI Registered Insurance Partner</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleNavigation(item.path)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* Add Policy Button */}
            <div className="hidden md:block">
              <Button onClick={() => handleNavigation('/policies')} className="gap-2">
                <FileText className="h-4 w-4" />
                Add Policy
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() => handleNavigation(item.path)}
                    className="justify-start gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
              <Button onClick={() => handleNavigation('/policies')} className="gap-2 mt-2">
                <FileText className="h-4 w-4" />
                Add Policy
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/assets/generated/logo.dim_200x200.png"
                  alt="KRISHNA TECH AND SOLUTIONS"
                  className="h-10 w-10"
                />
                <div>
                  <h3 className="font-bold text-insurance-primary">KRISHNA TECH AND SOLUTIONS</h3>
                  <p className="text-xs text-muted-foreground">IRDAI Registered Insurance Partner</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Insurance | CA | Legal</p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-3">Contact Us</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Phone: 6290932283</p>
                <p>Email: krishnatechandsolutions@gmail.com</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="text-muted-foreground hover:text-insurance-primary transition-colors">
                  <SiFacebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-insurance-primary transition-colors">
                  <SiX className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-insurance-primary transition-colors">
                  <SiLinkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-insurance-primary transition-colors">
                  <SiInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} KRISHNA TECH AND SOLUTIONS. All rights reserved. | Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  window.location.hostname
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-insurance-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
