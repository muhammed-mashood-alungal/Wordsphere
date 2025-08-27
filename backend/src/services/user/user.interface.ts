import { IFilterOptions, IPagination, IUser, IUserResponse } from "../../types";

export interface IUserService {
  getAllUsers(options?: IFilterOptions): Promise<IPagination<IUserResponse>>;
  getUserById(userId: string): Promise<IUserResponse | null>;
  updateUser(userId: string, data: IUser): Promise<IUserResponse | null>;
  toggleDelete(userId: string, isDeleted: boolean): Promise<boolean>;
}
