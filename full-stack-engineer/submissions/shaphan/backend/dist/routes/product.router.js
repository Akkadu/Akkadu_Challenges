"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
const product_schema_1 = __importDefault(require("../validations/product.schema"));
const productRouter = express_1.default.Router();
productRouter
    .post('/products', product_schema_1.default, products_controller_1.addProduct)
    .get('/products', products_controller_1.getProducts)
    .get('/products/:id/reviews', products_controller_1.getProductReviews);
exports.default = productRouter;
