import mongoose, { Mongoose } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    workSpaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
    },
    name: {
      type: String,
      required: [true, "Project name required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Project description required"],
    },
    projectLead: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "need project default member"],
      },
    ],
  },
  { timestamps: true }
);

export const projectModel = mongoose.model("project", projectSchema);
