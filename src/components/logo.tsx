import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/dashboard" className="flex items-center gap-2">
      <FileText className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">InvoiceFill</span>
    </Link>
  );
}
