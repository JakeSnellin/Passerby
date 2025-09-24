'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext, useRef } from 'react';

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
  hidden: { x: '100vw', opacity: 1 }, // new page enters from right
  enter: { x: 0, opacity: 1 },
  exit: { x: '-50vw', opacity: 0.5 }, // old page slides left with fade
};

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  const key = usePathname();

  return (
    <div className="page-container">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={key}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ ease: 'easeInOut', duration: 1.2 }}
          className="page-content"
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransitionEffect;
