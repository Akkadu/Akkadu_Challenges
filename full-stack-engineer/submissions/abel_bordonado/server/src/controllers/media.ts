import { Router, Request, Response, NextFunction } from "express";
import fs from "fs-extra";
import path from "path";
import multer from "multer";
import { body, validationResult, query, param } from "express-validator";
import { errorFormatter } from "../libs/validation";
import mv from "mv";
import { getUniqueName, resolvePictureUriByKey } from "../libs/mediaLib";
import { resolve } from "bluebird";
import { Stream } from "stream";
const Filter = require("node-image-filter");

const router = Router();
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
router.get(
  "/:key",
  [param("key").isString()],
  async (req: Request, res: Response) => {
    console.log("Called media, ", req.params.key);
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        err: errors.array().join(" | "),
      });
    }

    const result = resolvePictureUriByKey(req.params.key);
    if (result.code !== 200) {
      return res.status(result.code).json(result.content);
    }
    return res.sendFile(result.content.realPath);
  }
);

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
 *         multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: binary
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
router.post(
  "/",
  function (req, res, next) {
    console.log("Multer IN", req.body);

    const multerUpload = multer({ dest: "../temp/" }).single("image"); // Param is image but can use for all types

    multerUpload(req, res, function (err) {
      console.log("Multer", err);
      if (err) {
        return res.status(422).json({ err });
      }
      next();
    });
  },

  async (req: Request, res: Response) => {
    console.log(" HEEY ", req.body, req.headers, req.file, req.files);
    try {
      if (!req.file) {
        return res.status(422).json({ err: "media file cant be empty" });
      }
      const date = new Date();
      const folder = `../uploads/${date.getFullYear()}${date.getMonth() + 1}`;
      fs.ensureDir(folder);

      const extName = path.extname(req.file.originalname);
      const newPath = folder + "/" + getUniqueName() + extName;

      console.log(
        folder,
        newPath,
        extName,
        newPath.replace("../uploads/", "").replace(/\//gi, "-")
      );

      mv(req.file.path, newPath, (err) => console.error(err));
      // fs.renameSync(req.file.path, newPath);

      return res.json({
        key: newPath.replace("../uploads/", "").replace(/\//gi, "-"),
      });
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  }
);
/**
 * @swagger
 * /media/effect:
 *  post:
 *    summary: Apply a Effect over a image
 *    description: Apply a Effect over a image
 *    tags:
 *      - media
 *    parameters:
 *      - in: path
 *        name: effect
 *        required: true
 *        schema:
 *          type: string
 *          description: Must be a valid effect
 *      - in: path
 *        name: value
 *        schema:
 *          type: number
 *          description: Some effects accept a value as a strength
 *    requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: binary
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
router.post(
  "/effect",
  [
    multer({ dest: "../temp/" }).single("image"),
    query("effect").isIn(Object.keys(Filter.preset)),
    query("value").isInt().optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req).formatWith(errorFormatter);
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
      fs.ensureDir(folder);

      const extName = path.extname(req.file.originalname);
      const newPath = folder + "/" + getUniqueName() + extName;

      await new Promise((resolve, reject) =>
        mv(req.file.path, newPath, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        })
      );

      await new Promise((resolve) =>
        Filter.render(
          newPath,
          filter,
          { value: req.query.value || undefined },
          function (result: {
            data: Stream;
            type: string;
            width: number;
            height: number;
          }) {
            result.data.pipe(fs.createWriteStream(newPath)); // save local
            resolve();
          }
        )
      );

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
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  }
);

router.post("/ping", async (req: Request, res: Response) => {
  return res.json({ pong: "pong" });
});

export default router;
