import { get, post, postFormData, paramsToUriQuery } from "../utils/server";
import { ServerEnv } from "../config/env";

export interface File {
  lastModified: string;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  uid: string;
  content: any; //base 64
  webkitRelativePath: string;
}

export class MediaService {
  private get serviceUrl() {
    return `${ServerEnv.baseUrl}`;
  }

  public async uploadImage(file: Blob) {
    const formData = new FormData();
    formData.append("image", file);
    const response = await postFormData<{ key: string }>(
      `${this.serviceUrl}/media`,
      formData
    );
    if (!response.content) {
      return "";
    }
    return `${this.serviceUrl}/media/${response.content.key}`;
  }

  public async addEffectToImage(
    file: Blob,
    query: { effect: string; value?: number }
  ) {
    const formData = new FormData();
    formData.append("image", file);
    const response = await postFormData<{ key: string }>(
      `${this.serviceUrl}/media/effect?` + paramsToUriQuery(query),
      formData
    );

    if (!response.content) {
      return "";
    }
    return `${this.serviceUrl}/media/${response.content.key}`;
  }

  public async uploadImageFromBlob(file: Blob) {
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        resolve((reader.result as string).replace(/^data:.+;base64,/, ""))
      );
      reader.readAsDataURL(file);
    });

    const key = await this.uploadFileBase64(
      base64,
      file.type.split("/")[1] || file.type
    );
    return key;
  }

  public async uploadFileBase64(content: string, type: string) {
    const response = await post<{ key: string }>(
      `${this.serviceUrl}/media/base64/`,
      { image: content, extension: type }
    );
    if (!response.content) {
      return "";
    }
    return `${this.serviceUrl}/media/${response.content.key}`;
  }
}
