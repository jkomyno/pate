export { default as discoverFactories } from './discoverFactories';
export { default as findMatchInFile } from './findMatchInFile';
export { default as indexFiles } from './indexFiles';
export { default as processFactories } from './processFactories';

/* generic types */
export type PromiseFactoryT<T> = () => Promise<T>;
export type factoriesT<T> = Array<PromiseFactoryT<T>>;

/* interfaces */
export interface IBar {
  tick: () => void;
}
export interface IDiscoveriesFactory {
  result: string;
  skipped: boolean;
}
export interface IProcessFactories {
  matchedFiles: string[];
  skippedFiles: string[];
}
export interface IOptions {
  barOptions?: {
    complete?: string,
    incomplete?: string,
    total?: number,
    width?: number,
  };
  barStyle?: string;
  globPattern: string;
  ignorePattern: string[];
  verbose?: boolean;
}
