// src/app/page.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ResultsSection from '@/components/sections/ResultsSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import AboutUsSection from '@/components/sections/AboutUsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';
import ContactSection from '@/components/sections/ContactSection';
import TeamSection from '@/components/sections/TeamSection';
import ServicesCatalogSection from '@/components/sections/ServicesCatalogSection';
import ServiceDetailSection from '@/components/sections/ServiceDetailSection';
import { getServiceBySlug } from '@/lib/services';
import { notFound } from 'next/navigation';
import StructuredData from '@/components/StructuredData';
import { commonFaqs } from '@/lib/faq-data';

interface HomePageProps {
  searchParams?: Promise<{
    view?: string;
    service?: string;
  }>;
}

export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const view = resolvedParams?.view;
  const serviceSlug = resolvedParams?.service;

  if (view === 'services') {
    return {
      title: 'Services | Jertine Tech',
      description:
        'Explore Jertine Tech service capabilities: software development, hardware support, managed infrastructure, AI automation, and support operations.',
      alternates: {
        canonical: '/services',
      },
      openGraph: {
        title: 'Services | Jertine Tech',
        description: 'Integrated software and hardware services for SME operations.',
        type: 'website',
        url: '/services',
      },
    };
  }

  if (view === 'service' && serviceSlug) {
    const service = getServiceBySlug(serviceSlug);
    if (service) {
      return {
        title: service.seoTitle,
        description: service.seoDescription,
        keywords: service.seoKeywords,
        alternates: {
          canonical: `/services/${service.slug}`,
        },
        openGraph: {
          title: service.seoTitle,
          description: service.seoDescription,
          type: 'article',
          url: `/services/${service.slug}`,
        },
      };
    }
  }

  return {
    title: 'Jertine Tech | Integrated Software & Hardware Solutions',
    description:
      'Jertine Tech helps SMEs deliver reliable software, resilient infrastructure, and dependable hardware support with one accountable team.',
    alternates: {
      canonical: '/',
    },
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;
  const view = resolvedParams?.view;
  const serviceSlug = resolvedParams?.service;

  const isServicesCatalog = view === 'services';
  const isServiceDetail = view === 'service';
  const baseUrl = 'https://jertinetech.co.za';

  let content: React.ReactNode;
  let jsonLd: Record<string, unknown> | Array<Record<string, unknown>> | null = null;

  if (isServicesCatalog) {
    content = <ServicesCatalogSection />;
  } else if (isServiceDetail) {
    const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;
    if (!service) {
      notFound();
    }
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.seoDescription,
      serviceType: service.title,
      areaServed: {
        '@type': 'Country',
        name: 'South Africa',
      },
      provider: {
        '@type': 'Organization',
        name: 'Jertine Tech',
        url: baseUrl,
      },
      url: `${baseUrl}/services/${service.slug}`,
      offers: {
        '@type': 'Offer',
        url: `${baseUrl}/#contact`,
        availability: 'https://schema.org/InStock',
      },
    };
    content = <ServiceDetailSection service={service} />;
  } else {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: commonFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    content = (
      <main id="main-content" className="flex-grow">
        <HeroSection id="hero" />
        <ResultsSection id="results" />
        <SolutionsSection id="solutions" />
        <AboutUsSection id="about" />
        <WhyChooseUsSection id="why-us" />
        <ProcessSection id="process" />
        <TestimonialsSection id="testimonials" />
        <TeamSection id="team" />
        <FaqSection id="faq" />
        <ContactSection id="contact" />
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {jsonLd ? <StructuredData data={jsonLd} /> : null}
      <Header />
      {content}
      <Footer />
    </div>
  );
}
