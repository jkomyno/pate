import glob from '../glob';

export type indexFilesT = (globPattern: string, path: string, ignorePattern?: string[]) =>
  Promise<string[]>;

const indexFiles: indexFilesT = async (globPattern, path, ignorePattern = []) => {
  const files = await glob(globPattern, {
    cwd: path,
    ignore: ignorePattern,
    // onlyFiles: true,
  });

  return files;
};

export default indexFiles;
