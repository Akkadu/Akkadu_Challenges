import { PrismaClient } from '@prisma/client';

interface ProductInput {
    name : string;
    price: number;
    vendor: string;
}

const prisma = new PrismaClient();

const createProduct = async (input: ProductInput) => {
  const product = await prisma.product.create({
    data: {
      name: input.name,
      price: Number(input.price),
      vendor: input.vendor,
    },
  });

  return product;
};

const findProductById = async (id: number) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      price: true,
      vendor: true,
      averageStars: true,
      reviewsCount: true,
      reviews: {
        orderBy: {
          id: 'desc',
        },
        select: {
          id: true,
          stars: true,
          comment: true,
          User: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      },
    },
  });

  return product;
};

const findAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  return products;
};

const updateProductAverageStars = async (id: number) => {
  const aggregates = await prisma.review.aggregate({
    where: {
      productId: Number(id),
    },
    _avg: {
      stars: true,
    },
  });

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      // eslint-disable-next-line no-underscore-dangle
      averageStars: Math.round(aggregates._avg.stars || 0),
    },
  });
};

const updateProductReviewsCount = async (id: number) => {
  const aggregates = await prisma.review.aggregate({
    where: {
      productId: Number(id),
    },
    _count: {
      id: true,
    },
  });

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      // eslint-disable-next-line no-underscore-dangle
      reviewsCount: aggregates._count.id || 0,
    },
  });
};

export {
  ProductInput,
  createProduct,
  findProductById,
  findAllProducts,
  updateProductAverageStars,
  updateProductReviewsCount,
};
