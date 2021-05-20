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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
exports.getUniqueName = () => {
    return ("I" + Date.now().toString(36) + Math.random().toString(36).substr(2, 9));
};
exports.resolvePictureUriByKey = (pic) => {
    const realPath = path_1.default.resolve("../uploads/" + pic.replace(/\-/g, "/"));
    console.log({ realPath });
    if (!fs_extra_1.default.existsSync(realPath)) {
        return {
            code: 404,
            content: { err: "Picture not found on server." },
        };
    }
    return { code: 200, content: { realPath } };
};
exports.removePictureUriByKey = (pic) => __awaiter(this, void 0, void 0, function* () {
    const result = exports.resolvePictureUriByKey(pic);
    if (result.code !== 200) {
        return result;
    }
    return new Promise((resolve) => fs_extra_1.default.unlink(result.content.realPath, (err) => {
        if (err) {
            resolve({ code: 500, content: { err } });
        }
        resolve({ code: 200, content: { ok: true } });
    }));
});
//# sourceMappingURL=mediaLib.js.map