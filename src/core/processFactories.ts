import { serializePromise } from '../utils';
import {
  factoriesT,
  IDiscoveriesFactory,
  IProcessFactories,
} from './';

export type processFactoriesT = (discoverFactories: factoriesT<IDiscoveriesFactory>) =>
  Promise<IProcessFactories>;

const processFactories: processFactoriesT = async (factories) => {
  const rawResult = await serializePromise<IDiscoveriesFactory>(factories);

  const matchedFiles = rawResult.reduce((acc, { result, skipped }) => {
    if (!skipped && !!result) {
      acc.push(result);
    }

    return acc;
  }, [] as string[]);

  const skippedFiles = rawResult.reduce((acc, { result, skipped }) => {
    if (skipped) {
      acc.push(result);
    }

    return acc;
  }, [] as string[]);

  return {
    matchedFiles,
    skippedFiles,
  };
};

export default processFactories;
