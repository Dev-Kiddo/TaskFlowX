import { asyncHandler } from "../middlewares/asyncHandler.js";
import boardModel from "../models/boardModel.js";
import { projectModel } from "../models/projectModel.js";
import { workSpaceModel } from "../models/workSpaceModel.js";
import AppError from "../utils/AppError.js";

export const createProject = asyncHandler(async function (req, res, next) {
  const { workspaceId, name, description } = req.body;
  console.log(req.user);

  const workspace = await workSpaceModel.findById(workspaceId);

  if (!workspace) {
    return next(new AppError("Workspace not found", 404));
  }

  const project = await projectModel.create({
    workSpaceId: workspace._id,
    name,
    description,
    projectLead: workspace.owner,
    members: [req.user],
  });

  await boardModel.create({
    projectId: project._id,
    columns: [
      { title: "To Do", order: 1 },
      { title: "In Progress", order: 2 },
      { title: "Done", order: 3 },
    ],
  });

  res.status(200).json({
    success: true,
    message: "Project created successfully",
    project,
  });
});

export const addProjectMember = asyncHandler(async function (req, res, next) {
  const { userId } = req.body;

  const project = await projectModel.findById(req.params.id);

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  if (project.members.includes(userId)) {
    return next(new AppError("User already a member in this project", 404));
  }

  project.members.push(userId);

  await project.save();

  res.status(200).json({
    success: true,
    message: "member added to a project successfully",
    project,
  });
});

export const removeprojectMember = asyncHandler(async function (req, res, next) {
  const { userId } = req.body;

  const project = await projectModel.findById(req.params.id);

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  if (!project.members.includes(userId)) {
    return next(new AppError("This user not exits in this project", 404));
  }

  const newMembers = project.members.filter((user) => user.toString() !== userId);

  project.members = newMembers;

  await project.save();

  res.status(200).json({
    success: true,
    message: "member removed from a project successfully",
    project,
  });
});

export const listProjects = asyncHandler(async function (req, res, next) {
  const { id } = req.params;

  const project = await projectModel.find({ workSpaceId: id });

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "fetch projects successfully",
    project,
  });
});
