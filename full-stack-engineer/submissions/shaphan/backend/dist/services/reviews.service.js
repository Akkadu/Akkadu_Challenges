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
exports.deleteReview = exports.updateReview = exports.findReviewsByProductId = exports.findReviewById = exports.createReview = void 0;
const client_1 = require("@prisma/client");
const products_service_1 = require("./products.service");
const prisma = new client_1.PrismaClient();
const createReview = (input, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma.review.create({
        data: {
            productId: input.productId,
            stars: input.stars,
            comment: input.comment,
            userId,
        },
    });
    (0, products_service_1.updateProductAverageStars)(input.productId);
    (0, products_service_1.updateProductReviewsCount)(input.productId);
    return review;
});
exports.createReview = createReview;
const findReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma.review.findFirst({
        where: {
            id: Number(id),
        },
    });
    return review;
});
exports.findReviewById = findReviewById;
const findReviewsByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma.review.findMany({
        where: {
            productId: Number(productId),
        },
    });
    return reviews;
});
exports.findReviewsByProductId = findReviewsByProductId;
const updateReview = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma.review.update({
        where: {
            id: Number(id),
        },
        data: {
            stars: input.stars,
            comment: input.comment,
        },
    });
    (0, products_service_1.updateProductAverageStars)(input.productId);
    return review;
});
exports.updateReview = updateReview;
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma.review.delete({
        where: {
            id: Number(id),
        },
    });
    (0, products_service_1.updateProductAverageStars)(review.productId);
    (0, products_service_1.updateProductReviewsCount)(review.productId);
    return review;
});
exports.deleteReview = deleteReview;
