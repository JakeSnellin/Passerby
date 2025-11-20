import { gql } from 'graphql-request';

export const PROJECT_HERO_FRAGMENT = gql`
  fragment ProjectHeroBlockFields on ProjectHeroBlock {
    __typename
    heroImage {
      node {
        sourceUrl
        altText
      }
    }
  }
`;
