
"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heirloom } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Lock, Edit, Share2, GitBranch, Loader2, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/components/wallet-provider";
import { useReadContract, useReadContracts } from "wagmi";
import HeirloomABI from "@/lib/abi/Heirloom.json";
import { type Address } from "viem";

const HEIRLOOM_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_HEIRLOOM_CONTRACT_ADDRESS || "0xd9145CCE52D386f254917e481eB44e9943F39138") as Address;
const ITEMS_PER_PAGE = 6;

const HeirloomCard = ({ heirloom }: { heirloom: Heirloom }) => {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video w-full">
        {imageError || !heirloom.imageUrl ? (
          <div className="w-full h-full bg-muted flex flex-col items-center justify-center">
            <EyeOff className="h-10 w-10 text-muted-foreground" />
            <p className="text-xs text-muted-foreground mt-2">Could not load image</p>
          </div>
        ) : (
          <Image 
            src={heirloom.imageUrl} 
            alt={heirloom.name} 
            fill
            className="object-cover"
            data-ai-hint={heirloom.imageHint || "heirloom image"}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl">{heirloom.name}</CardTitle>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toast({title: "Edit action triggered."})}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Metadata
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast({title: "Sharing link copied to clipboard."})}>
                        <Share2 className="mr-2 h-4 w-4" /> Get Sharable Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast({title: "Designate heir action triggered."})}>
                        <GitBranch className="mr-2 h-4 w-4" /> Designate Heir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <CardDescription>{heirloom.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{heirloom.story}</p>
      </CardContent>
    </Card>
  );
};


