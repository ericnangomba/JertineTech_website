import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicesCatalogSection from '@/components/sections/ServicesCatalogSection';

export const metadata: Metadata = {
  title: 'Services | Jertine Tech',
  description:
    'Explore Jertine Tech service capabilities: software development, hardware support, managed infrastructure, AI automation, and support operations.',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    title: 'Services | Jertine Tech',
    description: 'Integrated software and hardware services for SME operations.',
    type: 'website',
    url: '/services/',
  },
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ServicesCatalogSection />
      <Footer />
    </div>
  );
}
