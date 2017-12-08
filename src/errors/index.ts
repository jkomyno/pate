export class AppError extends Error {
  constructor(message: string) {
    super(message);
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export * from './CloseError';
export * from './ReadError';
