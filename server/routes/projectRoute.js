import express from "express";
import { createProject } from "../controllers/projectController.js";

const router = express.Router();

router.route("/project/create").post(createProject);

export default router;
