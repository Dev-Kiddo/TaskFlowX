import express from "express";
import { fetchUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(fetchUsers);

export default router;
