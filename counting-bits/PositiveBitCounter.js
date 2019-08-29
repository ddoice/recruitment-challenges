"use strict";
exports.__esModule = true;
var errors_1 = require("./errors");
var helpers_1 = require("./helpers");
var PositiveBitCounter = /** @class */ (function () {
    function PositiveBitCounter() {
    }
    PositiveBitCounter.prototype.Count = function (num, faster) {
        if (faster === void 0) { faster = false; }
        validators.input(num);
        var result = counter(num, faster);
        validators.output(num, result);
        return result;
    };
    return PositiveBitCounter;
}());
exports.PositiveBitCounter = PositiveBitCounter;
var counter = function (num, faster) {
    if (faster === void 0) { faster = false; }
    var total = 0;
    helpers_1.integerToBinaryRTLPositiveAccumulator(num, function (_) {
        total += 1;
    }, faster);
    return total;
};
var validators = {
    input: function (num) {
        // Must be positive and integer
        if (!Number.isSafeInteger(num) || num < 0) {
            throw new errors_1.RangeError(num, [0, Number.MAX_SAFE_INTEGER]);
        }
    },
    output: function (num, result) {
        // Sum of bits and positive position cannot be more than 53 or less than 0 
        if (!Number.isInteger(result) || result < 0 || result > Number.MAX_SAFE_INTEGER.toString(2).length) {
            throw new errors_1.OutputError("Invalid sum of positive bits detected (" + result + ").", result);
        }
    }
};
exports.validators = validators;
