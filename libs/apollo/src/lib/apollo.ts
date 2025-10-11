import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Operation,
  ServerError,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/link-error';
import * as Sentry from '@sentry/react';
const PUBLIC = 'public';
const SERVERLESS = 'serverless';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { getAuth } from 'firebase/auth';

const isAppRequest = (op: Operation) => {
  return (
    op.getContext()['clientName'] !== PUBLIC &&
    op.getContext()['clientName'] !== SERVERLESS
  );
};

const isServerlessRequest = (op: Operation) => {
  return op.getContext()['clientName'] === SERVERLESS;
};

const authContext = setContext(async (operation, context) => {
  if (context?.['clientName'] !== 'PUBLIC') {
    try {
      const TOKEN = await getAuth().currentUser?.getIdToken(true);
      return {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      };
    } catch (e) {
      console.error('getJWTToken Error:', e);
      return {};
    }
  }
  return {};
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      Sentry.captureMessage(
        `[GraphQL error]: Message: ${message},
         Location: ${locations}, Path: ${path}`
      )
    );
  }
  if ((networkError as ServerError)?.statusCode === 401) {
    // deleteToken();
  }
});

const loggingLink = new ApolloLink((operation, forward) => {
  const logRequest = {
    type: 'GraphQL Request',
    operationName: operation.operationName,
    variables: operation.variables,
    query: operation.query.loc?.source?.body || '[Query not available]',
  };

  console.log(logRequest);

  const start = Date.now();

  return forward(operation).map((response) => {
    const logResponse = {
      type: 'GraphQL Response',
      operationName: operation.operationName,
      durationMs: Date.now() - start,
      data: response.data,
      errors: response.errors || null,
    };
    console.log(logResponse);

    return response;
  });
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3333/graphql',
    connectionAckWaitTimeout: 0,
  })
);

interface props {
  VITE_CONFIG_APP_URL: string;
  VITE_CONFIG_APP_PUBLIC_API_URL: string;
}

const client = ({
  VITE_CONFIG_APP_URL,
  VITE_CONFIG_APP_PUBLIC_API_URL,
}: props) => {
  const httpLink = new HttpLink({
    uri: VITE_CONFIG_APP_URL,
  });

  const publicHttpLink = new HttpLink({
    uri: VITE_CONFIG_APP_PUBLIC_API_URL,
  });

  const splitLink = ApolloLink.split(
    (operation) => operation.getContext()['clientName'] === 'public',
    publicHttpLink,
    httpLink
  );

  return new ApolloClient({
    link: ApolloLink.from([
      loggingLink,
      errorLink,
      authContext,
      ApolloLink.split(
        (op) => {
          const definition = getMainDefinition(op.query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        splitLink
      ),
    ]),
    cache: new InMemoryCache(),
  });
};

export { client };
