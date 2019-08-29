
const { RangeError, OutputError } = require('../errors');
let { PositiveBitCounter, validators } = require('../PositiveBitCounter');
const assert = require('assert');

PositiveBitCounter = new PositiveBitCounter();

describe('PositiveBitCounter', function () {

    it('Should return 8 when 161 is supplied', function () {
        assert.equal(
            3,
            PositiveBitCounter.Count(161)
        )
    });

    it('Should return a RangeError a out of range number is supplied', function () {
        assert.throws(
            () => PositiveBitCounter.Count(-1),
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

        it('Output validation must fail when a negative number is returned', function () {
            assert.throws(
                () => validators.output(-1),
                function isOutputError(error) {
                    return (error instanceof OutputError)
                })
        });
        
    });

});