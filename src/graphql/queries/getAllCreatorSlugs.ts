import { gql } from 'graphql-request';

export const GET_ALL_CREATOR_SLUGS = gql`
  query GetAllCreatorSlugs {
    creators {
      nodes {
        slug
      }
    }
  }
`;
