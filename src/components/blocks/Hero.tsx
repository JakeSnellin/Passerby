'use client';

import { useEffect } from 'react';
import { HeroBlock } from '@/types/block';
import { motion, useAnimation } from 'framer-motion';
import { useContext } from 'react';
import { LayoutRefsContext } from '@/context/LayoutRefsContext';

export default function Hero({ logoImage, titleText, subtitleText, descriptionText }: HeroBlock) {
  const { heroRef } = useContext(LayoutRefsContext);
  const controls = useAnimation();

  useEffect(() => {
    // Start hidden immediately
    controls.set({ rotate: 0 });

    controls.start({
      rotate: [0, 20, 90, 110, 180, 200, 270, 290, 360],
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 5,
        ease: [
          [0.5, 0, 1, 1], // custom cubic-bezier for 0 -> 20
          [0.5, 0, 1, 1], // 20 -> 90
          [0.2, 0, 0.8, 1], // 90 -> 110 (accelerate start)
          [0.5, 0, 1, 1], // 110 -> 180
          [0.2, 0, 0.8, 1], // 180 -> 200
          [0.5, 0, 1, 1], // 200 -> 270
          [0.2, 0, 0.8, 1], // 270 -> 290
          [0.5, 0, 1, 1], // 290 -> 360
        ],
        times: [0, 0.2, 0.25, 0.45, 0.5, 0.7, 0.75, 0.95, 1],
      },
    });
  }, [controls]);

  const { sourceUrl = '', altText = 'Passerby logo' } = logoImage?.node ?? {};

  return (
    <section ref={heroRef} className="hero" aria-label="Hero section">
      <div className="hero__content">
        {sourceUrl && (
          <motion.div animate={controls} style={{ transformOrigin: '50% 50%' }}>
            <img className="hero__logo" src={sourceUrl} alt={altText} width={53} height={58} />
          </motion.div>
        )}
        <h1 className="hero__title">{titleText}</h1>
        <h2 className="hero__subtitle">{subtitleText}</h2>
        {descriptionText && (
          <div
            className="hero__description"
            dangerouslySetInnerHTML={{ __html: descriptionText }}
          />
        )}
      </div>
    </section>
  );
}
