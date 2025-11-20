'use client';

import { createContext, useRef, RefObject } from 'react';

type LayoutRefsContextType = {
  heroRef: RefObject<HTMLDivElement | null>;
  heroContentRef: RefObject<HTMLDivElement | null>;
};

// Default value for the context (placeholder ref)
export const LayoutRefsContext = createContext<LayoutRefsContextType>({
  heroRef: { current: null },
  heroContentRef: { current: null },
});

export function LayoutRefsProvider({ children }: { children: React.ReactNode }) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <LayoutRefsContext.Provider value={{ heroRef, heroContentRef }}>
      {children}
    </LayoutRefsContext.Provider>
  );
}
