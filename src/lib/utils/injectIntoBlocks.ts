import { BlockData } from '@/types/block';
import { VideoConnection } from '@/types/video';

export function injectIntoBlocks(blocks: BlockData[], videos?: VideoConnection): BlockData[] {
  return blocks.map((block) =>
    block.__typename === 'VideoGalleryBlock'
      ? { ...block, videos: videos ?? { nodes: [] } }
      : block,
  );
}
