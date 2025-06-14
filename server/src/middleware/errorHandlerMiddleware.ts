import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('❌ Server Error:', err.stack || err.message);

  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || 'Unknown error',
  });
};

export default errorHandler;
