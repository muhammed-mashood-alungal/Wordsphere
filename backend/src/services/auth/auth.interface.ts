import { ICreateUser, IUserResponse } from "../../types";
import { JwtPayload} from 'jsonwebtoken'

export interface IAuthService {
  signup(user: ICreateUser): Promise<{token: string, user: IUserResponse}>;
  signin(
    email: string,
    password: string
  ): Promise<{token: string, user: IUserResponse}>;
  authMe(token: string): JwtPayload | string;
  logout(token: string): Promise<void>;
}