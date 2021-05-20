"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
Number.prototype.asBigNumber = function () {
    return new bignumber_js_1.default(this);
};
Number.prototype.roundDown = function (precision = 2) {
    precision = Math.pow(10, precision);
    const num = this;
    return parseInt("" +
        num
            .asBigNumber()
            .times(precision)
            .toNumber())
        .asBigNumber()
        .div(precision)
        .toNumber();
    // return parseInt("" + this.strip() * precision) / precision;
};
Number.prototype.roundUp = function (precision = 2) {
    precision = Math.pow(10, precision);
    const num = this;
    return Math.ceil(num
        .asBigNumber()
        .times(precision)
        .toNumber())
        .asBigNumber()
        .div(precision)
        .toNumber();
    // return Math.ceil(this.strip() * precision) / precision;
};
Number.prototype.round = function (precision = 2) {
    return +this.toFixed(precision);
};
Number.prototype.strip = function (precision = 12) {
    return +parseFloat(this).toPrecision(12);
};
// 0.5 is 50%
Number.prototype.toPercentage = function (precision = 2) {
    return this.asBigNumber()
        .multipliedBy(100)
        .toNumber()
        .roundUp(precision);
};
// 50% is 0.5
Number.prototype.fromPercentage = function (precision = 4) {
    return this.asBigNumber()
        .dividedBy(100)
        .toNumber()
        .roundUp(precision);
};
// 500 is 5 RMB
Number.prototype.toRMB = function (precision = 2) {
    return +this.asBigNumber()
        .dividedBy(100)
        .toNumber()
        .roundUp(precision)
        .toFixed(2);
};
// 5 RMB is 500
Number.prototype.fromRMB = function (precision = 2) {
    return this.asBigNumber()
        .multipliedBy(100)
        .toNumber()
        .roundUp(precision);
};
//# sourceMappingURL=numberExtensions.js.map