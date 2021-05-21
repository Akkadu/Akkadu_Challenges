"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFormatter = (error) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${error.location}[${error.param}]: ${error.msg}`;
};
//# sourceMappingURL=validation.js.map