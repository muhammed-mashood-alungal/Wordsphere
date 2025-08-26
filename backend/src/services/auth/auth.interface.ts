import { ICreateUser } from "../../types";
import { JwtPayload} from 'jsonwebtoken'

export interface IAuthService {
  signup(user: ICreateUser): Promise<string>;
  signin(
    email: string,
    password: string
  ): Promise<string>;
  authMe(token: string): JwtPayload | string;
  logout(token: string): Promise<void>;
}