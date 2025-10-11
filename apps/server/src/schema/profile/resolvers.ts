import {
  getProfileByUserId,
  createProfile,
  updateProfile,
} from '../../services/profile';

export default {
  Query: {
    getProfileByUserId: async (_, { userId }) => {
      return getProfileByUserId(userId);
    },
    myProfile: async (_, __, { user }) => {
      if (!user) {
        return null;
      }
      return getProfileByUserId(user.id);
    },
  },
  Mutation: {
    createProfile: async (_, { input }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return createProfile(user.id, input);
    },
    updateProfile: async (_, { input }) => {
      const { id, ...data } = input;
      return updateProfile(id, data);
    },
  },
};
