import { gql } from 'graphql-request';

export const CORE_HEADING_FRAGMENT = gql`
  fragment CoreHeadingFields on CoreHeading {
    name
    __typename
    attributes {
      content
      level
      textAlign
    }
  }
`;
