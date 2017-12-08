import { globPromise } from '../utils';

export type indexFilesT = (globPattern: string, path: string, ignorePattern?: string[]) =>
  Promise<string[]>;

const indexFiles: indexFilesT = async (globPattern, path, ignorePattern = []) =>
  await globPromise(globPattern, {
    cwd: path,
    ignore: ignorePattern,
    matchBase: true,
    realpath: true,
    silent: true,
    strict: true,
  });

export default indexFiles;
