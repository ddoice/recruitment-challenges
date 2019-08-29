"use strict";
exports.__esModule = true;
var helpers_1 = require("../helpers");
var errors_1 = require("../errors");
// import { SignificantBitLocator } from './SignificantBitLocator';
var FileStreamer_1 = require("./FileStreamer");
var FieldsExtractor_1 = require("./FieldsExtractor");
/**
 * Main Class
 * Extends and mix multiple classes to :
 *  · Open a file
 *  · Read it line by line
 *  · Send envery line content to a hanlder to extract the fields
 *  · Normalize field values
 *  · Stores every line in memory
 *  · Search to other lines within the specified criteria
 */
var FileFraudChecker = /** @class */ (function () {
    function FileFraudChecker() {
        this.postProcessors = [];
    }
    FileFraudChecker.prototype.setSchema = function (schema) {
        validators.schema(schema);
        this.schema = schema;
    };
    FileFraudChecker.prototype.setPostProccessors = function (postProcessors) {
        //validators.postProcessors(postProcessors);
        this.postProcessors = postProcessors;
        console.log('MAIN this.postProcessors:', this.postProcessors);
    };
    FileFraudChecker.prototype.executePostProcessors = function () {
        var _this = this;
        this.postProcessors.forEach(function (postProcessor) { return postProcessor.exec(_this.schema); });
    };
    return FileFraudChecker;
}());
exports.FileFraudChecker = FileFraudChecker;
var validators = {
    schema: function (schema) {
        if (!schema) {
            throw new errors_1.ValidationError('No valid FieldsExtractor schema provided');
        }
    }
};
helpers_1.applyMixins(FileFraudChecker, [FileStreamer_1.FileStreamer, FieldsExtractor_1.FieldsExtractor]);
