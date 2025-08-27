import { FilterQuery } from "mongoose";
import { IFilterOptions, IPagination, IBlog, IUser, IUserResponse, IBlogResponse } from "../../types";
import { IBlogService } from "./blog.interface";
import { Blog } from "../../models";
import { paginate } from "../../utils";
import { mapBlogResponse } from "../../mappers";

export class BlogService implements IBlogService {
  async getAllBlogs(options: IFilterOptions): Promise<IPagination<IBlogResponse>> {
    const filter: FilterQuery<IBlog> = {};
    const page = Number(options?.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;

    if (options.search) {
      filter.title = { $regex: options.search, $options: "i" };
    }

    let blogs = await Blog.find(filter)
      .skip(skip)
      .limit(limit)
      .populate('author')
      .lean<IBlog[]>();

    if (options.author) {
      blogs = blogs.filter(blog => (blog.author as IUser).username === options.author);
    }
 
    const total = await Blog.countDocuments(filter);
    const mappedBlogs = blogs.map(blog => mapBlogResponse(blog as IBlog));
    const paginatedData = paginate(total, page, limit, mappedBlogs);
    return paginatedData;
  }

  async getBlogById(blogId: string): Promise<IBlogResponse | null> {
    const blog = await Blog.findById(blogId).lean<IBlog>();
    return mapBlogResponse(blog as IBlog);  
  }

  async createBlog(data: IBlog): Promise<IBlogResponse> {
    const blog = await Blog.create(data)
    return mapBlogResponse(blog as IBlog);
  }

  async updateBlog(blogId: string, data: Partial<IBlog>): Promise<IBlogResponse | null> {
    const blog = await Blog.findByIdAndUpdate(blogId, data, { new: true }).lean<IBlog>();
    return mapBlogResponse(blog as IBlog);
  }

  async toggleDelete(blogId: string, isDeleted: boolean): Promise<boolean> {
    const result = await Blog.findByIdAndUpdate(blogId, { isDeleted });
    return result !== null;
  }
}
