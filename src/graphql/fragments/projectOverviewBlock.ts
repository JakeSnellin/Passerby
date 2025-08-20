import { gql } from 'graphql-request';

export const PROJECT_OVERVIEW_BLOCK_FRAGMENT = gql`
  fragment ProjectOverviewBlockFields on ProjectOverviewBlock {
    __typename
    projectTitleText
    projectWebsite
    overviewText {
      overviewTitle
      overviewBodyText
      optionalTaskSubheading
      optionalTaskBodyText
    }
  }
`;
