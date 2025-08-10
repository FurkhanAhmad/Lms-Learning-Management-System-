




import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

// controllers/course.controller.js
// export const createCourse = async (req, res) => {
//   try {
//     const {
//       courseTitle,
//       subTitle,
//       description,
//       category,
//       courseLevel,
//       price,
 
//     } = req.body;

//     const file = req.file; // thumbnail

//     if (!courseTitle || !subTitle || !description || !category || !courseLevel || !price || !file) {
//       return res.status(400).json({ message: "All fields are required including thumbnail" });
//     }

//     const thumbnailData = await uploadMedia(file); // Cloudinary

//     const course = await Course.create({
//       courseTitle,
//       subTitle,
//       description,
//       category,
//       courseLevel,
//       price,
//       courseThumbnail: thumbnailData?.url,
//       publicId: thumbnailData?.public_id,
//       creator: req.user._id,
//     });


    
//     res.status(201).json({ message: "Course created", course });
//   } catch (err) {
//     res.status(500).json({ message: "Course creation failed", error: err.message });
//   }
// }


export const createCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      price,
    } = req.body;

    const file = req.file; // Thumbnail file

    if (!courseTitle || !subTitle || !description || !category || !courseLevel || !price || !file) {
      return res.status(400).json({ message: "All fields are required including thumbnail" });
    }

    const thumbnailData = await uploadMedia(file); // Upload to Cloudinary

    const course = await Course.create({
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      price,
      courseThumbnail: thumbnailData?.url,
      publicId: thumbnailData?.public_id,
      creator: req.user._id, // ✅ Save creator ID
      isPublished: true
    });

    res.status(201).json({ message: "Course created", course });
  } catch (err) {
    console.error("Course Creation Error:", err);
    res.status(500).json({ message: "Course creation failed", error: err.message });
  }
};



// export const searchCourse = async (req, res) => {
//   try {
//     const { query = "", categories = [], sortByPrice = "" } = req.query;
     
//     // Create the search query
//     const searchCriteria = {
//       isPublished: true,
//       $or: [
//         { courseTitle: { $regex: query, $options: "i" } },
//         { subTitle: { $regex: query, $options: "i" } },
//         { category: { $regex: query, $options: "i" } },
//       ],
//     };

//     // If categories are selected, add them to the filter
//     if (categories.length > 0) {
//       searchCriteria.category = { $in: categories };
//     }

//     // Define sorting order for price
//     const sortOptions = {};
//     if (sortByPrice === "low") {
//       sortOptions.coursePrice = 1; // Sort by price in ascending order
//     } else if (sortByPrice === "high") {
//       sortOptions.coursePrice = -1; // Sort by price in descending order
//     }

//     // Fetch the courses from the database
//     let courses = await Course.find(searchCriteria)
//       .populate({
//         path: "creator",
//         select: "name photoUrl",
//       })
//       .sort(sortOptions); // Apply sorting based on sortOptions

//     // Return response
//     return res.status(200).json({
//       success: true,
//       courses: courses || [],
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to search for courses",
//     });
//   }
// };





export const searchCourse = async (req, res) => {
  try {
    let { query = "", categories = "", sortByPrice = "" } = req.query;

    // Convert categories to array if provided
    if (typeof categories === "string" && categories.trim() !== "") {
      categories = categories.split(",").map((c) => c.trim());
    } else {
      categories = [];
    }

    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    if (categories.length > 0) {
      searchCriteria.category = { $in: categories };
    }

    const sortOptions = {};
    if (sortByPrice === "low") sortOptions.price = 1;
    else if (sortByPrice === "high") sortOptions.price = -1;

    const courses = await Course.find(searchCriteria)
      .populate({
        path: "creator",
        select: "name photoUrl",
      })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to search for courses",
    });
  }
};






 
export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate("creator", "name photoUrl");
    return res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get published courses" });
  }
};


// controllers/course.controller.js





