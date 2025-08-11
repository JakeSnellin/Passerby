'use client';

import { BlockData } from '@/types/block';
import { blockComponentsMap } from '@/components/blocks/index';
import { ComponentType } from 'react';

interface BlockRendererProps {
  blocks: BlockData[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, index) => {
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
