"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accounts_controller_1 = require("../controllers/accounts.controller");
const signup_schema_1 = __importDefault(require("../validations/signup.schema"));
const login_schema_1 = __importDefault(require("../validations/login.schema"));
const authenticate_1 = __importDefault(require("../utils/authenticate"));
const authRouter = express_1.default.Router();
authRouter.get("/", (req, res) => {
    res.send("Akkadu Products Review API");
});
authRouter
    .post("/signup", signup_schema_1.default, accounts_controller_1.signUp)
    .post("/login", login_schema_1.default, accounts_controller_1.login)
    .get("/user", authenticate_1.default, accounts_controller_1.getUser);
exports.default = authRouter;
