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
exports.checkUsernameExists = exports.setPassword = exports.findUserByUsername = exports.findUserById = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordHash = bcrypt_1.default.hashSync(input.password, 10);
    const user = yield prisma.user.create({
        data: {
            fullName: input.fullName,
            username: input.username,
            password: passwordHash,
        },
    });
    return user;
});
exports.createUser = createUser;
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            username,
        },
    });
    return user;
});
exports.findUserByUsername = findUserByUsername;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            id: Number(id),
        },
    });
    return user;
});
exports.findUserById = findUserById;
const setPassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordHash = bcrypt_1.default.hashSync(password, 10);
    yield prisma.user.update({
        where: { id },
        data: {
            password: passwordHash,
        },
    });
});
exports.setPassword = setPassword;
const checkUsernameExists = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            username,
        },
    });
    if (user) {
        return true;
    }
    return false;
});
exports.checkUsernameExists = checkUsernameExists;
