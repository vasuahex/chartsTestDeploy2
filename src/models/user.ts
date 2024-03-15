import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    verifyToken: {
      type: String,
      required: false
    },
    verifyTokenExpires: {
      type: Date,
      required: false
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;