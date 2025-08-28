import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils";
import { StatusCodes } from "http-status-codes";
import { ERROR_RESPONSES } from "../constants";

export const errorHandler = (
  err: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = ERROR_RESPONSES.INTERNAL_SERVER_ERROR;

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(err);

  res.status(statusCode).json({ success: false, error: message });
};
