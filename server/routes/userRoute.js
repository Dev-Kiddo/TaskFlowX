import express from "express";
import { fetchUsers, registerUser } from "../controllers/userController.js";
import { registerValidator, validate } from "../middlewares/validate.js";

const router = express.Router();

router.route("/users").get(fetchUsers).post(registerValidator, validate, registerUser);

export default router;
