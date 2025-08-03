import { gql } from 'graphql-request';

export const HERO_BLOCK_FRAGMENT = gql`
  fragment HeroBlockFields on HeroBlock {
    __typename
    logoImage {
      node {
        sourceUrl
        altText
      }
    }
    titleText
    subtitleText
    descriptionText
  }
`;
