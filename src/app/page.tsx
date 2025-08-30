import BlockRenderer from '@/components/BlockRenderer';
import { GET_FRONT_PAGE_BY_SLUG } from '@/graphql/queries/getFrontPageBySlug';
import { client } from '@/lib/graphql/client';
import { normaliseBlocks } from '@/lib/utils/normaliseBlocks';
import { GetPageBySlugResponse } from '@/types/page';
import { notFound } from 'next/navigation';
import { BlockData } from '@/types/block';
import { QueryVariables, IdTypeEnum } from '@/types/graphql';
import { GetVideosByCreatorResponse, VideoNode, GetAllCreatorSlugsResponse } from '@/types/video';
import { GET_VIDEOS_BY_CREATOR_SLUG } from '@/graphql/queries/getVideosByCreatorSlug';
import { GET_ALL_CREATOR_SLUGS } from '@/graphql/queries/getAllCreatorSlugs';
import { injectIntoBlocks } from '@/lib/utils/injectIntoBlocks';

export const revalidate = 60; // ISR: revalidate this page every 60 seconds

export default async function Projects() {
  // Fetch the home page blocks as a base layout/template
  const variables: QueryVariables<IdTypeEnum> = {
    id: '/',
    idType: IdTypeEnum.URI,
  };

  const { page }: GetPageBySlugResponse = await client.request(GET_FRONT_PAGE_BY_SLUG, variables);

  if (!page) {
    notFound(); // Show 404 if home page not found in CMS
  }

  // Get all creator slugs (e.g. jake, tom)
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

  // Flatten all creator video lists into one array
  const allVideos: VideoNode[] = videosByCreator.flatMap((resp) => resp.creator.videos.nodes);

  // Deduplicate videos (in case a video is shared by multiple creators)
  const seenIds = new Set<string>();
  const filteredVideos = allVideos.filter((video: VideoNode) => {
    if (seenIds.has(video.id)) {
      return false; // exclude duplicates
    }
    seenIds.add(video.id);
    return true; // include first occurrence
  });

  // Normalise page blocks into consistent internal format
  const blocks: BlockData[] = normaliseBlocks(page);

  // Inject the filtered video list into the VideoGalleryBlock
  const updatedBlocks = injectIntoBlocks(blocks, { nodes: filteredVideos });

  // Render final block tree including videos
  return <BlockRenderer blocks={updatedBlocks} />;
}
