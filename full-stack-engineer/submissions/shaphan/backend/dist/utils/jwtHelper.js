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
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const signToken = (user, expiresIn) => jsonwebtoken_1.default.sign({
    id: user === null || user === void 0 ? void 0 : user.id,
    username: (user === null || user === void 0 ? void 0 : user.username) || "",
}, config_1.default.JWT_SECRET, { expiresIn: expiresIn || "24h" });
exports.signToken = signToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    try {
        data = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    }
    catch (e) {
        return {
            error: "Invalid Token",
        };
    }
    return {
        id: data.id,
        email: data.email,
    };
});
exports.verifyToken = verifyToken;
