import { IUser } from "./user.types";

export interface IBlog {
  id: string;
  title: string;
  content: string;
  author: IUser;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