export const getCreatorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.id })
   
    return res.status(200).json({ courses, message: "Courses fetched." });
  } catch (error) {
    console.error("Get Courses Error:", error);
    return res.status(500).json({ message: "Failed to fetch courses" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }
    const course = await Course.findById(courseId).populate("creator", "name photoUrl");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const { courseTitle, subTitle, description, category, courseLevel, price } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }

    if (req.file) {
      if (existingCourse.cloudinaryPublicId) {
        await deleteMediaFromCloudinary(existingCourse.cloudinaryPublicId);
      }
      const uploadResult = await uploadMedia(req.file.path, "images");
      existingCourse.courseThumbnail = uploadResult.secure_url;
      existingCourse.cloudinaryPublicId = uploadResult.public_id;
    }

    Object.assign(existingCourse, {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      price,
    });

    await existingCourse.save();
    res.status(200).json({ success: true, message: "Course updated successfully", course: existingCourse });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update course" });
  }
};


// ✅ CREATE LECTURE
export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureTitle, videoUrl, publicId, isPreviewFree } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    if (!lectureTitle) {
      return res.status(400).json({ message: "Lecture title is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const lecture = await Lecture.create({ lectureTitle, videoUrl, publicId, isPreviewFree });
    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({ lecture, message: "Lecture created successfully" });
  } catch (error) {
    console.error("Create Lecture Error:", error);
    return res.status(500).json({ message: error.message || "Failed to create lecture" });
  }
};

// ✅ GET COURSE LECTURES
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ lectures: course.lectures });
  } catch (error) {
    console.error("Get Lecture Error:", error);
    return res.status(500).json({ message: "Failed to fetch lectures" });
  }
};

// ✅ EDIT LECTURE
export const editLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const { lectureTitle, isPreviewFree, uploadVideoInfo } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(lectureId)) {
      return res.status(400).json({ message: "Invalid Course or Lecture ID" });
    }

    const course = await Course.findById(courseId);
    const lecture = await Lecture.findById(lectureId);

    if (!course || !lecture) {
      return res.status(404).json({ message: "Course or Lecture not found" });
    }

    lecture.lectureTitle = lectureTitle || lecture.lectureTitle;
    lecture.isPreviewFree = typeof isPreviewFree === "boolean" ? isPreviewFree : lecture.isPreviewFree;

    if (uploadVideoInfo?.videoUrl && uploadVideoInfo?.publicId) {
      lecture.videoUrl = uploadVideoInfo.videoUrl;
      lecture.publicId = uploadVideoInfo.publicId;
    }

    await lecture.save();

    return res.status(200).json({ message: "Lecture updated successfully", lecture });
  } catch (error) {
    console.error("Edit Lecture Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ DELETE LECTURE
export const removeLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(lectureId)) {
      return res.status(400).json({ message: "Invalid Course or Lecture ID" });
    }

    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found!" });

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    course.lectures = course.lectures.filter((id) => id.toString() !== lectureId);
    await course.save();

    return res.status(200).json({ message: "Lecture removed successfully." });
  } catch (error) {
    console.error("Remove Lecture Error:", error);
    return res.status(500).json({ message: "Failed to remove lecture" });
  }
};

// ✅ GET LECTURE BY ID
export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(lectureId)) {
      return res.status(400).json({ message: "Invalid Lecture ID" });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found!" });
    }

    return res.status(200).json({ lecture });
  } catch (error) {
    console.error("Get Lecture By Id Error:", error);
    return res.status(500).json({ message: "Failed to get lecture by id" });
  }
};

// ✅ TOGGLE PUBLISH STATUS OF A COURSE
export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.isPublished = !course.isPublished;
    await course.save();

    return res.status(200).json({
      message: `Course ${course.isPublished ? "published" : "unpublished"} successfully`,
      course,
    });
  } catch (error) {
    console.error("Toggle Publish Error:", error);
    return res.status(500).json({ message: "Failed to toggle course publish status" });
  }
};
