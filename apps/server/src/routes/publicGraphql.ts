import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { getPrismaClient } from '../services/prisma';
import { publicSchema } from '../schema';
import * as Sentry from '@sentry/node';

const router = Router();
const prisma = getPrismaClient();

router.use(
  graphqlHTTP((req: any) => ({
    schema: publicSchema,
    graphiql: true,
    context: {
      prisma: prisma,
      request: req,
      user: req.user,
    },
    customFormatErrorFn: (error) => {
      // Log GraphQL errors to Sentry
      Sentry.withScope((scope) => {
        scope.setTag('kind', 'graphql');
        scope.setLevel('error');

        // Add request context
        scope.setContext('request', {
          url: req.url,
          method: req.method,
          headers: req.headers,
          body: req.body,
        });

        // Add GraphQL specific context
        scope.setContext('graphql', {
          query: req.body?.query,
          variables: req.body?.variables,
          operationName: req.body?.operationName,
        });

        // Add user context if available
        if (req.user) {
          scope.setUser({
            id: req.user?.id,
            email: req.user?.email,
            phone: req.user?.phone,
          });
        }

        Sentry.captureException(error.originalError || error);
      });

      console.log({
        message: error.message,
        locations: error.locations,
        path: error.path,
      });

      // Return error for client (sanitized in production)
      return process.env.NODE_ENV === 'production'
        ? { message: 'Internal server error' }
        : {
            message: error.message,
            locations: error.locations,
            path: error.path,
          };
    },
  }))
);

export default router;
