import express from "express";
import { uploadVideo } from "../utils/multer.js"; // multer uploader for videos
import { uploadVideoCloudinary } from "../utils/cloudinary.js"; // cloudinary video upload

const router = express.Router();

router.post("/upload-video", uploadVideo.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadVideoCloudinary(req.file.path);

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload video",
    });
  }
});

export default router;
