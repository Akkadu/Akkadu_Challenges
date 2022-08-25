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
const express_validator_1 = require("express-validator");
const accounts_service_1 = require("../services/accounts.service");
exports.default = (0, express_validator_1.checkSchema)({
    fullName: {
        isEmpty: {
            errorMessage: "Name is required",
            negated: true,
        },
        escape: true,
    },
    username: {
        trim: true,
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                return (0, accounts_service_1.checkUsernameExists)(value).then((isExists) => {
                    if (isExists) {
                        throw new Error("User with this email already exists");
                    }
                });
            }),
        },
    },
    password: {
        trim: true,
        isLength: {
            options: {
                min: 8,
            },
            errorMessage: "Password must have at least 8 characters",
        },
    },
    confirmPassword: {
        errorMessage: "Must have the same value as the password field",
        custom: {
            options: (value, { req }) => value === req.body.password,
        },
    },
});
