import mongoose from "mongoose";

const connectDb = async function () {
  try {
    const data = await mongoose.connect(process.env.MONGO_URI);
    console.log(`${data.connection.host} connected successfully`);
  } catch (error) {
    console.log("Database connection Error", error);
    process.exit(1);
  }
};

export default connectDb;
