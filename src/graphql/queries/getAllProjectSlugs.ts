import { gql } from 'graphql-request';

export const GET_ALL_PROJECT_SLUGS = gql`
  query GetAllProjectSlugs {
    projects(first: 100) {
      nodes {
        slug
      }
    }
  }
`;
