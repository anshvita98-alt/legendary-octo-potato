
"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateHeirloomStory } from "@/ai/flows/generate-heirloom-story";
import { Upload, Sparkles, Loader2, FileImage, Gem } from "lucide-react";
import Image from "next/image";
import { useWallet } from "@/components/wallet-provider";
import { useHeirloomContract } from "@/hooks/use-heirloom-contract";
import { uploadToIpfs } from "./actions";


const mintFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  familyStory: z.string().optional(),
  file: z.any().refine((files) => files?.length === 1, "An image is required."),
});

type MintFormValues = z.infer<typeof mintFormSchema>;


export default function MintPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const { toast } = useToast();
  const { isConnected, connectWallet, address } = useWallet();
  const { mintHeirloom, isMinting, isConfirmed, hash, error } = useHeirloomContract();


  const form = useForm<MintFormValues>({
    resolver: zodResolver(mintFormSchema),
    defaultValues: {
      title: "",
      description: "",
      familyStory: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateStory = async () => {
    const { title, description, familyStory } = form.getValues();
    if (!title || !description) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide a title and description for your heirloom.",
      });
      return;
    }
    setIsGeneratingStory(true);
    try {
      const result = await generateHeirloomStory({
        heirloomDescription: `${title}: ${description}`,
        familyStory: familyStory,
      });
      form.setValue("familyStory", result.story);
      toast({
        title: "Story Generated",
        description: "The AI has crafted a story for your heirloom.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate story. Please try again.",
      });
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const onSubmit: SubmitHandler<MintFormValues> = async (data) => {
    if (!isConnected || !address) {
      toast({
          title: "Wallet Not Connected",
          description: "Please connect your wallet to mint an heirloom.",
      });
      connectWallet();
      return;
    }
    if (!preview) {
        toast({
            variant: "destructive",
            title: "File not selected",
            description: "Please select a file to mint.",
        });
        return;
    }

    try {
        const ipfsUri = await uploadToIpfs(data, preview);
        if (!ipfsUri) {
          throw new Error("Failed to upload to IPFS.");
        }
        mintHeirloom(address, ipfsUri);
    } catch(e) {
        console.error(e);
        toast({
            variant: "destructive",
            title: "Error",
            description: e instanceof Error ? e.message : "Could not upload to IPFS.",
        });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: "Minting Successful!",
        description: (
            <div>
                <p>Your heirloom "{form.getValues("title")}" has been securely minted.</p>
                <a href={`https://basescan.org/tx/${hash}`} target="_blank" rel="noopener noreferrer" className="underline">View on Basescan</a>
            </div>
        )
      });
      form.reset();
      setPreview(null);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Minting Failed",
        description: error.message,
      });
    }
  }, [isConfirmed, error, hash, form, toast]);


  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Mint Your Digital Heirloom</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Fill in the details below to immortalize your memory on the blockchain.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Heirloom Details</CardTitle>
              <CardDescription>Provide the information for your legacy item.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heirloom File</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="file" accept="image/*" className="pl-12"
                         onChange={(e) => {
                           field.onChange(e.target.files);
                           handleFileChange(e);
                         }}
                        />
                        <Upload className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Grandfather's Pocket Watch" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short, factual description of the item." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="familyStory"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Family Story (Optional)</FormLabel>
                      <Button type="button" size="sm" variant="ghost" onClick={handleGenerateStory} disabled={isGeneratingStory}>
                        {isGeneratingStory ? (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                           <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Generate with AI
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea rows={6} placeholder="The story behind the item, its significance, and the memories it holds." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>This is how your heirloom will be displayed.</CardDescription>
              </CardHeader>
              <CardContent>
                {preview ? (
                  <div className="relative aspect-video w-full rounded-md overflow-hidden border">
                    <Image src={preview} alt="Heirloom preview" fill objectFit="cover" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center aspect-video w-full bg-muted/50 rounded-md border border-dashed">
                     <FileImage className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Image preview will appear here.</p>
                  </div>
                )}
                <div className="mt-4 space-y-2">
                    <h3 className="font-headline text-2xl font-semibold">{form.watch("title") || "Heirloom Title"}</h3>
                    <p className="text-sm text-muted-foreground">{form.watch("description") || "A description of your special item."}</p>
                    <div className="border-t pt-4 mt-4">
                        <h4 className="font-semibold mb-2">Story</h4>
                        <p className="text-sm whitespace-pre-wrap">{form.watch("familyStory") || "The story behind your heirloom."}</p>
                    </div>
                </div>
              </CardContent>
            </Card>
            <Button type="submit" size="lg" className="w-full text-lg" disabled={isMinting}>
              {isMinting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Gem className="mr-2 h-5 w-5" />
              )}
              {isMinting ? "Confirm in Wallet..." : "Mint Heirloom (Free)"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
