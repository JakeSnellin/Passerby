'use client';

import React, { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname, useParams } from 'next/navigation';
import { stripSlash } from '@/lib/utils/stripSlash';

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
  const currentPath = usePathname();
  const params = useParams();

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build the final href (with creator slug if applicable)
  const finalHref = (() => {
    if (params.creator) {
      if (href === '/') return `/${params.creator}/`;
      if (href.startsWith('/')) return `/${params.creator}${href}`;
    }
    return href;
  })();

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

    if (stripSlash(finalHref) === stripSlash(currentPath)) return;

    const supportsViewTransition = 'startViewTransition' in document;

    if (supportsViewTransition && !prefersReducedMotion) {
      document.startViewTransition(() => router.push(finalHref));
    } else {
      router.push(finalHref);
    }
  };

  return (
    <Link href={finalHref} {...props} aria-label={ariaLabel} onClick={clickHandler}>
      {children}
    </Link>
  );
}
