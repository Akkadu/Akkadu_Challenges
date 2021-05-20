import * as HttpStatus from "http-status-codes";
// import { isDEV } from "./../config/env";
//import { ServerEnv, EnvName } from '../config/env';
import * as _ from "lodash";
import { isArray } from "util";
export const TOKEN_HEADER: string = "BEARER ";
//const ENV_DEV = ServerEnv.envName === EnvName.Development;
export type HttpResponse<T> = {
  content?: T;
  status: number;
  error?: any;
  errorMessage?: string;
};
/**
 *  ----------------------- API CALLS ---------------------
 */
export const post = async <T>(
  url: string,
  params?: any,
  headers: object = {}
) => {
  // isDEV && console.info("POST ", url, params);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaders(headers),
      body: JSON.stringify(params),
    });
    const content = await parseResponse<T>(response);
    // isDEV && console.info("POST Response:", response, content);
    return content;
  } catch (err) {
    console.log("Error on fetch", err);
    return { status: 500, error: err, errorMessage: "" }; // 499
  }
};

export const postFormData = async <T>(
  url: string,
  formData: FormData,
  headers: object = {}
) => {
  // isDEV && console.info("POST ", url, params);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getFormDataHeaders(headers),
      body: formData,
    });
    const content = await parseResponse<T>(response);
    // isDEV && console.info("POST Response:", response, content);
    return content;
  } catch (err) {
    console.log("Error on fetch", err);
    return { status: 500, error: err, errorMessage: "" }; // 499
  }
};
export const deleteUndefined = (list: any) => {
  return Object.keys(list)
    .filter((key) => list[key] === undefined)
    .forEach((key) => delete list[key]);
};

export const valueToArray = <T = string>(value: T | T[] | undefined) => {
  if (!value) {
    return [];
  }
  if (!isArray(value)) {
    return [value];
  }
  return value;
};

const getHeaders = (customHeaders: object) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };
  // if (getToken()) {
  //   headers.Authorization = TOKEN_HEADER + getToken() || "";
  // } else {
  //   delete headers.Authorization;
  // }
  return { ...headers, ...customHeaders } as any;
};

const getFormDataHeaders = (customHeaders: object) => {
  const headers = {
    Accept: "application/json",
    Authorization: "",
  };
  // if (getToken()) {
  //   headers.Authorization = TOKEN_HEADER + getToken() || "";
  // } else {
  //   delete headers.Authorization;
  // }
  return { ...headers, ...customHeaders } as any;
};
export const paramsToUriQuery = (params: any): string => {
  if (!params || !Object.keys(params).length) {
    return "";
  }

  return _(Object.keys(params))
    .filter((key) => !!params[key])
    .map((key) =>
      params[key] instanceof Array
        ? params[key].map((item: string) => `${key}=${item}`)
        : `${key}=${params[key]}`
    )
    .flatten()
    .join("&");
};

export const get = async <T>(
  url: string,
  params?: any,
  headers: object = {}
): Promise<HttpResponse<T>> => {
  // isDEV && console.info("GET ", url + paramsToUriQuery(params));
  const question = url.includes("?") ? "&" : "?";
  try {
    const response = await fetch(url + question + paramsToUriQuery(params), {
      method: "GET",
      headers: getHeaders(headers),
    });
    const content = await parseResponse<T>(response);
    // isDEV && console.info("GET Response:", response, content);

    return content;
  } catch (err) {
    console.log("Error on fetch", err);
    return {
      status: 500,
      error: err,
      errorMessage: "",
    };
  }
};

const parseResponse = <T>(response: Response): Promise<HttpResponse<T>> => {
  return new Promise<HttpResponse<T>>(async (resolve, reject) => {
    const status = response.status;
    let content;
    try {
      content = (await response.json()) as any; // Parsing form data
    } catch (e) {
      resolve({
        status,
        error: response.statusText || status,
        errorMessage: response.statusText
          ? response.statusText
          : status.toString(),
      });
      return;
    }

    // Response not ok but no server error
    if (!content) {
      resolve({
        status,
        error: "Internal Server Error",
        errorMessage: "内部服务器错误",
      });
    }

    if (response.status !== HttpStatus.OK) {
      resolve({ status, error: content, errorMessage: content.toString() });
    }
    resolve({ status, content });
  });
};
