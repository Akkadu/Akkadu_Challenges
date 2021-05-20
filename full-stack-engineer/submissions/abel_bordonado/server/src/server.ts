import errorHandler from "errorhandler";
import { Server } from "http";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development") app.use(errorHandler());

/**
 * Start Express server.
 */
const server = new Server(app);

// upload should run in fork mode.
if (process.env.NODE_APP_INSTANCE === "0") {
  console.log("  Starting uploading handler...");
}

server.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode, instanceId: %d",
    app.get("port"),
    app.get("env"),
    process.env.NODE_APP_INSTANCE || 0
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
