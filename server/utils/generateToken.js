
// import jwt from "jsonwebtoken";

// export const generateToken = (res, user, message) => {
//   const token = jwt.sign(
//     ({ userId: user._id }, //payload
//         process.env.SECRET_KEY, //Sercret
//          { expires: "1d" }) //Options (use 'expij)
//   );
//   return res
//     .status(200)
//     .cookie("token", token, {
//       httpOnly: true, 
//       sameSite: "strict",
     
//       //Here's why httpOnly: true and sameSite: "strict" are used in your cookie configuration:
//       maxAge: 24 * 60 * 60 * 1000,//For one day Max age work as a expriry
//     }).json({
//         success:true,
//         message,
//         user
//     })
// };

// export default  generateToken;

import jwt from "jsonwebtoken";
export const generateToken = (res, user, message) =>{
  const token = jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    })
    .json({
      success: true,
      message,
      user
    });
};
