import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';

import { graphqlRouter, publicGraphqlRouter } from './routes';
import { verifyFirebaseToken } from './services/firebase';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

export interface AppContext {
  user?: User;
}

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Health check
app.get('/public/health', (req, res) => {
  const DEPLOYED_AT = process.env.DEPLOYED_AT;

  res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    version: process.env.VERSION,
    updatedAt: DEPLOYED_AT,
  });
});

// Public GraphQL (no auth required)
app.use('/public/graphql', publicGraphqlRouter);

// Protected GraphQL (requires Firebase auth)
app.use(verifyFirebaseToken);
app.get('/me', (req: Request, res: Response) => {
  return res.json({ user: (req as any).user });
});
app.use('/graphql', graphqlRouter);

// Fallback error handler
app.use((err, req, res, _next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Create an HTTP server from the Express app
const httpServer = createServer(app);

export default app;
export { httpServer };
