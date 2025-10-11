import { getReviewsByEnterpriseId, createReview } from '../../services/review';

export default {
  Query: {
    getReviewsForEnterprise: async (_, { enterpriseId }) => {
      return getReviewsByEnterpriseId(enterpriseId);
    },
  },
  Mutation: {
    createReview: async (_, { input }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return createReview(user.id, input);
    },
  },
};
