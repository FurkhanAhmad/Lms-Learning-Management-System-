import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload image
export const uploadMedia = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    folder: "lms_images",
  });
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

// Upload video
export const uploadVideoCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    folder: "lms_videos",
  });
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

// Delete image or other media
export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("❌ Cloudinary Delete Error:", error);
  }
};

// Delete video
export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
  } catch (error) {
    console.error("❌ Cloudinary Video Delete Error:", error);
  }
};
