
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import Heirloom from "@/lib/abi/Heirloom.json";
import { type WriteContractParameters } from "wagmi/actions";
import { type Address } from "viem";


// TODO: Replace with your deployed contract address
const HEIRLOOM_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_HEIRLOOM_CONTRACT_ADDRESS || "0xd9145CCE52D386f254917e481eB44e9943F39138") as Address;

export function useHeirloomContract() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const mintHeirloom = (to: `0x${string}`, uri: string, options?: Pick<WriteContractParameters, 'value'>) => {
    writeContract({
      address: HEIRLOOM_CONTRACT_ADDRESS,
      abi: Heirloom,
      functionName: 'safeMint',
      args: [to, uri],
      ...options
    });
  };

  const withdrawFunds = () => {
    writeContract({
      address: HEIRLOOM_CONTRACT_ADDRESS,
      abi: Heirloom,
      functionName: 'withdraw',
      args: [],
    });
  };

  const useContractBalance = (ownerAddress: Address | undefined) => {
    return useReadContract({
      abi: Heirloom,
      address: HEIRLOOM_CONTRACT_ADDRESS,
      functionName: 'balanceOf',
      args: [ownerAddress],
      query: {
        enabled: !!ownerAddress,
      }
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    });

  return {
    mintHeirloom,
    withdrawFunds,
    useContractBalance,
    isMinting: isPending || isConfirming,
    isConfirmed,
    hash,
    error,
  };
}
