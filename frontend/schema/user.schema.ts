import z from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters"),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().trim(),
});


export const changePassSchema = z.object({
  oldPass: z.string().trim().min(6, "Old password must be at least 6 characters"),
  newPass: z.string().trim().min(6, "New password must be at least 6 characters"),
  confirmPass: z.string().trim().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.newPass === data.confirmPass, {
  message: "New passwords do not match",
  path: ["confirmPass"],
});