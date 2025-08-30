import { client } from '@/lib/graphql/client';
import { GET_ALL_PROJECT_SLUGS } from '@/graphql/queries/getAllProjectSlugs';
import { GET_PROJECT_BY_SLUG } from '@/graphql/queries/getProjectBySlug';
import { IdTypeEnum, QueryVariables } from '@/types/graphql';
import { GetAllProjectSlugsResponse, GetProjectBySlugResponse } from '@/app/projects/[slug]/types';
import { normaliseBlocks } from '@/lib/utils/normaliseBlocks';
import { BlockData } from '@/types/block';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';

export const revalidate = 60; // ISR: revalidate this page every 60 seconds

export async function generateStaticParams() {
  // Pre-generate static paths for all project detail pages
  const {
    projects: { nodes },
  }: GetAllProjectSlugsResponse = await client.request(GET_ALL_PROJECT_SLUGS);

  return nodes.map((node) => ({ slug: node.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

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
