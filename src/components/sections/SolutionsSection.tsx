import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Reveal from '@/components/ui/reveal';
import { services } from '@/lib/services';

interface SolutionsSectionProps {
  id: string;
}

export default function SolutionsSection({ id }: SolutionsSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-shell">
        <Reveal>
          <h2 className="text-center font-headline text-3xl font-bold md:text-5xl">
            Software precision.
            <span className="block text-lime-300">Hardware resilience.</span>
          </h2>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base text-muted-foreground md:text-lg">
            We build and support the systems businesses run on: applications, devices, networks, and the workflows connecting them.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delayMs={index * 70}>
              <Card className="glass-card hover-lift sheen h-full border-white/15 bg-white/[0.04]">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-lime-300/30 bg-gradient-to-br from-lime-400/20 to-red-400/15">
                    <service.icon className="h-6 w-6 text-lime-300" />
                  </div>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{service.summary}</p>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-foreground/90">
                    {service.outcome}
                  </div>
                  <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-red-300 hover:text-red-200">
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
