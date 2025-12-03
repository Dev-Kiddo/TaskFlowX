import express from "express";
import { addProjectMember, createProject, listProjects, removeprojectMember } from "../controllers/projectController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/project/create").post(auth, createProject);
router.route("/project/add-member/:id").post(auth, addProjectMember);
router.route("/project/remove-member/:id").post(auth, removeprojectMember);
router.route("/project/:id").get(auth, listProjects);

export default router;
