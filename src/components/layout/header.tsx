"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Gem, Menu, User, Wallet, LogOut, Copy, Check } from "lucide-react";
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
  const [copiedAddress, setCopiedAddress] = useState(false);
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  const truncateAddress = (addr: `0x${string}`) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <Wallet className="h-4 w-4" />
                    {truncateAddress(address)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="text-xs text-muted-foreground">Connected Address</p>
                    <p className="font-mono text-sm font-semibold break-all">{address}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleCopyAddress}>
                    {copiedAddress ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={disconnectWallet} className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                <div className="mt-auto space-y-3">
                  {isConnected && address ? (
                    <>
                      <div className="bg-secondary p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2">Connected Address</p>
                        <p className="font-mono text-sm font-semibold break-all mb-3">{address}</p>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleCopyAddress}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            {copiedAddress ? (
                              <>
                                <Check className="mr-1 h-3 w-3" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1 h-3 w-3" />
                                Copy
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={() => {
                              disconnectWallet();
                              setIsMobileMenuOpen(false);
                            }}
                            variant="destructive"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            <LogOut className="mr-1 h-3 w-3" />
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        connectWallet();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
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
