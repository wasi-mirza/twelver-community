import resolvers from './resolvers';
import types from './types.graphql';

import endpoints from './endpoints.graphql';
export default {
  resolvers,
  typeDefs: [endpoints, types],
};
