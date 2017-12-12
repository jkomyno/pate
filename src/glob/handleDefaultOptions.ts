import { IOptions } from './';
import * as bash from './providers/bash';
import * as readdir from './providers/readdir';

const handleDefaultOptions = (options?: IOptions) => {
  const defaultOptions: IOptions = {
    cwd: process.cwd(),
    deep: true,
    onlyFiles: false,
    onlyDirs: false,
    bashNative: ['darwin', 'linux'],
  };
  const opts = {
    ...defaultOptions,
    ...options,
  };
  const api = (opts.bashNative.indexOf(process.platform) === -1) ?
    readdir :
    bash;

  return {
    opts,
    api,
  };
};

export default handleDefaultOptions;
