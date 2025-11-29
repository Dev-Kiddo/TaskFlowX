import express from "express";
import { fetchUsers, loginUser, registerUser, resendVerifyOtp, verifyUser } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/users").get(fetchUsers).post(registerUser);
router.route("/verify").post(auth, verifyUser);
router.route("/resend-otp").get(auth, resendVerifyOtp);
router.route("/login").post(loginUser);

export default router;
