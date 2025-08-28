import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../services";
import { IAuthController } from "./auth.interface";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../utils";
import { SUCCESS_RESPONSES } from "../../constants";

export class AuthController implements IAuthController {
  constructor(private _authServices: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token, user } = await this._authServices.signup(req.body);
      successResponse(
        res,
        StatusCodes.CREATED,
        SUCCESS_RESPONSES.SIGNUP_SUCCESS,
        { token, user }
      );
    } catch (error) {
      next(error);
    }   
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token, user } = await this._authServices.signin(
        req.body.email,
        req.body.password
      );
      successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.SIGNIN_SUCCESS, {
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async authMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1]!;
      const user = await this._authServices.authMe(token);
      successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.AUTH_ME_SUCCESS, {
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1]!;
      await this._authServices.logout(token);
      successResponse(
        res,
        StatusCodes.NO_CONTENT,
        SUCCESS_RESPONSES.LOGOUT_SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }
}
