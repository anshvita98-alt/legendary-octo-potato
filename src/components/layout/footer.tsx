import Link from "next/link";
import { Icons } from "../icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Legacy Vault</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Legacy Vault. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Admin
            </Link>
            <a href="https://thehouseofjoshi.com/contact" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <a href="https://thehouseofjoshi.com/terms" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="https://thehouseofjoshi.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
