import { CreateReviewInput } from '@my-project/gql';
import { PrismaClient, Review } from '@prisma/client';

const prisma = new PrismaClient();

export async function getReviewsByEnterpriseId(
  enterpriseId: string
): Promise<Review[]> {
  return prisma.review.findMany({
    where: {
      enterpriseId,
    },
  });
}

export async function createReview(
  customerId: string,
  data: CreateReviewInput
): Promise<Review> {
  const { enterpriseId, ...rest } = data;
  return prisma.review.create({
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
