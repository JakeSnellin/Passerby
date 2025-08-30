import React from 'react';
import { notFound } from 'next/navigation';
import { client } from '@/lib/graphql/client';
import { GetPageBySlugResponse } from '@/types/page';
import { GET_FRONT_PAGE_BY_SLUG } from '@/graphql/queries/getFrontPageBySlug';
import { QueryVariables, IdTypeEnum } from '@/types/graphql';
import { BlockData } from '@/types/block';
import { normaliseBlocks } from '@/lib/utils/normaliseBlocks';
import BlockRenderer from '@/components/BlockRenderer';
import { GET_ALL_CREATOR_SLUGS } from '@/graphql/queries/getAllCreatorSlugs';
import { GetAllCreatorSlugsResponse, GetVideosByCreatorResponse } from '@/types/video';
import { GET_VIDEOS_BY_CREATOR_SLUG } from '@/graphql/queries/getVideosByCreatorSlug';
import { injectIntoBlocks } from '@/lib/utils/injectIntoBlocks';

export const revalidate = 60; // ISR: revalidate this page every 60 seconds

// Pre-generates static params for all creator pages at build time
export async function generateStaticParams() {
  const {
    creators: { nodes },
  }: GetAllCreatorSlugsResponse = await client.request(GET_ALL_CREATOR_SLUGS);

  // Return params in the format expected by Next.js [slug] route
  return nodes.map((node) => ({ slug: node.slug }));
}

export default async function CreatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Always fetch the home page (`/`) blocks — this acts as a shared layout/template
  const variables: QueryVariables<IdTypeEnum> = {
    id: '/',
    idType: IdTypeEnum.URI,
  };

  const { page }: GetPageBySlugResponse = await client.request(GET_FRONT_PAGE_BY_SLUG, variables);

  if (!page) {
    return notFound(); // Show Next.js 404 page if no home page exists
  }

  // Fetch all videos for the given creator
  const { creator }: GetVideosByCreatorResponse = await client.request(GET_VIDEOS_BY_CREATOR_SLUG, {
    slug,
  });

  if (!creator) {
    return notFound(); // Show 404 if the creator doesn’t exist
  }

  // Normalise WP blocks into a uniform format
  const blocks: BlockData[] = normaliseBlocks(page);

  // Inject creator-specific videos into the VideoGalleryBlock
  const updatedBlocks = injectIntoBlocks(blocks, creator.videos);

  // Render all blocks, now including the video data
  return <BlockRenderer blocks={updatedBlocks} />;
}
