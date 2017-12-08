import { createReadStream } from 'fs';
import {
  CloseError,
  ReadError,
} from '../errors';
import {
  fsClosePromise,
  fsOpenPromise,
} from '../utils';

export type findMatchInFileT = (pattern: RegExp, file: string) => Promise<string|null>;

const findMatchInFile: findMatchInFileT = (pattern, file) =>
  new Promise(async (resolve, reject) => {
    try {
      const fd = await fsOpenPromise(file, 'r'); // read-only
      const readStream = createReadStream(file, {
        encoding: 'utf-8',
        highWaterMark: 16 * 1024, // 16kb of buffer size
      });

      function onError() {
        reject(new ReadError(fd));
      }

      function onData(chunk: string) {
        const found: boolean = pattern &&
          pattern.test(chunk);

        if (found) {
          readStream.destroy();
          readStream.emit('end', found);
        }
      }

      async function onEnd(found: boolean | null) {
        try {
          await fsClosePromise(fd);
          resolve(found ? file : null);
        } catch (err) {
          reject(new CloseError(fd));
        }
      }

      // event handlers
      readStream.on('error', onError);
      readStream.on('data', onData);
      readStream.on('end', onEnd);

    } catch (err) {
      reject(err);
    }
  });

export default findMatchInFile;
