import {
  getBookingsByCustomerId,
  getBookingsByEnterpriseId,
  getBookingById,
  createBooking,
  updateBookingStatus,
} from '../../services/booking';

export default {
  Query: {
    getBookingsAsCustomer: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return getBookingsByCustomerId(user.id);
    },
    getBookingsAsEnterprise: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return getBookingsByEnterpriseId(user.id);
    },
    getBookingById: async (_, { id }) => {
      return getBookingById(id);
    },
  },
  Mutation: {
    createBooking: async (_, { input }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return createBooking(user.id, input);
    },
    updateBookingStatus: async (_, { input }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      const { id, status, remarks } = input;
      return updateBookingStatus(id, status, user.id, remarks);
    },
  },
};
