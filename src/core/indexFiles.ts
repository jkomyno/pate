import fastGlob from 'fast-glob';

export type indexFilesT = (globPattern: string, path: string, ignorePattern?: string[]) =>
  Promise<string[]>;

const indexFiles: indexFilesT = async (globPattern, path, ignorePattern = []) =>
  await fastGlob(globPattern, {
    cwd: path,
    ignore: ignorePattern,
    onlyFiles: true,
  });

export default indexFiles;
