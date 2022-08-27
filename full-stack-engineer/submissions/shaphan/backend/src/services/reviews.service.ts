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
      productId: input.productId,
      stars: input.stars,
      comment: input.comment,
      userId,
    },
  });

  updateProductAverageStars(input.productId);
  updateProductReviewsCount(input.productId);
  return review;
};

const findReviewById = async (id: number) => {
  const review = await prisma.review.findFirst({
    where: {
      id: Number(id),
    },
  });

  return review;
};

const findReviewsByProductId = async (productId: number) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId: Number(productId),
    },
  });

  return reviews;
};

const updateReview = async (id: number, input: ReviewInput) => {
  const review = await prisma.review.update({
    where: {
      id: Number(id),
    },
    data: {
      stars: input.stars,
      comment: input.comment,
    },
  });

  updateProductAverageStars(input.productId);

  return review;
};

const deleteReview = async (id: number) => {
  const review = await prisma.review.delete({
    where: {
      id: Number(id),
    },
  });

  updateProductAverageStars(review.productId);
  updateProductReviewsCount(review.productId);
  return review;
};

export {
  ReviewInput,
  createReview,
  findReviewById,
  findReviewsByProductId,
  updateReview,
  deleteReview,
};
