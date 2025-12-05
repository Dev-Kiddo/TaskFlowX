import { asyncHandler } from "../middlewares/asyncHandler.js";
import boardModel from "../models/boardModel.js";
import AppError from "../utils/AppError.js";

export const renameBoardColumn = asyncHandler(async function (req, res, next) {
  const { title } = req.body;

  const board = await boardModel.findById(req.params.boardId);
  console.log(board);

  if (!board) {
    return next(new AppError("Board not found", 404));
  }

  const column = board.columns.id(req.params.columnId);

  if (!column) {
    return next(new AppError("Column not found", 404));
  }

  column.title = title;

  await board.save();

  res.status(200).json({
    success: true,
    message: "Column renamed successfully",
    board,
  });
});
