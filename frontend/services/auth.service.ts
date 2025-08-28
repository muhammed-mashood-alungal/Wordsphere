import { authInstance } from "@/axios/instances.axios";
import { RegisterFormData } from "@/types/user.types";

const AuthService = {
  register: async (data: RegisterFormData) => {
    try {
      const response = await authInstance.post("/signup", data);
      return response.data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  login: async (data: { email: string; password: string }) => {
    try {
      const response = await authInstance.post("/signin", data);
      return response.data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await authInstance.post("/logout");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  authMe: async () => {
    try {
      const response = await authInstance.get("/me");
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export default AuthService;
