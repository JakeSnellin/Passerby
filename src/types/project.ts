import { BlockData, ProjectOverviewBlock } from '@/types/block';

export interface GetAllProjectSlugsResponse {
  projects: {
    nodes: { slug: string }[];
  };
}

export interface ProjectProps {
  slug: string;
  title: string;
  editorBlocks: BlockData[];
  projectOverviewBlock: ProjectOverviewBlock;
}

export interface GetProjectBySlugResponse {
  project: ProjectProps | null;
}
