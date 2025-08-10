import multer from "multer";
import path from "path";

// Storage for images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Storage for videos
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filters
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const videoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"), false);
  }
};

// Export uploaders
export const uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter });
export const uploadVideo = multer({ storage: videoStorage, fileFilter: videoFilter });
