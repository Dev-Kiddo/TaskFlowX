import express from "express";
import { createWorkspace, getAllMyWorkSpaces, inviteWorkSpace } from "../controllers/workSpaceController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/workspace/create").post(auth, createWorkspace);
router.route("/workspace/invite").post(auth, inviteWorkSpace);
router.route("/workspace").get(auth, getAllMyWorkSpaces);

export default router;
