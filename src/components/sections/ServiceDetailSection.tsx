import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ServiceDefinition } from '@/lib/services';
import Reveal from '@/components/ui/reveal';

interface ServiceDetailSectionProps {
  service: ServiceDefinition;
}

export default function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  return (
    <main id="main-content" className="section-shell pb-24 pt-28 md:pt-32">
      <Reveal>
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-lime-300 hover:text-lime-200">
          <ArrowLeft className="h-4 w-4" /> Back to all services
        </Link>
      </Reveal>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Reveal delayMs={40}>
            <p className="inline-flex rounded-full border border-lime-300/35 bg-lime-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
              Service Detail
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h1 className="mt-4 flex items-center gap-3 font-body text-4xl font-bold md:text-6xl">
              <service.icon className="h-10 w-10 text-lime-300 md:h-12 md:w-12" />
              {service.title}
            </h1>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-5 max-w-3xl text-base text-muted-foreground md:text-lg">{service.overview}</p>
          </Reveal>

          <Reveal delayMs={160}>
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Typical Deliverables</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="inline-flex items-start gap-2 text-sm text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={200}>
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Case Snapshot</p>
              <div className="mt-4 space-y-4">
                {service.caseStudies.map((study) => (
                  <article key={study.title} className="rounded-xl border border-lime-300/20 bg-black/30 p-4">
                    <p className="font-body text-lg font-semibold text-white">{study.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-lime-300">{study.clientProfile}</p>
                    <p className="mt-3 text-sm text-foreground/90">
                      <span className="font-semibold text-white">Challenge:</span> {study.challenge}
                    </p>
                    <p className="mt-2 text-sm text-foreground/90">
                      <span className="font-semibold text-white">Approach:</span> {study.approach}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {study.impact.map((item) => (
                        <li key={item} className="inline-flex items-start gap-2 text-sm text-foreground/90">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-5">
          <Reveal delayMs={180}>
            <div className="glass-card rounded-2xl border-white/15 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Delivery Outcome</p>
              <p className="mt-3 text-sm text-foreground/90">{service.outcome}</p>
            </div>
          </Reveal>
          <Reveal delayMs={220}>
            <div className="glass-card rounded-2xl border-white/15 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ideal For</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.idealFor.map((item) => (
                  <span key={item} className="rounded-full border border-lime-300/25 bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={260}>
            <div className="glass-card rounded-2xl border-white/15 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Typical Timeline</p>
              <p className="mt-3 text-sm text-foreground/90">{service.timeline}</p>
            </div>
          </Reveal>
          <Reveal delayMs={300}>
            <Link
              href="/#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-lime-300"
            >
              Start this capability <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
