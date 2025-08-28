import { FilterQuery } from "mongoose";
import {
  IFilterOptions,
  IPagination,
  IBlog,
  IUser,
  IUserResponse,
  IBlogResponse,
} from "../../types";
import { IBlogService } from "./blog.interface";
import { Blog } from "../../models";
import { paginate } from "../../utils";
import { mapBlogResponse } from "../../mappers";

export class BlogService implements IBlogService {
  async getAllBlogs(
    options: IFilterOptions
  ): Promise<IPagination<IBlogResponse>> {
    const filter: FilterQuery<IBlog> = {};
    const page = Number(options?.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;
    const search = String(options.search || "").toLowerCase();
    filter.isDeleted = false;
    if (options.search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (options.author) {
      filter.author = options.author;
    }

    let blogs = await Blog.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("author")
      .sort({ createdAt: -1 })
      .lean<IBlog[]>();

    const total = await Blog.countDocuments(filter);
    const mappedBlogs = blogs.map((blog) => mapBlogResponse(blog as IBlog));
    const paginatedData = paginate(total, page, limit, mappedBlogs);
    return paginatedData;
  }

  async getBlogById(blogId: string): Promise<IBlogResponse | null> {
    const blog = await Blog.findById(blogId).lean<IBlog>();
    return mapBlogResponse(blog as IBlog);
  }

  async createBlog(data: IBlog): Promise<IBlogResponse> {
    const blogDoc = new Blog(data);
    await blogDoc.save();
    await blogDoc.populate("author");
    const blog = blogDoc.toObject();
    return mapBlogResponse(blog as IBlog);
  }

  async updateBlog(
    blogId: string,
    data: Partial<IBlog>
  ): Promise<IBlogResponse | null> {
    const blog = await Blog.findByIdAndUpdate(blogId, data, {
      new: true,
    })
      .populate("author")
      .lean<IBlog>();
    return mapBlogResponse(blog as IBlog);
  }

  async toggleDelete(blogId: string, isDeleted: boolean): Promise<boolean> {
    const result = await Blog.findByIdAndUpdate(blogId, { isDeleted });
    return result !== null;
  }
}
