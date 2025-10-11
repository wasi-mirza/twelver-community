import {
  CreateBookingInput,
} from '@my-project/gql';
import { Prisma, BookingStatus, PrismaClient, Booking } from '@prisma/client';

const prisma = new PrismaClient();

export async function getBookingsByCustomerId(
  customerId: string
): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      customerId,
      deletedAt: null,
    },
  });
}

export async function getBookingsByEnterpriseId(
  enterpriseId: string
): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      enterpriseId,
      deletedAt: null,
    },
  });
}

export async function getBookingById(id: string): Promise<Booking | null> {
  return prisma.booking.findUnique({
    where: {
      id,
    },
  });
}

export async function createBooking(
  customerId: string,
  data: CreateBookingInput
): Promise<Booking> {
  const { enterpriseId, ...rest } = data;
  return prisma.booking.create({
    data: {
      ...rest,
      customer: {
        connect: {
          id: customerId,
        },
      },
      enterprise: {
        connect: {
          id: enterpriseId,
        },
      },
    },
  });
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  userId: string,
  remarks?: string
): Promise<Booking> {
  return prisma.booking.update({
    where: {
      id,
    },
    data: {
      status,
      remarks,
      updatedBy: userId,
      canceledAt: status === 'CANCELLED' ? new Date() : undefined,
    },
  });
}
