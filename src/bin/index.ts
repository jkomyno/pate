import chalk from 'chalk';
import { performance } from 'perf_hooks';
import * as yargs from 'yargs';
import pate from '../';
import { IOptions } from '../core';
import Logger from '../logger';
import { writeArrayToFile } from '../utils';

export interface IArguments extends yargs.Arguments {
  glob: string;
  ignore: string[];
  output: string;
  searchPath: string;
  verbose: boolean;
}

const APP_NAME = 'pate';

const argv = yargs
  .usage(`Usage: $0 [-v|--verbose] [-o|--output FILE] [-g|--glob 'glob pattern']
          [-i|--ignore 'ignore pattern'] -m [MATCHPATTERN] -p [PATH]`)
  .example('$0', `To look for every 'require' word in the js files inside node_modules,
            saving the result to result.txt, you'd do:\n
            ${APP_NAME} -g '*.js' -o result.txt -m require -p ./node_modules`)
  .demandOption(['m', 'p'])
  .alias('m', 'match')
  .describe('m', 'match pattern to look for in the files located in PATH')
  .alias('p', 'path')
  .describe('p', 'path where files will be collected')
  .alias('g', 'glob')
  .describe('g', 'Filter files in PATH via a glob pattern. Note: it needs quotes to be properly parsed.')
  .default('g', '*.*')
  .alias('o', 'output')
  .describe('o', 'file which will contain the list of the files in PATH that match MATCHPATTERN')
  .boolean('verbose')
  .alias('v', 'verbose')
  .describe('v', 'Show current operation details in real-time')
  .default('v', false)
  .alias('i', 'ignore')
  .describe('i', 'pattern that defines folders or files to exclude from the discovery')
  .array('i')
  .default('i', [] as string[])
  .epilogue(`Developed by jkomyno - Copyright 2017\nSubmit issues at https://github.com/jkomyno/${APP_NAME}`)
  .strict()
  .argv as IArguments;

const {
  path: searchPath,
  glob: globPattern,
  ignore: ignorePattern,
  match,
  output,
  verbose,
} = argv;
const matchPattern = new RegExp(match);

// tslint:disable-next-line:
const barStyle = `Searching pattern, remaining :etas [${chalk.blue(':bar')}] ${chalk.green(':percent')} completed`;
const barOptions = {
  complete: '=',
  incomplete: ' ',
  width: 30,
};
const options = {
  barOptions,
  barStyle,
  globPattern,
  ignorePattern,
  verbose,
} as IOptions;

(
  async () => {
    const logger = new Logger(options.verbose);

    try {
      logger.log('Indexing files');
      performance.mark(`start-${APP_NAME}`);

      const {
        matchedFiles,
        skippedFiles,
      } = await pate(matchPattern, searchPath, options);

      performance.mark(`end-${APP_NAME}`);
      performance.measure('pate', `start-${APP_NAME}`, `end-${APP_NAME}`);
      const { duration } = performance.getEntriesByName('pate')[0];

      logger.success('Pattern found', `in ${matchedFiles.length} files`, true);

      if (output) {
        await writeArrayToFile(output, matchedFiles);
      } else {
        matchedFiles.forEach((item) => {
          logger.log('- ', item, true);
        });
      }

      if (skippedFiles.length) {
        logger.warn('\nSome files were skipped.');
        if (options.verbose) {
          skippedFiles.forEach((item) => {
            logger.warn('❯ ', item, true);
          });
        }
      }

      logger.log(`Pate's discovery process took`, `${duration / 1000} s`);
    } catch (error) {
      logger.error('Process terminated due to unknown error', error);
      process.exit(1);
    }
  }
)();
