import { IBlog, IBlogResponse, IUser } from "../types";
import { mapUserResponse } from "./user.mapper";

export const mapBlogResponse = (blog: IBlog): IBlogResponse => {
  return {
    id: blog._id.toString(),
    title: blog.title,
    content: blog.content,
    author: mapUserResponse(blog.author as IUser),
    isDeleted : blog.isDeleted,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
};
