import mongoose from "mongoose";

const userActivationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
}, { timestamps: true });

export const UserActivation = mongoose.model("UserActivation", userActivationSchema);
