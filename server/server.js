import app from "./index.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import connectDb from "./config/connectDB.js";

const port = process.env.PORT || 8000;
let server;

process.on("uncaughtException", (err) => {
  console.log("Uncaught Error! Shutting down...", err.message);
  process.exit(1);
});

const startServer = async function () {
  try {
    await connectDb();

    server = app.listen(port, () => {
      console.log("Server running on port:", port);
    });
  } catch (error) {
    console.log(`Failed to connect DB`);
    process.exit(1);
  }
};
startServer();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down..", err.message);

  server.close(() => process.exit(1));
});
