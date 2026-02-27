import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import Reveal from '@/components/ui/reveal';

interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Thabo Mokoena',
    company: 'Mokoena Logistics',
    quote: 'They rebuilt our operations portal and fixed recurring office hardware issues. Productivity jumped within weeks.',
  },
  {
    name: 'Nadine Peters',
    company: 'Peters Medical Supply',
    quote: 'From custom software workflows to desktop support, Jertine gave us one reliable team for all technical operations.',
  },
  {
    name: 'Ameen Ismail',
    company: 'Ismail Engineering',
    quote: 'Their support SLA and software improvements reduced our downtime and made project tracking far easier.',
  },
];

interface TestimonialsSectionProps {
  id: string;
}

export default function TestimonialsSection({ id }: TestimonialsSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-shell">
        <Reveal>
          <h2 className="text-center font-headline text-3xl font-bold md:text-5xl">
            Trusted by teams with
            <span className="block text-red-300">real technical pressure.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delayMs={index * 70}>
              <Card className="glass-card hover-lift rounded-2xl border-white/15 bg-white/[0.04]">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Quote className="h-5 w-5 text-red-300" />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-lime-300 text-lime-300" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90">"{item.quote}"</p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.company}</p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
