import { userInstance } from "@/axios/instances.axios";
import { IChangePassForm } from "@/types/user.types";
import { AxiosError } from "axios";

export const UserServices = {
  changePassword: async (data: IChangePassForm) => {
    try {
      const response = await userInstance.put("/change-password", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to change password";
      throw new Error(message);
    }
  },
  getUsers: async (page: number, limit: number, search: string) => {
    try {
      const response = await userInstance.get("/", {
        params: { page, limit, search },
      });
      return response.data.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to fetch users";
      throw new Error(message);
    }
  },
  delete: async (id: string) => {
    try {
      const response = await userInstance.delete(`/${id}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to delete user";
      throw new Error(message);
    }
  },
  restore: async (id: string) => {
    try {
      const response = await userInstance.patch(`/${id}/restore`);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to restore user";
      throw new Error(message);
    }
  },
};
