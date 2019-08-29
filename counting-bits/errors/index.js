class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 *  @typedef ValidRange
 *  @type {array}
 *  @property {string} 0 - min value.
 *  @property {string} 1 - max value.
 */

class RangeError extends DomainError {
  /**
   * @param {integer} number 
   * @param {ValidRange} validRange 
   */
  constructor(number, validRange = [0, Number.MAX_SAFE_INTEGER]) {
    super(`Number received (${number}) is out of the valid range (${validRange ? validRange.join(' to ') : ''}).`);
    this.data = { number };
  }
}

class TypeError extends DomainError {
  /**
   * @param {any} element Element tested
   * @param {string} expectedType Expected type
   * @returns {class}
   */
  constructor(element, expectedType, message) {
    if (message) {
      super(message);
    } else {
      super(`Expected type is ${expectedType} but received ${element}`);
    }
    this.data = { element };
  }
}

class OutputError extends DomainError {
  /**
   * @param {string} `message` 
   * @param {any} content 
   */
  constructor(message, content) {
    super(message);
    this.data = { content };
  }
}

class ValidationError extends DomainError {
  constructor(message) {
    super(message);
  }
}

class InternalError extends DomainError {
  constructor(error) {
    super(error.message);
    this.data = { error };
  }
}

module.exports = {
  RangeError,
  OutputError,
  TypeError,
  InternalError,
  ValidationError
};