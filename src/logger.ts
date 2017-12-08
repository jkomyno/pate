// tslint:disable:no-console
import chalk from 'chalk';

export type loggerT = (message: string, value?: any, force?: boolean) => void;

class Logger {
  private verbose: boolean;

  constructor(verbose: boolean = false) {
    this.verbose = verbose;
  }

  public log: loggerT = (message, value = '', force = false) => {
    if (this.verbose || force) {
      console.log(chalk.grey(message), value);
    }
  }

  public success: loggerT = (message, value = '', force = false) => {
    if (this.verbose || force) {
      console.log(chalk.bgGreenBright.bold.black(`\n✔ ${message}`), `${value}\n`);
    }
  }

  public warn: loggerT = (message, value = '', force = false) => {
    if (this.verbose || force) {
      console.log(chalk.yellow(message), value);
    }
  }

  public error: loggerT = (message, value = '') => {
    console.log(chalk.bold.red(`\n✖ ${message}`), value);
  }
}

export default Logger;
