import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: [true, "username already exists"],
    },
    email: {
      type: String,
      unique: [true, "email already exists"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
