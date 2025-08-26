import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production"] }),
  PORT: num({ default: 3000 }),
  DATABASE_URL: str(),
});
