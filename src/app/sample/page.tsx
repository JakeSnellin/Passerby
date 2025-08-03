import BlockRenderer from '@/components/BlockRenderer';
import { GET_PAGE_BY_SLUG } from '@/graphql/queries/getPageBySlug';
import { client } from '@/lib/api';
import { PageProps } from '@/types/page';
import { notFound } from 'next/navigation';
import { BlockData } from '@/types/block';
import { normaliseBlocks } from '@/lib/utils/normaliseBlocks';

export const revalidate = 60;

export default async function Sample() {
  const variables = {
    id: 'sample',
    idType: 'URI',
  };

  const { page }: { page: PageProps | null } = await client.request(GET_PAGE_BY_SLUG, variables);

  if (!page) {
    notFound();
  }

  const blocks: BlockData[] = normaliseBlocks(page);

  return <BlockRenderer blocks={blocks} />;
}
