import BigNumber from "bignumber.js";

declare global {
  interface Number {
    /**
     * precision is by default 2;
     */
    roundUp: (precision?: number) => number;
    /**
     * precision is by default 2;
     */
    roundDown: (precision?: number) => number;
    round: (precision?: number) => number;
    strip: (precision?: number) => number;
    toPercentage: (precision?: number) => number;
    fromPercentage: (precision?: number) => number;
    toRMB: (precision?: number) => number;
    fromRMB: (precision?: number) => number;
    asBigNumber: () => BigNumber;
  }
}

Number.prototype.asBigNumber = function() {
  return new BigNumber(this);
};

Number.prototype.roundDown = function(precision: number = 2) {
  precision = Math.pow(10, precision);
  const num = this as number;
  return parseInt(
    "" +
      num
        .asBigNumber()
        .times(precision)
        .toNumber()
  )
    .asBigNumber()
    .div(precision)
    .toNumber();
  // return parseInt("" + this.strip() * precision) / precision;
};

Number.prototype.roundUp = function(precision: number = 2) {
  precision = Math.pow(10, precision);
  const num = this as number;
  return Math.ceil(
    num
      .asBigNumber()
      .times(precision)
      .toNumber()
  )
    .asBigNumber()
    .div(precision)
    .toNumber();
  // return Math.ceil(this.strip() * precision) / precision;
};

Number.prototype.round = function(precision: number = 2) {
  return +this.toFixed(precision);
};

Number.prototype.strip = function(precision: number = 12) {
  return +parseFloat(this).toPrecision(12);
};

// 0.5 is 50%
Number.prototype.toPercentage = function(precision: number = 2) {
  return this.asBigNumber()
    .multipliedBy(100)
    .toNumber()
    .roundUp(precision);
};

// 50% is 0.5
Number.prototype.fromPercentage = function(precision: number = 4) {
  return this.asBigNumber()
    .dividedBy(100)
    .toNumber()
    .roundUp(precision);
};

// 500 is 5 RMB
Number.prototype.toRMB = function(precision: number = 2) {
  return +this.asBigNumber()
    .dividedBy(100)
    .toNumber()
    .roundUp(precision)
    .toFixed(2);
};

// 5 RMB is 500
Number.prototype.fromRMB = function(precision: number = 2) {
  return this.asBigNumber()
    .multipliedBy(100)
    .toNumber()
    .roundUp(precision);
};
