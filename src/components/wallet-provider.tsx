
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Icons } from "./icons";
import { useToast } from "@/hooks/use-toast";

type WalletContextType = {
  isConnected: boolean;
  address: `0x${string}` | undefined;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const projectId = 'db8cde9705ae847fded8154c8035b24f';

const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Legacy Vault' }),
    walletConnect({ projectId }),
  ],
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

const WalletProviderContent = ({ children }: { children: ReactNode }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const connectWallet = () => {
        setIsDialogOpen(true);
    };

    const handleWalletSelect = (connector: any) => {
        connect({ connector });
        setIsDialogOpen(false);
        toast({
            title: "Wallet Connecting...",
            description: "Please approve the connection in your wallet.",
        });
    };

    const value = {
        isConnected,
        address,
        connectWallet,
        disconnectWallet: () => disconnect(),
    };
    
    return (
        <WalletContext.Provider value={value}>
            {children}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Connect your wallet</DialogTitle>
                        <DialogDescription>
                            Select your preferred wallet to continue. You'll be asked to connect on the Base network.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {connectors.map((connector) => (
                            <Button
                                key={connector.uid}
                                variant="outline"
                                size="lg"
                                className="justify-start text-lg"
                                onClick={() => handleWalletSelect(connector)}
                            >
                                {connector.name === 'MetaMask' && <Icons.metaMask className="mr-4 h-6 w-6" />}
                                {connector.name === 'Coinbase Wallet' && <Icons.coinbase className="mr-4 h-6 w-6" />}
                                {connector.name === 'WalletConnect' && (
                                  <svg className="mr-4 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.429 18.57L12 12M12 12L18.571 5.428M12 12L5.429 5.428M12 12L18.571 18.57" stroke="#3375BB" strokeWidth="2.57" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                                {connector.name !== 'MetaMask' && connector.name !== 'Coinbase Wallet' && connector.name !== 'WalletConnect' && <div className="mr-4 h-6 w-6" />}
                                {connector.name}
                            </Button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </WalletContext.Provider>
    )
}

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletProviderContent>{children}</WalletProviderContent>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
