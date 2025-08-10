import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { Course } from "../models/course.model.js";


//For User Register..
export const register=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
                return res.status(400).json({
                    success:false,
                    message:"All fields are required"
                })
        }
          
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist with this email."
            })
        }
         
        const hashedPassword=await bcrypt.hash(password,10);

            await User.create({
                name,   // or name:name,
                email,  //or email:email, we can write like this ,but these are key name and name are same
                password:hashedPassword
            })
            return res.status(201).json({
                success:true,
                message:"Account created successfully"
            })
    } catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Failed to register"
      })
  }
}


//For Loging..
export const login =async(req,res)=>{
     try{
         const {email,password}=req.body
         
         if( !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
    }
    //check email for login
       const user=await User.findOne({email});
       if(!user){
         return res.status(400).json({
            success:false,
            message:"Incorrect email or password"
         })
       
        }
         //check password for login......
        const isPassword=await bcrypt.compare(password,user.password); 
        console.log("user.password" , user.password)
        console.log("password",password)
              if(!isPassword){
               return res.status(400).json({
                 success:false,
                message:"Incorrect email or password"
               })
              }
            //Generate JWT TOKEN For Authentication.-> we will check it in authentication one time i have logged in,that is logged in or not
            //Authentication->that is logged in or not ..
            generateToken(res,user,`Welcome back ${user.name}`) //In Utils..
 
     }catch(error){
        console.log(error);
      return res.status(500).json({
        success:false,
        message:"Failed to register"
      })
     }
}

export const logout=async(_,res)=>{
  try{
      return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logged out successfully.",
        success:true
      })
  }catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Failed to logout"
      })
  }
}

//Profile..
// export const getUserProfile = async (req,res) => {
//     try {
//         // const userId = req.id;
//          const userId = req.user._id;
//         const user = await User.findById(userId).select("-password").populate("enrolledCourses")
//         if(!user){
//             return res.status(404).json({
//                 message:"Profile not found",
//                 success:false
//             })
//         }
//         return res.status(200).json({
//             success:true,
//             user,
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Failed to load user"
//         })
//     }
// }




export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password").populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "Profile not found", success: false });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("getUserProfile error:", error);  // <-- Add this for debugging
    return res.status(500).json({ success: false, message: "Failed to load user" });
  }
};




// export const updateProfile = async (req, res) => {
//   try {
//     // const userId = req.id; // ✅ fix here
//      const userId = req.user._id;
//     const { name } = req.body;
//     const profilePhoto = req.file;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     if (user.photoUrl) {
//       const publicId = user.photoUrl.split("/").pop().split(".")[0];
//       await deleteMediaFromCloudinary(publicId);
//     }

//     const cloudResponse = await uploadMedia(profilePhoto.path);
//     const photoUrl = cloudResponse.secure_url;

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { name, photoUrl },
//       { new: true }
//     ).select("-password");

//     return res.status(200).json({
//       success: true,
//       user: updatedUser,
//       message: "Profile updated successfully.",
//     });
//   } catch (error) {
//     console.error("Profile update error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update profile",
//     });
//   }
// };




export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    if (user.photoUrl && profilePhoto) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0];
      await deleteMediaFromCloudinary(publicId);
    }

    if (!profilePhoto) {
      const updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true }).select("-password");
      return res.status(200).json({ success: true, user: updatedUser, message: "Profile updated successfully." });
    }

    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.url || cloudResponse.secure_url;

    const updatedUser = await User.findByIdAndUpdate(userId, { name, photoUrl }, { new: true }).select("-password");
    return res.status(200).json({ success: true, user: updatedUser, message: "Profile updated successfully." });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ success: false, message: "Failed to update profile", error: error.message });
  }
};
