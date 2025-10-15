import { gql } from 'graphql-request';

export const GET_SITE_INFO = gql`
  query SiteInfo {
    footerTitleText
    headerMenuLabel
    customLogo {
      id
      url
      alt
    }
    headerMenu {
      id
      label
      url
    }
    footerMenu {
      id
      label
      url
    }
  }
`;
