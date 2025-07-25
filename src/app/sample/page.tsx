import BlockRenderer from '@/components/BlockRenderer';
import { GET_PAGE_BY_SLUG } from '@/graphql/queries/getPageBySlug';
import { client } from '@/lib/api';
import { PageProps } from '@/types/page';
import { notFound } from 'next/navigation';

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

  return (
    <main>
      <h1>{page.title}</h1>
      <BlockRenderer blocks={page.editorBlocks} />
    </main>
  );
}
