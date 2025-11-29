import { asyncHandler } from "../middlewares/asyncHandler.js";
import { userModel } from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import { sendMail } from "../utils/nodeMailer.js";
import { generateOtp } from "../utils/generateOTP.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

  if (!name || !email || !password) {
    return next(new AppError("Please fill all the required fields", 400));
  }

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return next(new AppError("Email already exists, please try to login", 400));
  }

  const otp = generateOtp();

  await sendMail(
    email,
    "TaskFlowX | OTP to Verify Email",
    `<h4>Hi ${name}, Verify Your Email Address</h4>
     <p>Verify your email to finish signing up with TaskFlowX. Use the following verification code:</p>
     <h1>${otp}</h1>
     <p>The verification code is valid for 15 minutes.</p>`
  );

  const user = await userModel.create({ name, email, password, verifyOtp: otp, verifyOtpExpiry: new Date(Date.now() + 15 * 60 * 1000) });

  const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res
    .status(200)
    .cookie("accessToken", token, { expires: new Date(Date.now() + 86400000) })
    .json({
      success: true,
      message: "Verify OTP sent successfully, Please check your inbox",
      user,
    });
});

export const verifyUser = asyncHandler(async function (req, res, next) {
  const { otp } = req.body;

  const user = await userModel.findById(req.user);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (new Date() > user.verifyOtpExpiry) {
    return next(new AppError("OTP has expired. Please request a new one", 404));
  }

  if (user.verifyOtp !== Number(otp)) {
    return next(new AppError("OTP is incorrect, Please check", 404));
  }

  user.isVerified = true;
  user.verifyOtp = null;
  user.verifyOtpExpiry = null;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Verified successfully",
  });
});

export const resendVerifyOtp = asyncHandler(async function (req, res, next) {
  const user = await userModel.findById(req.user);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.isVerified) {
    return next(new AppError("account already verified", 404));
  }

  const otp = generateOtp();

  user.verifyOtp = otp;
  user.verifyOtpExpiry = new Date(Date.now() + 15 * 60 * 1000);

  await sendMail(
    user.email,
    "TaskFlowX | OTP to Verify Email",
    `<h4>Hi ${user.name}, Verify Your Email Address</h4>
     <p>Verify your email to finish signing up with TaskFlowX. Use the following verification code:</p>
     <h1>${otp}</h1>
     <p>The verification code is valid for 15 minutes.</p>`
  );

  await user.save();

  res.status(200).json({
    success: true,
    message: "Verify OTP sent successfully, Please check your inbox",
  });
});

export const loginUser = asyncHandler(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please fill all the required fields", 400));
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new AppError("User not found, please signup", 404));
  }

  const isPasswordValid = await user.verifyPassword(password);

  if (!isPasswordValid) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res
    .status(200)
    .cookie("accessToken", token, { expires: new Date(Date.now() + 86400000) })
    .json({
      success: true,
      message: "Login successfully",
    });
});

export const logoutUser = asyncHandler(async function (req, res, next) {
  res.cookie("accessToken", null, { expires: new Date(Date.now()) });

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});
