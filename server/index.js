import express from "express";
import userRouter from "./routes/userRoute.js";
import { handleError } from "./middlewares/handleError.js";

const app = express();

app.use("/api/v1", userRouter);

app.use(handleError);

export default app;
