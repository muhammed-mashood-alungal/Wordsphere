import { IUser, IUserResponse } from "../types";

export const mapUserResponse = (user: IUser): IUserResponse => {
  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
