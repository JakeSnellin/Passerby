import { HeroBlock, BlockData } from './block';

export interface PageProps {
  heroBlock?: HeroBlock;
  title: string;
  editorBlocks: BlockData[];
}
