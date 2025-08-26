import { NextFunction, Request, Response } from "express";

export interface IUserController {
  getUserData(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
}
