"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression")); // compresses requests
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const dotenv_1 = __importDefault(require("dotenv"));
// import flash from "express-flash";
const path_1 = __importDefault(require("path"));
const cors = require("cors");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config({ path: ".env" });
// API keys and Passport configuration
const console = require("console");
const getRoutes_1 = require("./common/utils/getRoutes");
const express = require("express");
// Create Express server
const app = express();
// Express configuration
app.set("port", process.env.PORT || 5392);
app.set("trust proxy", "127.0.0.1");
app.use(compression_1.default());
app.use(body_parser_1.default.json({ limit: 1024 * 1024 * 10, type: "application/json" }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.text({ type: "*/xml" }));
// app.use(xmlparser());
app.use(express.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
// app.use(flash());
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
app.use((req, res, next) => {
    console.log({
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
    });
    if (req.method === "OPTIONS") {
        console.log("!OPTIONS");
    }
    // Logged Middleware Here
    next();
});
app.use((req, res, next) => {
    res.__json = res.json;
    res.__status = res.status;
    const useHttpCodes = req.header("x-http-error");
    res.status = function (code) {
        if (!useHttpCodes || useHttpCodes === "YES")
            return this.__status(code);
        if (useHttpCodes === "NO") {
            this.__statusCode = code;
            res.statusCode = 200;
        }
        return res;
    };
    res.json = function (body) {
        if (!useHttpCodes || useHttpCodes === "YES")
            return this.__json(body);
        if (useHttpCodes === "NO") {
            body = body || {};
            body.code = this.__statusCode;
            return this.__json(body);
        }
        return res;
    };
    next();
});
app.use(cors());
app.use(express.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
// dynamicRouter(app, "./dist/controllers");
const routes = [...new Set(getRoutes_1.readRoutes("./dist/controllers"))];
routes.forEach((file) => {
    let route;
    route = getRoutes_1.pathToRoute(file, "./dist/controllers");
    // Part of the require needs to be string so webpack can import all possible options and apply the ifdef loader
    // https://stackoverflow.com/questions/42797313/webpack-dynamic-module-loader-by-require
    app.use(route, require(`./controllers/${file}`).default);
});
exports.default = app;
//# sourceMappingURL=app.js.map