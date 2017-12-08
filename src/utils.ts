import {
  close,
  createWriteStream,
  open,
} from 'fs';
import * as glob from 'glob';
import { PromiseFactoryT } from './core';

export type fsOpenPromiseT = (path: string, flags: string) => Promise<number>;
export type fsClosePromiseT = (fd: number) => Promise<void>;

export interface IGlobOptions {
  cwd?: string;
  strict?: boolean;
  realpath?: boolean;
  matchBase?: boolean;
  silent?: boolean;
  ignore?: string[];
}
export type globPromiseT = (pattern: string, options: IGlobOptions) => Promise<string[]>;

export const fsClosePromise: fsClosePromiseT = (fd) =>
  new Promise((resolve, reject) => {
    close(fd, (err) => {
      err ?
        reject(err) :
        resolve();
    });
  });

export const fsOpenPromise: fsOpenPromiseT = (path, flags) =>
  new Promise((resolve, reject) => {
    open(path, flags, (err, fd) => {
      err ?
        reject(err) :
        resolve(fd);
    });
  });

export const globPromise: globPromiseT = (pattern, options) =>
  new Promise((resolve, reject) => {
    glob(pattern, options, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  });

/* Generic methods */

export async function serialize<T>(promise: Promise<T[]>, promiseFactory: PromiseFactoryT<T>): Promise<T[]> {
  const promiseResult = await promise;
  const promiseFactoryResult = await promiseFactory();

  return [...promiseResult, promiseFactoryResult];
}

export function serializePromise<T>(promiseFactories: Array<PromiseFactoryT<T>>): Promise<T[]> {
  return promiseFactories.reduce(serialize, Promise.resolve([])) as Promise<T[]>;
}

export async function writeArrayToFile<T>(outputFile: string, data: T[]): Promise<{}> {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(outputFile, {
      encoding: 'utf-8',
    });

    file.on('error', (err) => {
      reject(err);
    });

    data.forEach((item) => {
      file.write(`${item}\n`);
    });

    file.end();
    resolve();
  });
}
