import { userInstance } from "@/axios/instances.axios";
import { IChangePassForm } from "@/types/user.types";
import { Axios, AxiosError } from "axios";

export const UserServices = {
  changePassword: async (data: IChangePassForm) => {
    try {
      const response = await userInstance.put("/change-password", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      console.log(err.response?.data.error);
      const message = err.response?.data?.error || "Failed to change password";
      throw new Error(message);
    }
  },
};
