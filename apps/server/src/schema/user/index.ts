import resolvers from './resolvers';
import publicResolvers from './publicResolvers';
import publicEndpoints from './publicEndpoints.graphql';
import types from './types.graphql';

import endpoints from './endpoints.graphql';
export default {
  resolvers,
  typeDefs: [endpoints, types],
};

export const publicUserSchema = {
  resolvers: publicResolvers,
  typeDefs: [types, publicEndpoints],
};
