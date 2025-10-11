import {
  getBroadcasts,
  getBroadcastById,
  createBroadcast,
  updateBroadcast,
  deleteBroadcast,
} from '../../services/broadcast';

export default {
  Query: {
    getBroadcasts: async (_, args) => {
      const { city, state, tags } = args;
      const where: any = {
        deletedAt: null,
      };
      if (city) where.city = city;
      if (state) where.state = state;
      if (tags) where.tags = { hasSome: tags };

      return getBroadcasts({ where });
    },
    getBroadcastById: async (_, { id }) => {
      return getBroadcastById(id);
    },
  },
  Mutation: {
    createBroadcast: async (_, { input }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return createBroadcast(user.id, input);
    },
    updateBroadcast: async (_, { input }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      const { id, ...data } = input;
      return updateBroadcast(id, { ...data, updatedBy: user.id });
    },
    deleteBroadcast: async (_, { id }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return deleteBroadcast(id, user.id);
    },
  },
};
