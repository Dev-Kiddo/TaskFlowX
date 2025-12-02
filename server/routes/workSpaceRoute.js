import express from "express";
import { createWorkspace } from "../controllers/workSpaceController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/workspace/create").post(auth, createWorkspace);
router.route("/workspace/invite").post(auth, createWorkspace);

export default router;
