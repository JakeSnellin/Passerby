'use client';

import { createContext, useContext, useRef, useState, RefObject } from 'react';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
  lockRef: RefObject<boolean>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lockRef = useRef(false);

  const startTransition = () => {
    lockRef.current = true;
    setIsTransitioning(true);
  };

  const endTransition = () => {
    lockRef.current = false;
    setIsTransitioning(false);
  };

  return (
    <TransitionContext.Provider
      value={{ isTransitioning, startTransition, endTransition, lockRef }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

/**
 * Hook that gives you access to the transition context.
 * It guarantees a non-undefined return type.
 */
export function useTransitionLock(): TransitionContextType {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionLock must be used within a TransitionProvider');
  }
  return context;
}
