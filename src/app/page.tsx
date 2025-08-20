import BlockRenderer from '@/components/BlockRenderer';
import { GET_PAGE_BY_SLUG } from '@/graphql/queries/getPageBySlug';
import { client } from '@/lib/graphql/client';
import { normaliseBlocks } from '@/lib/utils/normaliseBlocks';
import { GetPageBySlugResponse } from '@/types/page';
import { notFound } from 'next/navigation';
import { BlockData } from '@/types/block';
import { QueryVariables, IdTypeEnum } from '@/types/graphql';

export const revalidate = 60;

export default async function Projects() {
  const variables: QueryVariables<IdTypeEnum> = {
    id: '/',
    idType: IdTypeEnum.URI,
  };

  const { page }: GetPageBySlugResponse = await client.request(GET_PAGE_BY_SLUG, variables);

  if (!page) {
    notFound();
  }

  const blocks: BlockData[] = normaliseBlocks(page);

  return <BlockRenderer blocks={blocks} />;
}
