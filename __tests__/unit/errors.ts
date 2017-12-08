import {
  AppError,
  ReadError,
  CloseError,
} from '../../src/errors';

describe('errors', () => {
  describe('AppError', () => {
    it('should properly extends Error', () => {
      const message = 'ERROR_MESSAGE';
      const err = new AppError(message);

      expect(err instanceof AppError).toBe(true);
      expect(err instanceof Error).toBe(true);
      expect(err.name).toBe('AppError');
      expect(err.message).toBe(message);
    });
  });

  describe('ReadError', () => {
    it('should properly extend AppError', () => {
      const fd = 123;
      const err = new ReadError(fd);

      expect(err instanceof ReadError).toBe(true);
      expect(err instanceof AppError).toBe(true);
      expect(err instanceof Error).toBe(true);
      expect(err.name).toBe('ReadError');
      expect(err.message).toBe(`Couldn't read from file ${fd}`);
    });
  });

  describe('CloseError', () => {
    it('should properly extend AppError', () => {
      const fd = 123;
      const err = new CloseError(fd);

      expect(err instanceof CloseError).toBe(true);
      expect(err instanceof AppError).toBe(true);
      expect(err instanceof Error).toBe(true);
      expect(err.name).toBe('CloseError');
      expect(err.message).toBe(`Couldn't close file ${fd}`);
    });
  });
});