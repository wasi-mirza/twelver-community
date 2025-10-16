import { PrismaClient, User } from '@prisma/client';
import { splitName } from '@my-project/common-libs';
import { UpdateUserInput } from '@my-project/gql';

const prisma = new PrismaClient();

type UpsertUserByEmailInput = {
  email: string;
  firstName: string;
  lastName: string;
  firebaseId: string;
};

export async function upsertUserByEmail(data: UpsertUserByEmailInput): Promise<User> {
  return prisma.user.upsert({
    where: { email: data.email },
    update: {
      firstName: data.firstName,
      lastName: data.lastName,
      firebaseId: data.firebaseId,
    },
    create: data,
  });
}

export async function ensureUserFromFirebase(decoded: {
  uid?: string;
  email?: string | null;
  name?: string | null;
}): Promise<User> {
  if (!decoded?.email || !decoded?.uid) {
    throw new Error('Missing required fields from Firebase token (email/uid)');
  }
  const { firstName, lastName } = splitName(decoded.name);
  const user = await upsertUserByEmail({
    email: decoded.email,
    firebaseId: decoded.uid,
    firstName,
    lastName,
  });
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ 
    where: { email } ,
    include: {
      profile: true,
    },
  });
}

export async function getUserByFirebaseId(firebaseId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { firebaseId },
    include: {
      profile: true,
    },
  });
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function updateUser(input: UpdateUserInput): Promise<User> {
  const { id, ...data } = input;
  return prisma.user.update({ where: { id }, data: data as UpsertUserByEmailInput });
}

export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}

