"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const components = __importStar(require("../common/docs/components"));
const parameters = __importStar(require("../common/docs/parameters"));
// import * as modelComponents from "../config/docs";
const router = express_1.Router();
// -- setup up swagger-jsdoc --
const swaggerDefinition = {
    openapi: "3.0.1",
    components: {},
    parameters: {},
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API Docs for Akkado Server",
    },
};
const options = {
    swaggerDefinition,
    apis: [path_1.default.resolve(__dirname, "*.js")],
};
swaggerDefinition.components = Object.assign({}, swaggerDefinition.components, components);
// console.log("TAG:", options);
swaggerDefinition.parameters = parameters;
const swaggerSpec = swagger_jsdoc_1.default(options);
router.get("/swagger.json", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
}));
router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const template = `<!DOCTYPE html>
  <html>
    <head>
      <title>API Docs</title>
      <!-- needed for adaptive design -->
      <meta charset="utf-8"/>
      <link rel="shortcut icon" type="image/x-icon" href="https://quizizz.com/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

      <!--
      ReDoc doesn't change outer page styles
      -->
      <style>
        body {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <!-- we provide is specification here -->
      <redoc spec-url='docs/swagger.json' expand-responses="all"></redoc>
      <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>
    </body>
  </html>`;
    res.send(template);
}));
exports.default = router;
//# sourceMappingURL=docs.js.map