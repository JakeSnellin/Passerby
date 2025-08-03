'use client';

import { BlockData } from '@/types/block';
import { blockComponentsMap } from './blocks';
import { ComponentType } from 'react';

interface BlockRendererProps {
  blocks: BlockData[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, index) => {
        console.log(`Rendering block: ${block.__typename}`, block);
        console.count('BlockRenderer rendered');
        const Component = blockComponentsMap[block.__typename] as ComponentType<any>;
        if (!Component) {
          return <div key={index}>Unsupported block type: {block.__typename}</div>;
        }
        return (
          <Component key={index} {...block}>
            {'innerBlocks' in block && block.innerBlocks?.length ? (
              <BlockRenderer blocks={block.innerBlocks} />
            ) : null}
          </Component>
        );
      })}
    </>
  );
}
