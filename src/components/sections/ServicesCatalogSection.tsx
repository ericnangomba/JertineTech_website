import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/services';
import Reveal from '@/components/ui/reveal';

export default function ServicesCatalogSection() {
  return (
    <main id="main-content" className="section-shell pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="inline-flex rounded-full border border-lime-300/35 bg-lime-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
            Service Capabilities
          </p>
        </Reveal>
        <Reveal delayMs={60}>
          <h1 className="mt-4 font-headline text-4xl font-bold md:text-6xl">Software. Hardware. One execution team.</h1>
        </Reveal>
        <Reveal delayMs={120}>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Explore our core service areas and the delivery outcomes each capability is built to drive.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.slug} delayMs={index * 60}>
            <article className="glass-card hover-lift sheen rounded-2xl border-white/15 bg-black/20 p-6">
              <service.icon className="h-6 w-6 text-lime-300" />
              <h2 className="mt-4 font-headline text-2xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{service.summary}</p>
              <p className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-foreground/90">{service.outcome}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-lime-300 hover:text-lime-200"
              >
                View service details <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
