import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './app/app';
import { initFirebaseAmplify, AuthProviderWeb } from '@my-project/auth';
import { client } from '@my-project/apollo';

// Initialize Firebase from Vite env vars
initFirebaseAmplify({
  FIREBASE_API_KEY: import.meta.env.VITE_APP_FIREBASE_API_KEY as string,
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN as string,
  FIREBASE_PROJECT_ID: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID as string,
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET as string,
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  FIREBASE_APP_ID: import.meta.env.VITE_APP_FIREBASE_APP_ID as string,
});

// Initialize Apollo Client
const apolloClient = client({
  VITE_CONFIG_APP_URL: import.meta.env.VITE_CONFIG_APP_URL || 'http://localhost:3333/graphql',
  VITE_CONFIG_APP_PUBLIC_API_URL: import.meta.env.VITE_CONFIG_APP_PUBLIC_API_URL || 'http://localhost:3333/public/graphql',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <AuthProviderWeb>
        <App />
      </AuthProviderWeb>
    </ApolloProvider>
  </StrictMode>,
);
