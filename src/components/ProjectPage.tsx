import { BlockData } from '@/types/block';
import BlockRenderer from '@/components/BlockRenderer';
import { normaliseBlocks } from '@/lib/utils/normaliseBlocks';
import { GetProjectBySlugResponse } from '@/types/project';
import { client } from '@/lib/graphql/client';
import { GET_PROJECT_BY_SLUG } from '@/graphql/queries/getProjectBySlug';
import { IdTypeEnum, QueryVariables } from '@/types/graphql';
import { notFound } from 'next/navigation';

export default async function fetchAndRenderProject(slug: string) {
  // Fetch project by slug
  const variables: QueryVariables<IdTypeEnum> = {
    id: slug,
    idType: IdTypeEnum.SLUG,
  };

  const { project }: GetProjectBySlugResponse = await client.request(
    GET_PROJECT_BY_SLUG,
    variables,
  );

  if (!project) {
    notFound(); // Show 404 if project not found in CMS
  }

  // Normalise blocks so BlockRenderer can handle them consistently
  const blocks: BlockData[] = normaliseBlocks(project);

  return <BlockRenderer blocks={blocks} />;
}
