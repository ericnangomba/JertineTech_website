import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import QuantumParticleBackground from '@/components/QuantumParticleBackground';

export const metadata: Metadata = {
  title: 'Jertine Tech | Integrated Software & Hardware Solutions',
  description: 'Jertine Tech helps SMEs deliver reliable software, resilient infrastructure, and dependable hardware support with one accountable team.',
  metadataBase: new URL('https://jertinetech.co.za'),
  keywords: ['software development', 'hardware support', 'managed infrastructure', 'SME technology partner', 'South Africa IT support'],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Jertine Tech | Integrated Software & Hardware Solutions',
    description: 'Software delivery and hardware reliability from one team.',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Jertine Tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jertine Tech',
    description: 'Integrated software and hardware execution for SMEs.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/zhima-mono" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-md focus:bg-lime-400 focus:px-4 focus:py-2 focus:font-medium focus:text-black"
        >
          Skip to main content
        </a>
        <QuantumParticleBackground />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
