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
  // Determine the role based on the isEnterprise flag
  const role = data.isEnterprise ? 'ENTERPRISE' : 'USER';

  return prisma.$transaction(async (tx) => {
    // Update user's role
    const user = await tx.user.update({
      where: { id: userId },
      data: { role },
    });

    // For enterprise users, set application status to PENDING
    const profileData = {
      ...data,
    };

    // Create or update the profile
    const profile = await tx.profile.upsert({
      where: { userId },
      update: {
        ...profileData,
        ...(data.isEnterprise ? { applicationStatus: 'PENDING' } : {}),
      },
      create: {
        ...profileData,
        ...(data.isEnterprise ? { applicationStatus: 'PENDING' } : {}),
        user: { connect: { id: userId } },
      },
    });

    return { user, profile };
  });
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
