"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Gem, Menu, User, Wallet } from "lucide-react";
import { useWallet } from "../wallet-provider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/mint", label: "Mint Heirloom" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  const truncateAddress = (addr: `0x${string}`) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold">Legacy Vault</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {isConnected && address ? (
              <Button onClick={disconnectWallet} variant="outline">
                <User className="mr-2 h-4 w-4" />
                {truncateAddress(address)}
              </Button>
            ) : (
              <Button onClick={connectWallet}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <Link href="/" className="flex items-center gap-2 mb-8">
                  <Icons.logo className="h-7 w-7 text-primary" />
                  <span className="font-headline text-xl font-bold">Legacy Vault</span>
                </Link>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                 {isConnected && address ? (
                    <Button onClick={() => {disconnectWallet(); setIsMobileMenuOpen(false);}} variant="secondary" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        {truncateAddress(address)}
                    </Button>
                    ) : (
                    <Button onClick={() => {connectWallet(); setIsMobileMenuOpen(false);}} className="w-full">
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                    </Button>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
