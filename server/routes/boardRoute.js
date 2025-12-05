import express from "express";
import { renameBoardColumn } from "../controllers/boardController.js";

const router = express.Router();

router.route("/board/:boardId/column/:columnId").post(renameBoardColumn);

export default router;