const useOwnedHeirlooms = (address: Address | undefined) => {
    const [heirlooms, setHeirlooms] = useState<Heirloom[]>([]);
    const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const { data: balance, isLoading: isBalanceLoading } = useReadContract({
        abi: HeirloomABI,
        address: HEIRLOOM_CONTRACT_ADDRESS,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    });

    const balanceAsNumber = useMemo(() => (balance ? Number(balance) : 0), [balance]);
    const totalPages = Math.ceil(balanceAsNumber / ITEMS_PER_PAGE);

    const tokenOfOwnerByIndexContracts = useMemo(() => {
        if (!address || balanceAsNumber === 0) return [];
        const startIndex = currentPage * ITEMS_PER_PAGE;
        const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, balanceAsNumber);
        
        return Array.from({ length: endIndex - startIndex }, (_, index) => ({
            abi: HeirloomABI,
            address: HEIRLOOM_CONTRACT_ADDRESS,
            functionName: 'tokenOfOwnerByIndex',
            args: [address, BigInt(startIndex + index)],
        }));
    }, [address, balanceAsNumber, currentPage]);

    const { data: tokenIdsData, isLoading: isTokenIdsLoading, isRefetching: isRefetchingTokenIds } = useReadContracts({
        contracts: tokenOfOwnerByIndexContracts,
        query: {
            enabled: !!address && tokenOfOwnerByIndexContracts.length > 0,
        }
    });
    
    const tokenIds = useMemo(() => {
        if (!tokenIdsData) return [];
        return tokenIdsData.map(d => d.result as bigint).filter(Boolean)
    }, [tokenIdsData]);

    const tokenURIContracts = useMemo(() => {
        if (tokenIds.length === 0) return [];
        return tokenIds.map(tokenId => ({
            abi: HeirloomABI,
            address: HEIRLOOM_CONTRACT_ADDRESS,
            functionName: 'tokenURI',
            args: [tokenId],
        }));
    }, [tokenIds]);
    
    const { data: tokenURIsData, isLoading: isTokenURIsLoading, isRefetching: isRefetchingTokenURIs } = useReadContracts({
        contracts: tokenURIContracts,
        query: {
            enabled: tokenIds.length > 0,
        }
    });

    const tokenURIs = useMemo(() => {
        if (!tokenURIsData) return [];
        return tokenURIsData.map(d => d.result as string).filter(Boolean)
    }, [tokenURIsData]);

    useEffect(() => {
        const fetchMetadata = async () => {
            if (tokenURIs.length === 0 && (isTokenIdsLoading || isTokenURIsLoading)) {
                return;
            }
             if (tokenURIs.length === 0) {
                setHeirlooms([]);
                return;
            }
            setIsFetchingMetadata(true);
            try {
                const metadataPromises = tokenURIs.map(async (uri, index) => {
                    if (!uri) return null;
                    const ipfsPath = uri.replace(/^ipfs:\/\//, '');
                    try {
                        const response = await fetch(`/api/ipfs/${ipfsPath}`);
                        if (!response.ok) {
                            console.error(`Failed to fetch metadata for ${uri}`);
                            return null;
                        }
                        const metadata = await response.json();
                        const imageIpfsPath = metadata.image ? metadata.image.replace(/^ipfs:\/\//, '') : '';
                        const imageUrl = imageIpfsPath ? `/api/ipfs/${imageIpfsPath}` : '';

                        return {
                            id: tokenIds[index].toString(),
                            name: metadata.name || 'Untitled Heirloom',
                            description: metadata.description || '',
                            story: metadata.story || '',
                            imageUrl,
                            imageHint: '',
                        };
                    } catch (e) {
                         console.error(`Error fetching or parsing metadata for ${uri}`, e);
                         return null;
                    }
                });

                const results = await Promise.all(metadataPromises);
                setHeirlooms(results.filter((h): h is Heirloom => h !== null));
            } catch (e) {
                console.error("Error fetching heirlooms metadata", e);
                setHeirlooms([]);
            } finally {
                setIsFetchingMetadata(false);
            }
        };
        
        fetchMetadata();

    }, [tokenURIs, tokenIds, isTokenIdsLoading, isTokenURIsLoading]);
    
    useEffect(() => {
        setCurrentPage(0);
    }, [address]);

    const isLoading = isBalanceLoading || isTokenIdsLoading || isTokenURIsLoading || isFetchingMetadata || isRefetchingTokenIds || isRefetchingTokenURIs;

    return { heirlooms, isLoading, count: balanceAsNumber, currentPage, totalPages, setCurrentPage };
};


export default function DashboardPage() {
    const { isConnected, address, connectWallet } = useWallet();
    const { heirlooms, isLoading, count, currentPage, totalPages, setCurrentPage } = useOwnedHeirlooms(address);

  if (!isConnected) {
     return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <Card className="mt-12 text-center py-20">
                <CardContent className="flex flex-col items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Lock className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-headline font-semibold">Connect Your Wallet</h2>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Please connect your wallet to view your personal dashboard and manage your digital heirlooms.
                    </p>
                    <Button onClick={connectWallet} className="mt-6 text-lg" size="lg">
                    Connect Wallet
                    </Button>
                </CardContent>
            </Card>
        </div>
     )
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Your Digital Vault</h1>
          <p className="text-muted-foreground mt-2">You have {count} heirloom{count !== 1 && 's'} in your collection.</p>
        </div>
        <Button asChild>
            <Link href="/mint">Mint New Heirloom</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : heirlooms.length > 0 ? (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {heirlooms.map((heirloom) => (
                <HeirloomCard key={heirloom.id} heirloom={heirloom} />
            ))}
            </div>
             {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-4">
                    <Button 
                        variant="outline"
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 0}
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    <span className="text-muted-foreground">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    <Button 
                        variant="outline"
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}
        </>
      ) : (
        <Card className="mt-12 text-center py-20">
          <CardContent className="flex flex-col items-center">
            <h2 className="text-2xl font-headline font-semibold">Your Vault is Empty</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              You haven't minted any heirlooms yet. Start by creating your first digital legacy.
            </p>
            <Button asChild className="mt-6 text-lg" size="lg">
              <Link href="/mint">Mint Your First Heirloom</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
