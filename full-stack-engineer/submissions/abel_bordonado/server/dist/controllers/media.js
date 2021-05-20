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
const express_1 = require("express");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const express_validator_1 = require("express-validator");
const validation_1 = require("../common/utils/validation");
const mv_1 = __importDefault(require("mv"));
const mediaLib_1 = require("../libs/mediaLib");
const Filter = require("node-image-filter");
const router = express_1.Router();
// const filterous = require("filterous");
/**
 * @swagger
 * /media/:key:
 *  get:
 *    summary: Image
 *    description: Get Image
 *    tags:
 *      - media
 *    parameters:
 *      - in: path
 *        name: key
 *        schema:
 *          type: string
 *          description: Key identifer of the image
 *    responses:
 *      200:
 *        description: File download
 */
router.get("/:key", [express_validator_1.param("key").isString()], (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("Called media, ", req.params.key);
    const errors = express_validator_1.validationResult(req).formatWith(validation_1.errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array().join(" | "),
        });
    }
    const result = mediaLib_1.resolvePictureUriByKey(req.params.key);
    if (result.code !== 200) {
        return res.status(result.code).json(result.content);
    }
    return res.sendFile(result.content.realPath);
}));
/**
 * @swagger
 * /media:
 *  post:
 *    summary: Image
 *    description: Upload a image
 *    tags:
 *      - media
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            image:
 *              type: String
 *              description: base64 format of the file (even name is image can use for any type of file)
 *              example: DDE
 *              required: true
 *            extension:
 *              type: String
 *              description: Image extensions
 *              required: true
 *              enum: ["png","jpg","jpeg"]
 *              example: png
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                key:
 *                  type: string
 *                  description: Image key
 */
router.post("/", function (req, res, next) {
    console.log("Multer IN", req.body);
    const multerUpload = multer_1.default({ dest: "../temp/" }).single("image"); // Param is image but can use for all types
    multerUpload(req, res, function (err) {
        console.log("Multer", err);
        if (err) {
            return res.status(422).json({ err });
        }
        next();
    });
}, (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log(" HEEY ", req.body, req.headers, req.file, req.files);
    try {
        if (!req.file) {
            return res.status(422).json({ err: "media file cant be empty" });
        }
        const date = new Date();
        const folder = `../uploads/${date.getFullYear()}${date.getMonth() + 1}`;
        fs_extra_1.default.ensureDir(folder);
        const extName = path_1.default.extname(req.file.originalname);
        const newPath = folder + "/" + mediaLib_1.getUniqueName() + extName;
        console.log(folder, newPath, extName, newPath.replace("../uploads/", "").replace(/\//gi, "-"));
        mv_1.default(req.file.path, newPath, (err) => console.error(err));
        // fs.renameSync(req.file.path, newPath);
        return res.json({
            key: newPath.replace("../uploads/", "").replace(/\//gi, "-"),
        });
    }
    catch (err) {
        res.status(500).json({ err: err.toString() });
    }
}));
/**
 * @swagger
 * /media/effect:
 *  post:
 *    summary: Apply a Effect over a image
 *    description: Apply a Effect over a image
 *    tags:
 *      - media
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            image:
 *              type: String
 *              description: base64 format of the image
 *              example: DDE
 *              required: true
 *            extension:
 *              type: String
 *              description: Image extensions
 *              required: true
 *              enum: ["png","jpg","jpeg"]
 *              example: png
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                key:
 *                  type: string
 *                  description: Image key
 */
router.post("/effect", [
    multer_1.default({ dest: "../temp/" }).single("image"),
    express_validator_1.query("effect").isIn(Object.keys(Filter.preset)),
    express_validator_1.query("value").isInt().optional(),
], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req).formatWith(validation_1.errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array().join(" | "),
        });
    }
    try {
        if (!req.file) {
            return res.status(422).json({ err: "media file cant be empty" });
        }
        const filter = Filter.preset[req.query.effect];
        if (!filter) {
            return res
                .status(404)
                .json({ err: "Effect not fond " + req.query.effect });
        }
        const date = new Date();
        const folder = `../uploads/${date.getFullYear()}${date.getMonth() + 1}`;
        fs_extra_1.default.ensureDir(folder);
        const extName = path_1.default.extname(req.file.originalname);
        const newPath = folder + "/" + mediaLib_1.getUniqueName() + extName;
        yield new Promise((resolve, reject) => mv_1.default(req.file.path, newPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        }));
        yield new Promise((resolve) => Filter.render(newPath, filter, { value: req.query.value || undefined }, function (result) {
            result.data.pipe(fs_extra_1.default.createWriteStream(newPath)); // save local
            resolve();
        }));
        // Filterous
        // const buffer = fs.readFileSync(req.file.path);
        // filterous
        //   .importImage(buffer, {})
        //   .applyInstaFilter(filter, {})
        //   .save(newPath);
        /// PixelJS
        // const _canvas = new canvas.Canvas(200, 200);
        // const ctx = _canvas.getContext("2d");
        // const imgData = await new Promise((resolve, reject) => {
        //   get_image_data(req.file.path, function (error: string, info: any) {
        //     if (error) {
        //       return reject(error);
        //     }
        //     return resolve(info.data);
        //   });
        // });
        // console.log("PixelsJS", imgData, PixelsJS.filterImgData);
        // const newImgData = PixelsJS.filterImgData(imgData, "solange");
        // console.log("Here");
        // ctx.putImageData(newImgData, 0, 0);
        // console.log("Here");
        // const buffer = canvas.toBuffer("image/png");
        // fs.writeFileSync(newPath, buffer);
        return res.json({
            key: newPath.replace("../uploads/", "").replace(/\//gi, "-"),
        });
    }
    catch (err) {
        res.status(500).json({ err: err.toString() });
    }
}));
router.post("/ping", (req, res) => __awaiter(this, void 0, void 0, function* () {
    return res.json({ pong: "pong" });
}));
exports.default = router;
//# sourceMappingURL=media.js.map