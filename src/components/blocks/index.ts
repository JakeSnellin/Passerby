import { BlockComponentMap } from '@/types/block';
import dynamic from 'next/dynamic';

//BlockComponentMap: core/paragraph: React.ComponentType<{ content: string }>;

export const blockComponents: BlockComponentMap = {
  'core/paragraph': dynamic(() => import('./Paragraph')),
  'core/quote': dynamic(() => import('./Quote')),
  'core/image': dynamic(() => import('./Image')),
  'core/heading': dynamic(() => import('./Heading')),
  'core/list': dynamic(() => import('./List')),
  'core/cover': dynamic(() => import('./Cover')),
  'core/gallery': dynamic(() => import('./Gallery')),
  'core/button': dynamic(() => import('./Button')),
  'core/separator': dynamic(() => import('./Separator')),
  'core/spacer': dynamic(() => import('./Spacer')),
  'core/html': dynamic(() => import('./HTML')),
  'core/embed': dynamic(() => import('./Embed')),
  'core/video': dynamic(() => import('./Video')),
};
