
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, Gem, Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";

const tiers = [
    {
        name: "Pay As You Go",
        price: "Free",
        priceDescription: "+ gas fees",
        description: "For creating a single, timeless digital heirloom.",
        features: [
            "One-time Minting",
            "Secure Storage on IPFS",
            "ERC-721 NFT on Base",
            "Standard Support",
        ],
        buttonText: "Mint an Heirloom",
        buttonAction: "link",
        href: "/mint",
        variant: "outline",
        icon: <Leaf />
    },
    {
        name: "Vault Access",
        price: "$4.99",
        priceDescription: "/month",
        description: "For the dedicated family historian building a collection.",
        features: [
            "Unlimited Heirloom Mints (Free + gas)",
            "Personal Dashboard Access",
            "Advanced Management Tools",
            "Private Sharing Links",
            "Heirloom Inheritance Tools",
            "Priority Support",
        ],
        buttonText: "Subscribe Now",
        buttonAction: "subscribe",
        variant: "primary",
        icon: <Gem />
    },
    {
        name: "Lifetime Vault",
        price: "$99",
        priceDescription: "one-time",
        description: "The ultimate plan for securing a multi-generational legacy.",
        features: [
            "All Vault Access Features",
            "Permanent, Lifelong Access",
            "No Recurring Fees",
            "Early Access to New Features",
            "Dedicated Support",
        ],
        buttonText: "Become a Patron",
        buttonAction: "subscribe",
        variant: "outline",
        icon: <ShieldCheck />
    },
]


export default function PricingPage() {
    const { toast } = useToast();

    const handleSubscribe = (plan: string) => {
        toast({
            title: `Subscribed to ${plan}!`,
            description: "Welcome! Your personal vault is now unlocked.",
        });
    }

  return (
    <div className="container mx-auto py-20 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Unlock Your Personal Vault</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Choose the plan that best fits your journey in preserving your digital legacy.
        </p>
      </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {tiers.map((tier) => (
                 <Card key={tier.name} className={tier.variant === 'primary' ? "border-primary border-2 shadow-xl shadow-primary/10 transform scale-105" : ""}>
                    <CardHeader className="text-center p-8">
                        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4 text-primary">
                            {tier.icon}
                        </div>
                        <CardTitle className="font-headline text-3xl">{tier.name}</CardTitle>
                        <CardDescription className="px-4">
                            {tier.description}
                        </CardDescription>
                        <div className="pt-6">
                            <span className="text-5xl font-bold font-headline">{tier.price}</span>
                            <span className="text-muted-foreground">{tier.priceDescription}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                    <ul className="space-y-4">
                        {tier.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-primary" />
                                <span className="text-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    </CardContent>
                    <CardFooter className="p-8 pt-0">
                        {tier.buttonAction === 'link' ? (
                            <Button asChild size="lg" className="w-full text-lg font-bold" variant={tier.variant === 'primary' ? 'default' : tier.variant}>
                                <Link href={tier.href!}>{tier.buttonText}</Link>
                            </Button>
                        ) : (
                            <Button onClick={() => handleSubscribe(tier.name)} size="lg" className="w-full text-lg font-bold" variant={tier.variant === 'primary' ? 'default' : tier.variant}>
                                {tier.buttonText}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
