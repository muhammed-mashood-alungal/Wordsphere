import { blogInstance } from "@/axios/instances.axios";
import { IBlogFormData } from "@/types/blog.types";

const BlogService = {
  getBlogs: async (
    page: number,
    limit: number,
    search: string,
    author?: string
  ) => {
    try {
      const response = await blogInstance.get("/", {
        params: { page, limit, search, author },
      });
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch blogs");
    }
  },
  create: async (data: IBlogFormData, author: string) => {
    try {
      const response = await blogInstance.post("/", { ...data, author });
      return response.data.data;
    } catch (error) {
      throw new Error();
    }
  },
  update: async (id: string, data: IBlogFormData) => {
    try {
      const response = await blogInstance.put(`/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to update blog");
    }
  },
  delete: async (id: string) => {
    try {
      await blogInstance.delete(`/${id}`);
    } catch (error) {
      throw new Error("Failed to delete blog");
    }
  },
  restore: async (id: string) => {
    try {
      const response = await blogInstance.post(`/${id}/restore`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to restore blog");
    }
  },
};

export default BlogService;
