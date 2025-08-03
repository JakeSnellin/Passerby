import { gql } from 'graphql-request';

export const CORE_PARAGRAPH_FRAGMENT = gql`
  fragment CoreParagraphFields on CoreParagraph {
    name
    __typename
    attributes {
      content
    }
  }
`;
