
import { RangeError, OutputError } from './errors';
import { integerToBinaryRTLPositiveAccumulator } from './helpers';

interface IPositiveBitCounter {
  Count(num: number, faster: boolean): number
}

class PositiveBitCounter implements IPositiveBitCounter {
  public Count(num: number, faster: boolean = false): number {
    validators.input(num);
    const result = counter(num, faster);
    validators.output(num, result);
    return result;
  }
}

const counter = (num: number, faster: boolean = false): number => {
  let total = 0;
  integerToBinaryRTLPositiveAccumulator(num, _ => {
    total += 1;
  }, faster);
  return total;
}

const validators = {
  input: (num: number): void => {
    // Must be positive and integer
    if (!Number.isSafeInteger(num) || num < 0) {
      throw new RangeError(num, [0, Number.MAX_SAFE_INTEGER]);
    }
  },
  output: (num: number, result: number): void => {
    // Sum of bits and positive position cannot be more than 53 or less than 0 
    if (!Number.isInteger(result) || result < 0 || result > Number.MAX_SAFE_INTEGER.toString(2).length) {
      throw new OutputError(`Invalid sum of positive bits detected (${result}).`, result);
    }
  }
};

export {
  PositiveBitCounter,
  validators
};
