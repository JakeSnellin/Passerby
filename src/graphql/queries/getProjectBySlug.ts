import { gql } from 'graphql-request';
import { CORE_PARAGRAPH_FRAGMENT } from '@/graphql/fragments/coreParagraph';
import { CORE_HEADING_FRAGMENT } from '@/graphql/fragments/coreHeading';
import { CORE_GROUP_FRAGMENT } from '@/graphql/fragments/coreGroup';
import { PROJECT_OVERVIEW_BLOCK_FRAGMENT } from '@/graphql/fragments/projectOverviewBlock';

export const GET_PROJECT_BY_SLUG = gql`
  ${CORE_PARAGRAPH_FRAGMENT}
  ${CORE_HEADING_FRAGMENT}
  ${CORE_GROUP_FRAGMENT}
  ${PROJECT_OVERVIEW_BLOCK_FRAGMENT}

  query getProjectBySlug($id: ID!, $idType: ProjectIdType!) {
    project(id: $id, idType: $idType) {
      slug
      title
      projectOverviewBlock {
        ...ProjectOverviewBlockFields
      }
      editorBlocks {
        ...CoreParagraphFields
        ...CoreGroupFields
      }
    }
  }
`;
