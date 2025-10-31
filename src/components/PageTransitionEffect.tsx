'use client';

import React, { useLayoutEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useTransitionContext } from '@/context/TransitionContext';

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  if (!frozen) return <>{props.children}</>;
  return (
    <LayoutRouterContext.Provider value={frozen}>{props.children}</LayoutRouterContext.Provider>
  );
}

export default function ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const { scrollYRef } = useTransitionContext();
  const pageContentRef = useRef<HTMLDivElement | null>(null);
  const pageId = pathname?.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';

  useLayoutEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      const motionEls = document.querySelectorAll<HTMLDivElement>('.page-content');
      motionEls.forEach((el, index) => {
        if (index === 0) {
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
          el.style.position = 'fixed';
          el.style.top = `-${scrollYRef.current}px`;
          el.style.left = '0';
          el.style.right = 'auto';
          el.style.width = '100%';
          el.style.transform = 'translateX(0)';
          el.style.willChange = 'transform';
          el.style.marginRight = `${scrollbarWidth}px`;
        }
      });
    }
  }, [pathname]);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="page-container">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={pathname}
          className="page-content"
          ref={pageContentRef}
          initial={{ x: '100%', opacity: 1 }}
          animate={{ x: '0', opacity: 1 }}
          exit={{ x: '-50%', opacity: 0.5 }}
          transition={{ ease: 'easeInOut', duration: 1.2 }}
          data-page={pageId}
          onAnimationStart={() => {
            window.scrollTo(0, 0);
          }}
          onAnimationComplete={() => {
            scrollYRef.current = 0;
          }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
