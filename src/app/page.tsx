import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Gem, ShieldCheck, UploadCloud, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Immutable Legacy",
    description: "Mint your heirlooms as ERC-721 NFTs on the Base blockchain, ensuring they last for generations.",
  },
  {
    icon: <UploadCloud className="w-8 h-8 text-primary" />,
    title: "Simple Minting",
    description: "An intuitive interface lets you upload files, add stories, and mint your digital legacy in minutes.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Family First",
    description: "Designate heirs and manage who can view your collection with private sharing links.",
  },
  {
    icon: <Gem className="w-8 h-8 text-primary" />,
    title: "Exclusive Access",
    description: "A subscription unlocks your personal dashboard to manage and grow your digital heirloom collection.",
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-family-legacy');

  return (
    <div className="flex flex-col items-center bg-background">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4 md:px-6">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-foreground">
              Preserve Your Legacy, <span className="text-primary">Forever</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Welcome to Legacy Vault, the platform where your cherished memories become immortal digital heirlooms on the blockchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="font-bold text-lg">
                <Link href="/mint">Mint Your First Heirloom</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold text-lg">
                <Link href="/#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">A Timeless Process in Three Steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transforming your memories into a digital legacy is a simple and secure journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-transparent hover:border-primary/50 transition-all duration-300 bg-background/50 transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <span className="text-4xl font-headline font-black text-primary">1</span>
                </div>
                <CardTitle className="font-headline text-2xl mt-4">Connect & Prepare</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Securely connect your wallet and gather the digital files and stories you wish to preserve.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-transparent hover:border-primary/50 transition-all duration-300 bg-background/50 transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <span className="text-4xl font-headline font-black text-primary">2</span>
                </div>
                <CardTitle className="font-headline text-2xl mt-4">Mint Your Heirloom</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload your item, add its story, and mint it as a unique NFT on the secure Base blockchain.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-transparent hover:border-primary/50 transition-all duration-300 bg-background/50 transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                   <span className="text-4xl font-headline font-black text-primary">3</span>
                </div>
                <CardTitle className="font-headline text-2xl mt-4">Manage & Inherit</CardTitle>
              </CardHeader>
              <CardContent>
                <p>View your collection, manage your legacy, and designate who will inherit your heirlooms in the future.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Built for Eternity</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Legacy Vault provides the tools you need to secure your story for the generations to come.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-card/50">
                {feature.icon}
                <h3 className="text-xl font-headline font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
       <section className="w-full py-20 md:py-32 bg-card/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Unlock Your Personal Vault</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                A subscription unlocks your private dashboard, advanced management tools, and the ability to build a comprehensive family legacy.
            </p>
             <div className="mt-8 flex justify-center">
                 <Button asChild size="lg" className="font-bold text-lg">
                    <Link href="/pricing">View Subscription Plans</Link>
                </Button>
            </div>
        </div>
      </section>

    </div>
  );
}
