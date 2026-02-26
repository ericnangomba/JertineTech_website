// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import BrandWordmark from '@/components/BrandWordmark';

interface NavItem {
  label: string;
  href: string;
  section?: string;
}

const navItems = [
  { label: 'Home', href: '/#hero', section: '#hero' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/#about', section: '#about' },
  { label: 'Why Us', href: '/#why-us', section: '#why-us' },
  { label: 'Process', href: '/#process', section: '#process' },
  { label: 'Results', href: '/#results', section: '#results' },
  { label: 'FAQ', href: '/#faq', section: '#faq' },
  { label: 'Contact', href: '/#contact', section: '#contact' },
] satisfies NavItem[];

export default function Header() {
  const pathname = usePathname();
  const isHomeRoute = pathname === '/';
  const isServicesRoute = pathname === '/services' || pathname.startsWith('/services/');

  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!isHomeRoute) {
      setIsScrolled(true);
      return;
    }

    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);

    let currentSection = '';
    navItems.forEach((item) => {
      if (!item.section) return;
      const section = document.querySelector(item.section) as HTMLElement;
      if (section) {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = item.section;
        }
      }
    });

    if (currentSection) {
      setActiveSection((previous) => (previous === currentSection ? previous : currentSection));
    } else if (!currentSection && scrollPosition < window.innerHeight / 2) {
      setActiveSection((previous) => (previous === '#hero' ? previous : '#hero'));
    }
  }, [isHomeRoute]);

  useEffect(() => {
    if (!isHomeRoute) {
      setIsScrolled(true);
      setActiveSection('');
      return;
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isHomeRoute]);

  const handleNavLinkClick = (item: NavItem, event?: { preventDefault: () => void }) => {
    setIsMobileMenuOpen(false);

    if (!item.section) return;
    if (typeof window === 'undefined' || !isHomeRoute) {
      return;
    }

    event?.preventDefault();
    setActiveSection(item.section);
    const element = document.querySelector(item.section);
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProjectClick = (event?: { preventDefault: () => void }) => {
    setIsMobileMenuOpen(false);
    if (typeof window === 'undefined' || !isHomeRoute) {
      return;
    }
    event?.preventDefault();
    setActiveSection('#contact');
    const element = document.querySelector('#contact');
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isNavItemActive = (item: NavItem): boolean => {
    if (item.href === '/services') {
      return isServicesRoute;
    }
    if (item.section) {
      return isHomeRoute && activeSection === item.section;
    }
    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        !isHomeRoute || isScrolled
          ? "border-b border-white/10 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <BrandWordmark className="text-2xl" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className={cn(
                "rounded-full px-4 text-sm font-medium text-foreground/85 hover:bg-white/10 hover:text-white",
                isNavItemActive(item) && "bg-white/10 text-white"
              )}
            >
              <Link onClick={(e) => handleNavLinkClick(item, e)} href={item.href}>
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="rounded-full bg-lime-400 px-6 text-black hover:bg-lime-300">
            <Link href="/#contact" onClick={(e) => handleStartProjectClick(e)}>Start a Project</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5 text-foreground" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[290px] border-white/10 bg-background/95 p-0 text-card-foreground backdrop-blur-xl">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                  <Link href="/" className="flex items-center gap-2">
                    <BrandWordmark className="text-xl" />
                  </Link>
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-1 flex-col gap-2 p-4">
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      asChild
                      className={cn(
                        "justify-start rounded-xl text-base",
                        isNavItemActive(item)
                          ? "bg-white/10 text-white"
                          : "text-foreground/85 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <Link onClick={(e) => handleNavLinkClick(item, e)} href={item.href}>
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
                <div className="border-t border-white/10 p-4">
                  <Button asChild className="w-full rounded-full bg-lime-400 text-black hover:bg-lime-300">
                    <Link href="/#contact" onClick={(e) => handleStartProjectClick(e)}>Start a Project</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
