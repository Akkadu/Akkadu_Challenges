"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
let i18n;
try {
    i18n = require("i18n");
}
catch (e) {
    throw new Error("i18n package not found, please use `yarn add i18n` to install it first.");
}
exports.handleAppLocalization = (app) => {
    const folder = __dirname + "/../../../locales";
    fs_extra_1.ensureDirSync(folder);
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
        res._json = res.json;
        const translateBody = (body) => {
            if (body && typeof body.err === "string")
                body.err = i18n.__(body.err);
            return body;
        };
        res.json = function (body) {
            body = translateBody(body);
            return this._json(body);
        };
        next();
    });
};
//# sourceMappingURL=appLocalizer.js.map