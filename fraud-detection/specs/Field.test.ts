import 'mocha';
const fs = require("fs");
import { expect } from 'chai';
import { ValidationError, OutputError } from '../errors'
import { getMethodsNameFromClass } from '../helpers';
import { Field, FieldInteger, FieldString, FieldFactory } from '../src/Field';

describe('Field', function () {

  describe('constructor', function () {

    it('Should have [validateInput, getRawValue, validateOutput, castValue] methods', () => {
      const testField = new Field('test');
      const methods = getMethodsNameFromClass(testField);
      expect(methods).to.have.all.members(['validateInput', 'getRawValue', 'validateOutput', 'castValue']);
    });

    it('Should set name prop supplied', () => {
      const testField = new Field('test');
      expect(testField.name).to.equal('test');
    });

    describe('validations', function () {
      it('Should throw ValidationError when a empty name is supplied', () => {
        expect(() => new Field('')).to.throw(ValidationError);
      });
      it('Should throw ValidationError when a not valid name is supplied', () => {
        expect(() => new Field('-')).to.throw(ValidationError);
      });
    });
  });

});


describe('FieldInteger', function () {

  describe('validations', function () {

    it('castValue - Should throw ValidationError when a invalid value is supplied', () => {
      const testIntegerField = new FieldInteger('test');
      expect(() => testIntegerField.castValue('-')).to.throw(ValidationError);
    });

    it('validateOutput - Should throw OutputError when a invalid integer is going to be returned', () => {
      const testIntegerField = new FieldInteger('test');
      expect(() => testIntegerField.validateOutput(Number.MAX_SAFE_INTEGER + 1)).to.throw(OutputError);
    });

  });

  it('Should should cast \'161\' to number 161', () => {
    const testIntegerField = new FieldInteger('test');
    const value = testIntegerField.castValue('161');
    expect(value).to.equal(161);
  });

});

describe('FieldString', function () {

  // Running time type-checking, skipped
  describe('validations', function () {
    it.skip('validateInput - Should throw ValidationError when a non string value is supplied', () => { });
    it.skip('validateOutput - Should throw OutputError when a non string value is going to be returned', () => { });
  });

  it('Should should cast 161 to number \'161\'', () => {
    const testIntegerField = new FieldString('test');
    const value = testIntegerField.castValue('161');
    expect(value).to.equal('161');
  });

});


describe('FieldFactory', function () {

  let factory = new FieldFactory();

  it('Should have [constructor, validateInput, getRawValue, validateOutput, castValue] methods', () => {
    let testIntegerField = factory.create(FieldInteger, 'asd');
    const methods = getMethodsNameFromClass(testIntegerField);
    expect(methods).to.have.all.members(['constructor', 'validateInput', 'getRawValue', 'validateOutput', 'castValue']);
  });

});

describe('postProcessor', function () {

  it('Should cast \'161\' to number 161 execute postProcessor and add 1 to the result to equal 162', () => {
    const testIntegerField = new FieldInteger('test', (n: number) => { return n + 1 });
    const value = testIntegerField.castValue('161');
    expect(value).to.equal(162);
  });

});