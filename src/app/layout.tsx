import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GET_SITE_INFO } from '@/graphql/queries/getSiteInfo';
import { client } from '@/lib/graphql/client';
import { SiteInfo } from '@/types/layout';
import PageTransitionEffect from '@/components/PageTransitionEffect';
import '@/styles/main.scss';
import { TransitionProvider } from '@/context/TransitionContext';
import { LayoutRefsProvider } from '@/context/LayoutRefsContext';

export const metadata = {
  title: 'Passerby Site',
  description: 'A modern agency website with Next.js + WordPress backend',
  charset: 'UTF-8',
  icons: { icon: '/favicon.ico' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { customLogo, headerMenu, footerMenu, headerMenuLabel, footerTitleText }: SiteInfo =
    await client.request(GET_SITE_INFO);

  return (
    <html lang="en">
      <body>
        <TransitionProvider>
          <LayoutRefsProvider>
            {/* Static header */}
            <Header customLogo={customLogo} menu={headerMenu} label={headerMenuLabel} />

            {/* Animated page content */}
            <PageTransitionEffect>{children}</PageTransitionEffect>

            {/* Optional static footer */}
            <Footer customLogo={customLogo} menu={footerMenu} titleText={footerTitleText} />
          </LayoutRefsProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
