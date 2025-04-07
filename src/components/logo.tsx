import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/dashboard" className="flex items-center gap-2 transition-all hover:opacity-80">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-foreground opacity-75 blur rounded-full" />
        <div className="relative bg-background rounded-full p-1.5">
          <FileText className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight">InvoiceFill</span>
        <span className="text-xs text-muted-foreground -mt-1">Professional Invoicing</span>
      </div>
    </Link>
  );
}
