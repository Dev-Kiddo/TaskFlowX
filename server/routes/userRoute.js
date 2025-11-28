import express from "express";
import { fetchUsers, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(fetchUsers).post(registerUser);

export default router;
