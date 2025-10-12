
import {
  updateUser,
  deleteUser,
  getUserByFirebaseId,
  getUserByEmail,
  getUsers,
} from '../../services/users';

export default {
  Query: {
    getUsers: async () => getUsers(),
    me: async (_, __, { user }) => user,
    getUserByEmail: async (_, { email }) => getUserByEmail(email),
    getUserByFirebaseId: async (_, { firebaseId }) =>
      getUserByFirebaseId(firebaseId),
  },
  Mutation: {
    updateUser: async (_, { input }) => updateUser(input),
    deleteUser: async (_, { id }) => deleteUser(id),
  },
};
