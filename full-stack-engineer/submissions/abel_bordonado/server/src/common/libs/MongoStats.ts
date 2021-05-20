import mongoose, { Aggregate } from "mongoose";
import moment = require("moment");
import { Request } from "express";
import { query } from "express-validator";

export type DateRange = {
  to?: Date;
  from?: Date;
  noRange?: boolean; //  noRange is true wont be time restrictions
  format?: "hour" | "dayOfYear" | "month" | "year" | "hour" | "total"; // The data is presented in this format
};

type MongoDateId = { _id: { year: number; range: number }; day: string };
export class MongoStats<T extends mongoose.Document> {
  private model: mongoose.Model<T>; // Model we want to make the stats from
  private rangeQuery: any = {}; // Mongo query holding the rate and format
  private format: string; // Date format
  private dateField: string; // The field of the table which is use as reference (createdAt or date for example)
  private aggregate: Aggregate<T[]>; // Keeps the aggregate information

  private parseResult: (result: T) => any; // How to parse the result of the query

  private defaultFrom = moment().subtract(1, "month").toDate();

  public static addValidationRules() {
    return [
      query("range", "Please enter a valid range.")
        .optional()
        .isIn(["dayOfYear", "week", "month", "year", "hour", "total"]),
      query("noRange", "noRange is a boolean value").isBoolean().optional(),
      query("from", "From must be a valid date").toDate().optional(),
      query("to", "To must be a valid date").toDate().optional(),
    ];
  }
  public static for<Model extends mongoose.Document>(model: mongoose.Model<Model>) {
    return new MongoStats<Model>(model);
  }

  private constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  public range(range: DateRange, dateField = "date") {
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

  public match(query: any) {
    if (!this.rangeQuery) {
      this.throwOrderError();
    }
    query = { ...this.rangeQuery, ...query };
    this.aggregate = this.model.aggregate().match(query);
    return this;
  }
  public project(fields: any) {
    if (!this.aggregate) {
      this.throwOrderError();
    }
    if (this.format === "total") {
      this.aggregate = this.aggregate.project({ ...fields, day: "$day" });
      return this;
    }
    this.aggregate = this.aggregate.project({
      ...fields,
      range: { [`$${this.format}`]: `$${this.dateField}` },
      day: { $dayOfYear: `$${this.dateField}` }, // For Hour
      year: { $year: `$${this.dateField}` },
    });

    return this;
  }

  public group(group: any) {
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

  public parse(parser: (item: T) => any) {
    if (!this.aggregate) {
      this.throwOrderError();
    }
    this.parseResult = parser;

    return this;
  }
  public async exec() {
    if (!this.parseResult) {
      this.throwOrderError();
    }
    const result = (await this.aggregate.exec()) as MongoDateId[];

    return result.map((result) => ({
      date: this.parseDate(result),
      ...this.parseResult(result as any),
    }));
    return result;
  }
  private parseDate(result: MongoDateId) {
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
      .set(this.format as any, result._id.range)
      .format("YYYY-MM-DD");
  }

  private throwOrderError() {
    throw new Error("Stats library wrong order call: range > match >  project? > group > exec");
  }
}
