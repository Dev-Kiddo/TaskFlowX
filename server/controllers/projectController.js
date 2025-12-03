import { asyncHandler } from "../middlewares/asyncHandler.js";
import { projectModel } from "../models/projectModel.js";
import { workSpaceModel } from "../models/workSpaceModel.js";
import AppError from "../utils/AppError.js";

export const createProject = asyncHandler(async function (req, res, next) {
  const { workspaceId, name, description } = req.body;

  const workspace = await workSpaceModel.findById(workspaceId);

  if (!workspace) {
    return next(new AppError("Workspace not found", 404));
  }

  const project = await projectModel.create({
    workSpaceId: workspace._id,
    name,
    description,
    projectLead: workspace.owner,
    members: [...workspace.members],
  });

  res.status(200).json({
    success: true,
    message: "Project created successfully",
    project,
  });
});
