import {
  CreateBroadcastInput,
  UpdateBroadcastInput,
} from '@my-project/gql';
import { Prisma, PrismaClient, Broadcast } from '@prisma/client';

const prisma = new PrismaClient();

export async function getBroadcasts(
  args: Prisma.BroadcastFindManyArgs
): Promise<Broadcast[]> {
  return prisma.broadcast.findMany(args);
}

export async function getBroadcastById(id: string): Promise<Broadcast | null> {
  return prisma.broadcast.findUnique({
    where: {
      id,
    },
  });
}

export async function createBroadcast(
  authorId: string,
  data: CreateBroadcastInput
): Promise<Broadcast> {
  return prisma.broadcast.create({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
}

export async function updateBroadcast(
  id: string,
  data: Omit<UpdateBroadcastInput, 'id'>
): Promise<Broadcast> {
  return prisma.broadcast.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteBroadcast(
  id: string,
  userId: string
): Promise<Broadcast> {
  return prisma.broadcast.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
      deletedBy: userId,
    },
  });
}
