import z from "zod";
import { IUser } from "./user.types";
import { blogSchema } from "@/schema/blog.shema";

export interface IBlog {
  id: string;
  title: string;
  content: string;
  author: IUser;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IBlogFormData = z.infer<typeof blogSchema>;