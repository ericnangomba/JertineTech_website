import { Clock3, Layers3, ShieldCheck, WalletCards } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/reveal';

interface USP {
  icon: LucideIcon;
  title: string;
  description: string;
}

const usps: USP[] = [
  {
    icon: WalletCards,
    title: 'Transparent Value',
    description: 'Clear software scopes and hardware support plans with transparent cost breakdowns.',
  },
  {
    icon: Clock3,
    title: 'Fast Delivery',
    description: 'Lean sprints for software plus rapid-response hardware troubleshooting when urgent issues hit.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Execution',
    description: 'Robust code quality, secure deployments, and disciplined support workflows keep systems stable.',
  },
  {
    icon: Layers3,
    title: 'One Integrated Team',
    description: 'Software development and IT hardware support delivered by one accountable team.',
  },
];

interface WhyChooseUsSectionProps {
  id: string;
}

export default function WhyChooseUsSection({ id }: WhyChooseUsSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-shell">
        <Reveal>
          <h2 className="text-center font-body text-3xl font-bold md:text-5xl">
            Built for teams that need
            <span className="block text-lime-300">code and devices to just work.</span>
          </h2>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base text-muted-foreground md:text-lg">
            We combine software engineering discipline with practical hardware reliability so your operations stay productive.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((usp, index) => (
            <Reveal key={usp.title} delayMs={index * 70}>
              <div className="glass-card hover-lift rounded-2xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-lime-300/30 bg-gradient-to-br from-lime-400/20 to-red-400/15">
                  <usp.icon className="h-6 w-6 text-lime-300" />
                </div>
                <h3 className="font-body text-xl font-semibold text-card-foreground">{usp.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{usp.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
