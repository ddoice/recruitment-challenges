import 'mocha';
import { expect } from 'chai';
import { ValidationError, OutputError } from '../errors'
import { getMethodsNameFromClass } from '../helpers';
import { FileFraudChecker } from '../src/FileFraudChecker';
import { FieldsExtractor } from '../src/FieldsExtractor';
import { PostProccessor } from '../src/PostProccessor';
import { FieldString, FieldInteger } from '../src/Field';

const testFileFraudChecker = new FileFraudChecker();

describe('FileFraudChecker', function () {

    describe('constructor', async function () {

        // Uppercase methods WTF!
        await testFileFraudChecker.SetFileAndEncoding('./files/OneLineFile.txt', 'utf8');

        const schema = new FieldsExtractor(',', [
            new FieldInteger('orderId'),
            new FieldInteger('dealId'),
            new FieldString('email'),
            new FieldString('street'),
            new FieldString('city'),
            new FieldString('state'),
            new FieldInteger('zipCode'),
            new FieldInteger('creditCard')
        ]);

        testFileFraudChecker.setSchema(schema);

        const normalizers = [
            new PostProccessor((schema: FieldsExtractor) => {
                const email = schema.fields.find(s => s.name === 'email')
                const _email = String(email.value);
                let aux = _email.split('@')
                let atIndex = aux[0].indexOf('+')
                aux[0] = atIndex < 0 ? aux[0].replace('.', '') : aux[0].replace('.', '').substring(0, atIndex - 1)
                // Field class needs a proxy to validate the content inserted
                email.value = aux.join('@');
            }),
            new PostProccessor((schema: FieldsExtractor) => {
                // DRY
                const street = schema.fields.find(s => s.name === 'street');
                const _street = String(street.value);
                // Field class needs a proxy to validate the content inserted
                street.value = 'asddasdads'//_street.replace('st.', 'street').replace('rd.', 'road')
            }),
            new PostProccessor((schema: FieldsExtractor) => {
                // DRY
                const street = schema.fields.find(s => s.name === 'street');
                const state = schema.fields.find(s => s.name === 'state');
                const _street = String(street.value);
                // Field class needs a proxy to validate the content inserted
                state.value = _street.replace('il', 'illinois').replace('ca', 'california').replace('ny', 'new york');
            })
        ];
        
        testFileFraudChecker.setPostProccessors(normalizers);

        testFileFraudChecker.StreamFile((line) => {
            // Here will need a refactor, it's cryptic and difficult to understand
            testFileFraudChecker.schema.Split(line)
            testFileFraudChecker.schema.Extract();
            testFileFraudChecker.executePostProcessors();
        }, () => {
            console.log('testFileFraudChecker.schema.fields:', testFileFraudChecker.schema.fields)
        })

    });

});

