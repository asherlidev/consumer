import {
  ApolloClient,
  ApolloProvider as LibApolloProvider,
  HttpLink,
  HttpOptions,
  InMemoryCache,
} from '@apollo/client';
import fetch from 'isomorphic-fetch';
import React, { useMemo } from 'react';
import { useAuth } from '../auth';

const ApolloProvider: React.FC<{}> = ({ children }) => {
  const { authData } = useAuth();

  const client = useMemo(() => {
    let httpLinkOptions: HttpOptions = {
      uri: `${process.env.GATSBY_STRAPI_API_URL}/graphql`,
      fetch,
    };

    if (authData) {
      httpLinkOptions.headers = { Authorization: `Bearer ${authData.jwt}` };
    }

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink(httpLinkOptions),
    });
  }, [authData]);

  return <LibApolloProvider client={client}>{children}</LibApolloProvider>;
};

export default ApolloProvider;
