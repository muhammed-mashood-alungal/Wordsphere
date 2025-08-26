import { Response } from "express";

export const successResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = {}
) => {
  res.status(status).json({
    status: "success",
    message,
    data,
  });
};
