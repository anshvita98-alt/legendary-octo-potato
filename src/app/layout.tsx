import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/components/wallet-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AiChatbot from "@/components/ai-chatbot";
import "./globals.css";
import { Alegreya, Source_Code_Pro } from "next/font/google";
import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: "Legacy Vault - Secure Your Digital Heirlooms",
  description: "A digital heirloom platform on the Base blockchain to mint personal legacy items as secure NFTs.",
  keywords: ["web3", "dapp", "nft", "blockchain", "digital heirloom", "base blockchain"],
};

const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${alegreya.variable} ${sourceCodePro.variable} font-body antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <WalletProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <AiChatbot />
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  );
}
