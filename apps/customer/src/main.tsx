import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@my-project/web-ui';

import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '@my-project/apollo';
import { AuthProviderWeb, initFirebaseAmplify } from '@my-project/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// Initialize Firebase from Vite env vars
initFirebaseAmplify({
  FIREBASE_API_KEY: import.meta.env.VITE_APP_FIREBASE_API_KEY as string,
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN as string,
  FIREBASE_PROJECT_ID: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID as string,
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET as string,
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  FIREBASE_APP_ID: import.meta.env.VITE_APP_FIREBASE_APP_ID as string,
});

const apolloClient = client({
  VITE_CONFIG_APP_URL:
    import.meta.env.VITE_CONFIG_APP_URL || 'http://localhost:3333/graphql',
  VITE_CONFIG_APP_PUBLIC_API_URL:
    import.meta.env.VITE_CONFIG_APP_PUBLIC_API_URL ||
    'http://localhost:3333/public/graphql',
});

root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProviderWeb>
            <App />
          </AuthProviderWeb>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
