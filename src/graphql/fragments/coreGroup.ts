import { gql } from 'graphql-request';
import { CORE_PARAGRAPH_FRAGMENT } from './coreParagraph';
import { CORE_HEADING_FRAGMENT } from './coreHeading';

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
