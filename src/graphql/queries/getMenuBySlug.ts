import { gql } from 'graphql-request';

export const GET_MENU_BY_SLUG = gql`
  query getMenuByName($id: ID!, $idType: MenuNodeIdTypeEnum!) {
    menu(id: $id, idType: $idType) {
      id
      name
      slug
      menuItems {
        nodes {
          id
          url
          path
          cssClasses
          label
          parentId
        }
      }
    }
  }
`;
