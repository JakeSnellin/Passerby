import { BlockData } from '@/types/block';

export function isBlockEqual(a: BlockData, b: BlockData): boolean {
  if (a.__typename !== b.__typename) return false;

  // If both have name + attributes, compare them
  const isCoreBlock = (block: any): block is { name: string; attributes: any } =>
    'name' in block && 'attributes' in block;

  if (isCoreBlock(a) && isCoreBlock(b)) {
    return a.name === b.name && JSON.stringify(a.attributes) === JSON.stringify(b.attributes);
  }

  // Otherwise, fallback to deep compare entire objects
  return JSON.stringify(a) === JSON.stringify(b);
}
