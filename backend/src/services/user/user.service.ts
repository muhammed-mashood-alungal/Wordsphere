import { readJsonFromDiskAsync } from "tsconfig-paths/lib/filesystem";
import { User } from "../../models";
import { IPagination, IUser, IUserResponse } from "../../types";
import { IUserService } from "./user.interface";
import { mapUserResponse } from "../../mappers";
import { paginate } from "../../utils/pagination.util";
import { FilterQuery } from "mongoose";

export class UserService implements IUserService {
  async getAllUsers(options?: any): Promise<IPagination<IUserResponse>> {
    const filter: FilterQuery<IUser> = {};
    const page = Number(options?.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;

    if (options?.search) {
      filter.name = { $regex: options.search, $options: "i" };
      filter.email = { $regex: options.search, $options: "i" };
    }

    const users = await User.find(filter)
      .skip(skip)
      .limit(limit)
      .lean<IUser[]>();

    const total = await User.countDocuments(filter);
    const mappedUsers = users.map((user) => mapUserResponse(user));
    const paginatedData = paginate(total, page, limit, mappedUsers);
    return paginatedData;
  }

  async getUserById(userId: string): Promise<IUserResponse | null> {
    const user = await User.findById(userId).lean<IUser>();
    return user ? mapUserResponse(user) : null;
  }

  async updateUser(userId: string, data: IUser): Promise<IUserResponse | null> {
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
    }).lean<IUser>();
    return user ? mapUserResponse(user) : null;
  }

  async toggleDelete(userId: string, isDeleted: boolean): Promise<boolean> {
    const result = await User.findByIdAndUpdate(userId, { isDeleted });
    return result !== null;
  }
}
