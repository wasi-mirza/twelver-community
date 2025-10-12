import { shield, and } from 'graphql-shield';
import { isAuthenticated, isAdmin, isEnterprise, isUser } from './rules';

export const permissions = shield({
  Query: {
    // User
    getUsers: and(isAuthenticated, isAdmin),
    me: isAuthenticated,
    // Profile
    myProfile: isAuthenticated,
    getProfileByUserId: isAuthenticated,
    // Broadcast
    getBroadcasts: isAuthenticated,
    getBroadcastById: isAuthenticated,
    // Booking
    getBookingsAsCustomer: and(isAuthenticated, isUser),
    getBookingsAsEnterprise: and(isAuthenticated, isEnterprise),
    getBookingById: isAuthenticated,
    // Review
    getReviewsForEnterprise: isAuthenticated,
  },
  Mutation: {
    // Profile
    createProfile: isAuthenticated,
    updateProfile: isAuthenticated,
    // Broadcast
    createBroadcast: isAuthenticated,
    updateBroadcast: isAuthenticated,
    deleteBroadcast: isAuthenticated,
    // Booking
    createBooking: and(isAuthenticated, isUser),
    updateBookingStatus: and(isAuthenticated, isEnterprise),
    // Review
    createReview: and(isAuthenticated, isUser),
  },
});
