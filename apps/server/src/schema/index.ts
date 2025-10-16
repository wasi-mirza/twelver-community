import userSchema from './user';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { flatten, merge } from 'lodash';
import profileSchema from './profile';
import broadcastSchema from './broadcast';
import bookingSchema from './booking';
import reviewSchema from './review';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './permissions';
import { baseTypeDefs } from './schema';

const schemaParts = [
  userSchema,
  profileSchema,
  broadcastSchema,
  bookingSchema,
  reviewSchema,
];

const executableSchema = makeExecutableSchema({
  typeDefs: [baseTypeDefs, ...flatten(schemaParts.map((it) => it.typeDefs))],
  resolvers: merge({}, ...schemaParts.map((it) => it.resolvers)),
});

export default applyMiddleware(executableSchema, permissions);

const publicSchemaParts = [userSchema, profileSchema];

export const publicSchema = makeExecutableSchema({
  typeDefs: [baseTypeDefs, ...flatten(publicSchemaParts.map((it) => it.typeDefs))],
  resolvers: merge({}, ...publicSchemaParts.map((it) => it.resolvers)),
});
