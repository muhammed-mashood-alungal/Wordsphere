import { loginSchema, registerSchema } from "@/schema/user.schema";
import z from "zod";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChangePassForm {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}