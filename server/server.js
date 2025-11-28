import app from "./index.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import connectDb from "./config/connectDB.js";

const port = process.env.PORT || 8000;

const startServer = async function () {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log("Server running on port:", port);
    });
  } catch (error) {
    console.log(`Failed to connect DB`);
    process.exit(1);
  }
};

startServer();
