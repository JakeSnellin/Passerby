import { BlockData } from '@/types/block';
import { PageProps } from '@/types/page';
import { ProjectProps } from '@/app/projects/[slug]/types';
import { collectInnerBlocks } from './collectInnerBlocks';
import { isBlockEqual } from './isBlockEqual';

/**
 * Type guard to check if a value is a BlockData
 */
function looksLikeBlock(value: any): value is BlockData {
  return (
    value && typeof value === 'object' && typeof value.__typename === 'string'
    // optionally, you can add more checks like 'name' in value or other identifying fields
  );
}

/**
 * Normalises all blocks from a page or project, including nested innerBlocks.
 */
export function normaliseBlocks(entity: PageProps | ProjectProps): BlockData[] {
  const allBlocks: BlockData[] = [];

  for (const value of Object.values(entity)) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (looksLikeBlock(item)) {
          allBlocks.push(item);
        }
      });
    } else if (looksLikeBlock(value)) {
      allBlocks.push(value);
    }
  }

  // Recursively collect all nested innerBlocks
  const nestedBlocks = collectInnerBlocks(allBlocks);

  // Filter out nested blocks from the top-level array
  const filtered = allBlocks.filter(
    (rootBlock) => !nestedBlocks.some((nestedBlock) => isBlockEqual(rootBlock, nestedBlock)),
  );

  return filtered;
}
