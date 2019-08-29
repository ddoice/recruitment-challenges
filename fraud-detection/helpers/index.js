const fs = require("fs");
const { FileSystemError } = require('../errors');

/**
 * Function to check if a file exists
 * @param {string} path File and path to check
 * @returns {Promise}
 */
const checkFileExist = (path) =>
  new Promise((resolve, _) => {
    try {
      fs.exists(path, exists => resolve(exists));
    } catch (err) {
      throw new FileSystemError(err.message, path, err)
    }
  });

/**
 * Returns all methods of a given class
 * @param {class} T class
 * @returns {Array.<string>} 
 */
const getMethodsNameFromClass = (T) => {
  let methods = [];
  for (var method in T) {
    if (typeof T[method] === "function") {
      methods.push(method);
    }
  }
  return methods;
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
  applyMixins,
  checkFileExist,
  getMethodsNameFromClass
}

