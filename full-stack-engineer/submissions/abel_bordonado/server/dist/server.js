"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development")
    app_1.default.use(errorhandler_1.default());
/**
 * Start Express server.
 */
const server = new http_1.Server(app_1.default);
// upload should run in fork mode.
if (process.env.NODE_APP_INSTANCE === "0") {
    console.log("  Starting uploading handler...");
}
server.listen(app_1.default.get("port"), () => {
    console.log("  App is running at http://localhost:%d in %s mode, instanceId: %d", app_1.default.get("port"), app_1.default.get("env"), process.env.NODE_APP_INSTANCE || 0);
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
//# sourceMappingURL=server.js.map