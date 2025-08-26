import mongoose from "mongoose";
import { env } from "./env.config";

const connectDB = async () => {
  try {
    const mongoURI = env.DATABASE_URL as string; 
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export {connectDB};
