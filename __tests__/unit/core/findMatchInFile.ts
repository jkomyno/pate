import * as path from 'path';
import {
  findMatchInFile,
  indexFiles,
} from '../../../src/core';
 
const testDataFolder = path.join(process.cwd(), './__tests__/test_data');
const pattern = new RegExp('abc');
let files: string[];

describe('findMatchInFile', () => {
  beforeAll(async (done) => {
    files = await indexFiles('*.txt', testDataFolder);
    done();
  });

  it(`Should return a promise which resolves to the absolute path of the file
      if the pattern was found`, async () => {
    const resFile0 = await findMatchInFile(pattern, files[0]);
    const resFile1 = await findMatchInFile(pattern, files[1]);
    const resFile2 = await findMatchInFile(pattern, files[2]);

    let caughtException = false;
    try {
      const resFile2 = await findMatchInFile(pattern, '././././');
    } catch (e) {
      expect(e).toBeTruthy();
      caughtException = true;
    }
    expect(caughtException).toBe(true);

    expect(resFile0).toBe(null);
    expect(resFile1).toBeTruthy();
    expect(resFile1).toBe(path.join(testDataFolder, 'file1.txt'));
    expect(resFile1).toBeTruthy();
    expect(resFile2).toBe(path.join(testDataFolder, 'file2.txt'));
  });
});