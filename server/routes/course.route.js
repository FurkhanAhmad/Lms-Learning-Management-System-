// import express from "express";
// import {
//   createCourse,
//   createLecture,
//   editCourse,
//   editLecture,
//   getCourseById,
//   getCourseLecture,
//   getCreatorCourses,
//   getLectureById,
//   removeLecture,
//   togglePublishCourse,
//   getPublishedCourses,
//   searchCourse,
// } from "../controllers/course.controller.js";

// import isAuthenticated from "../middleware/isAuthenticated.js";
// import upload from "../utils/multer.js";


// const router = express.Router();



// router.post("/create", isAuthenticated, createCourse);
// // router.route("/search").get(isAuthenticated,searchCourse);
// router.route("/search").get(searchCourse); // Public search

// router.route("/edit/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
// router.route("/creator-course").get(isAuthenticated, getCreatorCourses);

// router.route("/published").get(getPublishedCourses); // ✅ must come before /:courseId
// router.route("/:courseId").get(isAuthenticated, getCourseById);
// router.route("/:courseId").put(isAuthenticated, togglePublishCourse);

// // Lecture routes
// // router.route("/:courseId/lectures").get(isAuthenticated, getCourseLecture);
// // router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
// // router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
// // router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
// // router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
// router.route("/:courseId/lectures").get(isAuthenticated, getCourseLecture);     // Get all lectures of course
// router.route("/:courseId/lecture").post(isAuthenticated, createLecture);        // Create a lecture

// router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);       // Get one lecture
// router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);     // Delete lecture

// router.route("/:courseId/lecture/:lectureId").put(isAuthenticated, editLecture); // ✅ Edit lecture

// export default router;





import express from "express";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorCourses,
  getLectureById,
  removeLecture,
  togglePublishCourse,
  getPublishedCourses,
  searchCourse,
} from "../controllers/course.controller.js";


import isAuthenticated from "../middleware/isAuthenticated.js";
import { uploadImage, uploadVideo } from "../utils/multer.js";

const router = express.Router();

router.post("/create", isAuthenticated, createCourse);
router.route("/search").get(searchCourse);

router.route("/edit/:courseId").put(isAuthenticated, uploadImage.single("courseThumbnail"), editCourse);

router.route("/creator-course").get(isAuthenticated, getCreatorCourses);
router.route("/published").get(getPublishedCourses);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId").put(isAuthenticated, togglePublishCourse);

// Lecture routes
router.route("/:courseId/lectures").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);

router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);

router.route("/:courseId/lecture/:lectureId").put(isAuthenticated, editLecture);

export default router;
