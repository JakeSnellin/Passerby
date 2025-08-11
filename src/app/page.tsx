import BlockRenderer from '@/components/BlockRenderer';
import { GET_PAGE_BY_SLUG } from '@/graphql/queries/getPageBySlug';
import { client } from '@/lib/graphql/client';
import { normaliseBlocks } from '@/lib/utils/normaliseBlocks';
import { PageProps } from '@/types/page';
import { notFound } from 'next/navigation';
import { BlockData } from '@/types/block';

export const revalidate = 60;

type ProjectsPageRef = React.ForwardedRef<HTMLDivElement>;

export default async function Projects(ref: ProjectsPageRef) {
  const variables = {
    id: '/',
    idType: 'URI',
  };

  const { page }: { page: PageProps | null } = await client.request(GET_PAGE_BY_SLUG, variables);

  if (!page) {
    notFound();
  }

  const blocks: BlockData[] = normaliseBlocks(page);

  return <BlockRenderer blocks={blocks} />;
}
