const {
  fastIntBitCounter,
  integerToBinaryRTLPositiveAccumulator,
  intBitCounter,
  getBitCounter
} = require('../helpers')
const { RangeError, ValidationError } = require('../errors')
const assert = require('assert')

describe('helpers', function () {

  describe('fastIntBitCounter', function () {

    describe('invalid values', function () {

      it('Should return a RangeError when a out of range value is supplied', function () {
        assert.throws(
          () => fastIntBitCounter(Number.MAX_SAFE_INTEGER + 1),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when a float value is supplied', function () {
        assert.throws(
          () => fastIntBitCounter(1.1),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when a string is supplied', function () {
        assert.throws(
          () => fastIntBitCounter('a'),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when undefined is supplied', function () {
        assert.throws(
          () => fastIntBitCounter(),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when NaN is supplied', function () {
        assert.throws(
          () => fastIntBitCounter(NaN),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when null is supplied', function () {
        assert.throws(
          () => fastIntBitCounter(null),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

    });

    describe('valid values', function () {

      it('Should return 1 when 0 is supplied', function () {
        assert.equal(
          1,
          fastIntBitCounter(0)
        )
      });

      it('Should return 8 when 161 is supplied', function () {
        assert.equal(
          8,
          fastIntBitCounter(161)
        )
      });

      it(`Should return ${Number.MAX_SAFE_INTEGER.toString(2).length} when ${Number.MAX_SAFE_INTEGER} is supplied`, function () {
        assert.equal(
          Number.MAX_SAFE_INTEGER.toString(2).length,
          fastIntBitCounter(Number.MAX_SAFE_INTEGER)
        )
      });

    });

  });

  describe('integerToBinaryRTLPositiveAccumulator', function () {

    it('Should return 8 when 161 is supplied', function () {
      assert.equal(
        3,
        (() => {
          let total = 0;
          integerToBinaryRTLPositiveAccumulator(161, _ => total += 1);
          return total;
        })()
      )
    });

    it('Should return a ValidationError when no accumulator is supplied', function () {
      assert.throws(
        () => integerToBinaryRTLPositiveAccumulator(0),
        function isValidationError(error) {
          return (error instanceof ValidationError)
        })
    });

  });


  describe('intBitCounter', function () {

    describe('invalid values', function () {

      it('Should return a RangeError when a out of range value is supplied', function () {
        assert.throws(
          () => intBitCounter(Number.MAX_SAFE_INTEGER + 1),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when a float value is supplied', function () {
        assert.throws(
          () => intBitCounter(1.1),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when a string is supplied', function () {
        assert.throws(
          () => intBitCounter('a'),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when undefined is supplied', function () {
        assert.throws(
          () => intBitCounter(),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when NaN is supplied', function () {
        assert.throws(
          () => intBitCounter(NaN),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

      it('Should return a RangeError when null is supplied', function () {
        assert.throws(
          () => intBitCounter(null),
          function isRangeError(error) {
            return (error instanceof RangeError)
          })
      });

    });

    describe('valid values', function () {

      it('Should return 1 when 0 is supplied', function () {
        assert.equal(
          1,
          intBitCounter(0)
        )
      });

      it('Should return 8 when 161 is supplied', function () {
        assert.equal(
          8,
          intBitCounter(161)
        )
      });

      it(`Should return ${Number.MAX_SAFE_INTEGER.toString(2).length} when ${Number.MAX_SAFE_INTEGER} is supplied`, function () {
        assert.equal(
          Number.MAX_SAFE_INTEGER.toString(2).length,
          intBitCounter(Number.MAX_SAFE_INTEGER)
        )
      });

    });

  });

  describe('getBitCounter', function () {

    it('Should return a intBitCounter when faster = false', function () {
      assert.equal(
        (() => {
          const fn = getBitCounter();
          return fn.name;
        })(),
        'intBitCounter'
      );
    });

    it('Should return a fastIntBitCounter when faster = true', function () {
      assert.equal(
        (() => {
          const fn = getBitCounter(true);
          return fn.name;
        })(),
        'fastIntBitCounter'
      );
    });

  });

});