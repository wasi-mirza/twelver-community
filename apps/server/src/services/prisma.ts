import { PrismaClient } from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

let prismaClient: PrismaClient;

export const getPrismaClient = (): PrismaClient => {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      log: ['warn', 'error'],
    });
  }

  return prismaClient;
};

export type IPrismaClient =
  | PrismaClient
  | Omit<PrismaClient, ITXClientDenyList>;


