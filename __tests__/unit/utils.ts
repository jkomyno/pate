jest.unmock('../../src/utils');

import * as fs from 'fs';
import {
  fsOpenPromise,
  fsClosePromise,
  writeArrayToFile,
} from '../../src/utils';

let fd: number;

describe('fsOpenPromise', () => {
  it('should throw exception if file is not found', async () => {
    let caughtException = false;

    try {
      await fsOpenPromise('/path/to/file/that/does/not/exist', 'r');
    } catch (e) {
      expect(e.code).toBe('ENOENT');
      caughtException = true;
    }

    expect(caughtException).toBe(true);
  });

  it('should return a file identifier if file is found', async () => {
    fd = await fsOpenPromise('./package.json', 'r');
    expect(fd).toBeTruthy();
    expect(typeof fd).toBe('number');
  });
});

describe('fsClosePromise', () => {
  it('should close an open file', () => {
    expect(async () => {
      await fsClosePromise(fd);
    }).not.toThrow();
  });
});

describe('writeArrayToFile', () => {
  it('should correctly write an array to a file', async () => {
    const arr = [...Array(100000).keys()];
    const fileName = './writeArrayToFile.txt';
    await writeArrayToFile<number>(fileName, arr);

    let caughtException = false;
    
    try {
      const fd = await fsOpenPromise(fileName, 'r');
      expect(fd).toBeGreaterThan(0);
    } catch (e) {
      caughtException = true;
    }

    expect(caughtException).toBe(false);

    // delete created file
    fs.unlink(fileName, (err) => {
      expect(err).toBe(null);
    });
  });
});