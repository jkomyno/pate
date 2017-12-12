import * as micromatch from 'micromatch';
import * as path from 'path';
import * as readdir from 'readdir-enhanced';
import { IOptions } from '../';
import { ITask } from '../generateTask';

const isEnoentCodeError = (err: any): boolean =>
  err.code === 'ENOENT';

function filter(entry: readdir.IEntry, patterns: string[], options: IOptions): boolean {
  console.log('entry@filter', entry);
  console.log('patterns', patterns);

  if ((options.onlyFiles && !entry.isFile()) || (options.onlyDirs && !entry.isDirectory())) {
    return false;
  }
  
  if (micromatch(entry.path, patterns, {matchBase: true}).length !== 0) {
    return true;
  }
  return false;
}

export function async(task: ITask, options: IOptions): Promise<string[]> {
  const cwd = path.resolve(options.cwd, task.base);
  const entries: string[] = [];
  const api = readdir.stream;

  console.log('cwd@async', cwd);

  return new Promise((resolve, reject) => {
    const stream = api(cwd, {
      filter: (entry) => filter(entry, task.patterns, options),
      basePath: task.base === '.' ? '' : task.base,
      deep: options.deep,
      sep: '/',
    });

    stream.on('data', (entry) => entries.push(entry));
    stream.on('error', (err) => isEnoentCodeError(err) ? resolve([]) : reject(err));
    stream.on('end', () => resolve(entries));
  });
}
