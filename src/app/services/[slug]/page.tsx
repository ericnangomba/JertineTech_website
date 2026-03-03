import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceDetailSection from '@/components/sections/ServiceDetailSection';
import StructuredData from '@/components/StructuredData';
import { getServiceBySlug, services } from '@/lib/services';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Jertine Tech',
      description: 'The requested service page could not be found.',
    };
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.seoKeywords,
    alternates: {
      canonical: `/services/${service.slug}/`,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      type: 'article',
      url: `/services/${service.slug}/`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const baseUrl = 'https://jertinetech.co.za';
  const jsonLd = {
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
    url: `${baseUrl}/services/${service.slug}/`,
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/#contact`,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData data={jsonLd} />
      <Header />
      <ServiceDetailSection service={service} />
      <Footer />
    </div>
  );
}
