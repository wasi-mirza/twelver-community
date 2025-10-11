import {
  CreateProfileInput,
  UpdateProfileInput,
} from '@my-project/gql';
import { PrismaClient, Profile } from '@prisma/client';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  return prisma.profile.findUnique({
    where: {
      userId,
    },
  });
}

export async function createProfile(
  userId: string,
  data: CreateProfileInput
): Promise<{ user: User; profile: Profile }> {
  if (data.isEnterprise) {
    // For enterprise users, we need a transaction to also update the user's role
    return prisma.$transaction(async (tx) => {
      const profile = await tx.profile.upsert({
        where: { userId },
        update: { ...data, enterpriseApplicationStatus: 'PENDING' },
        create: {
          ...data,
          enterpriseApplicationStatus: 'PENDING',
          user: { connect: { id: userId } },
        },
      });

      const user = await tx.user.update({
        where: { id: userId },
        data: { role: 'USER' },
      });

      return { user, profile };
    });
  }

  // For non-enterprise users, a simple upsert is sufficient
  const profile = await prisma.profile.upsert({
    where: { userId },
    update: data,
    create: {
      ...data,
      user: { connect: { id: userId } },
    },
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  return { user, profile };
}

export async function updateProfile(
  id: string,
  data: Omit<UpdateProfileInput, 'id'>
): Promise<Profile> {
  return prisma.profile.update({
    where: {
      id,
    },
    data,
  });
}
