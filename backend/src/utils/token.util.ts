import { env, redisClient } from "../configs";
import { ERROR_RESPONSES } from "../constants";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (payload: { id: string; role: string }) => {
  try {
    const token = jwt.sign(payload, env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    throw new Error(ERROR_RESPONSES.ERROR_GENERATING_TOKEN);
  }
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET!) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const blacklistToken = async (token: string) => {
  try {
    await redisClient.set(token, "revoked", {
      EX: 3600,
    });
  } catch (err) {
    console.error("Error blacklisting token:", err);
  }
};

export const isTokenRevoked = async (token: string): Promise<boolean> => {
  try {
    const reply = await redisClient.get(token);
    return reply === "revoked";
  } catch (err) {
    return false;
  }
};
