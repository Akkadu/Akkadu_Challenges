import { NextFunction, Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { ensureDirSync } from "fs-extra";

let i18n: any;
try {
  i18n = require("i18n");
} catch (e) {
  throw new Error("i18n package not found, please use `yarn add i18n` to install it first.");
}

export const handleAppLocalization = (app: Express) => {
  const folder = __dirname + "/../../../locales";
  ensureDirSync(folder);
  i18n.configure({
    locales: ["zh"],
    directory: folder,
    cookie: "__lang"
  });
  i18n.setLocale("zh");
  app.use(i18n.init);

  app.use("/js/i18n.js", (req, res) => {
    const catalog = i18n.getCatalog();
    let script = "var catalog = " + JSON.stringify(catalog) + ";";
    script += "var lang = '" + i18n.getLocale() + "';";
    script +=
      'function __(name, obj, defaultValue){ if(typeof(obj) === "string"){defaultValue = obj; obj = {};} var r = new RegExp("\\{\\{(.*)\\}\\}", "g"); return (catalog[name] || defaultValue || name).replace(r, function (item) { return __(obj[arguments[1]] || ""); });}';

    res.send(script);
  });

  app.use((req, res, next) => {
    (res as any)._json = res.json;

    const translateBody = (body: any) => {
      if (body && typeof body.err === "string") body.err = i18n.__(body.err);
      return body;
    };

    res.json = function(body?: any) {
      body = translateBody(body);
      return this._json(body);
    };

    next();
  });
};
