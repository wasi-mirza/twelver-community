import { getUserByEmail, getUserByFirebaseId, upsertUserByEmail } from '../../services/users';

export default {
  Query: {
    userExistsByEmail: async (_, { email }) => {
      const user = await getUserByEmail(email);
      return !!user;
    },
    userExistsByFirebaseId: async (_, { firebaseId }) => {
      const user = await getUserByFirebaseId(firebaseId);
      return !!user;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => upsertUserByEmail(input),
  },
};
