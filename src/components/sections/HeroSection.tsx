import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import HeroBackgroundImage from '../../images/hero-bg.jpg';

interface HeroSectionProps {
  id: string;
}

export default function HeroSection({ id }: HeroSectionProps) {
  return (
    <section id={id} className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroBackgroundImage}
          alt="Futuristic technology backdrop"
          fill
          priority
          className="pointer-events-none object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-x-0 top-24 z-10 section-shell">
        
      </div>

      <div className="relative z-20 section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-up font-headline font-bold leading-[1.08] tracking-[-0.02em] text-white text-[clamp(2rem,9vw,4.5rem)]">
            <span className="block">Systems Intergration.</span>
            <span className="mx-auto mt-2 block max-w-[20ch] text-[0.72em] leading-[1.18] text-lime-300 md:mt-3 md:max-w-none md:text-[0.58em]">
              Software that ships. Hardware that holds.
            </span>
          </h1>
          <p className="animate-fade-up animate-delay-100 mx-auto mt-6 max-w-2xl text-base text-white/85 md:text-xl">
            From custom application development to desktop and network support, we keep your business technology reliable and fast.
          </p>
          <div className="animate-fade-up animate-delay-200 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="rounded-full bg-lime-400 px-8 text-black hover:bg-lime-300">
              <Link href="#solutions">
                Explore Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="rounded-full border border-white/20 bg-white/10 px-8 text-white hover:bg-white/20">
              <Link href="#contact">Book a Discovery Call</Link>
            </Button>
          </div>
          <div className="animate-fade-up animate-delay-300 mt-10 grid gap-3 text-sm text-white/90 sm:grid-cols-3">
            <p className="glass-card flex items-center justify-center gap-2 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-lime-300" /> Full-stack software delivery
            </p>
            <p className="glass-card flex items-center justify-center gap-2 px-4 py-3">
              <Zap className="h-4 w-4 text-lime-300" /> Hardware and IT support
            </p>
            <p className="glass-card flex items-center justify-center gap-2 px-4 py-3">
              <Sparkles className="h-4 w-4 text-lime-300" /> Elegant, modern execution
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
