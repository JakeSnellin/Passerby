import { client } from '@/lib/graphql/client';
import { GET_ALL_PROJECT_SLUGS } from '@/graphql/queries/getAllProjectSlugs';
import { GET_PROJECT_BY_SLUG } from '@/graphql/queries/getProjectBySlug';
import { IdTypeEnum, QueryVariables } from '@/types/graphql';
import { GetAllProjectSlugsResponse, GetProjectBySlugResponse } from '@/app/projects/[slug]/types';
import { normaliseBlocks } from '@/lib/utils/normaliseBlocks';
import { BlockData } from '@/types/block';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const {
    projects: { nodes },
  }: GetAllProjectSlugsResponse = await client.request(GET_ALL_PROJECT_SLUGS);

  return nodes.map((node) => ({ slug: node.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const variables: QueryVariables<IdTypeEnum> = {
    id: slug,
    idType: IdTypeEnum.SLUG,
  };

  const { project }: GetProjectBySlugResponse = await client.request(
    GET_PROJECT_BY_SLUG,
    variables,
  );

  if (!project) {
    notFound();
  }

  const blocks: BlockData[] = normaliseBlocks(project);

  return <BlockRenderer blocks={blocks} />;
}
