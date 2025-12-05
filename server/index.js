import express from "express";
import userRouter from "./routes/userRoute.js";
import workSpaceRouter from "./routes/workSpaceRoute.js";
import projectRouter from "./routes/projectRoute.js";
import boardRouter from "./routes/boardRoute.js";
import { handleError } from "./middlewares/handleError.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", userRouter);
app.use("/api/v1", workSpaceRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", boardRouter);

app.use(handleError);

export default app;
