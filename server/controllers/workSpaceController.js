import { asyncHandler } from "../middlewares/asyncHandler.js";
import { workSpaceModel } from "../models/workSpaceModel.js";
import AppError from "../utils/AppError.js";

export const createWorkspace = asyncHandler(async function (req, res, next) {
  const { name, description } = req.body;

  const workspace = await workSpaceModel.create({
    name,
    description,
    owner: req.user,
    member: [req.user],
  });

  res.status(200).json({
    success: true,
    message: "Workspace created successfully",
    workspace,
  });
});

export const inviteWorkSpace = asyncHandler(async function (req, res, next) {
  const { workspaceId, userId } = req.body;

  const workspace = await workSpaceModel.findById(workspaceId);

  if (!workspace) {
    return next(new AppError("Workspace not found", 404));
  }

  if (workspace.owner.toString() !== req.user) {
    return next(new AppError("Only owner can invite members", 404));
  }

  if (workspace.members.includes(userId)) {
    return next(new AppError("User already a member in this workspace", 404));
  }

  workspace.members.push(userId);

  await workspace.save();

  res.status(200).json({
    success: true,
    message: "Member added  successfully",
    workspace,
  });
});
