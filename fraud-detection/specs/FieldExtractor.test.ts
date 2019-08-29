import 'mocha';
const fs = require("fs");
import { expect } from 'chai';
import { ValidationError } from '../errors'
import { FieldInteger, FieldString } from '../src/Field';
import { FieldsExtractor } from '../src/FieldsExtractor';


describe('FieldsExtractor', function () {

  describe('constructor', function () {
    describe('validations', function () {

      it('Should throw ValidationError when longer than a char separator is supplied', () => {
        expect(() =>
          new FieldsExtractor(
            'spec',
            [
              new FieldInteger('test'),
              new FieldString('test')
            ])
        ).to.throw(ValidationError);
      });

      it('Should throw ValidationError when no fields are supplied', () => {
        expect(() => new FieldsExtractor(',', []))
          .to.throw(ValidationError);
      });

    });
  });

  describe('Split', function () {
    describe('validations', function () {
      it('Should throw ValidationError if content is not yet set', () => {
        expect(_ => new FieldsExtractor(',', [new FieldString('Split Validations')]).Extract())
          .to.throw(ValidationError);
      });
    });
  });

  describe('Split', function () {
    describe('validations', function () {

      it('Should throw ValidationError when no fields are supplied', () => {
        expect(_ => new FieldsExtractor(',', [new FieldString('test')]).Split(''))
          .to.throw(ValidationError);
      });

      it('Should throw ValidationError when the line received doesnt contains the separator specified', () => {
        expect(_ => new FieldsExtractor(',', [new FieldString('test')]).Split('asd'))
          .to.throw(ValidationError);
      });

      it('Should throw ValidationError when the line received ', () => {
        expect(_ => new FieldsExtractor(',', [new FieldString('test')]).Split('asd,asd'))
          .to.throw(ValidationError);
      });

    });
  });

  describe('Extract', function () {
    describe('values', function () {

      it('Should call Field castValue and set values', () => {
        const testFieldsExtractor = new FieldsExtractor(',', [new FieldString('test'), new FieldInteger('test2')]);
        testFieldsExtractor.Split('asd,123');
        testFieldsExtractor.Extract();
        const fieldsValues = [testFieldsExtractor.fields[0].value, testFieldsExtractor.fields[1].value];
        expect(fieldsValues).to.eql(['asd', 123])
      });

    });
  });


});

