
const { RangeError, OutputError } = require('../errors');
let { SignificantBitLocator, validators } = require('../SignificantBitLocator');
const assert = require('assert');
SignificantBitLocator = new SignificantBitLocator();

console.log('SignificantBitLocator', SignificantBitLocator)

describe('SignificantBitLocator', function () {

    it('Should return [0, 5, 7] when 161 is supplied', function () {
        const result = SignificantBitLocator.Locate(161);
        assert.deepEqual(
            [0, 5, 7],
            result
        )
    });

    it('Should return a RangeError a out of range number is supplied', function () {
        assert.throws(
            () => SignificantBitLocator.Locate(-1),
            function isRangeError(error) {
                return (error instanceof RangeError)
            })
    });

    describe('validators', function () {

        it('Input validation must fail when a negative number is supplied', function () {
            assert.throws(
                () => validators.input(-1),
                function isRangeError(error) {
                    return (error instanceof RangeError)
                })
        });

        it('Input validation must pass when a positive safe integer is supplied', function () {
            assert.doesNotThrow(
                () => validators.input(1),
                function isError(error) {
                    return (error === undefined)
                })
        });

        it('Output validation must fail when a negative number is returned', function () {
            assert.throws(
                () => validators.output(-1, [-1]),
                function isOutputError(error) {
                    return (error instanceof OutputError)
                })
        });

        it('Output validation must fail when a string is returned', function () {
            assert.throws(
                () => validators.output(-1, 'a'),
                function isOutputError(error) {
                    return (error instanceof OutputError)
                })
        });

        it('Output validation must fail when a empty array is returned', function () {
            assert.throws(
                () => validators.output(-1, []),
                function isOutputError(error) {
                    return (error instanceof OutputError)
                })
        });
        
        it('Output validation must pass when an array of positive safe integer is returned', function () {
            assert.doesNotThrow(
                () => validators.output(0, [0, 1]),
                function isError(error) {
                    return (error === undefined)
                })
        });
    });

});