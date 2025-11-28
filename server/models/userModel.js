import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Usernmame is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password id required"],
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

export const userModel = mongoose.model("user", userSchema);
