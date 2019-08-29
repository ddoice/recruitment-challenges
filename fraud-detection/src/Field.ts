import { ValidationError, OutputError } from '../errors';

/**
 * Creates fields to create a schema
 */
class Field {
  value: string | number;
  postProcessor: (val: string | number) => string | number
  constructor(public name: string, postProcessor?: (val: string | number) => string | number) {
    validators.constructor(name, postProcessor);
    this.name = name;
    this.postProcessor = postProcessor;
  }
  validateInput(val: string): void { }
  getRawValue(val: string): any { }
  validateOutput(val: string|number): void { }
  castValue(val: string): any {
    this.validateInput(val);
    let raw = this.getRawValue(val);
    if(this.postProcessor) {
      raw = this.postProcessor(raw);
    }
    this.validateOutput(raw);
    this.value = raw;
    return raw;
  }
}

class FieldString extends Field {
  value: string;
  constructor(public name: string, postProcessor?: (val: string | number) => string | number) {
    super(name, postProcessor);
  }
  // May look useless but can perform running time type-check
  getRawValue(val: string) {
    return String(val)
  }
  // Cannot be tested in TS, running time type-check
  validateInput(val: string) {
    if (!val || typeof val !== 'string') {
      throw new ValidationError('Invalid validateInput')
    }
  }
  // Cannot be tested in TS, running time type-check
  validateOutput(val: string) {
    if (!val || typeof val !== 'string') {
      throw new OutputError('Invalid validateOutput')
    }
  }
}

class FieldInteger extends Field {
  value: number;
  constructor(public name: string, postProcessor?: (val: string | number) => string | number ) {
    super(name, postProcessor);
  }
  getRawValue(val: string) {
    return parseInt(String(val))
  }
  validateInput(val: string) {
    if (!val || !Number.isSafeInteger(parseInt(val))) {
      throw new ValidationError(`Invalid number supplied`)
    }
  }
  validateOutput(val: number) {
    if (!Number.isSafeInteger(val)) {
      throw new OutputError('Invalid number supplied, cannot be casted to integer')
    }
  }
}

class FieldFactory {
  create<T>(
    type: (new (name: string, postProcessor?: (val: string | number) => string | number) => T),
    name: string, 
    postProcessor?: (val: string | number) => string | number
  ): T {
    return new type(name, postProcessor);
  }
}

const validators = {
  constructor: (name: string, postProcessor?: (val: string | number) => string | number): void => {
    // Old school type validation, may look useless in TS but is useful to perform type checking in running time
    if (typeof name !== 'string') {
      throw new ValidationError(`Invalid name`);
    }
    if (name.trim().length === 0) {
      throw new ValidationError(`Empty name`);
    }
    if ((name.match(/[0-9A-aZ-z ]/g) || []).join('').length !== name.length) {
      throw new ValidationError(`Invalid name supplied (${name}), name must be a mix of characters, numbers and spaces`);
    }
    if(postProcessor && typeof postProcessor !== 'function') {
      throw new ValidationError(`Invalid postProcessor function supplied`);
    }
  }
};

export {
  Field,
  FieldString,
  FieldInteger,
  FieldFactory
}