import { asyncHandler } from "../middlewares/asyncHandler.js";
import { userModel } from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export const fetchUsers = asyncHandler(async function (req, res, next) {
  const users = await userModel.find({});

  if (users.length <= 0) {
    return next(new AppError("Users not found!", 400));
  }

  res.status(200).json({
    success: true,
    message: "Fetch users successfully",
    users,
  });
});

export const registerUser = asyncHandler(async function (req, res, next) {
  const { name, email, password } = req.body;

  // if (!name || !email || !password) {
  //   return next(new AppError("Please fill all the required fields"));
  // }

  const user = await userModel.create({ name, email, password });
  console.log("user:", user);

  res.status(200).json({
    success: true,
    message: "Registered successfully",
    user,
  });
});
