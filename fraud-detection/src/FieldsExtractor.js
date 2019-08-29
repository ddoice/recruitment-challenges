"use strict";
exports.__esModule = true;
var errors_1 = require("../errors");
/**
 * Class which store multiple fields to create a complex object
 */
var FieldsExtractor = /** @class */ (function () {
    function FieldsExtractor(separator, fields) {
        this.fields = [];
        this.content = [];
        validators.constructor(separator, fields);
        this.separator = separator;
        this.fields = fields;
    }
    /**
     * Receives a line, splits it and saves a array to content
     */
    FieldsExtractor.prototype.Split = function (line) {
        validators.line(line, this.separator);
        var content = line.split(this.separator);
        validators.content(content, this.fields);
        this.content = content;
    };
    /**
     * Assigns content array to the fields, casts the value
     */
    FieldsExtractor.prototype.Extract = function () {
        var _this = this;
        validators.output(this.content, this.fields);
        this.fields.forEach(function (field, index) { return field.castValue(_this.content[index]); });
    };
    return FieldsExtractor;
}());
exports.FieldsExtractor = FieldsExtractor;
var validators = {
    constructor: function (separator, fields) {
        if (!separator || separator.trim().length !== 1) {
            throw new errors_1.ValidationError("Invalid separator supplied (" + separator + "), must be one character");
        }
        if (fields.length === 0) {
            throw new errors_1.ValidationError("No valid Fields array supplied");
        }
    },
    line: function (line, separator) {
        if (!line || line.trim().length === 0) {
            throw new errors_1.ValidationError("Empty line detected");
        }
        if (!line.includes(separator)) {
            throw new errors_1.ValidationError("Line without separator detected");
        }
    },
    content: function (content, fields) {
        if (fields.length !== content.length) {
            throw new errors_1.ValidationError("Wrong number of fields, expected (" + fields.length + ") received (" + content.length + ")");
        }
    },
    assign: function (content, fields) {
        if (fields.length !== content.length) {
            throw new errors_1.ValidationError("Wrong number of fields, expected (" + fields.length + ") received (" + content.length + ")");
        }
    },
    output: function (content, fields) {
        if (!content || fields.length !== content.length) {
            throw new errors_1.ValidationError("Cant Extract, you must first call Split");
        }
    }
};
exports.validators = validators;
