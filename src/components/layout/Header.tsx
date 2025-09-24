'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CustomLogo, MenuItem } from '@/types/layout';
import TransitionLink from '@/components/TransitionLink';

interface HeaderProps {
  customLogo: CustomLogo | null;
  menu: MenuItem[];
  label: string;
}

export default function Header({ customLogo, menu, label }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-bar">
        <Link href="/" className="header-bar__logo">
          {customLogo && (
            <Image
              src={customLogo.url}
              alt={customLogo.alt ?? 'Site logo'}
              width={300}
              height={100}
              priority
            />
          )}
        </Link>

        <button
          className="header-bar__toggle"
          aria-label="Open Navigation"
          aria-controls="navigation-drawer"
          aria-expanded="false"
        >
          {label}
        </button>

        {/* Desktop nav */}
        <nav className="header-bar__nav">
          <ul className="header-bar__list">
            {menu.map((item) => (
              <li key={item.id}>
                <TransitionLink className="header-bar__link" href={item.url}>
                  <div className="header-bar__link-text-wrapper">
                    <span aria-hidden="true" className="header-bar__link-text--new">
                      {item.label}
                    </span>
                    <span className="header-bar__link-text--old">{item.label}</span>
                  </div>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile drawer */}
        <nav id="navigation-drawer" className="navigation-drawer">
          <ul className="navigation-drawer__list">
            {menu.map((item) => (
              <li key={item.id}>
                <TransitionLink className="navigation-drawer__link" href={item.url}>
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
