import { HeroBlock, BlockData, VideoGalleryBlock } from '@/types/block';

export interface PageProps {
  heroBlock?: HeroBlock;
  videoGalleryBlock?: VideoGalleryBlock;
  title: string;
  editorBlocks: BlockData[];
}

export interface GetPageBySlugResponse {
  page: PageProps | null;
}
