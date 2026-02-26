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
    <section id={id} className="relative flex min-h-[100svh] items-center overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroBackgroundImage}
          alt="Futuristic technology backdrop"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-20 section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-up inline-flex items-center rounded-full border border-lime-300/40 bg-lime-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
            Software + Hardware Execution Partner
          </p>
          <h1 className="animate-fade-up mt-4 text-balance font-headline text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Build reliable software.
            <br />
            Keep every device running.
          </h1>
          <p className="animate-fade-up animate-delay-100 mx-auto mt-5 max-w-xl text-sm text-white/85 sm:text-base md:text-lg">
            One team delivering dependable software and hardware support for SMEs.
          </p>
          <div className="animate-fade-up animate-delay-200 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="w-full rounded-full bg-lime-400 px-8 text-black hover:bg-lime-300 sm:w-auto">
              <Link href="#contact">
                Start a Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full rounded-full border border-lime-300/40 bg-lime-400/10 px-8 text-white hover:bg-lime-400/20 sm:w-auto">
              <Link href="/services">View Capabilities</Link>
            </Button>
          </div>
          <div className="animate-fade-up animate-delay-300 mt-10 grid gap-3 text-sm text-white/90 sm:grid-cols-3">
            <p className="glass-card flex items-center justify-center gap-2 border-lime-300/20 bg-black/25 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-lime-300" /> One accountable team
            </p>
            <p className="glass-card flex items-center justify-center gap-2 border-red-300/20 bg-black/25 px-4 py-3">
              <Zap className="h-4 w-4 text-lime-300" /> SLA-ready support workflows
            </p>
            <p className="glass-card flex items-center justify-center gap-2 border-lime-300/20 bg-black/25 px-4 py-3">
              <Sparkles className="h-4 w-4 text-lime-300" /> Production-first engineering
            </p>
          </div>
          <p className="animate-fade-up animate-delay-300 mt-6 text-xs uppercase tracking-[0.22em] text-white/60">
            Trusted by teams in logistics, healthcare, engineering, and retail
          </p>
        </div>
      </div>
    </section>
  );
}
