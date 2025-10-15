'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext, useRef, useLayoutEffect } from 'react';
import { RefObject } from 'react';
import { LayoutRefsContext } from '@/context/LayoutRefsContext';

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  if (!frozen) return <>{props.children}</>;

  return (
    <LayoutRouterContext.Provider value={frozen}>{props.children}</LayoutRouterContext.Provider>
  );
}

// Slide left old page, slide right new page
const variants = {
  hidden: { x: '100%', opacity: 1 }, // new page enters from right
  enter: { x: 0, opacity: 1 },
  exit: { x: '-50%', opacity: 0.5 }, // old page slides left with fade
};

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const contentRef: RefObject<HTMLDivElement | null> = useRef(null);
  const { containerRef } = useContext(LayoutRefsContext);
  const pageId = pathname?.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';

  useLayoutEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    let frame: number;
    const updateHeight = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (contentRef.current && containerRef.current) {
          const rect = contentRef.current.getBoundingClientRect();
          containerRef.current.style.height = `${rect.height}px`;
        }
      });
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(contentRef.current);

    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="page-container">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={pathname}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ ease: 'easeInOut', duration: 1.2 }}
          className="page-content"
          data-page={pageId}
          ref={contentRef}
        >
          {pageId === 'home' && <div className="hero-spacer"></div>}
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransitionEffect;
