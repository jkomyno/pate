import { AppError } from './';

export class ReadError extends AppError {
  constructor(fd: number) {
    super(`Couldn't read from file ${fd}`);
  }
}
