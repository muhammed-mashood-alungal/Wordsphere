import { IBlog, IBlogResponse, IFilterOptions, IPagination } from "../../types";

export interface IBlogService {
  getAllBlogs(options: IFilterOptions): Promise<IPagination<IBlogResponse>>;
  createBlog(data: IBlog): Promise<IBlogResponse>;
  getBlogById(id: string): Promise<IBlogResponse | null>;
  updateBlog(id: string, data: Partial<IBlog>): Promise<IBlogResponse | null>;
  toggleDelete(id: string, isDeleted: boolean): Promise<boolean>;
}
