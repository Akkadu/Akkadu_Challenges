"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = (0, express_validator_1.checkSchema)({
    name: {
        isEmpty: {
            errorMessage: 'Name is required',
            negated: true,
        },
        escape: true,
    },
    price: {
        isEmpty: {
            errorMessage: 'Price is required',
            negated: true,
        },
        escape: true,
    },
    vendor: {
        isEmpty: {
            errorMessage: 'Vendor is required',
            negated: true,
        },
        escape: true,
    },
});
