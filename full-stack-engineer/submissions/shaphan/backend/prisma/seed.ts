import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createProducts = async () => {
  await prisma.product.createMany({
    data: [{
      id: 100,
      name: 'Iphone 12 Pro',
      price: 1200,
      vendor: 'Apple Inc.',
    },
    {
      id: 101,
      name: 'Galaxy S22',
      price: 1100,
      vendor: 'Samsung Inc.',
    },
    {
      id: 102,
      name: 'Pixel 7a',
      price: 700,
      vendor: 'Google',
    },
    ],
    skipDuplicates: true,
  });
};

createProducts()
  .then(() => {
    console.info('database seeded successfully');
  }).catch(() => {
    console.info('Seeding database failed');
  });
