import { ValidationError } from '../errors';
import { FieldString, FieldInteger } from './Field';
import { PostProccessor } from './PostProccessor';

interface IFieldsExtractor {
  Extract(): void,
  Split(line: string): void,
}

/**
 * Class which store multiple fields to create a complex object
 */

class FieldsExtractor implements IFieldsExtractor {

  separator: string;
  fields: (FieldString | FieldInteger)[] = [];
  content: string[] = [];
  schema: any;

  constructor(separator: string, fields: (FieldString | FieldInteger)[]) {
    validators.constructor(separator, fields);
    this.separator = separator;
    this.fields = fields;
  }

  /**
   * Receives a line, splits it and saves an array to content
   */
  public Split(line: string): void {
    validators.line(line, this.separator);
    const content = line.split(this.separator);
    validators.content(content, this.fields);
    this.content = content;
  }

  /**
   * Assigns content array to the fields, casts the value
   */
  public Extract(): void {
    validators.output(this.content, this.fields);
    this.fields.forEach((field, index) => field.castValue(this.content[index]));
  }
}

const validators = {

  constructor: (separator: string, fields: (FieldString | FieldInteger)[]): void => {
    if (!separator || separator.trim().length !== 1) {
      throw new ValidationError(`Invalid separator supplied (${separator}), must be one character`);
    }
    if (fields.length === 0) {
      throw new ValidationError(`No valid Fields array supplied`);
    }
  },

  line: (line: string, separator: string): void => {
    if (!line || line.trim().length === 0) {
      throw new ValidationError(`Empty line detected`)
    }
    if (!line.includes(separator)) {
      throw new ValidationError(`Line without separator detected`)
    }
  },

  content: (content: string[], fields: (FieldString | FieldInteger)[]): void => {
    if (fields.length !== content.length) {
      throw new ValidationError(`Wrong number of fields, expected (${fields.length}) received (${content.length})`)
    }
  },

  assign: (content: string[], fields: (FieldString | FieldInteger)[]): void => {
    if (fields.length !== content.length) {
      throw new ValidationError(`Wrong number of fields, expected (${fields.length}) received (${content.length})`)
    }
  },

  output: (content: string[], fields: (FieldString | FieldInteger)[]): void => {
    if (!content || fields.length !== content.length) {
      throw new ValidationError(`Cant Extract, you must first call Split`)
    }
  }
};

export {
  FieldsExtractor,
  validators
};