"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const express_validator_1 = require("express-validator");
class MongoStats {
    constructor(model) {
        this.rangeQuery = {}; // Mongo query holding the rate and format
        this.defaultFrom = moment().subtract(1, "month").toDate();
        this.model = model;
    }
    static addValidationRules() {
        return [
            express_validator_1.query("range", "Please enter a valid range.")
                .optional()
                .isIn(["dayOfYear", "week", "month", "year", "hour", "total"]),
            express_validator_1.query("noRange", "noRange is a boolean value").isBoolean().optional(),
            express_validator_1.query("from", "From must be a valid date").toDate().optional(),
            express_validator_1.query("to", "To must be a valid date").toDate().optional(),
        ];
    }
    static for(model) {
        return new MongoStats(model);
    }
    range(range, dateField = "date") {
        this.format = range.format || "hour";
        this.dateField = dateField;
        this.rangeQuery = {
            [this.dateField]: {
                $gte: range.from ? moment(range.from).toDate() : this.defaultFrom,
                $lt: range.to ? moment(range.to).endOf("day").toDate() : moment().toDate(),
            },
        };
        if (range.noRange) {
            delete this.rangeQuery[this.dateField];
        }
        return this;
    }
    match(query) {
        if (!this.rangeQuery) {
            this.throwOrderError();
        }
        query = Object.assign({}, this.rangeQuery, query);
        this.aggregate = this.model.aggregate().match(query);
        return this;
    }
    project(fields) {
        if (!this.aggregate) {
            this.throwOrderError();
        }
        if (this.format === "total") {
            this.aggregate = this.aggregate.project(Object.assign({}, fields, { day: "$day" }));
            return this;
        }
        this.aggregate = this.aggregate.project(Object.assign({}, fields, { range: { [`$${this.format}`]: `$${this.dateField}` }, day: { $dayOfYear: `$${this.dateField}` }, year: { $year: `$${this.dateField}` } }));
        return this;
    }
    group(group) {
        if (!this.aggregate) {
            this.throwOrderError();
        }
        group._id = this.format !== "total" ? { year: "$year", range: "$range" } : "undefined";
        group.day = { $last: "$day" };
        this.aggregate = this.aggregate
            .group(group)
            .sort(group._id ? { "_id.year": 1, "_id.day": 1, "_id.range": 1 } : {});
        return this;
    }
    parse(parser) {
        if (!this.aggregate) {
            this.throwOrderError();
        }
        this.parseResult = parser;
        return this;
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.parseResult) {
                this.throwOrderError();
            }
            const result = (yield this.aggregate.exec());
            return result.map((result) => (Object.assign({ date: this.parseDate(result) }, this.parseResult(result))));
            return result;
        });
    }
    parseDate(result) {
        console.log(result);
        if (this.format === "total") {
            return undefined;
        }
        if (this.format === "hour") {
            return moment()
                .set("year", result._id.year)
                .set("dayOfYear", +result.day)
                .set("hour", +result._id.range)
                .format("YYYY-MM-DD HH:00");
        }
        if (this.format === "month") {
            return moment()
                .set("year", result._id.year)
                .set(this.format, result._id.range - 1)
                .startOf("month")
                .format("YYYY-MM-DD");
        }
        if (this.format === "year") {
            return moment().set("year", result._id.year).startOf("year").format("YYYY");
        }
        if (this.format === "week") {
            return moment()
                .set("year", result._id.year)
                .set("week", result._id.range + 1)
                .startOf("isoWeek")
                .format("YYYY-MM-DD");
        }
        // DayOfYear
        return moment()
            .set("year", result._id.year)
            .set(this.format, result._id.range)
            .format("YYYY-MM-DD");
    }
    throwOrderError() {
        throw new Error("Stats library wrong order call: range > match >  project? > group > exec");
    }
}
exports.MongoStats = MongoStats;
//# sourceMappingURL=MongoStats.js.map