import { JwtPayload } from "jsonwebtoken";
import { ICreateUser } from "../../types";
import { IAuthService } from "./auth.interface";

export class AuthService implements IAuthService {
  async signup(user: ICreateUser): Promise<string> {
    return "asdf";
  }
  async signin(email: string, password: string): Promise<string> {
    return "asdf";
  }

  authMe(token: string): JwtPayload | string {
    return "adsfa";
  }
}
