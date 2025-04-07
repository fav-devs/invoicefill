import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function MobileNav() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col gap-4 py-4">
          <Logo />
          <Separator />
          <nav className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Dashboard
            </Link>
            <Link
              to="/invoice/new"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              New Invoice
            </Link>
            <Link
              to="/proposal/new"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              New Proposal
            </Link>
            <Link
              to="/templates"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Templates
            </Link>
          </nav>
        </div>
      </DialogContent>
    </Dialog>
  );
}
