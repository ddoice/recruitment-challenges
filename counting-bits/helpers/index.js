const { RangeError, ValidationError } = require('../errors');

/**
 * Converts a integer number to binary
 * @param {integer} num Number to be converted
 * @returns {string}
 */
const convertIntToBinary = (num) => {
  if (Number.isSafeInteger(num)) {
    return num.toString(2);
  } else {
    throw new RangeError(num, [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
  }
}

/**
 * Get the amount of bits that a integer number contains when converted to binary
 * @param {integer} num 
 * @returns {integer}
 */
const intBitCounter = (num) => convertIntToBinary(num).length;

// Without cold start between runs we can use this array to speed up calculations to be ~90% faster
// It contains the max number + 1 that can represent using index + 1 bits
// EX: 1 bit can represent up to number 1, 2 bits can represent up to number 4
// bitLengthArr = [2, 5, 10, 19, ...]
// # We are using a reducer instead of a precalculated array because Number.MAX_SAFE_INTEGER may change over time.
// # In serverless environments this will barely hurt startup times (measured 0.245~0.270ms on desktop)
const bitLengthArr = (Number.MAX_SAFE_INTEGER)
  .toString(2)
  .split('')
  .reduce((all, _, index) => [
    ...all,
    (all[index - 1] || 0) + Math.pow(2, index) + 1
  ], []);

/**
 * Function to get the amount of bits that a number contains when is converted to binary
 * Instead of using a more computationally expensive .toString(2).length uses a precalculated array
 * Iterates throught the array and finds the first value greater than the received number, then returns the index position
 * # This is a hacky function targeted for speed, but it's safer and more robust to use 'intBitCounter' function
 * @param {integer} num 
 * @returns {integer} Number of bits
 */
const fastIntBitCounter = (num) => {
  if (Number.isSafeInteger(num)) {
    for (let n = 0; n < bitLengthArr.length; n++) {
      if (bitLengthArr[n] > num) {
        return n + 1;
      }
    }
  } else {
    throw new RangeError(num, [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
  }
};

/**
 * Used to choose the right bit counter 
 * @param {boolean} faster
 */
const getBitCounter = (faster) => faster ? fastIntBitCounter : intBitCounter;

/**
 * Iterates throught the binary equivalent of the supplied number from right to left
 * On every iteration if a positive value is found then calls the supplied accumulator
 * @param {integer} num 
 * @param {function} accumulator
 * @param {boolean} faster indicates if should use a faster version
 * @returns {undefined} 
 */
const integerToBinaryRTLPositiveAccumulator = (num, accumulator, faster = false) => {

  if (typeof accumulator !== 'function') {
    throw new ValidationError(`accumulator supplied is not a valid function`);
  }

  const bitCounter = getBitCounter(faster);
  const len = bitCounter(num);

  for (let n = 0; n < len; n++) {
    if ((num >> n) & 1) {
      accumulator(n)
    }
  }
}

/**
 * From http://www.typescriptlang.org/docs/handbook/mixins.html
 * Class mixing, will run through the properties of each of the mixins and copy them over to the target of the mixins, filling out the stand-in properties with their implementations.
 * @param {class} derivedCtor 
 * @param {class} baseCtors 
 */
function applyMixins(derivedCtor, baseCtors) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
      });
  });
}

module.exports = {
  convertIntToBinary,
  intBitCounter,
  fastIntBitCounter,
  getBitCounter,
  integerToBinaryRTLPositiveAccumulator: integerToBinaryRTLPositiveAccumulator,
  applyMixins
}
