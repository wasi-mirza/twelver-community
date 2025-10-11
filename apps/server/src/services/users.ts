import { CreateUserInput } from '@my-project/gql';
import { PrismaClient, User, Role } from '@prisma/client';
import { splitName } from '@my-project/common-libs';

const prisma = new PrismaClient();

export type UpdateUserInput = Partial<Omit<CreateUserInput, 'email'>> & {
  id: string;
};

// splitName now imported from @my-project/common-libs

export async function createUser(data: CreateUserInput): Promise<User> {
  return prisma.user.create({ data });
}

export async function upsertUserByEmail(data: CreateUserInput): Promise<User> {
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
  const user = await getUserByEmail(decoded.email);
  if (user) {
    return user;
  }
  return createUser({
    email: decoded.email,
    firebaseId: decoded.uid,
    firstName,
    lastName,
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
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
  return prisma.user.update({ where: { id }, data });
}

export async function updateUserRole(id: string, role: Role): Promise<User> {
  return prisma.user.update({ where: { id }, data: { role } });
}

export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}

