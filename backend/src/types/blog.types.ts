import mongoose, { Types } from "mongoose";
import { IUser, IUserResponse } from "./user.types";

export interface IBlog {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | string | IUser;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IBlogResponse = Omit<IBlog, "_id" | 'author'> & {
  id: string;
  author: IUserResponse;
};
