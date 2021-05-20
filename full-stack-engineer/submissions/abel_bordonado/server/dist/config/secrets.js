"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const envFile = `.env`;
if (fs_1.default.existsSync(envFile)) {
    console.log(`  Using ${envFile} file to supply config environment variables`);
    dotenv_1.default.config({ path: envFile });
}
else {
    throw new Error(`  Env file ${envFile} not found.`);
}
exports.ENVIRONMENT = process.env.NODE_ENV;
const REQUIRED_ENV = [];
const notSet = REQUIRED_ENV.filter((key) => process.env[key] === undefined);
if (notSet.length > 0) {
    console.error("Missing some required env variables: " + notSet.join(","));
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map