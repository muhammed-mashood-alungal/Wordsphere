
export const ERROR_RESPONSES = {
  NOT_FOUND: "Endpoint Not Found",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  USER_NOT_FOUND: "User Not Found",
  USER_ALREADY_EXISTS: "User Already Exists",
  ERROR_GENERATING_TOKEN: "Error generating token",
  INVALID_CREDENTIALS: "Invalid Credentials",
  NO_TOKEN_PROVIDED: "No token provided",
  TOKEN_REVOKED: "Token has been revoked",
  INVALID_TOKEN: "Invalid token",
  OLD_PASSWORD_INCORRECT: "Old password is incorrect",
  ACCOUNT_BANNED: "Account has been banned",
  FORBIDDEN: "Access denied. Admins only.",
} as const;
