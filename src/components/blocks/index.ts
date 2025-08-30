import { BlockComponentsMap } from '@/types/block';
import dynamic from 'next/dynamic';

export const blockComponentsMap: BlockComponentsMap = {
  CoreParagraph: dynamic(() => import('./Paragraph')),
  CoreHeading: dynamic(() => import('./Heading')),
  CoreButton: dynamic(() => import('./Button')),
  CoreCover: dynamic(() => import('./Cover')),
  CoreEmbed: dynamic(() => import('./Embed')),
  CoreGallery: dynamic(() => import('./Gallery')),
  CoreHTML: dynamic(() => import('./HTML')),
  CoreGroup: dynamic(() => import('./Group')),
  HeroBlock: dynamic(() => import('./Hero')),
  ProjectOverviewBlock: dynamic(() => import('./ProjectOverview')),
  CoreList: dynamic(() => import('./List')),
  CoreQuote: dynamic(() => import('./Quote')),
  CoreSeparator: dynamic(() => import('./Separator')),
  CoreSpacer: dynamic(() => import('./Spacer')),
  CoreVideo: dynamic(() => import('./Video')),
  CoreImage: dynamic(() => import('./Image')),
  VideoGalleryBlock: dynamic(() => import('./VideoGallery')),
};
