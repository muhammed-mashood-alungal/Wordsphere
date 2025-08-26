import { Request, Response, NextFunction } from "express";
import { IUserController } from "./user.interface";
import { IUserService } from "../../services";
import { successResponse } from "../../utils";
import { StatusCodes } from "http-status-codes";
import { SUCCESS_RESPONSES } from "../../constants";

export class UserController implements IUserController {
  constructor(private _userServices: IUserService) {}
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this._userServices.getAllUsers(req.query);
      successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.OK, { users });
    } catch (error) {
      next(error);
    }
  }
  async getUserData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await this._userServices.getUserById(req.user);
      successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.AUTH_ME_SUCCESS, {
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await this._userServices.getUserById(userId);
      successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.OK, { user });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await this._userServices.getUserById(userId);
      successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.OK, { user });
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      await this._userServices.toggleDelete(userId , true);
      successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.OK);
    } catch (error) {
      next(error);
    }
  }

  async restoreUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      await this._userServices.toggleDelete(userId, false);
      successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.OK);
    } catch (error) {
      next(error);
    }
  }
}
