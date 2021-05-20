"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.readRoutes = (target) => {
    const files = [];
    const dirs = [];
    // look for files recursively
    fs_1.default.readdirSync(target).forEach((file) => {
        const filePath = path_1.default.join(target, file);
        if (isFile(filePath)) {
            files.push(filePath);
        }
        else {
            dirs.push(filePath);
        }
    }, this);
    files.sort(function (a, b) {
        if (a.indexOf("index.js") != -1) {
            return -1;
        }
        if (b.indexOf("index.js") != -1) {
            return 1;
        }
        return 0;
    });
    dirs.forEach(function (dir) {
        files.push.apply(files, this.readdir(dir));
    }, this);
    const fileList = files.map((file) => {
        if (/.js.map$/.test(file))
            return undefined;
        let filePath = file.split(".js")[0].split("dist/controllers/");
        if (filePath.length == 1)
            filePath = file.split(".js")[0].split("dist\\controllers\\");
        return filePath[1] || "";
    });
    return fileList.filter(r => r);
};
exports.pathToRoute = (target, base) => {
    // remove file extension and normalize slashes
    target = path_1.default.normalize(target);
    target = target.replace(path_1.default.extname(target), "");
    if (base && typeof base === "string") {
        const segments = [];
        let segment;
        const splitTarget = target.split(path_1.default.sep);
        const splitBase = path_1.default.normalize(base).split(path_1.default.sep);
        base = splitBase[splitBase.length - 1];
        for (let i = splitTarget.length - 1; i >= 0; i--) {
            segment = splitTarget[i];
            if (segment === base)
                break;
            if (i === splitTarget.length - 1 && segment === "index")
                continue;
            if (segment !== "")
                segments.push(segment);
        }
        return "/" + segments.reverse().join("/");
    }
    // without a base, use the last segment
    target = path_1.default.basename(target);
    return "/" + (target !== "index" ? target : "");
};
function isFile(target) {
    return fs_1.default.lstatSync(target).isFile();
}
//# sourceMappingURL=getRoutes.js.map