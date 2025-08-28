import { NextFunction, Request, Response, RequestHandler } from "express";
import { createHttpsError, isTokenRevoked, verifyToken } from "../utils";
import { StatusCodes } from "http-status-codes";
import { ERROR_RESPONSES } from "../constants";

export const adminAuthMiddleware: RequestHandler = async (
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
    const user = verifyToken(token);
    if (!user) {
      createHttpsError(StatusCodes.UNAUTHORIZED, ERROR_RESPONSES.INVALID_TOKEN);
      return;
    }
    if (user.role !== "admin") {
      createHttpsError(StatusCodes.FORBIDDEN, ERROR_RESPONSES.FORBIDDEN);
      return;
    }
    req.user = user.id as string;

    next();
  } catch (error) {
    next(error);
  }
};
