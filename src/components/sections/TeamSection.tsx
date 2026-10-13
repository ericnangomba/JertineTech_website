import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BriefcaseBusiness } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import SarahRockwellImage from '../../images/Sarah Rockwell.jpg';
import RobinSchoenImage from '../../images/Robin Schoen.jpg';
import HazelChisesaImage from '../../images/Hazel Chisesa.jpg';
import EricNangombaImage from '../../images/Eric Nangomba.jpg';
import ChancyBwanaliImage from '../../images/Chancy Bwanali.jpg';

interface TeamMember {
  name: string;
  role: string;
  image: StaticImageData;
  focalPoint: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Sarah Rockwell',
    role: 'Technical Lead',
    image: SarahRockwellImage,
    focalPoint: '50% 18%',
  },
  {
    name: 'Robin Schoen',
    role: 'Solutions Architect',
    image: RobinSchoenImage,
    focalPoint: '50% 18%',
  },
  {
    name: 'Hazel Chisesa',
    role: 'Account Manager',
    image: HazelChisesaImage,
    focalPoint: '50% 18%',
  },
  {
    name: 'Eric Nangomba',
    role: 'Full Stack Developer',
    image: EricNangombaImage,
    focalPoint: '50% 18%',
  },
  {
    name: 'Chancy Bwanali',
    role: 'Project Manager',
    image: ChancyBwanaliImage,
    focalPoint: '50% 18%',
  },
];

interface TeamSectionProps {
  id: string;
}

export default function TeamSection({ id }: TeamSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-shell">
        <Reveal>
          <h2 className="text-center font-headline text-3xl font-bold md:text-5xl">
            Software and hardware
            <span className="block text-lime-300">specialists under one roof.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delayMs={index * 65}>
              <Card className="glass-card hover-lift group overflow-hidden border-white/15">
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 44vw, 92vw"
                    className="relative z-10 object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: member.focalPoint }}
                    data-ai-hint="person portrait"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-1 w-0 bg-lime-300 transition-all duration-300 group-hover:w-full" />
                </div>
                <CardContent className="p-4">
                  <p className="font-headline text-lg font-semibold">{member.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    <BriefcaseBusiness className="h-3.5 w-3.5 text-lime-300" />
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
