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
import StructuredData from '@/components/StructuredData';
import { commonFaqs } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'Jertine Tech | Integrated Software & Hardware Solutions',
  description:
    'Jertine Tech helps SMEs deliver reliable software, resilient infrastructure, and dependable hardware support with one accountable team.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const jsonLd = {
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

  return (
    <div className="flex flex-col min-h-screen">
      <StructuredData data={jsonLd} />
      <Header />
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
      <Footer />
    </div>
  );
}
