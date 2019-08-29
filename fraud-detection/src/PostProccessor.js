"use strict";
exports.__esModule = true;
var errors_1 = require("../errors");
/**
 * Used to modify object properties
 */
var PostProccessor = /** @class */ (function () {
    function PostProccessor(exec) {
        validators.constructor(exec);
        this.exec = exec;
    }
    return PostProccessor;
}());
exports.PostProccessor = PostProccessor;
var validators = {
    constructor: function (exec) {
        if (typeof exec !== 'function') {
            throw new errors_1.ValidationError('Invalid function supplied');
        }
    },
    output: function (any) {
    }
};
exports.validators = validators;
