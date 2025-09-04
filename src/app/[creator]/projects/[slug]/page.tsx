import { client } from '@/lib/graphql/client';
import { GET_ALL_PROJECT_SLUGS } from '@/graphql/queries/getAllProjectSlugs';
import { GetAllProjectSlugsResponse } from '@/types/project';
import fetchAndRenderProject from '@/components/ProjectPage';

export const revalidate = 60; // ISR: revalidate this page every 60 seconds

export async function generateStaticParams() {
  // Pre-generate static paths for all project detail pages
  const {
    projects: { nodes },
  }: GetAllProjectSlugsResponse = await client.request(GET_ALL_PROJECT_SLUGS);

  return nodes.map((node) => ({ slug: node.slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string | string[] } }) {
  const slug = Array.isArray(params.slug) ? params.slug[params.slug.length - 1] : params.slug;
  return fetchAndRenderProject(slug);
}
