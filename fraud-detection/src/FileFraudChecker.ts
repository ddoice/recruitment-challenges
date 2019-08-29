import { applyMixins } from '../helpers';
import { ValidationError, OutputError, TypeError } from '../errors';
// import { SignificantBitLocator } from './SignificantBitLocator';
import { FileStreamer } from './FileStreamer';
import { FieldsExtractor } from './FieldsExtractor';
import { PostProccessor } from './PostProccessor';

/**
 * Main Class
 */

class FileFraudChecker {

  schema: FieldsExtractor;
  postProcessors: PostProccessor[] = [];

  setSchema(schema: FieldsExtractor) {
    validators.schema(schema);
    this.schema = schema;
  }

  setPostProccessors(postProcessors: PostProccessor[]) {
    //validators.postProcessors(postProcessors);
    this.postProcessors = postProcessors;
    console.log('MAIN this.postProcessors:', this.postProcessors)
  }

  executePostProcessors() {
    this.postProcessors.forEach(postProcessor => postProcessor.exec(this.schema))
  }


}

const validators = {
  schema: (schema: FieldsExtractor): void => {
    if (!schema) {
      throw new ValidationError('No valid FieldsExtractor schema provided');
    }
  }
};


interface FileFraudChecker extends FileStreamer { }
applyMixins(FileFraudChecker, [FileStreamer, FieldsExtractor])

export { FileFraudChecker };