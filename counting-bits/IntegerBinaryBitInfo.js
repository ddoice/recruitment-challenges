"use strict";
exports.__esModule = true;
var helpers_1 = require("./helpers");
var errors_1 = require("./errors");
var SignificantBitLocator_1 = require("./SignificantBitLocator");
var PositiveBitCounter_1 = require("./PositiveBitCounter");
var IntegerBinaryBitInfo = /** @class */ (function () {
    function IntegerBinaryBitInfo(numbers) {
        if (numbers && validators.numSetter(numbers)) {
            this.numbers = numbers;
        }
    }
    IntegerBinaryBitInfo.prototype.setNumbers = function (numbers) {
        validators.numSetter(numbers);
        this.numbers = numbers;
    };
    // Get the binary info as required by the specs
    IntegerBinaryBitInfo.prototype.getBinaryBitInfo = function (faster) {
        var _this = this;
        if (faster === void 0) { faster = false; }
        return this.numbers.map(function (num) { return [
            _this.Count(num, faster)
        ].concat(_this.Locate(num, faster)); });
    };
    return IntegerBinaryBitInfo;
}());
exports.IntegerBinaryBitInfo = IntegerBinaryBitInfo;
var validators = {
    numSetter: function (numbers) {
        // Must be array
        if (!Array.isArray(numbers)) {
            throw new errors_1.TypeError(numbers, 'array');
        }
        // Array must contain at least one value
        if (numbers.length === 0) {
            throw new errors_1.ValidationError("array received is empty");
        }
        // Array values must be positive safe integers
        var invalidNumbers = numbers.filter(function (num) { return !Number.isSafeInteger(num) || num < 0; });
        if (invalidNumbers.length > 0) {
            throw new errors_1.TypeError(invalidNumbers, null, "array received contains some not valid values (" + invalidNumbers.join(',') + ")");
        }
        return true;
    }
};
helpers_1.applyMixins(IntegerBinaryBitInfo, [PositiveBitCounter_1.PositiveBitCounter, SignificantBitLocator_1.SignificantBitLocator]);
