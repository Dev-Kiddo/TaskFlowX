import { asyncHandler } from "../middlewares/asyncHandler.js";
import { workSpaceModel } from "../models/workSpaceModel.js";

export const createWorkspace = asyncHandler(async function (req, res, next) {
  const { name, description } = req.body;

  const workspace = await workSpaceModel.create({
    name,
    description,
    owner: req.user,
  });

  res.status(200).json({
    success: true,
    message: "Workspace created successfully",
    workspace,
  });
});
