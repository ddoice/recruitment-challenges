import { applyMixins } from './helpers';
import { ValidationError, OutputError, TypeError } from './errors';
import { SignificantBitLocator } from './SignificantBitLocator';
import { PositiveBitCounter } from './PositiveBitCounter';

class IntegerBinaryBitInfo {

  protected numbers: Array<number>;

  protected constructor(numbers?: Array<number>) {
    if (numbers && validators.numSetter(numbers)) {
      this.numbers = numbers;
    }
  }

  public setNumbers(numbers: Array<number>) {
    validators.numSetter(numbers);
    this.numbers = numbers;
  }

  // Get the binary info as required by the specs
  public getBinaryBitInfo(faster: boolean = false): Array<Array<number>> {
    return this.numbers.map(num => [
      this.Count(num, faster),
      ...this.Locate(num, faster)
    ])
  }
}

const validators = {
  numSetter: (numbers: Array<number>): boolean => {
    // Must be array
    if (!Array.isArray(numbers)) {
      throw new TypeError(numbers, 'array');
    }
    // Array must contain at least one value
    if (numbers.length === 0) {
      throw new ValidationError(`array received is empty`);
    }
    // Array values must be positive safe integers
    const invalidNumbers = numbers.filter(num => !Number.isSafeInteger(num) || num < 0)
    if (invalidNumbers.length > 0) {
      throw new TypeError(invalidNumbers, null, `array received contains some not valid values (${invalidNumbers.join(',')})`);
    }
    return true;
  }
};


interface IntegerBinaryBitInfo extends PositiveBitCounter, SignificantBitLocator { }

applyMixins(IntegerBinaryBitInfo, [PositiveBitCounter, SignificantBitLocator])

export { IntegerBinaryBitInfo };