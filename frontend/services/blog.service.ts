import { blogInstance } from "@/axios/instances.axios";
import { IBlogFormData } from "@/types/blog.types";
import { AxiosError } from "axios";

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
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to fetch blogs";
      throw new Error(message);
    }
  },
  getAllBlogs: async (
    page: number,
    limit: number,
    search: string,
    author?: string
  ) => {
    try {
      const response = await blogInstance.get("/all", {
        params: { page, limit, search, author },
      });
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to fetch all blogs";
      throw new Error(message);
    }
  },
  create: async (data: IBlogFormData, author: string) => {
    try {
      const response = await blogInstance.post("/", { ...data, author });
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to create blog";
      throw new Error(message);
    }
  },
  update: async (id: string, data: IBlogFormData) => {
    try {
      const response = await blogInstance.put(`/${id}`, data);
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to update blog";
      throw new Error(message);
    }
  },
  delete: async (id: string) => {
    try {
      await blogInstance.delete(`/${id}`);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to delete blog";
      throw new Error(message);
    }
  },
  restore: async (id: string) => {
    try {
      const response = await blogInstance.patch(`/${id}/restore`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to restore blog";
      throw new Error(message);
    }
  },
};

export default BlogService;
