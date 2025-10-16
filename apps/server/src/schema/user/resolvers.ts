import { UpdateUserInput } from '@my-project/gql';
import {
  deleteUser,
  getUserByEmail,
  getUserByFirebaseId,
  getUsers,
  updateUser,
  ensureUserFromFirebase,
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
    updateUser: (_, { data }: { data: UpdateUserInput }) => {
      return updateUser(data);
    },
    deleteUser: async (_, { id }: { id: string }) => {
      await deleteUser(id);
      return {
        status: true,
        message: 'User deleted successfully',
      };
    },
    ensureUser: async (_, __, { user }: { user: any }) => {
      // The user object is added to the context by the verifyFirebaseToken middleware
      if (!user) {
        throw new Error('Not authenticated');
      }
      return ensureUserFromFirebase(user);
    },
  },
};
