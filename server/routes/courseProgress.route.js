import express from 'express'
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getCourseProgress, markAscompleted, markAsIncompleted, updateLectureProgress } from '../controllers/courseProgress.controller.js';
const router=express.Router()
router.route("/:courseId").get(isAuthenticated,getCourseProgress)
router.route("/:courseId/lecture/:lectureId/view").post(isAuthenticated,updateLectureProgress)
router.route("/:courseId/complete").post(isAuthenticated,markAscompleted);
router.route("/:courseId/incomplete").post(isAuthenticated,markAsIncompleted);

export default router;