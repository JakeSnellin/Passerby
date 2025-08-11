'use client';

import React, { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import pageAnimation from '@/lib/animations/pageTransition';

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
    ) {
      return;
    }

    e.preventDefault();

    const supportsViewTransition = 'startViewTransition' in document;

    if (supportsViewTransition) {
      router.push(href, { onTransitionReady: prefersReducedMotion ? undefined : pageAnimation });
    } else {
      // Fallback: normal navigation without animation
      router.push(href);
    }
  };

  return (
    <Link href={href} {...props} aria-label={ariaLabel} onClick={clickHandler}>
      {children}
    </Link>
  );
}
