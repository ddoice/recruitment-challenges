
const { RangeError, OutputError, TypeError, ValidationError } = require('../errors');
let { IntegerBinaryBitInfo, validators } = require('../IntegerBinaryBitInfo');
const assert = require('assert');
//IntegerBinaryBitInfo = new IntegerBinaryBitInfo();

// #TODO test IntegerBinaryBitInfo
describe('IntegerBinaryBitInfo', function () {

  describe('validators', function () {

    it('Constructor validation must fail when a empty array is supplied to the constructor', function () {
      assert.throws(
        () => {
          const integerBinaryBitInfo = new IntegerBinaryBitInfo([]);
        },
        function isTypeError(error) {
          return (error instanceof ValidationError)
        })
    });


    it('Setter validation must fail when no array is supplied', function () {
      assert.throws(
        () => {
          const integerBinaryBitInfo = new IntegerBinaryBitInfo();
          integerBinaryBitInfo.setNumbers();
        },
        function isTypeError(error) {
          return (error instanceof TypeError)
        })
    });

    it('Setter validation must fail when the array contains some invalid values', function () {
      assert.throws(
        () => {
          const integerBinaryBitInfo = new IntegerBinaryBitInfo([1, 2, -1]);
          integerBinaryBitInfo.setNumbers();
        },
        function isTypeError(error) {
          return (error instanceof TypeError)
        })
    });

  });

  it('Constructor should set prop numbers when supplied to the constructor', async () => {
    (() => {
      const integerBinaryBitInfo = new IntegerBinaryBitInfo([1, 2, 3]);
      const { numbers } = integerBinaryBitInfo;
      assert.deepEqual([1, 2, 3], numbers);
    })();
  });

  it('Setter should set prop numbers when a valid array is supplied', async () => {
    (() => {
      const integerBinaryBitInfo = new IntegerBinaryBitInfo();
      integerBinaryBitInfo.setNumbers([1, 2, 3]);
      const { numbers } = integerBinaryBitInfo;
      assert.deepEqual([1, 2, 3], numbers);
    })();
  });

  it('getBinaryBitInfo should return [[1, 0], [1, 1], [2, 0, 1]] when [1, 2, 3] is supplied', async () => {
    await (async () => {
      const integerBinaryBitInfo = new IntegerBinaryBitInfo([1, 2, 3]);
      const result = integerBinaryBitInfo.getBinaryBitInfo();
      assert.deepEqual([[1, 0], [1, 1], [2, 0, 1]], result);
    })();
  });

});