import {
  Bot,
  Cable,
  Database,
  LifeBuoy,
  Palette,
  SearchCheck,
  ServerCog,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import Reveal from '@/components/ui/reveal';

interface AboutUsSectionProps {
  id: string;
}

const softwareRoles = [
  {
    title: 'Lead Full-Stack Developer',
    description:
      'Architecting the bridge between beautiful user interfaces and powerful backend logic.',
    icon: Bot,
  },
  {
    title: 'UI/UX Designer',
    description:
      'Turning complex software requirements into intuitive, user-friendly digital experiences.',
    icon: Palette,
  },
  {
    title: 'Backend Engineer',
    description:
      'The engine room specialist, ensuring data security, speed, and seamless database integration.',
    icon: Database,
  },
  {
    title: 'QA / Software Tester',
    description:
      'Our quality gatekeeper who ensures every line of code is tested before it reaches production.',
    icon: SearchCheck,
  },
];

const infrastructureRoles = [
  {
    title: 'Systems Infrastructure Lead',
    description:
      'Managing the physical servers and networks that keep business operations connected 24/7.',
    icon: ServerCog,
  },
  {
    title: 'Hardware Support Specialist',
    description:
      'Boots on the ground for hardware diagnostics, repairs, and device deployments.',
    icon: Wrench,
  },
  {
    title: 'Network Security Technician',
    description:
      'Protecting physical and wireless perimeters from external threats and downtime.',
    icon: ShieldCheck,
  },
  {
    title: 'Technical Support Engineer',
    description:
      'The friendly face of troubleshooting, solving hardware and operating system issues in real-time.',
    icon: LifeBuoy,
  },
];

export default function AboutUsSection({ id }: AboutUsSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center font-headline text-3xl font-bold md:text-5xl">
              Our Team.
              <span className="block text-lime-300">Software builders and hardware fixers.</span>
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="mx-auto mt-6 max-w-4xl text-center text-base text-muted-foreground md:text-lg">
              We combine digital product engineering with dependable infrastructure support. The result is one integrated team that can build your platform and keep your devices, networks, and systems operating reliably.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 xl:grid-cols-2">
            <Reveal delayMs={140}>
              <div className="glass-card rounded-2xl border border-lime-300/20 p-6">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-lime-300" />
                  <p className="font-headline text-lg font-semibold text-white">Software Development Roles</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Focused on product design, architecture, code quality, and delivery velocity.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {softwareRoles.map((role) => (
                    <article key={role.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <role.icon className="h-5 w-5 text-lime-300" />
                      <h3 className="mt-3 font-headline text-base font-semibold text-white">{role.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{role.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={220}>
              <div className="glass-card rounded-2xl border border-red-300/20 p-6">
                <div className="flex items-center gap-2">
                  <Cable className="h-5 w-5 text-red-300" />
                  <p className="font-headline text-lg font-semibold text-white">Hardware & Infrastructure Roles</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Focused on uptime, hardware reliability, secure connectivity, and real-time support.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {infrastructureRoles.map((role) => (
                    <article key={role.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <role.icon className="h-5 w-5 text-red-300" />
                      <h3 className="mt-3 font-headline text-base font-semibold text-white">{role.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{role.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
