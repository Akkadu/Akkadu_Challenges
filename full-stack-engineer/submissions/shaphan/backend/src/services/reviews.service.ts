import { PrismaClient } from '@prisma/client';
import { updateProductAverageStars, updateProductReviewsCount } from './products.service';

interface ReviewInput {
    productId: number;
    stars: number;
    comment: string;
}

const prisma = new PrismaClient();

const createReview = async (input: ReviewInput, userId: number) => {
  const review = await prisma.review.create({
    data: {
      productId: Number(input.productId),
      stars: Number(input.stars),
      comment: input.comment,
      userId: Number(userId),
    },
  });

  await updateProductAverageStars(Number(input.productId));
  await updateProductReviewsCount(Number(input.productId));
  return review;
};

const findReviewById = async (id: number) => prisma.review.findFirst({
  where: {
    id: Number(id),
  },
});

const findReviewsByProductId = async (productId: number) => prisma.review.findMany({
  where: {
    productId: Number(productId),
  },
});

const updateReview = async (id: number, input: ReviewInput) => {
  const review = await prisma.review.update({
    where: {
      id: Number(id),
    },
    data: {
      stars: Number(input.stars),
      comment: input.comment,
    },
  });

  await updateProductAverageStars(Number(input.productId));

  return review;
};

const deleteReview = async (id: number) => {
  const review = await prisma.review.delete({
    where: {
      id: Number(id),
    },
  });

  await updateProductAverageStars(Number(review.productId));
  await updateProductReviewsCount(Number(review.productId));
  return review;
};

const findUserReview = (userId: number, productId: number) => prisma.review.findFirst({
  where: {
    userId: Number(userId),
    productId: Number(productId),
  },
});
export {
  ReviewInput,
  createReview,
  findReviewById,
  findReviewsByProductId,
  updateReview,
  deleteReview,
  findUserReview,
};
