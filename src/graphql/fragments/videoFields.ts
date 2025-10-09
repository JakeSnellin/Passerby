import { gql } from 'graphql-request';

export const VIDEO_FIELDS_FRAGMENT = gql`
  fragment VideoCPTFields on Video {
    videoFields {
      __typename
      projectSlug
      videoUrl
      projectTitle
      projectServices
      thumbnail {
        node {
          altText
          sourceUrl
        }
      }
    }
    creators {
      nodes {
        name
        slug
        id
      }
    }
  }
`;
