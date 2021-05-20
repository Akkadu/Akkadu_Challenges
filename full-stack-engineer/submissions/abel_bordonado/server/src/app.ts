import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
// import flash from "express-flash";
import path from "path";
const cors = require("cors");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });
// API keys and Passport configuration
import console = require("console");
import { readRoutes, pathToRoute } from "./common/utils/getRoutes";
import { NextFunction, Response } from "express-serve-static-core";
import { Request } from "express-serve-static-core";
import { OutgoingHttpHeaders } from "http";
const express = require("express");

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 5392);

app.set("trust proxy", "127.0.0.1");

app.use(compression());
app.use(bodyParser.json({ limit: 1024 * 1024 * 10, type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "*/xml" }));
// app.use(xmlparser());
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

// app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use((req: Request, res: Response, next: NextFunction) => {
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
app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).__json = res.json;
  (res as any).__status = res.status;

  const useHttpCodes = req.header("x-http-error");
  res.status = function (code: number) {
    if (!useHttpCodes || useHttpCodes === "YES") return this.__status(code);
    if (useHttpCodes === "NO") {
      this.__statusCode = code;
      res.statusCode = 200;
    }

    return res;
  };

  res.json = function (body?: any) {
    if (!useHttpCodes || useHttpCodes === "YES") return this.__json(body);
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
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

// dynamicRouter(app, "./dist/controllers");
const routes = [...new Set(readRoutes("./dist/controllers"))];
routes.forEach((file) => {
  let route: string;
  route = pathToRoute(file, "./dist/controllers");
  // Part of the require needs to be string so webpack can import all possible options and apply the ifdef loader
  // https://stackoverflow.com/questions/42797313/webpack-dynamic-module-loader-by-require
  app.use(route, require(`./controllers/${file}`).default);
});

export default app;
