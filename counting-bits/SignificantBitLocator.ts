
import { RangeError, OutputError } from './errors';
import { integerToBinaryRTLPositiveAccumulator } from './helpers';

interface ISignificantBitLocator {
  Locate(num: number, faster: boolean): Array<number>
}

class SignificantBitLocator implements ISignificantBitLocator {
  public Locate(num: number, faster: boolean = false): Array<number> {
    validators.input(num);
    const result = locator(num, faster);
    validators.output(num, result);
    return result;
  }
}

const locator = (num: number, faster: boolean): Array<number> => {
  let position = [];
  integerToBinaryRTLPositiveAccumulator(num, (n: number) => {
    position.push(n);
  }, faster)
  return [...position];
}

const validators = {
  input: (num: number): void => {
    // Must be positive and integer
    if (!Number.isSafeInteger(num) || num < 0) {
      throw new RangeError(num, [0, Number.MAX_SAFE_INTEGER]);
    }
  },
  output: (num: number, result: Array<number>): void => {
    // Must be array
    if (!Array.isArray(result)) {
      throw new OutputError(`Invalid output type (${typeof result}) must be array - Supplied (${num})`, result);
    }
    // Returned array length must be less than 53 bits
    if (result.length > Number.MAX_SAFE_INTEGER.toString(2).length) {
      throw new OutputError(`Invalid array length (${result.length}) - Supplied (${num})`, result);
    }
    // All positive bit positions must be less than 53 and more or equal to 0
    if (result.some(n => !Number.isSafeInteger(n) || n < 0 || n > Number.MAX_SAFE_INTEGER.toString(2).length)) {
      throw new OutputError(`Invalid array content detected - Supplied (${num})`, result);
    }
  }
};

export {
  SignificantBitLocator,
  validators
};