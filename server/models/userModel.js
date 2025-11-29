import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Usernmame is required"],
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
});

// Hasing password before save
userSchema.pre("save", async function () {
  console.log("Middleware: Running before save");

  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const userModel = mongoose.model("user", userSchema);
