
import { updateUser, deleteUser, getUserByFirebaseId, getUserByEmail } from '../../services/users';

export default {
  Query: {
    getUserByEmail: async (_, { email }) => getUserByEmail(email),
    getUserByFirebaseId: async (_, { firebaseId }) => getUserByFirebaseId(firebaseId),
  },
  Mutation: {
    updateUser: async (_, { input }) => updateUser(input),
    deleteUser: async (_, { id }) => deleteUser(id),
  },
};
