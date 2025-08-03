import type { ComponentType } from 'react';
import { ReactNode } from 'react';

// ACF blocks
export interface HeroBlock {
  __typename: 'HeroBlock';
  logoImage: {
    altText: string;
    sourceUrl: string;
  };
  titleText: string;
  subtitleText: string;
  descriptionText: string;
}

//Core WordPress blocks

export interface BaseBlock<TAttributes = {}> {
  name: string;
  children?: ReactNode;
  __typename: string;
  attributes: TAttributes;
  innerBlocks?: BlockData[];
}
export interface CoreGroupBlock
  extends BaseBlock<{
    className?: string;
    layout?: {
      type?: string;
      orientation?: string;
    };
  }> {
  __typename: 'CoreGroup';
  name: 'core/group';
  innerBlocks: BlockData[];
}

export interface CoreButtonBlock
  extends BaseBlock<{
    text: string;
    url: string;
    style: string;
    align: 'left' | 'center' | 'right';
  }> {
  __typename: 'CoreButton';
  name: 'core/button';
}

export interface CoreVideoBlock
  extends BaseBlock<{
    url: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    poster?: string;
    preload?: 'auto' | 'metadata' | 'none';
  }> {
  __typename: 'CoreVideo';
  name: 'core/video';
}

export interface CoreParagraphBlock extends BaseBlock<{ content: string }> {
  __typename: 'CoreParagraph';
  name: 'core/paragraph';
}

export interface CoreHeadingBlock
  extends BaseBlock<{
    content: string;
    level?: number;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  }> {
  __typename: 'CoreHeading';
  name: 'core/heading';
}

export interface CoreQuoteBlock
  extends BaseBlock<{ value: string; citation?: string; textAlign?: 'left' | 'center' | 'right' }> {
  __typename: 'CoreQuote';
  name: 'core/quote';
}

export interface CoreCoverBlock
  extends BaseBlock<{
    url?: string;
    dimRatio?: number;
    overlayColor?: string;
    contentPosition?: string;
    focalPoint?: { x: number; y: number };
  }> {
  __typename: 'CoreCover';
  name: 'core/cover';
  innerBlocks?: BlockData[];
}

export interface CoreImageBlock extends BaseBlock<{ url: string; alt?: string }> {
  __typename: 'CoreImage';
  name: 'core/image';
}

export interface CoreListBlock
  extends BaseBlock<{
    values: string;
    ordered?: boolean;
  }> {
  __typename: 'CoreList';
  name: 'core/list';
}

export interface CoreGalleryBlock
  extends BaseBlock<{
    images: {
      id: number;
      url: string;
      alt?: string;
      caption?: string;
    }[];
    columns?: number;
    imageCrop?: boolean;
  }> {
  __typename: 'CoreGallery';
  name: 'core/gallery';
}

export interface CoreSpacerBlock extends BaseBlock<{ height: string }> {
  __typename: 'CoreSpacer';
  name: 'core/spacer';
}

export interface CoreSeparatorBlock extends BaseBlock<{ style?: 'default' | 'wide' | 'dots' }> {
  __typename: 'CoreSeparator';
  name: 'core/separator';
}

export interface CoreHTMLBlock extends BaseBlock<{ content: string }> {
  __typename: 'CoreHTML';
  name: 'core/html';
}

export interface CoreEmbedBlock
  extends BaseBlock<{
    url: string;
    type?: string;
    providerNameSlug?: string;
    responsive?: boolean;
  }> {
  __typename: 'CoreEmbed';
  name: 'core/embed';
}

export type BlockData =
  | CoreParagraphBlock
  | CoreHeadingBlock
  | CoreGroupBlock
  | CoreButtonBlock
  | CoreCoverBlock
  | CoreEmbedBlock
  | CoreGalleryBlock
  | CoreHTMLBlock
  | CoreImageBlock
  | CoreListBlock
  | CoreQuoteBlock
  | CoreSeparatorBlock
  | CoreSpacerBlock
  | CoreVideoBlock
  | HeroBlock;

type BlockTypeMap = {
  [K in BlockData as K['__typename']]: K;
};

export type BlockComponentsMap = {
  [K in keyof BlockTypeMap]: ComponentType<BlockTypeMap[K]>;
};
