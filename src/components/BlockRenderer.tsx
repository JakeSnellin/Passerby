'use client';

import { BlockData } from '@/types/block';
import { blockComponents } from './blocks';
import { ComponentType } from 'react';

export default function BlockRenderer({ blocks }: { blocks: BlockData[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (!(block.name in blockComponents)) {
          console.warn(`No component found for block: ${block.name}`);
          return null;
        }

        const BlockComponent = blockComponents[block.name] as ComponentType<
          typeof block.attributes
        >;

        if (!BlockComponent) {
          console.warn(`No component found for block: ${block.name}`);
          return null;
        }

        return <BlockComponent key={index} {...block.attributes} />;
      })}
    </>
  );
}
