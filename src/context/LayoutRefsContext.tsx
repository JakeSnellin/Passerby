'use client';

import { createContext, useRef, RefObject, useState } from 'react';

type LayoutRefsContextType = {
  heroRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  heroContentRef: RefObject<HTMLDivElement | null>;
};

// Default value for the context (placeholder ref)
export const LayoutRefsContext = createContext<LayoutRefsContextType>({
  heroRef: { current: null },
  containerRef: { current: null },
  heroContentRef: { current: null },
});

export function LayoutRefsProvider({ children }: { children: React.ReactNode }) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <LayoutRefsContext.Provider value={{ heroRef, containerRef, heroContentRef }}>
      {children}
    </LayoutRefsContext.Provider>
  );
}
