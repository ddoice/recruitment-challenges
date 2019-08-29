import { ValidationError } from '../errors';
import { FieldsExtractor } from './FieldsExtractor';

/**
 * Used to modify object properties
 */
class PostProccessor {
  exec: (schema: FieldsExtractor) => void
  constructor(exec: (schema: FieldsExtractor) => void) {
    validators.constructor(exec);
    this.exec = exec;
  }
}

const validators = {
  constructor: (exec: (schema: FieldsExtractor) => void): void => {
    if (typeof exec !== 'function') {
      throw new ValidationError('Invalid function supplied');
    }
  },
  output: (any): void => {
    if (!any) {
      throw new ValidationError('Empty output not allowed');
    }
  }
};

export {
  PostProccessor,
  validators
};