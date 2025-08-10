// import express from 'express';
// import { getUserProfile, login, logout, register, updateProfile } from '../controllers/user.controller.js';
// import isAuthenticated from '../middleware/isAuthenticated.js';
// import  upload  from "../utils/multer.js";


// import { uploadImage } from "../utils/multer.js";

// const router=express.Router();

// router.route("/register").post(register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile").get(isAuthenticated, getUserProfile);
// router.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto"),updateProfile)
// router.post(
//   "/create",
//   isAuthenticated,
//   uploadImage.single("courseThumbnail"),
//   createCourse
// );


// export default router;





import express from 'express';
import { getUserProfile, login, logout, register, updateProfile } from '../controllers/user.controller.js';
import { createCourse } from '../controllers/course.controller.js';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { uploadImage } from "../utils/multer.js"; // named import only

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);

// For profile photo upload (image)
router.route("/profile/update").put(
  isAuthenticated,
  uploadImage.single("profilePhoto"),
  updateProfile
);

// For course thumbnail upload (image)
router.post(
  "/create",
  isAuthenticated,
  uploadImage.single("courseThumbnail"),
  createCourse
);

export default router;

