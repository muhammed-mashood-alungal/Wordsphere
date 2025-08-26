import { NextFunction, Request, RequestHandler, Response } from "express";
import { createHttpsError, isTokenRevoked } from "../utils";
import { StatusCodes } from "http-status-codes";
import { ERROR_RESPONSES } from "../constants";

export const checkBlacklist: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    throw createHttpsError(
      StatusCodes.UNAUTHORIZED,
      ERROR_RESPONSES.NO_TOKEN_PROVIDED
    );
  }

  const isRevoked = await isTokenRevoked(token);
  if (isRevoked) {
    throw createHttpsError(
      StatusCodes.UNAUTHORIZED,
      ERROR_RESPONSES.TOKEN_REVOKED
    );
  }
  next();
};
