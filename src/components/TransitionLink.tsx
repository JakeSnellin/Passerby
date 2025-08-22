'use client';

import React, { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  ariaLabel?: string;
}

export default function TransitionLink({
  href,
  children,
  ariaLabel,
  ...props
}: TransitionLinkProps) {
  const router = useTransitionRouter();
  const pathName = usePathname();
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clickHandler: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.button !== 0 ||
      e.currentTarget.target === '_blank'
    )
      return;

    e.preventDefault();

    const normalisedHref = href.replace(/\/$/, '');
    const normalisedPath = pathName.replace(/\/$/, '');

    if (normalisedHref === normalisedPath) return;

    const supportsViewTransition = 'startViewTransition' in document;

    if (supportsViewTransition && !prefersReducedMotion) {
      document.startViewTransition(() => router.push(href));
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} {...props} aria-label={ariaLabel} onClick={clickHandler}>
      {children}
    </Link>
  );
}
