import path from "path";
import fs from "fs";

export const readRoutes = (target: string) => {
  const files: any[] = [];
  const dirs: any[] = [];
  // look for files recursively
  fs.readdirSync(target).forEach((file: any) => {
    const filePath = path.join(target, file);

    if (isFile(filePath)) {
      files.push(filePath);
    } else {
      dirs.push(filePath);
    }
  }, this);

  files.sort(function(a, b) {
    if (a.indexOf("index.js") != -1) {
      return -1;
    }
    if (b.indexOf("index.js") != -1) {
      return 1;
    }
    return 0;
  });

  dirs.forEach(function(dir) {
    files.push.apply(files, this.readdir(dir));
  }, this);
  const fileList = files.map((file) => {
    if (/.js.map$/.test(file)) return undefined;
    let filePath = file.split(".js")[0].split("dist/controllers/");
    if (filePath.length == 1) filePath = file.split(".js")[0].split("dist\\controllers\\");
    return filePath[1] || "";
  });
  return fileList.filter(r => r);
};

export const pathToRoute = (target: string, base: string) => {
  // remove file extension and normalize slashes
  target = path.normalize(target);
  target = target.replace(path.extname(target), "");

  if (base && typeof base === "string") {
    const segments = [];
    let segment;

    const splitTarget: string[] = target.split(path.sep);
    const splitBase = path.normalize(base).split(path.sep);
    base = splitBase[splitBase.length - 1];

    for (let i = splitTarget.length - 1; i >= 0; i--) {
      segment = splitTarget[i];
      if (segment === base) break;
      if (i === splitTarget.length - 1 && segment === "index") continue;
      if (segment !== "") segments.push(segment);
    }

    return "/" + segments.reverse().join("/");
  }

  // without a base, use the last segment
  target = path.basename(target);
  return "/" + (target !== "index" ? target : "");
};

function isFile(target: string) {
  return fs.lstatSync(target).isFile();
}
