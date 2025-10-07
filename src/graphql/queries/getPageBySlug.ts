import { gql } from 'graphql-request';
import { CORE_PARAGRAPH_FRAGMENT } from '@/graphql/fragments/coreParagraph';
import { CORE_HEADING_FRAGMENT } from '@/graphql/fragments/coreHeading';
import { CORE_GROUP_FRAGMENT } from '@/graphql/fragments/coreGroup';

export const GET_PAGE_BY_SLUG = gql`
  ${CORE_PARAGRAPH_FRAGMENT}
  ${CORE_HEADING_FRAGMENT}
  ${CORE_GROUP_FRAGMENT}

  query getPageBySlug($id: ID!, $idType: PageIdType!) {
    page(id: $id, idType: $idType) {
      title
      editorBlocks {
        ...CoreParagraphFields
        ...CoreGroupFields
      }
    }
  }
`;
