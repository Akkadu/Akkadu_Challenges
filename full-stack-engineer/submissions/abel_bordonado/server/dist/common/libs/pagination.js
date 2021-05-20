"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const moment_1 = __importDefault(require("moment"));
const express_validator_1 = require("express-validator");
const DAY_FORMAT = "YYYY-MM-DD";
exports.DATE_REGEXP = /[0-9]{4}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}/;
exports.VALID_FOR_EXP = /(-)?[0-9]*[yMdhms]/;
const DATE_OR_VALID_FOR_EXP = /([0-9]{4}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}|(-)?[0-9]*[yMdhms])/;
exports.PaginationValidationRules = [
    express_validator_1.query("content", "Please enter a valid content.").optional().isString(),
    express_validator_1.query("orderBy", "Please enter a valid orderBy field.").isString().optional(),
    express_validator_1.query("orderDirection", "Please enter a valid order direction.")
        .isIn(["ascend" /* Ascent */, "descend" /* Descent */])
        .optional(),
    express_validator_1.query("limit", "Please enter limit as a number.").isInt({ min: 0, max: 1000 }).optional(),
    express_validator_1.query("offset", "Please enter offset as a number").isInt({ min: 0 }).optional(),
    express_validator_1.query("from", `Please enter from as a correct day ${DAY_FORMAT}`)
        .optional()
        .matches(DATE_OR_VALID_FOR_EXP),
    express_validator_1.query("to", `Please enter from as a correct day ${DAY_FORMAT}`)
        .optional()
        .matches(DATE_OR_VALID_FOR_EXP),
    express_validator_1.query("or").isArray().optional(),
    express_validator_1.query("or[*]").if(express_validator_1.query("or").exists()).isString(),
];
function parsePagination(req) {
    const pagination = {
        skip: +req.query.offset || 0,
        limit: Math.min(req.query.limit !== undefined ? +req.query.limit : 1000, 1000),
        orderBy: req.query.orderBy || "createdAt",
        orderDirection: req.query.orderDirection && req.query.orderDirection === "ascend" /* Ascent */ ? 1 : -1,
        content: req.query.content || undefined,
    };
    return pagination;
}
exports.parsePagination = parsePagination;
exports.parseFilter = (filter, opts = {}) => {
    if (filter === undefined) {
        return undefined;
    }
    let filterArray = filter;
    // If is a string with commas will try to parse, otherwise must be single valuee
    if (!util_1.isArray(filter)) {
        if (typeof filter === "string" && filter.includes(",")) {
            filterArray = filter.split(",");
        }
        else {
            filterArray = [filter];
        }
    }
    const result = {
        [opts.operation || "$in"]: filterArray.map((item) => {
            if (opts.forceString) {
                return item.toString();
            }
            try {
                return JSON.parse(item); // Will cast boolean, number, etc
            }
            catch (e) {
                return item; // for strings
            }
        }),
    };
    return result;
};
exports.parseDynamic = (obj, fieldName) => {
    const query = Object.keys(obj)
        .filter((key) => key.includes(`${fieldName}.`) || key.includes(`${fieldName}_`))
        .reduce((query, key) => (Object.assign({}, query, dynamicCondition(key.replace(`${fieldName}_`, `${fieldName}.`), obj[key]))), {});
    console.log({ query });
    return query;
};
const dynamicCondition = (key, value) => {
    console.log(key, " -->", value);
    key = key.replace("_", ".");
    if (key.includes(".$gte") || key.includes("gte_")) {
        return { [key.replace(/(\.\$gte|gte_)/, "")]: { $gte: exports.parseValue(value) } };
    }
    if (key.includes(".$gt") || key.includes("gt_")) {
        return { [key.replace(/(\.\$gt|gt_)/, "")]: { $gt: exports.parseValue(value) } };
    }
    if (key.includes(".$lte") || key.includes("lte_")) {
        return { [key.replace(/(\.\$lte|lte_)/, "")]: { $lte: exports.parseValue(value) } };
    }
    if (key.includes(".$lt") || key.includes("lte_")) {
        return { [key.replace(/(\.\$lt|lt_)/, "")]: { $lt: exports.parseValue(value) } };
    }
    if (key.includes(".$eq") || key.includes("eq_")) {
        return { [key.replace(/(\.\$eq|eq_)/, "")]: value };
    }
    return { [key]: exports.parseFilter(value) };
};
exports.parseValue = (value) => {
    if (util_1.isArray(value)) {
        return value.map((item) => exports.parseValue(item));
    }
    if (util_1.isObject(value)) {
        return Object.keys(value).reduce((obj, key) => (Object.assign({}, obj, { [key]: exports.parseValue(value[key]) })), {});
    }
    if (value === "true")
        return true;
    if (value === "false")
        return false;
    if (!isNaN(+value))
        return +value;
    if (moment_1.default(value, moment_1.default.ISO_8601).isValid()) {
        return new Date(value);
    }
    return value;
};
exports.parseExists = (filter) => {
    if (filter === undefined) {
        return undefined;
    }
    return { $exists: filter };
};
exports.parseNumber = (filter, operation = "$in") => {
    if (!filter) {
        return undefined;
    }
    const list = util_1.isArray(filter) ? filter : [filter];
    return list.map((str) => +str);
};
exports.validForToDate = (validFor, baseDate = new Date()) => {
    const timeHint = validFor.substr(-1);
    const time = validFor.substr(0, validFor.length - 1);
    return moment_1.default(baseDate).add(+time, timeHint);
};
exports.deleteUndefined = (list) => {
    Object.keys(list)
        .filter((key) => list[key] === undefined)
        .forEach((key) => delete list[key]);
};
exports.parseTime = ({ from, to }, dateFiled = "createdAt") => {
    const query = {};
    if (!from && !to) {
        return undefined;
    }
    if (from) {
        query["$gte"] = from.match(exports.VALID_FOR_EXP)
            ? exports.validForToDate(from).toDate()
            : moment_1.default(from, DAY_FORMAT).toDate();
    }
    if (to) {
        query.$lte = from.match(exports.VALID_FOR_EXP)
            ? exports.validForToDate(to).toDate()
            : moment_1.default(to, DAY_FORMAT).endOf("day").toDate();
    }
    return query;
};
exports.parseRange = ({ from, to }) => {
    const query = {};
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
exports.paramsToUriQuery = (params) => {
    if (!params || !Object.keys(params).length) {
        return "";
    }
    return Object.keys(params)
        .filter((key) => !!params[key])
        .map((key) => `${key}=${params[key] instanceof Array ? params[key].join(",") : params[key]}`)
        .join("&");
};
exports.buildOr = (query, orList) => {
    const objQuery = query;
    if (!objQuery.$and) {
        objQuery.$and = [];
    }
    const $or = [];
    orList.forEach((cond) => {
        const params = exports.parseFilter(cond).$in;
        $or.push(params.reduce((obj, param) => {
            const paramQuery = query[param];
            query[param] = undefined;
            return Object.assign({}, obj, { param: paramQuery });
        }, {}));
    });
    objQuery.$and.push({ $or });
};
exports.toArray = (item) => {
    if (item === undefined) {
        return [];
    }
    if (util_1.isArray(item)) {
        return item;
    }
    if (typeof item === "string" && item.includes(",")) {
        return item.split(",");
    }
    return [item];
};
//# sourceMappingURL=pagination.js.map