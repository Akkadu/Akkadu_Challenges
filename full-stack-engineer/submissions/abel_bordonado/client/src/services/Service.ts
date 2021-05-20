import { MediaService } from "./MediaService";

export class Service {
  private static instance: Service | null = null;

  public static get connector() {
    if (Service.instance === null) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  public static get media() {
    return Service.connector._media;
  }

  private _media: MediaService = new MediaService();

  private constructor() {}
}
