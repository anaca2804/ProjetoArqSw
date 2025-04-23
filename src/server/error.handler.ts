import * as express from 'express';

export const handleError = (err, req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (err.code && err.code === 11000) {
      err.errorType = 'Duplicated unique key';
      err.status = 400;
    }
    res.status(err.status || 500).json({
      message: err.message,
      ...err,
    });
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};