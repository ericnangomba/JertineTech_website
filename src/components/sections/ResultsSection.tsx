import { Activity, Gauge, ShieldCheck, Timer } from 'lucide-react';
import Reveal from '@/components/ui/reveal';

interface ResultsSectionProps {
  id: string;
}

const proofCards = [
  {
    icon: Timer,
    value: '< 2h',
    label: 'Incident Response Target',
    detail: 'For active managed support agreements.',
  },
  {
    icon: Gauge,
    value: '99.9%',
    label: 'Uptime Objective',
    detail: 'For monitored critical business systems.',
  },
  {
    icon: ShieldCheck,
    value: '1 Team',
    label: 'Single Accountability Layer',
    detail: 'Software + infrastructure + endpoint support.',
  },
  {
    icon: Activity,
    value: 'Weekly',
    label: 'Operational Visibility',
    detail: 'Structured updates, actions, and next steps.',
  },
];

const industries = [
  'Logistics',
  'Healthcare',
  'Engineering',
  'Retail',
  'Professional Services',
  'SME Operations',
];

export default function ResultsSection({ id }: ResultsSectionProps) {
  return (
    <section id={id} className="py-20 md:py-24">
      <div className="section-shell">
        <Reveal>
          <p className="mx-auto inline-flex rounded-full border border-lime-300/35 bg-lime-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
            Delivery Proof
          </p>
        </Reveal>
        <Reveal delayMs={60}>
          <h2 className="mt-4 text-center font-headline text-3xl font-bold md:text-5xl">
            Outcomes you can operate on.
            <span className="block text-red-300">Not vague promises.</span>
          </h2>
        </Reveal>
        <Reveal delayMs={110}>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base text-muted-foreground md:text-lg">
            We run delivery and support with measurable targets, structured reporting, and one accountable execution team.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {proofCards.map((item, index) => (
            <Reveal key={item.label} delayMs={index * 70}>
              <div className="glass-card hover-lift rounded-2xl border-white/15 bg-black/20 p-6">
                <item.icon className="h-5 w-5 text-lime-300" />
                <p className="mt-4 font-headline text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{item.label}</p>
                <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-black/25 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Teams We Commonly Support</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-lime-300/25 bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-200"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
