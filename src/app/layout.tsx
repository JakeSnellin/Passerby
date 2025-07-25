import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.scss';
import { getMenuBySlug } from '@/lib/utils';
import { Menu } from '@/types/layout';

export const metadata = {
  title: 'Passerby Site',
  description:
    'A modern, performant agency website built with Next.js, powered by a headless WordPress backend',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  charset: 'UTF-8',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Passerby Site',
    description:
      'A modern, performant agency website built with Next.js, powered by a headless WordPress backend',
    url: 'https://www.passerby.com',
    siteName: 'Passerby Site',
    images: [
      {
        url: 'https://', //todo
        width: 1200,
        height: 630,
        alt: 'Passerby Site',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerData, footerData]: [Menu, Menu] = await Promise.all([
    getMenuBySlug('header-menu'),
    getMenuBySlug('footer-menu'),
  ]);

  console.log(headerData);
  console.log(footerData);

  return (
    <html lang="en">
      <body>
        <Header {...headerData} />
        {children}
        <Footer {...footerData} />
      </body>
    </html>
  );
}
