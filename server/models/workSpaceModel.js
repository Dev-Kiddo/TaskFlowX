import mongoose from "mongoose";

const workSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Workspace name required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Workspace description required"],
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const workSpaceModel = mongoose.model("workspace", workSpaceSchema);
