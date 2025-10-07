'use client';

import { createContext, useRef, RefObject, useState } from 'react';

type LayoutRefsContextType = {
  heroRef: RefObject<HTMLElement | null>;
  heroMounted: boolean;
  setHeroMounted: (val: boolean) => void;
};

// Default value for the context (placeholder ref)
export const LayoutRefsContext = createContext<LayoutRefsContextType>({
  heroRef: { current: null },
  heroMounted: false,
  setHeroMounted: () => {},
});

export function LayoutRefsProvider({ children }: { children: React.ReactNode }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroMounted, setHeroMounted] = useState(false);

  return (
    <LayoutRefsContext.Provider value={{ heroRef, heroMounted, setHeroMounted }}>
      {children}
    </LayoutRefsContext.Provider>
  );
}
