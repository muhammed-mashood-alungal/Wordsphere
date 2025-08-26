import { Request, Response, NextFunction } from "express";
import { IUserController } from "./user.interface";

export class UserController implements IUserController {
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
  async getUserData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}
