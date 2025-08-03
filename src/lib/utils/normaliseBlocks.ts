import { BlockData } from '@/types/block';
import { PageProps } from '@/types/page';
import { collectInnerBlocks } from './collectInnerBlocks';
import { isBlockEqual } from './isBlockEqual';

export function normaliseBlocks(page: PageProps): BlockData[] {
  const allBlocks: BlockData[] = [];

  for (const value of Object.values(page)) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item && typeof item === 'object' && typeof item.__typename === 'string') {
          allBlocks.push(item as BlockData);
        }
      });
    } else if (value && typeof value === 'object' && typeof value.__typename === 'string') {
      allBlocks.push(value as BlockData);
    }
  }

  const nestedBlocks = collectInnerBlocks(allBlocks);

  const filtered = allBlocks.filter((rootBlock) => {
    return !nestedBlocks.some((nestedBlock) => isBlockEqual(rootBlock, nestedBlock));
  });

  return filtered;
}
