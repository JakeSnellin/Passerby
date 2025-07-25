import { gql } from 'graphql-request';

export const GET_PAGE_BY_SLUG = `
query getPageBySlug ($id: ID!, $idType: PageIdType!) {
  page(id: $id, idType: $idType) {
    title
    editorBlocks {
      name
      __typename
      ... on CoreParagraph {
        attributes {
          content
        }
      }
      ... on CoreQuote {
        attributes {
          value
          citation
        }
      }
      ... on CoreImage {
        attributes {
          url
          alt
        }
      }
    }
  }
}`;
