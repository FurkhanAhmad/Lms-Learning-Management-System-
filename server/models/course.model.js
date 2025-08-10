// // models/course.model.js
// import mongoose from "mongoose";

// const courseSchema = new mongoose.Schema({
//   courseTitle: { type: String, required: true },
//   subTitle: String,
//   description: String,
//   category: { type: String, required: true },
//   courseLevel: String,
//   price: Number,
//   courseThumbnail: String,
//   isPublished: { type: Boolean, default: false },
//   lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
//   creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// });

// export const Course = mongoose.model("Course", courseSchema);

// models/course.model.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  subTitle: String,
  description: String,
  category: { type: String, required: true },
  courseLevel: String,
  price: Number,
  courseThumbnail: String,
  isPublished: { type: Boolean, default: false },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
  // ✅ Add this:
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  
},{
  timestamps: true,
});

export const Course = mongoose.model("Course", courseSchema);
