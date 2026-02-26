import Image, { type StaticImageData } from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BriefcaseBusiness } from 'lucide-react';
import Reveal from '@/components/ui/reveal';

import johannesVenterImage from '../../images/johannesventer.jpg';
import ericImage from '../../images/eric.jpg';
import xolisilePicImage from '../../images/xolisilepic.png';
import welfordKulisewaImage from '../../images/welford.jpeg';
import unathiDoboImage from '../../images/unathi dobo.png';

interface TeamMember {
  name: string;
  role: string;
  image: StaticImageData;
}

const teamMembers: TeamMember[] = [
  { name: 'Johannes Venter', role: 'UI/UX Designer', image: johannesVenterImage },
  { name: 'Eric Nangomba', role: 'Lead Developer', image: ericImage },
  { name: 'Xolisile Gwebityala', role: 'Lead Developer', image: xolisilePicImage },
  { name: 'Welford Kulisewa', role: 'Project Manager', image: welfordKulisewaImage },
  { name: 'Unathi Dobo', role: 'Marketing Specialist', image: unathiDoboImage },
];

interface TeamSectionProps {
  id: string;
}

export default function TeamSection({ id }: TeamSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-shell">
        <Reveal>
          <h2 className="text-center font-body text-3xl font-bold md:text-5xl">
            Software and hardware
            <span className="block text-lime-300">specialists under one roof.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delayMs={index * 65}>
              <Card className="glass-card hover-lift group overflow-hidden border-white/15">
                <div className="relative h-60 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="relative z-10 object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="person portrait"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-1 w-0 bg-lime-300 transition-all duration-300 group-hover:w-full" />
                </div>
                <CardContent className="p-4">
                  <p className="font-body text-lg font-semibold">{member.name}</p>
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
