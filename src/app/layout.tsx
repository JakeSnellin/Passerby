import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GET_SITE_INFO } from '@/graphql/queries/getSiteInfo';
import { client } from '@/lib/graphql/client';
import { SiteInfo } from '@/types/layout';
import '@/styles/main.scss';
import { ViewTransitions } from 'next-view-transitions';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata = {
  title: 'Passerby Site',
  description:
    'A modern, performant agency website built with Next.js, powered by a headless WordPress backend',
  charset: 'UTF-8',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Passerby Site',
    description:
      'A modern, performant agency website built with Next.js, powered by a headless WordPress backend',
    url: 'https://www.passerby.com',
    siteName: 'Passerby Site',
    images: [
      {
        url: 'https://', // TODO: update with real image
        width: 1200,
        height: 630,
        alt: 'Passerby Site',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Fetch global site info
  const { customLogo, headerMenu, footerMenu, headerMenuLabel }: SiteInfo = await client.request(
    GET_SITE_INFO,
  );

  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          <Header customLogo={customLogo} menu={headerMenu} label={headerMenuLabel} />
          <main className="page-content">{children}</main>
          <Footer customLogo={customLogo} menu={footerMenu} />
        </body>
      </html>
    </ViewTransitions>
  );
}
