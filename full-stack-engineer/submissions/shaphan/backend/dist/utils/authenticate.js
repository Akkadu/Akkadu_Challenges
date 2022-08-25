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
const accounts_service_1 = require("../services/accounts.service");
const jwtHelper_1 = require("./jwtHelper");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not authorized to access this page",
        });
    }
    const data = yield (0, jwtHelper_1.verifyToken)(token);
    if (data.error) {
        return res.status(401).json({
            success: false,
            message: "You are not authorized to access this page",
        });
    }
    const user = yield (0, accounts_service_1.findUserById)(data.id || 0);
    res.locals.user = user;
    next();
});
