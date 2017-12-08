import * as path from 'path';
import {
  indexFiles,
  discoverFactories,
  processFactories,
} from '../../../src/core';
 
const testDataFolder = path.join(process.cwd(), './__tests__/test_data');
const pattern = new RegExp('abc');
let files: string[];

describe('processFactories', () => {
  beforeAll(async (done) => {
    files = await indexFiles('*.txt', testDataFolder);
    done();
  });

  it(`should run every factory and return an object with two lists:
      one with the names of the files whose content matched the required pattern,
      and one with the names of the files skipped due to generic errors`, async () => {

    const factories = discoverFactories(files, pattern);

    const {
      matchedFiles,
      skippedFiles,
    } = await processFactories(factories);

    expect(matchedFiles.length).toBe(2);
    expect(skippedFiles.length).toBe(0);
  });
});