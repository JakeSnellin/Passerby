import { gql } from 'graphql-request';

export const VIDEO_FIELDS_FRAGMENT = gql`
  fragment VideoCPTFields on Video {
    videoFields {
      __typename
      projectSlug
      videoUrl
      thumbnail {
        node {
          altText
          uri
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
