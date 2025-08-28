import { authInstance } from "@/axios/instances.axios";
import { RegisterFormData } from "@/types/user.types";
import { AxiosError } from "axios";

const AuthService = {
  register: async (data: RegisterFormData) => {
    try {
      const response = await authInstance.post("/signup", data);
      return response.data?.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to register";
      throw new Error(message);
    }
  },
  login: async (data: { email: string; password: string }) => {
    try {
      const response = await authInstance.post("/signin", data);
      return response.data?.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to login";
      throw new Error(message);
    }
  },
  logout: async () => {
    try {
      const response = await authInstance.post("/logout");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to logout";
      throw new Error(message);
    }
  },
  authMe: async () => {
    try {
      const response = await authInstance.get("/me");
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to fetch user";
      throw new Error(message);
    }
  },
};

export default AuthService;
