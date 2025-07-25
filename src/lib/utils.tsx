//General utility functions

import { client } from '@/lib/api';
import { GET_MENU_BY_SLUG } from '@/graphql/queries/getMenuBySlug';
import { Menu, RawMenu } from '@/types/layout';

export async function getMenuBySlug(slug: string): Promise<Menu> {
  const variables = {
    id: slug,
    idType: 'SLUG',
  };

  const data: RawMenu = await client.request(GET_MENU_BY_SLUG, variables);

  const rawMenu = data.menu;

  const menu: Menu = {
    id: rawMenu.id,
    name: rawMenu.name,
    slug: rawMenu.slug,
    items: rawMenu.menuItems.nodes,
  };

  return menu;
}
