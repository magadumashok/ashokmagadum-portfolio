import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ashok Magadum — AI Healthcare Product Leader',
  description:
    'Ashok Magadum is the VP of Product at KareFusionAI, building AI systems that automate clinical workflows and reduce healthcare operational costs. Voice AI, EMR automation, FHIR platforms.',
  keywords: [
    'AI Healthcare Product Manager',
    'VP of Product Healthcare',
    'Clinical AI Product Leader',
    'Voice AI Healthcare',
    'FHIR Integration Platform',
    'EMR Workflow Automation',
    'Ashok Magadum',
    'Healthcare AI Product Strategy',
    'KareFusionAI',
  ],
  authors: [{ name: 'Ashok Magadum', url: 'https://ashokmagadum.com' }],
  creator: 'Ashok Magadum',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ashokmagadum.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ashokmagadum.com',
    title: 'Ashok Magadum — AI Healthcare Product Leader',
    description:
      'VP of Product at KareFusionAI. Building AI that automates clinical workflows — voice AI agents, EMR documentation, FHIR integration, and population health platforms.',
    siteName: 'Ashok Magadum',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashok Magadum — AI Healthcare Product Leader',
    description:
      'VP of Product building AI systems that automate clinical workflows and reduce healthcare operational costs.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Archivo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#F8F5DF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased" style={{ backgroundColor: '#F8F5DF', color: 'rgba(0,0,0,0.69)', fontFamily: "'DM Sans', system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
