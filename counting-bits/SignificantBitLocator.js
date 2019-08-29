"use strict";
exports.__esModule = true;
var errors_1 = require("./errors");
var helpers_1 = require("./helpers");
var SignificantBitLocator = /** @class */ (function () {
    function SignificantBitLocator() {
    }
    SignificantBitLocator.prototype.Locate = function (num, faster) {
        if (faster === void 0) { faster = false; }
        validators.input(num);
        var result = locator(num, faster);
        validators.output(num, result);
        return result;
    };
    return SignificantBitLocator;
}());
exports.SignificantBitLocator = SignificantBitLocator;
var locator = function (num, faster) {
    var position = [];
    helpers_1.integerToBinaryRTLPositiveAccumulator(num, function (n) {
        position.push(n);
    }, faster);
    return position.slice();
};
var validators = {
    input: function (num) {
        // Must be positive and integer
        if (!Number.isSafeInteger(num) || num < 0) {
            throw new errors_1.RangeError(num, [0, Number.MAX_SAFE_INTEGER]);
        }
    },
    output: function (num, result) {
        // Must be array
        if (!Array.isArray(result)) {
            throw new errors_1.OutputError("Invalid output type (" + typeof result + ") must be array - Supplied (" + num + ")", result);
        }
        // Returned array length must be less than 53 bits
        if (result.length > Number.MAX_SAFE_INTEGER.toString(2).length) {
            throw new errors_1.OutputError("Invalid array length (" + result.length + ") - Supplied (" + num + ")", result);
        }
        // All positive bit positions must be less than 53 and more or equal to 0
        if (result.some(function (n) { return !Number.isSafeInteger(n) || n < 0 || n > 53; })) {
            throw new errors_1.OutputError("Invalid array content detected - Supplied (" + num + ")", result);
        }
    }
};
exports.validators = validators;
