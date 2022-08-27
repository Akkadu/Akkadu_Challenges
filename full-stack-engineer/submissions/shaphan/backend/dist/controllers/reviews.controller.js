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
exports.removeReview = exports.editReview = exports.addReview = void 0;
const express_validator_1 = require("express-validator");
const reviews_service_1 = require("../services/reviews.service");
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { user } = res.locals;
    const review = yield (0, reviews_service_1.createReview)(req.body, user.id);
    return res.status(201).json({
        success: true,
        message: 'Review created successfully',
        data: Object.assign({}, review),
    });
});
exports.addReview = addReview;
const editReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success: false });
    }
    const review = yield (0, reviews_service_1.updateReview)(params.id, req.body);
    return res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        data: Object.assign({}, review),
    });
});
exports.editReview = editReview;
const removeReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success: false });
    }
    const review = yield (0, reviews_service_1.deleteReview)(params.id);
    return res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
        data: {
            id: review.id,
        },
    });
});
exports.removeReview = removeReview;
