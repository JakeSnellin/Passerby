import type { ComponentType } from 'react';

export type BlockName =
  | 'core/paragraph'
  | 'core/quote'
  | 'core/image'
  | 'core/heading'
  | 'core/list'
  | 'core/cover'
  | 'core/gallery'
  | 'core/button'
  | 'core/separator'
  | 'core/spacer'
  | 'core/html'
  | 'core/embed'
  | 'core/video';

//export type BlockComponent = ComponentType<{ block: BlockData }>;

export interface BaseBlock {
  name: BlockName;
  __typename: string;
}

export interface CoreButtonBlock extends BaseBlock {
  name: 'core/button';
  attributes: {
    text: string;
    url: string;
    style?: string;
    align?: 'left' | 'center' | 'right';
  };
}

export interface CoreVideoBlock extends BaseBlock {
  name: 'core/video';
  attributes: {
    url: string; // video source URL
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    poster?: string; // thumbnail image URL
    preload?: 'auto' | 'metadata' | 'none';
  };
}

export interface CoreParagraphBlock extends BaseBlock {
  name: 'core/paragraph';
  attributes: {
    content: string;
  };
}

export interface CoreHeadingBlock extends BaseBlock {
  name: 'core/heading';
  attributes: {
    content: string;
    level: number; // 1–6
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

export interface CoreQuoteBlock extends BaseBlock {
  name: 'core/quote';
  attributes: {
    value: string;
    citation?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface CoreCoverBlock extends BaseBlock {
  name: 'core/cover';
  attributes: {
    url?: string;
    dimRatio?: number; // 0–100 for overlay opacity
    overlayColor?: string;
    contentPosition?: string; // 'center center', etc.
    focalPoint?: { x: number; y: number };
  };
  innerBlocks?: BlockData[];
}

export interface CoreImageBlock extends BaseBlock {
  name: 'core/image';
  attributes: {
    url: string;
    alt?: string;
  };
}

export interface CoreListBlock extends BaseBlock {
  name: 'core/list';
  attributes: {
    values: string; // raw HTML string with <li>
    ordered?: boolean;
  };
}

export interface CoreGalleryBlock extends BaseBlock {
  name: 'core/gallery';
  attributes: {
    images: {
      id: number;
      url: string;
      alt?: string;
      caption?: string;
    }[];
    columns?: number;
    imageCrop?: boolean;
  };
}

export interface CoreSpacerBlock extends BaseBlock {
  name: 'core/spacer';
  attributes: {
    height: string;
  };
}

export interface CoreSeparatorBlock extends BaseBlock {
  name: 'core/separator';
  attributes: {
    style?: 'default' | 'wide' | 'dots';
  };
}

export interface CoreHTMLBlock extends BaseBlock {
  name: 'core/html';
  attributes: {
    content: string; // raw HTML
  };
}

export interface CoreEmbedBlock extends BaseBlock {
  name: 'core/embed';
  attributes: {
    url: string;
    type?: string;
    providerNameSlug?: string;
    responsive?: boolean;
  };
}

export type BlockData =
  | CoreParagraphBlock
  | CoreQuoteBlock
  | CoreImageBlock
  | CoreHeadingBlock
  | CoreListBlock
  | CoreCoverBlock
  | CoreGalleryBlock
  | CoreButtonBlock
  | CoreSeparatorBlock
  | CoreSpacerBlock
  | CoreHTMLBlock
  | CoreEmbedBlock
  | CoreVideoBlock;

// Map block names to attribute types
export type BlockAttributesMap = {
  [k in BlockData as k['name']]: k['attributes'];
};

//'core/paragraph': { content: string };

// Map block names to React component types with appropriate props
export type BlockComponentMap = {
  [k in keyof BlockAttributesMap]: ComponentType<BlockAttributesMap[k]>;
};

//core/paragraph: React.ComponentType<{ content: string }>;
