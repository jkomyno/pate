import * as ProgressBar from 'progress';
import {
  IOptions,
  IProcessFactories,
  discoverFactories,
  findMatchInFile,
  indexFiles,
  processFactories,
} from './core';
export {
  discoverFactories,
  findMatchInFile,
  indexFiles,
  processFactories,
};

export type pateT = (matchPattern: RegExp, searchPath: string, options: IOptions) =>
  Promise<IProcessFactories>;

// main entrypoint
const pate: pateT = (matchPattern, searchPath, {
  barOptions,
  barStyle,
  globPattern,
  ignorePattern,
  verbose,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const files = await indexFiles(globPattern, searchPath, ignorePattern);
      // display bar only if verbose is true;
      const bar = verbose &&
        new ProgressBar(barStyle, {
          ...barOptions,
          total: files.length,
        });
      const factories = discoverFactories(files, matchPattern, bar);
      const {
        matchedFiles,
        skippedFiles,
      } = await processFactories(factories);

      resolve({
        matchedFiles,
        skippedFiles,
      });
    } catch (error) {
      reject(error);
    }
  });

export default pate;
