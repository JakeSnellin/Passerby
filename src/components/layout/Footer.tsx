import { CustomLogo, MenuItem } from '@/types/layout';
import TransitionLink from '@/components/TransitionLink';
import Link from 'next/link';

interface FooterProps {
  customLogo: CustomLogo | null;
  menu: MenuItem[];
}

export default function Footer({ customLogo, menu }: FooterProps) {
  return (
    <footer>
      <Link href="/" className="site-logo">
        {customLogo && <img src={customLogo.url} alt={customLogo.alt ?? 'Site logo'} />}
      </Link>
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              <TransitionLink href={item.url}>{item.label}</TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
