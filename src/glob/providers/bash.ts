// import * as readdir from 'readdir-enhanced';
import * as bglob from 'bash-glob';
import * as micromatch from 'micromatch';

import { IOptions } from '../';
import { ITask } from '../generateTask';
// import { statFile } from '../utils/io';
import {
  getNegativeAsPositive,
  isNegative,
} from '../patterns';

function filterByNegativePatterns(files: string[], patterns: string[]) {
  const negativePatterns = getNegativeAsPositive(patterns);
  const entries = files.reduce((acc, curr) => {
    if (!micromatch(curr, negativePatterns).length) {
      acc.push(curr);
    }

    return acc;
  }, [] as string[]);

  return entries;
}

export function async(task: ITask, options: IOptions): Promise<string[]> {
  const patterns = task.patterns.filter((pattern) => !isNegative(pattern));

  return new Promise((resolve, reject) => {
    bglob(patterns, { cwd: options.cwd, dotglob: true }, (err, files) => {
      if (err) {
        return reject(err);
      }

      const entries = filterByNegativePatterns(files, task.patterns);
      /*
      if (options.onlyFiles || options.onlyDirs) {
        return Promise.all(entries.map(statFile)).then((stats: readdir.IEntry[]) => {
          const results: (string | readdir.IEntry)[] = [];

          for (let i = 0; i < stats.length; i++) {
            const entry = stats[i];
            if ((options.onlyFiles && !entry.isFile()) || (options.onlyDirs && !entry.isDirectory())) {
              continue;
            }
            entry.path = entries[i];
            results.push(entry.path);
          }
          resolve(results);
        });
      }
      */
      resolve(entries);
    });
  });
}
