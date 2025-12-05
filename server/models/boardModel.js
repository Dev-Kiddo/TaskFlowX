import mongoose from "mongoose";

const boardSchema = mongoose.Schema({
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "project",
    required: true,
  },
  columns: [
    {
      title: {
        type: String,
        required: true,
      },
      order: {
        type: String,
        required: true,
      },
    },
  ],
});

const boardModel = mongoose.model("board", boardSchema);

export default boardModel;
