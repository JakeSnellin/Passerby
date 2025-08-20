import { HeroBlock, BlockData } from './block';

export interface PageProps {
  heroBlock?: HeroBlock;
  title: string;
  editorBlocks: BlockData[];
}

export interface GetPageBySlugResponse {
  page: PageProps | null;
}
