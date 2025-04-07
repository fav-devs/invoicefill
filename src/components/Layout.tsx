import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNav } from '@/components/mobile-nav';
import { UserAccountNav } from '@/components/user-account-nav';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileSpreadsheet, LayoutTemplate, BarChart3, Settings, Bell } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Layout: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          scrolled ? "border-b shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background"
        )}
      >
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <MobileNav />
            <Logo />
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive('/dashboard') && "bg-accent text-accent-foreground")}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Documents
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <Link to="/invoice/new" className="flex flex-col space-y-1 rounded-md p-4 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-all">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="font-medium">New Invoice</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pl-10">
                        Create a new invoice for your clients
                      </p>
                    </Link>
                    <Link to="/proposal/new" className="flex flex-col space-y-1 rounded-md p-4 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-all">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <FileSpreadsheet className="w-5 h-5 text-primary" />
                        </div>
                        <div className="font-medium">New Proposal</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pl-10">
                        Create a new business proposal
                      </p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/templates">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive('/templates') && "bg-accent text-accent-foreground")}>
                    <LayoutTemplate className="w-4 h-4 mr-2" />
                    Templates
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-4 border-b">
                  <h4 className="font-medium">Notifications</h4>
                  <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
                </div>
                <div className="py-2 px-4 text-center text-sm text-muted-foreground">
                  No new notifications
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            <UserAccountNav />
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="border-t py-6 md:py-0 mt-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Able Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
