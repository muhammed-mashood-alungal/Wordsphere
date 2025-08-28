import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types";

export interface IUserModel extends Document, Omit<IUser, "_id"> {}

const userSchema = new Schema<IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      index: true
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model<IUserModel>("User", userSchema);
