'use client';

import { buildHref } from '@/lib/utils/buildHref';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname, useParams } from 'next/navigation';
import { AnchorHTMLAttributes, ReactNode } from 'react';

interface TransitionLinkProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
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
  const router = useRouter();
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

    router.push(finalHref);
  };

  return (
    <Link className={className} href={finalHref} {...props} onClick={clickHandler}>
      {children}
    </Link>
  );
}
