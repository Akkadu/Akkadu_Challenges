import { isString, isObject, isArray } from "lodash";
import { notification } from "antd";
import * as React from "react";
import * as HttpStatus from "http-status-codes";
import { HttpResponse } from "./utils/server";

export class AppStatic {
  public static error(message: string | React.ReactNode) {
    notification.error({ message, duration: 10 });
  }

  public static warning(message: string | React.ReactNode) {
    notification.warning({ message, duration: 10 });
  }

  public static success(message: string) {
    notification.success({ message, duration: 10 });
  }

  public static handleHttpError(
    response: HttpResponse<any>,
    customHandle?: { [type: string]: (response: HttpResponse<any>) => void }
  ) {
    if (customHandle && customHandle[response.status]) {
      return customHandle[response.status](response);
    }
    const errMsg = this.getErrMsgFromRes(response);

    //500
    if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      AppStatic.error("Internal Error ");
      return;
    }
    AppStatic.error(errMsg || "Unknown Error!");
  }

  private static getErrMsgFromRes(res: HttpResponse<any>): string | undefined {
    if (
      res.errorMessage &&
      isString(res.errorMessage) &&
      res.errorMessage !== "[object Object]"
    ) {
      return res.errorMessage;
    }
    if (!isObject(res.error)) {
      return;
    }
    const err = (res.error as any).err;
    if (!err) {
      return;
    }
    if (isString(err)) {
      return err;
    }
    if (!isArray(err) || !err.length) {
      return;
    }
    return err
      .filter((i) => i.msg && isString(i.msg))
      .map((i) => i.msg)
      .join();
  }
}
