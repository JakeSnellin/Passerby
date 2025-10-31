'use client';

import { useTransitionContext } from '@/context/TransitionContext';
import { useRouter, usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export default function TransitionLink({
  href,
  children,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { lockRef, startTransition, scrollYRef } = useTransitionContext();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // Ignore modifier clicks or middle clicks
    if (
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

    // Capture scroll position
    if (typeof window !== 'undefined') scrollYRef.current = window.scrollY;

    // Don't navigate to the same page
    if (pathname === href) return;

    // Prevent clicks while a transition is already happening
    if (lockRef.current) {
      return;
    }

    // Lock immediately
    lockRef.current = true;
    startTransition();

    // Navigate
    router.push(href.toString(), { scroll: false });

    setTimeout(() => {
      lockRef.current = false;
    }, 1200);
  };

  return (
    <Link href={href} scroll={false} {...props} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
