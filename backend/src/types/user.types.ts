import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateUser = Omit<IUser, "_id" | "createdAt" | "updatedAt">;
