import BlockRenderer from '@/components/BlockRenderer';
import { GET_FRONT_PAGE_BY_SLUG } from '@/graphql/queries/getFrontPageBySlug';
import { GET_ALL_CREATOR_SLUGS } from '@/graphql/queries/getAllCreatorSlugs';
import { GET_VIDEOS_BY_CREATOR_SLUG } from '@/graphql/queries/getVideosByCreatorSlug';
import { client } from '@/lib/graphql/client';
import { normaliseBlocks } from '@/lib/utils/normaliseBlocks';
import { injectIntoBlocks } from '@/lib/utils/injectIntoBlocks';
import { notFound } from 'next/navigation';
import { QueryVariables, IdTypeEnum } from '@/types/graphql';
import { GetPageBySlugResponse } from '@/types/page';
import { GetAllCreatorSlugsResponse, GetVideosByCreatorResponse, VideoNode } from '@/types/video';
import { BlockData } from '@/types/block';

export const revalidate = 60; // ISR: revalidate this page every 60 seconds

export default async function Projects() {
  // Fetch home page blocks
  const variables: QueryVariables<IdTypeEnum> = {
    id: '/',
    idType: IdTypeEnum.URI,
  };

  const { page }: GetPageBySlugResponse = await client.request(GET_FRONT_PAGE_BY_SLUG, variables);
  if (!page) notFound();

  // Get all creator slugs
  const {
    creators: { nodes },
  }: GetAllCreatorSlugsResponse = await client.request(GET_ALL_CREATOR_SLUGS);
  const slugs = nodes.map((node) => node.slug);

  // Fetch videos for each creator in parallel
  const videosByCreator: GetVideosByCreatorResponse[] = await Promise.all(
    slugs.map((slug) =>
      client.request<GetVideosByCreatorResponse>(GET_VIDEOS_BY_CREATOR_SLUG, { slug }),
    ),
  );

  // Compute intersection of video IDs (videos shared by all creators)
  const videoIdsByCreator: string[][] = videosByCreator.map((resp) =>
    resp.creator.videos.nodes.map((v) => v.id),
  );

  const sharedVideoIds = videoIdsByCreator.length
    ? videoIdsByCreator.reduce((a, b) => a.filter((id) => b.includes(id)))
    : [];

  // Flatten all videos
  const allVideosFlat: VideoNode[] = videosByCreator.flatMap((resp) => resp.creator.videos.nodes);

  // Keep only shared videos
  const sharedVideos = allVideosFlat.filter((video) => sharedVideoIds.includes(video.id));

  // Deduplicate by ID
  const seenIds = new Set<string>();
  const filteredVideos: VideoNode[] = [];
  for (const video of sharedVideos) {
    if (!seenIds.has(video.id)) {
      seenIds.add(video.id);
      filteredVideos.push(video);
    }
  }

  // Normalise page blocks
  const blocks: BlockData[] = normaliseBlocks(page);

  // Inject filtered videos into VideoGalleryBlock
  const updatedBlocks = injectIntoBlocks(blocks, { nodes: filteredVideos });

  // Render all blocks
  return <BlockRenderer blocks={updatedBlocks} />;
}
