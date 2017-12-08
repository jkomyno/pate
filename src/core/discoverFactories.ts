import {
  findMatchInFile,
  IBar,
  IDiscoveriesFactory,
  PromiseFactoryT,
} from './';

export type discoverFactoriesT = (files: string[], regexPattern: RegExp, bar?: IBar) =>
  Array<PromiseFactoryT<IDiscoveriesFactory>>;

const discoverFactories: discoverFactoriesT = (files, regexPattern, bar) =>
  files.map((file) => async () => {
    try {
      if (bar) {
        bar.tick();
      }

      return {
        result: await findMatchInFile(regexPattern, file),
        skipped: false,
      };
    } catch (error) {
      return {
        result: file,
        skipped: true,
      };
    }
  });

export default discoverFactories;
