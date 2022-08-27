"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductReviewsCount = exports.updateProductAverageStars = exports.findAllProducts = exports.findProductById = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProduct = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.create({
        data: {
            name: input.name,
            price: Number(input.price),
            vendor: input.vendor,
        },
    });
    return product;
});
exports.createProduct = createProduct;
const findProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findFirst({
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
});
exports.findProductById = findProductById;
const findAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany({
        orderBy: {
            id: 'desc',
        },
    });
    return products;
});
exports.findAllProducts = findAllProducts;
const updateProductAverageStars = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const aggregates = yield prisma.review.aggregate({
        where: {
            productId: Number(id),
        },
        _avg: {
            stars: true,
        },
    });
    yield prisma.product.update({
        where: {
            id,
        },
        data: {
            // eslint-disable-next-line no-underscore-dangle
            averageStars: Math.round(aggregates._avg.stars || 0),
        },
    });
});
exports.updateProductAverageStars = updateProductAverageStars;
const updateProductReviewsCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const aggregates = yield prisma.review.aggregate({
        where: {
            productId: Number(id),
        },
        _count: {
            id: true,
        },
    });
    yield prisma.product.update({
        where: {
            id,
        },
        data: {
            // eslint-disable-next-line no-underscore-dangle
            reviewsCount: aggregates._count.id || 0,
        },
    });
});
exports.updateProductReviewsCount = updateProductReviewsCount;
