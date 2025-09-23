import userSchema, { publicUserSchema } from './user';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { flatten, merge } from 'lodash';
const schemaParts = [
  userSchema,
];

export default makeExecutableSchema({
  typeDefs: flatten(schemaParts.map((it) => it.typeDefs)),
  resolvers: merge({}, ...schemaParts.map((it) => it.resolvers)),
});

const publicSchemaParts = [publicUserSchema];

export const publicSchema = makeExecutableSchema({
  typeDefs: flatten(publicSchemaParts.map((it) => it.typeDefs)),
  resolvers: merge({}, ...publicSchemaParts.map((it) => it.resolvers)),
});
