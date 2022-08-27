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
exports.getProductReviews = exports.addProduct = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const products_service_1 = require("../services/products.service");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, products_service_1.findAllProducts)();
    return res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        products,
    });
});
exports.getProducts = getProducts;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success: false });
    }
    const product = yield (0, products_service_1.createProduct)(req.body);
    return res.status(200).json({
        success: true,
        message: 'Product added successfully',
        data: Object.assign({}, product),
    });
});
exports.addProduct = addProduct;
const getProductReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success: false });
    }
    const product = yield (0, products_service_1.findProductById)(params.id);
    return res.status(200).json({
        success: true,
        message: 'Reviews retrieved successfully',
        product,
    });
});
exports.getProductReviews = getProductReviews;
