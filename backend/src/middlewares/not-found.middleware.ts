import { NextFunction, Request, Response } from 'express';
import { createHttpsError } from '../utils';
import { StatusCodes } from 'http-status-codes';
import { ERROR_RESPONSES } from '../constants';

export const routeNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(createHttpsError(StatusCodes.NOT_FOUND, ERROR_RESPONSES.NOT_FOUND));
};
