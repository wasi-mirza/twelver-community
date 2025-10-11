
import {
  updateUser,
  deleteUser,
  getUserByFirebaseId,
  getUserByEmail,
  getUsers,
  updateUserRole,
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
    updateUserRole: async (_, { id, role }) => updateUserRole(id, role),
    updateUser: async (_, { input }) => updateUser(input),
    deleteUser: async (_, { id }) => deleteUser(id),
  },
};
