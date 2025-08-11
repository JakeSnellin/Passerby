import { gql } from 'graphql-request';

export const CORE_GROUP_FRAGMENT = gql`
  fragment CoreGroupFields on CoreGroup {
    name
    __typename
    attributes {
      layout
      className
    }
    innerBlocks {
      __typename
      ...CoreParagraphFields
      ...CoreHeadingFields
    }
  }
`;
