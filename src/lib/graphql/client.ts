//GraphQL client setup

import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

if (!endpoint) {
  throw new Error('Missing GraphQL endpoint. Did you set NEXT_PUBLIC_WORDPRESS_API_URL?');
}

export const client = new GraphQLClient(endpoint);
