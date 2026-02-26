import { Mail, MapPin, Phone } from 'lucide-react';
import BrandWordmark from '@/components/BrandWordmark';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/30 py-12 text-card-foreground">
      <div className="section-shell">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <BrandWordmark className="text-xl" />
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Software development and hardware support for growth-focused teams.
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-lime-300" />
              info@jertinetech.co.za
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-lime-300" />
              +27 79 856 7196
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-300" />
              Supporting teams across South Africa
            </p>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            <p>Mon-Fri: 09:00-17:00</p>
            <p className="mt-2">Built for South African SMEs</p>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          &copy; {currentYear} Jertine Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
