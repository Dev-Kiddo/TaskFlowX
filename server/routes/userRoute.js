import express from "express";
import { deleteUser, fetchUsers, loginUser, logoutUser, registerUser, resendVerifyOtp, updateUser, verifyUser } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/users").get(fetchUsers).post(registerUser);
router.route("/users/:id").patch(auth, updateUser).delete(auth, deleteUser);
router.route("/verify").post(auth, verifyUser);
router.route("/resend-otp").get(auth, resendVerifyOtp);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

export default router;
