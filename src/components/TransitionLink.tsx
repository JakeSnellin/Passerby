'use client';

import { buildHref } from '@/lib/utils/buildHref';
import Link, { LinkProps } from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname, useParams } from 'next/navigation';
import { ReactNode } from 'react';

interface TransitionLinkProps extends LinkProps {
  children?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export default function TransitionLink({
  href,
  children,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useTransitionRouter();
  const currentPath = usePathname();
  const params = useParams();

  const creator = typeof params.creator === 'string' ? params.creator : undefined;
  const finalHref = buildHref(href.toString(), creator);

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
    if (finalHref === currentPath) return;

    const supportsViewTransition = 'startViewTransition' in document;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (supportsViewTransition && !prefersReducedMotion) {
      document.startViewTransition(() => router.push(finalHref, { scroll: false }));
    } else {
      router.push(finalHref, { scroll: false });
    }
  };

  return (
    <Link scroll={false} className={className} href={finalHref} {...props} onClick={clickHandler}>
      {children}
    </Link>
  );
}
