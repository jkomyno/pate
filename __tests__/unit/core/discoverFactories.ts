import * as path from 'path';
import {
  indexFiles,
  discoverFactories,
} from '../../../src/core';
import * as findMatchInFile from '../../../src/core/findMatchInFile';
jest.mock('../../../src/core/findMatchInFile', () => jest.fn());
 
const testDataFolder = path.join(process.cwd(), './__tests__/test_data');
const pattern = new RegExp('abc');
let files: string[];

describe('discoverFactories', () => {
  beforeAll(async (done) => {
    files = await indexFiles('*.txt', testDataFolder);
    done();
  });

  it(`should return an array of factories and an array of skippedFiles`, async () => {
    const bar = {
      tick: jest.fn(),
    };

    const factories = discoverFactories(files, pattern, bar);    

    expect(findMatchInFile.mock.calls.length).toBe(0);
    expect(bar.tick.mock.calls.length).toBe(0);
    expect(factories.length).toBe(3);
  });
});