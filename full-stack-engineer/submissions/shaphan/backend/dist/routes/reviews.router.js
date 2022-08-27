"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("../controllers/reviews.controller");
const authenticate_1 = __importDefault(require("../utils/authenticate"));
const reviewsRouter = express_1.default.Router();
reviewsRouter
    .post('/reviews', authenticate_1.default, reviews_controller_1.addReview)
    .put('/reviews/:id', reviews_controller_1.editReview)
    .delete('/reviews/:id', reviews_controller_1.removeReview);
exports.default = reviewsRouter;
