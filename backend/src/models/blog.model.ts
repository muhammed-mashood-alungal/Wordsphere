import mongoose, { Document, Schema } from "mongoose";
import { IBlog } from "../types";

export interface IBlogModel extends Document, Omit<IBlog, "_id"> {}

const blogSchema = new Schema<IBlogModel>(
  {
    title: {
      type: String,
      required: true,
      index: true
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

export const Blog = mongoose.model<IBlogModel>("Blog", blogSchema);