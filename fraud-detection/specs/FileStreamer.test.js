const fs = require("fs")
const assert = require('assert')

console.log('assert:', assert.rejects)
process.exit(1);

let { FileStreamer } = require('../FileStreamer')
FileStreamer = new FileStreamer();

describe('FileStreamer', function () {

  describe('SetFileAndEncoding', function () {

    describe('Validations', function () {

      it('Should return a FileSystemError when a non existing file is supplied', async () => {
        await (async () => {
          await assert.rejects(
            async () => FileStreamer.SetFileAndEncoding('asd'),
            {
              name: 'FileSystemError',
              message: 'File asd not found'
            }
          );
        })();
      });

      it('Should return a ValidationError when a wrong file encoding is supplied', async () => {
        await (async () => {
          await assert.rejects(
            async () => FileStreamer.SetFileAndEncoding('./specs/dummy', 'utf9'),
            {
              name: 'ValidationError',
              message: 'Invalid file encoding (utf9)'
            }
          );
        })();
      });

    });

    describe('Properties', function () {

      it('Should set properties file and encoding', async () => {
        await (async () => {
          await FileStreamer.SetFileAndEncoding('./specs/dummy');
          const { file, encoding } = FileStreamer
          assert.deepEqual({ file: './specs/dummy', encoding: 'utf8' }, { file, encoding });
        })();
      });

    });


  });

  describe('StreamFile', function () {

    describe('Validations', function () {

      beforeEach(async function () {
        await FileStreamer.SetFileAndEncoding('./specs/dummy');
      });

      it('Should return a ValidationError when the lineHandler function is not supplied', async () => {
        await (async () => {
          await assert.rejects(
            async () => FileStreamer.StreamFile(),
            {
              name: 'ValidationError',
              message: 'lineHandler supplied is not a valid function'
            }
          );
        })();
      });

      it('Should return a ValidationError when the closeHandler function is not supplied', async () => {
        await (async () => {
          await assert.rejects(
            async () => FileStreamer.StreamFile(() => { }),
            {
              name: 'ValidationError',
              message: 'closeHandler supplied is not a valid function'
            }
          );
        })();
      });

    });

    describe('Validity', function () {

      beforeEach(async function () {
        await FileStreamer.SetFileAndEncoding('./specs/dummy');
      });

      it('Should send file content to lineHandler', async () => {
        await (async () => {
          await new Promise((resolve, reject) => {
            const lines = [];
            FileStreamer.StreamFile((line) => {
              lines.push(line)
            }, () => {
              assert.deepEqual([
                'this is line 1',
                'this is line 2',
                'this is line 3',
                'this is line 4',
                'this is line 5'], lines);
                resolve();
            })
          });
        })();
      });

      it('Should execute closeHandler when finished', async () => {
        await (async () => {
          await new Promise((resolve, reject) => {
            const lines = [];
            FileStreamer.StreamFile((line) => {
              lines.push(line)
            }, () => {
              assert.deepEqual([
                'this is line 1',
                'this is line 2',
                'this is line 3',
                'this is line 4',
                'this is line 5'], lines);
                resolve();
            })
          });
        })();
      });

    });

  });

});