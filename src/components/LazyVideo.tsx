'use client';

import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';

interface LazyVideoProps {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: string;
  className: string;
  posterUrl: string;
}

export default function LazyVideo({
  src,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  className,
  posterUrl,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(videoRef, { amount: 0.25, once: true });

  useEffect(() => {
    if (!videoRef.current) return;
    const rect = videoRef.current.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isAlreadyVisible) {
      videoRef.current.src = src;
    }
  }, [src]);

  useEffect(() => {
    if (isInView && videoRef.current && !videoRef.current.src) {
      videoRef.current.src = src;
    }
  }, [isInView, src]);

  return (
    <motion.video
      poster={posterUrl}
      src={isInView ? src : undefined}
      aria-hidden="true"
      tabIndex={-1}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload="metadata"
      className={className}
      ref={videoRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      Sorry, your browser doesn’t support embedded videos.
    </motion.video>
  );
}
