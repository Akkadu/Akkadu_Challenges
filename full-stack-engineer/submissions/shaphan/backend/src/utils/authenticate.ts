import { Request, Response } from "express";
import { findUserById } from "../services/accounts.service";
import { verifyToken } from "./jwtHelper";

export default async (req: Request, res: Response, next: () => void) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this page",
    });
  }
  const data = await verifyToken(token);

  if (data.error) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this page",
    });
  }
  const user = await findUserById(data.id || 0);
  res.locals.user = user;
  next();
};
