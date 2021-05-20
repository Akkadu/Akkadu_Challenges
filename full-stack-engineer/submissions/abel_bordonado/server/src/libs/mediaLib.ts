import fs from "fs-extra";
import path from "path";

export const getUniqueName = () => {
  return (
    "I" + Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  );
};

export const resolvePictureUriByKey = (pic: string) => {
  const realPath = path.resolve("../uploads/" + pic.replace(/\-/g, "/"));
  console.log({ realPath });
  if (!fs.existsSync(realPath)) {
    return {
      code: 404,
      content: { err: "Picture not found on server." },
    };
  }

  return { code: 200, content: { realPath } };
};

export const removePictureUriByKey = async (
  pic: string
): Promise<{ code: number; content: any }> => {
  const result = resolvePictureUriByKey(pic);
  if (result.code !== 200) {
    return result;
  }
  return new Promise((resolve) =>
    fs.unlink(result.content.realPath, (err) => {
      if (err) {
        resolve({ code: 500, content: { err } });
      }
      resolve({ code: 200, content: { ok: true } });
    })
  );
};
