import { BadgeCheck, Gauge, Target } from 'lucide-react';
import Reveal from '@/components/ui/reveal';

interface AboutUsSectionProps {
  id: string;
}

export default function AboutUsSection({ id }: AboutUsSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-center font-body text-3xl font-bold md:text-5xl">
              Engineering partner for
              <span className="block text-lime-300">software and hardware teams.</span>
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="mx-auto mt-6 max-w-3xl text-center text-base text-muted-foreground md:text-lg">
              We support SMEs with full-stack software delivery and practical hardware operations, from product builds to device stability and onsite support.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Reveal delayMs={140}>
              <div className="glass-card hover-lift border-red-300/20 p-4 text-center">
                <Target className="mx-auto h-5 w-5 text-lime-300" />
                <p className="mt-2 text-sm font-semibold">Mission</p>
                <p className="mt-1 text-xs text-muted-foreground">Ship dependable software and keep hardware operational.</p>
              </div>
            </Reveal>
            <Reveal delayMs={200}>
              <div className="glass-card hover-lift border-red-300/20 p-4 text-center">
                <Gauge className="mx-auto h-5 w-5 text-lime-300" />
                <p className="mt-2 text-sm font-semibold">Vision</p>
                <p className="mt-1 text-xs text-muted-foreground">Raise the quality bar for SME tech operations.</p>
              </div>
            </Reveal>
            <Reveal delayMs={260}>
              <div className="glass-card hover-lift border-red-300/20 p-4 text-center">
                <BadgeCheck className="mx-auto h-5 w-5 text-lime-300" />
                <p className="mt-2 text-sm font-semibold">Principles</p>
                <p className="mt-1 text-xs text-muted-foreground">Clarity, speed, ownership, and measurable outcomes.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
