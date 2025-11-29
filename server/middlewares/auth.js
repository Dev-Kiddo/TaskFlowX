import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "./asyncHandler.js";

export const auth = asyncHandler(async function (req, res, next) {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new AppError("Authentication missing, Please login again"));
  }

  const verifyToken = await jwt.verify(accessToken, process.env.JWT_SECRET);

  req.user = verifyToken.user;

  next();
});
