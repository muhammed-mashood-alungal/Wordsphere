import { NextFunction, Request, Response, RequestHandler } from "express";
import { createHttpsError, isTokenRevoked, verifyToken } from "../utils";
import { StatusCodes } from "http-status-codes";
import { ERROR_RESPONSES } from "../constants";

export const authMiddleware: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return next(
        createHttpsError(
          StatusCodes.UNAUTHORIZED,
          ERROR_RESPONSES.NO_TOKEN_PROVIDED
        )
      );
    }
    const isRevoked = await isTokenRevoked(token);
    if (isRevoked) {
      return next(
        createHttpsError(
          StatusCodes.UNAUTHORIZED,
          ERROR_RESPONSES.TOKEN_REVOKED
        )
      );
    }
    const user = verifyToken(token);
    if (!user) {
      return next(
        createHttpsError(
          StatusCodes.UNAUTHORIZED,
          ERROR_RESPONSES.INVALID_TOKEN
        )
      );
    }
    req.user = user.id as string;

    next();
  } catch (error) {
    next(error);
  }
};
