import { Request } from "express";
import { isArray, isObject, isNumber } from "util";
import moment from "moment";
import { query } from "express-validator";

const DAY_FORMAT = "YYYY-MM-DD";
export const DATE_REGEXP = /[0-9]{4}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}/;
export const VALID_FOR_EXP = /(-)?[0-9]*[yMdhms]/;
const DATE_OR_VALID_FOR_EXP = /([0-9]{4}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}|(-)?[0-9]*[yMdhms])/;

const enum OrderDirection {
  Ascent = "ascend",
  Descent = "descend",
}

export interface PaginationRequest {
  skip: number;
  limit: number;
  orderBy: string;
  orderDirection: number;
  content?: string;
}

export const PaginationValidationRules = [
  query("content", "Please enter a valid content.").optional().isString(),
  query("orderBy", "Please enter a valid orderBy field.").isString().optional(),
  query("orderDirection", "Please enter a valid order direction.")
    .isIn([OrderDirection.Ascent, OrderDirection.Descent])
    .optional(),
  query("limit", "Please enter limit as a number.").isInt({ min: 0, max: 1000 }).optional(),
  query("offset", "Please enter offset as a number").isInt({ min: 0 }).optional(),
  query("from", `Please enter from as a correct day ${DAY_FORMAT}`)
    .optional()
    .matches(DATE_OR_VALID_FOR_EXP),
  query("to", `Please enter from as a correct day ${DAY_FORMAT}`)
    .optional()
    .matches(DATE_OR_VALID_FOR_EXP),
  query("or").isArray().optional(),
  query("or[*]").if(query("or").exists()).isString(),
];
export function parsePagination(req: { query: any }): PaginationRequest {
  const pagination = {
    skip: +req.query.offset || 0,
    limit: Math.min(req.query.limit !== undefined ? +req.query.limit : 1000, 1000),
    orderBy: req.query.orderBy || "createdAt",
    orderDirection:
      req.query.orderDirection && req.query.orderDirection === OrderDirection.Ascent ? 1 : -1,
    content: (req.query.content as string) || undefined,
  };

  return pagination;
}

export const parseFilter = (
  filter: any[] | any,
  opts: { operation?: string; forceString?: boolean } = {}
) => {
  if (filter === undefined) {
    return undefined;
  }
  let filterArray = filter as string[];
  // If is a string with commas will try to parse, otherwise must be single valuee
  if (!isArray(filter)) {
    if (typeof filter === "string" && filter.includes(",")) {
      filterArray = filter.split(",");
    } else {
      filterArray = [filter];
    }
  }
  const result = {
    [opts.operation || "$in"]: filterArray.map((item: string) => {
      if (opts.forceString) {
        return item.toString();
      }
      try {
        return JSON.parse(item); // Will cast boolean, number, etc
      } catch (e) {
        return item; // for strings
      }
    }),
  };
  return result;
};

export const parseDynamic = (obj: { [field: string]: any | any[] }, fieldName: string) => {
  const query = Object.keys(obj)
    .filter((key) => key.includes(`${fieldName}.`) || key.includes(`${fieldName}_`))
    .reduce(
      (query, key: string) => ({
        ...query,
        ...dynamicCondition(key.replace(`${fieldName}_`, `${fieldName}.`), obj[key]),
      }),
      {} as any
    );
  console.log({ query });
  return query;
};

const dynamicCondition = (key: string, value: any) => {
  console.log(key, " -->", value);
  key = key.replace("_", ".");
  if (key.includes(".$gte") || key.includes("gte_")) {
    return { [key.replace(/(\.\$gte|gte_)/, "")]: { $gte: parseValue(value) } };
  }

  if (key.includes(".$gt") || key.includes("gt_")) {
    return { [key.replace(/(\.\$gt|gt_)/, "")]: { $gt: parseValue(value) } };
  }
  if (key.includes(".$lte") || key.includes("lte_")) {
    return { [key.replace(/(\.\$lte|lte_)/, "")]: { $lte: parseValue(value) } };
  }
  if (key.includes(".$lt") || key.includes("lte_")) {
    return { [key.replace(/(\.\$lt|lt_)/, "")]: { $lt: parseValue(value) } };
  }
  if (key.includes(".$eq") || key.includes("eq_")) {
    return { [key.replace(/(\.\$eq|eq_)/, "")]: value };
  }

  return { [key]: parseFilter(value) };
};

export const parseValue = (value: any): any => {
  if (isArray(value)) {
    return value.map((item) => parseValue(item));
  }
  if (isObject(value)) {
    return Object.keys(value).reduce((obj, key) => ({ ...obj, [key]: parseValue(value[key]) }), {});
  }
  if (value === "true") return true;
  if (value === "false") return false;
  if (!isNaN(+value)) return +value;
  if (moment(value, moment.ISO_8601).isValid()) {
    return new Date(value);
  }

  return value;
};

export const parseExists = (filter: boolean | undefined) => {
  if (filter === undefined) {
    return undefined;
  }
  return { $exists: filter };
};

export const parseNumber = (filter: string[] | string, operation = "$in") => {
  if (!filter) {
    return undefined;
  }

  const list = isArray(filter) ? filter : [filter];
  return list.map((str) => +str);
};

export const validForToDate = (validFor: string, baseDate = new Date()) => {
  const timeHint = validFor.substr(-1);
  const time = validFor.substr(0, validFor.length - 1);
  return moment(baseDate).add(+time, timeHint as any);
};

export const deleteUndefined = (list: any) => {
  Object.keys(list)
    .filter((key) => list[key] === undefined)
    .forEach((key) => delete list[key]);
};
export const parseTime = (
  { from, to }: { from?: string; to?: string },
  dateFiled = "createdAt"
) => {
  const query: any = {};
  if (!from && !to) {
    return undefined;
  }
  if (from) {
    query["$gte"] = from.match(VALID_FOR_EXP)
      ? validForToDate(from).toDate()
      : moment(from, DAY_FORMAT).toDate();
  }

  if (to) {
    query.$lte = from.match(VALID_FOR_EXP)
      ? validForToDate(to).toDate()
      : moment(to, DAY_FORMAT).endOf("day").toDate();
  }

  return query;
};

export const parseRange = ({ from, to }: { from?: string; to?: string }) => {
  const query: any = {};
  if (!from && !to) {
    return undefined;
  }
  if (from) {
    query["$gte"] = new Date(from);
  }

  if (to) {
    query.$lte = new Date(to);
  }

  return query;
};

export const paramsToUriQuery = (params: any): string => {
  if (!params || !Object.keys(params).length) {
    return "";
  }
  return Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => `${key}=${params[key] instanceof Array ? params[key].join(",") : params[key]}`)
    .join("&");
};

export const buildOr = (query: { [key: string]: any }, orList: string[]) => {
  const objQuery = query as { $and: object[] };
  if (!objQuery.$and) {
    objQuery.$and = [];
  }

  const $or = [] as object[];

  orList.forEach((cond) => {
    const params = parseFilter(cond).$in;
    $or.push(
      params.reduce((obj, param) => {
        const paramQuery = query[param];
        query[param] = undefined;
        return { ...obj, param: paramQuery };
      }, {})
    );
  });
  objQuery.$and.push({ $or });
};

export const toArray = (item: any[] | any): any[] => {
  if (item === undefined) {
    return [];
  }
  if (isArray(item)) {
    return item;
  }
  if (typeof item === "string" && item.includes(",")) {
    return item.split(",");
  }
  return [item];
};
