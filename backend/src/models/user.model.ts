import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types";

export interface IUserModel extends Document, Omit<IUser, "_id"> {}

const userSchema = new Schema<IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model<IUserModel>("User", userSchema);
export default User;
