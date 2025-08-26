import { JwtPayload } from "jsonwebtoken";
import { ICreateUser } from "../../types";
import { IAuthService } from "./auth.interface";
import {
    blacklistToken,
  comparePassword,
  createHttpsError,
  generateToken,
  hashPassword,
  verifyToken,
} from "../../utils";
import { StatusCodes } from "http-status-codes";
import { User } from "../../models";
import { ERROR_RESPONSES } from "../../constants";

export class AuthService implements IAuthService {
  async signup(user: ICreateUser): Promise<string> {
    const isUserExists = await User.findOne({ email: user.email });
    if (isUserExists)
      throw createHttpsError(
        StatusCodes.CONFLICT,
        ERROR_RESPONSES.USER_ALREADY_EXISTS
      );

    const hashedPassword = await hashPassword(user.password);
    const newUser = await User.create({ ...user, password: hashedPassword });

    const token = generateToken({
      id: newUser._id as string,
      role: newUser.role,
    });
    return token;
  }

  async signin(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user)
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ERROR_RESPONSES.INVALID_CREDENTIALS
      );

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid)
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ERROR_RESPONSES.INVALID_CREDENTIALS
      );

    const token = generateToken({
      id: user._id as string,
      role: user.role,
    });
    return token;
  }

  authMe(token: string): JwtPayload | string {
    const decoded = verifyToken(token);
    if (!decoded) {
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ERROR_RESPONSES.INVALID_CREDENTIALS
      );
    }
    return decoded;
  }

  async logout(token: string): Promise<void> {
    const decoded = verifyToken(token);
    if (!decoded) {
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ERROR_RESPONSES.INVALID_CREDENTIALS
      );
    }
    await blacklistToken(token);
  }
}
