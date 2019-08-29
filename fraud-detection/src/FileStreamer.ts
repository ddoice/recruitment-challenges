import { FileSystemError, ValidationError } from '../errors';
import { checkFileExist } from '../helpers';
import { Interface } from "readline";
const fs = require("fs");
const readline = require("readline");

/**
 * Streams content from file to handlers supplied
 */

interface IFileStreamer {
  SetFileAndEncoding(
    file: string,
    encoding: string
  ): void,
  StreamFile(
    lineHandler: (...args: any) => void,
    closeHandler: (...args: any) => void,
  ): void
}

class FileStreamer implements IFileStreamer {
  
  file: string;
  encoding: string;
  readStream: NodeJS.ReadableStream;
  readInterface: Interface;

  // Sets file and encoding
  public async SetFileAndEncoding(file: string, encoding: string = 'utf8') {
    await validators.setter(file, encoding);
    this.file = file;
    this.encoding = encoding;
  }

  // Streams content to handler
  public async StreamFile(
    lineHandler: (...args: any) => void,
    closeHandler: (...args: any) => void,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        validators.streamer(this.file, lineHandler, closeHandler);
        this.readStream = fs.createReadStream(this.file, { encoding: this.encoding });
        this.readInterface = readline.createInterface({
          input: this.readStream,
          terminal: false,
          historySize: 0
        });
        this.readInterface.on('line', lineHandler);
        // This close handler will need further investigation: 
        // According to the official documentation  in node>9 is recomended to call this.readStream.destroy() to avoid memory leaks
        // Due to an incomplete ReadStream TS interface the destroy method is not available
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9710
        // https://nodejs.org/api/stream.html#stream_readable_destroy_error
        this.readInterface.on('close', _ => {
          closeHandler();
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    })
  }

}

const validEncodings = ['ascii', 'base64', 'binary', 'hex', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'utf8', 'utf-8', 'latin1'];

const validators = {
  setter: async (
    file: string,
    encoding: string
  ): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!await checkFileExist(file)) {
          throw new FileSystemError(`File ${file} not found`);
        }
        if (!validEncodings.includes(encoding)) {
          throw new ValidationError(`Invalid file encoding (${encoding})`);
        }
      } catch (err) {
        reject(err);
      }
      resolve();
    })
  }
  ,
  streamer: (
    file: string,
    lineHandler: (...args: any) => void,
    closeHandler: (...args: any) => void,
  ): void => {
    if(!file) {
      throw new ValidationError(`file not set yet`);
    }
    if (typeof lineHandler !== 'function') {
      throw new ValidationError(`lineHandler supplied is not a valid function`);
    }
    if (typeof closeHandler !== 'function') {
      throw new ValidationError(`closeHandler supplied is not a valid function`);
    }
  }
};

export {
  FileStreamer,
  validators
};