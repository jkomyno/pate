import { AppError } from './';

export class CloseError extends AppError {
  constructor(fd: number) {
    super(`Couldn't close file ${fd}`);
  }
}
