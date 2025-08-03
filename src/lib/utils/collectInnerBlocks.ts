import { BlockData } from '@/types/block';

export function collectInnerBlocks(blocks: BlockData[]): BlockData[] {
  const inner: BlockData[] = [];

  for (const block of blocks) {
    if ('innerBlocks' in block && Array.isArray(block.innerBlocks)) {
      inner.push(...block.innerBlocks);
      inner.push(...collectInnerBlocks(block.innerBlocks)); // recursive for deeply nested blocks
    }
  }

  return inner;
}
