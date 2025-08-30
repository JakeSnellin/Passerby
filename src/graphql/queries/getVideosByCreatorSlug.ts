import { gql } from 'graphql-request';
import { VIDEO_FIELDS_FRAGMENT } from '@/graphql/fragments/videoFields';

export const GET_VIDEOS_BY_CREATOR_SLUG = gql`
  ${VIDEO_FIELDS_FRAGMENT}

  query GetVideosByCreator($slug: ID!) {
    creator(id: $slug, idType: SLUG) {
      name
      slug
      videos {
        nodes {
          id
          ...VideoCPTFields
        }
      }
    }
  }
`;
