"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var errors_1 = require("../errors");
/**
 * Creates fields of a object
 */
var Field = /** @class */ (function () {
    function Field(name, postProcessor) {
        this.name = name;
        validators.constructor(name, postProcessor);
        this.name = name;
        this.postProcessor = postProcessor;
    }
    Field.prototype.validateInput = function (val) { };
    Field.prototype.getRawValue = function (val) { };
    Field.prototype.validateOutput = function (val) { };
    Field.prototype.castValue = function (val) {
        this.validateInput(val);
        var raw = this.getRawValue(val);
        if (this.postProcessor) {
            raw = this.postProcessor(raw);
        }
        this.validateOutput(raw);
        this.value = raw;
        return raw;
    };
    return Field;
}());
exports.Field = Field;
var FieldString = /** @class */ (function (_super) {
    __extends(FieldString, _super);
    function FieldString(name, postProcessor) {
        var _this = _super.call(this, name, postProcessor) || this;
        _this.name = name;
        return _this;
    }
    // May look useless but can perform running time type-check
    FieldString.prototype.getRawValue = function (val) {
        return String(val);
    };
    // Cannot be tested in TS, running time type-check
    FieldString.prototype.validateInput = function (val) {
        if (!val || typeof val !== 'string') {
            throw new errors_1.ValidationError('Invalid validateInput');
        }
    };
    // Cannot be tested in TS, running time type-check
    FieldString.prototype.validateOutput = function (val) {
        if (!val || typeof val !== 'string') {
            throw new errors_1.OutputError('Invalid validateOutput');
        }
    };
    return FieldString;
}(Field));
exports.FieldString = FieldString;
var FieldInteger = /** @class */ (function (_super) {
    __extends(FieldInteger, _super);
    function FieldInteger(name, postProcessor) {
        var _this = _super.call(this, name, postProcessor) || this;
        _this.name = name;
        return _this;
    }
    FieldInteger.prototype.getRawValue = function (val) {
        return parseInt(String(val));
    };
    FieldInteger.prototype.validateInput = function (val) {
        if (!val || !Number.isSafeInteger(parseInt(val))) {
            throw new errors_1.ValidationError("Invalid number supplied");
        }
    };
    FieldInteger.prototype.validateOutput = function (val) {
        if (!Number.isSafeInteger(val)) {
            throw new errors_1.OutputError('Invalid number supplied, cannot be casted to integer');
        }
    };
    return FieldInteger;
}(Field));
exports.FieldInteger = FieldInteger;
var FieldFactory = /** @class */ (function () {
    function FieldFactory() {
    }
    FieldFactory.prototype.create = function (type, name, postProcessor) {
        return new type(name, postProcessor);
    };
    return FieldFactory;
}());
exports.FieldFactory = FieldFactory;
var validators = {
    constructor: function (name, postProcessor) {
        // Old school type validation, may look useless in TS but is useful to perform type checking in running time
        if (typeof name !== 'string') {
            throw new errors_1.ValidationError("Invalid name");
        }
        if (name.trim().length === 0) {
            throw new errors_1.ValidationError("Empty name");
        }
        if ((name.match(/[0-9A-aZ-z ]/g) || []).join('').length !== name.length) {
            throw new errors_1.ValidationError("Invalid name supplied (" + name + "), name must be a mix of characters numbers and spaces");
        }
        if (postProcessor && typeof postProcessor !== 'function') {
            throw new errors_1.ValidationError("Invalid postProcessor function supplied");
        }
    }
};
