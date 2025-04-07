import { Menu, X, FileText, FileSpreadsheet, LayoutTemplate, BarChart3, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function MobileNav() {
  const location = useLocation();

  // Check if current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="p-6 text-left border-b">
          <SheetTitle className="flex justify-between items-center">
            <Logo />
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <motion.nav
          className="flex flex-col gap-1 p-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Link
              to="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
                isActive("/dashboard")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Link>
          </motion.div>

          <Separator className="my-2" />
          <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">Documents</p>

          <motion.div variants={itemVariants}>
            <Link
              to="/invoice/new"
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
                isActive("/invoice/new")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <FileText className="h-5 w-5" />
              New Invoice
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/proposal/new"
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
                isActive("/proposal/new")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <FileSpreadsheet className="h-5 w-5" />
              New Proposal
            </Link>
          </motion.div>

          <Separator className="my-2" />
          <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">Management</p>

          <motion.div variants={itemVariants}>
            <Link
              to="/templates"
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
                isActive("/templates")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <LayoutTemplate className="h-5 w-5" />
              Templates
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/clients"
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
                isActive("/clients")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Users className="h-5 w-5" />
              Clients
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/settings"
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
                isActive("/settings")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </motion.div>
        </motion.nav>

        <div className="mt-auto p-4 border-t">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} InvoiceFill
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
