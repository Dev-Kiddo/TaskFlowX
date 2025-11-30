import express from "express";
import {
  deleteUser,
  fetchUsers,
  loginUser,
  logoutUser,
  registerUser,
  resendVerifyOtp,
  resetUserPassword,
  sendResetLink,
  updateUser,
  updateUserPassword,
  verifyUser,
} from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/users").get(fetchUsers).post(registerUser);
router.route("/users/:id").patch(auth, updateUser).delete(auth, deleteUser);
router.route("/update/:id").post(auth, updateUserPassword);
router.route("/change-password").post(updateUserPassword);
router.route("/verify").post(auth, verifyUser);
router.route("/resend-otp").get(auth, resendVerifyOtp);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/reset-otp").post(sendResetLink);
router.route("/reset/:id").post(resetUserPassword);

export default router;
