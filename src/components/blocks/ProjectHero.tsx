import { ProjectHeroBlock } from '@/types/block';
import Image from 'next/image';
import React from 'react';

export default function ProjectHero({ heroImage }: ProjectHeroBlock) {
  const { altText, sourceUrl } = heroImage?.node ?? {};

  // Only render if sourceUrl exists
  if (!sourceUrl) return null;

  return (
    <section className="project-hero">
      <div className="project-hero__inner">
        {
          <div className="project-hero__img-wrapper">
            <Image
              className="project-hero__img"
              src={sourceUrl}
              alt={altText ? altText : 'Project Hero Image'}
              objectFit="contain"
              fill
            />
          </div>
        }
      </div>
    </section>
  );
}
