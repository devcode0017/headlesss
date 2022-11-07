import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://dev-graceheadless.pantheonsite.io/graphql',
  cache: new InMemoryCache()
});
