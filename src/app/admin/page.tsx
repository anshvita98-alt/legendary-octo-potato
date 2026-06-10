"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useHeirloomContract } from "@/hooks/use-heirloom-contract";
import { useToast } from "@/hooks/use-toast";
import { useReadContract } from "wagmi";
import Heirloom from "@/lib/abi/Heirloom.json";
import { formatEther } from "viem";
import { Banknote, Loader2 } from "lucide-react";
import { type Address } from "viem";

const HEIRLOOM_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_HEIRLOOM_CONTRACT_ADDRESS || "0xd9145CCE52D386f254917e481eB44e9943F39138") as Address;

const WithdrawCard = () => {
    const { toast } = useToast();
    const { withdrawFunds, isMinting, isConfirmed, error } = useHeirloomContract();
    
    const { data: balance, refetch } = useReadContract({
        abi: Heirloom,
        address: HEIRLOOM_CONTRACT_ADDRESS,
        functionName: 'getBalance',
    });

    useEffect(() => {
        if (isConfirmed) {
            toast({
                title: "Withdrawal Successful!",
                description: "The contract balance has been transferred to your wallet.",
            });
            refetch();
        }
        if (error) {
            toast({
                variant: "destructive",
                title: "Withdrawal Failed",
                description: error.message,
            });
        }
    }, [isConfirmed, error, toast, refetch]);

    const handleWithdraw = () => {
        withdrawFunds();
    };

    const balanceInEth = balance ? formatEther(balance as bigint) : "0";

    return (
         <Card>
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
            <CardDescription>Withdraw the collected fees from the smart contract to the owner's wallet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Contract Balance</p>
                    <p className="text-2xl font-bold">{balanceInEth} ETH</p>
                  </div>
                  <Button onClick={handleWithdraw} disabled={isMinting || balanceInEth === '0'}>
                    {isMinting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Banknote className="mr-2 h-4 w-4" />}
                     Withdraw
                  </Button>
              </div>
          </CardContent>
        </Card>
    )
}


export default function AdminPage() {
  const [isSubscriptionRequired, setIsSubscriptionRequired] = useState(false);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Admin Tools</h1>
        <p className="text-muted-foreground mt-2">Manage settings and flows for Legacy Vault.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Minting Flow Management</CardTitle>
            <CardDescription>Control how users can mint new heirlooms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground p-4">
                Users can mint via a one-time payment.
            </p>
          </CardContent>
        </Card>
        
        <WithdrawCard />
      </div>
    </div>
  );
}
