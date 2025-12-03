import express from "express";
import { addProjectMember, createProject, removeprojectMember } from "../controllers/projectController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/project/create").post(auth, createProject);
router.route("/project/add-member/:id").post(auth, addProjectMember);
router.route("/project/remove-member/:id").post(auth, removeprojectMember);

export default router;
