import generateTask from './generateTask';
import handleDefaultOptions from './handleDefaultOptions';

export interface IOptions {
  deep?: number | boolean;
  cwd?: string;
  ignore?: string[];
  onlyFiles?: boolean;
  onlyDirs?: boolean;
  bashNative?: string[];
}

const glob = (source: string, options?: IOptions): Promise<string[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        opts,
        api,
      } = handleDefaultOptions(options);
      console.log('options', opts);
      console.log('source', source);
      const task = generateTask(source, opts.ignore);
      console.log('task', task);
      const entries = await api.async(task, opts);
      console.log('entries', entries);
      const result = entries.reduce((res, to) => [...res, to], [] as string[]);
      console.log('result', result);
      resolve(result);
    } catch (error) {
      console.log('error@glob', error);
      reject(error);
    }
  });

export default glob;
