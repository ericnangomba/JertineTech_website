import { Compass, Lightbulb, Rocket, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/reveal';

interface ProcessStep {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    step: '01',
    icon: Compass,
    title: 'Audit',
    description: 'We assess your software stack, hardware environment, and operational constraints.',
  },
  {
    step: '02',
    icon: Lightbulb,
    title: 'Architect',
    description: 'We define software scope, infrastructure decisions, and service-level support expectations.',
  },
  {
    step: '03',
    icon: Wrench,
    title: 'Implement',
    description: 'We ship application features, stabilize hardware touchpoints, and validate performance.',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Operate',
    description: 'We monitor, support, and continuously improve both software reliability and IT hardware uptime.',
  },
];

interface ProcessSectionProps {
  id: string;
}

export default function ProcessSection({ id }: ProcessSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-shell">
        <Reveal>
          <h2 className="text-center font-headline text-3xl font-bold md:text-5xl">
            Operational method.
            <span className="block text-lime-300">Engineering-level consistency.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((item, index) => (
            <Reveal key={item.step} delayMs={index * 70}>
              <div className="glass-card hover-lift rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <item.icon className="h-6 w-6 text-lime-300" />
                  <span className="font-headline text-sm tracking-[0.24em] text-red-300">{item.step}</span>
                </div>
                <h3 className="mt-4 font-headline text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
