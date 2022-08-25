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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const accounts_service_1 = require("../services/accounts.service");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = yield (0, accounts_service_1.createUser)(req.body);
    return res.status(201).json({
        success: true,
        message: "Profile created successfully",
        data: {
            id: user.id,
        },
    });
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    let user = yield (0, accounts_service_1.findUserByUsername)(input.username);
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Incorrect credentials",
        });
    }
    if (!bcrypt_1.default.compareSync(input.password, user.password)) {
        return res.status(401).json({
            success: false,
            message: "Incorrect credentials",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: {
            user: {
                id: user.id,
                firstName: user.fullName,
            }
        },
    });
});
exports.login = login;
const getUser = (req, res) => {
    const { user } = res.locals;
    return res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        data: {
            user: {
                id: user.id,
                fullName: user.fullName,
                username: user.username,
            },
        },
    });
};
exports.getUser = getUser;
