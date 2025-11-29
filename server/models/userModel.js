import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyOtp: {
    type: Number,
    default: null,
  },
  verifyOtpExpiry: {
    type: Date,
    default: null,
  },
  resetOtp: {
    type: Number,
    default: null,
  },
  resetOtpExpiry: {
    type: Date,
    default: null,
  },
});

// Hasing password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.verifyPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

export const userModel = mongoose.model("user", userSchema);
