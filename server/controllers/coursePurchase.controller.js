




// import Stripe from "stripe";
// import mongoose from "mongoose";
// import { Course } from "../models/course.model.js";
// import { CoursePurchase } from "../models/coursePurchase.model.js";
// import { Lecture } from "../models/lecture.model.js";
// import { User } from "../models/user.model.js";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// //✅ Create Checkout Session
// export const createCheckoutSession = async (req, res) => {
//   try {
//     // const userId = req.id;
//     const userId = req.user._id;
//     const { courseId } = req.body;
//        console.log("🔍 Received courseId:", courseId);
//     // Validate courseId
//     if (!mongoose.isValidObjectId(courseId)) {
//       return res.status(400).json({ message: "Invalid course ID" });
//     }

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found!" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: course.courseTitle,
//               images: [course.courseThumbnail],
//             },
//             unit_amount: course.price * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `http://localhost:5173/course-progress/${courseId}`,
//       cancel_url: `http://localhost:5173/course-detail/${courseId}`,
//       metadata: {
//         courseId,
//         userId,
//       },
//       shipping_address_collection: {
//         allowed_countries: ["IN"],
//       },
//        customer_email: req.user.userEmail, 
//     });

//     if (!session.url) {
//       return res.status(400).json({ success: false, message: "Failed to create session" });
//     }

//     const newPurchase = new CoursePurchase({
//       courseId,
//       userId,
//       status: "pending",
//       paymentId: session.id,
//     });

//     await newPurchase.save();

//     return res.status(200).json({
//       success: true,
//       url: session.url,
//     });
//   } catch (error) {
//     console.error("Checkout Error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// // ✅ Stripe Webhook
// export const stripeWebhook = async (req, res) => {
//   let event;
//   try {
//     const signature = req.headers["stripe-signature"];
//     const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

//     event = stripe.webhooks.constructEvent(req.body, signature, secret);
//     console.log("✅ Webhook received:", event.type);
//   } catch (error) {
//     console.error("❌ Webhook verification failed:", error.message);
//     return res.status(400).send(`Webhook error: ${error.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     try {
//       const rawSession = event.data.object;

//       const session = await stripe.checkout.sessions.retrieve(rawSession.id, {
//         expand: ["line_items"],
//       });

//       const { userId, courseId } = session.metadata;

//       const purchase = await CoursePurchase.findOne({
//         paymentId: session.id,
//       }).populate("courseId");

//       if (!purchase) {
//         console.warn("⚠️ Purchase not found for session:", session.id);
//         return res.status(404).json({ message: "Purchase not found" });
//       }

//       purchase.status = "completed";
//       purchase.amount =
//         session.amount_total
//           ? session.amount_total / 100
//           : session.line_items?.data?.[0]?.amount_total
//           ? session.line_items.data[0].amount_total / 100
//           : 0;

//       await purchase.save();
//       console.log("✅ Purchase updated with amount:", purchase.amount);

//       if (purchase.courseId?.lectures?.length > 0) {
//         await Lecture.updateMany(
//           { _id: { $in: purchase.courseId.lectures } },
//           { $set: { isPreviewFree: true } }
//         );
//       }

//       await User.findByIdAndUpdate(userId, {
//         $addToSet: { enrolledCourses: purchase.courseId._id },
//       });

//       await Course.findByIdAndUpdate(courseId, {
//         $addToSet: { enrolledStudents: userId },
//       });
//     } catch (error) {
//       console.error("❌ Error processing session:", error);
//       return res.status(500).json({ message: "Webhook handling failed" });
//     }
//   }

//   res.status(200).send();
// };

// // ✅ Get Course Detail With Purchase Status
// export const getCourseDetailWithPurchaseStatus = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.user._id;

//     if (!mongoose.isValidObjectId(courseId)) {
//       return res.status(400).json({ message: "Invalid course ID" });
//     }

//     const course = await Course.findById(courseId)
//       .populate("creator")
//       .populate("lectures");

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     const purchased = await CoursePurchase.findOne({ userId, courseId });

//     return res.status(200).json({
//       course,
//       purchased: !!purchased,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get All Purchased Courses
// export const getAllPurchasedCourse = async (req, res) => {
//   try {
//     const purchasedCourse = await CoursePurchase.find({
//       status: "completed",
//     }).populate("courseId");

//     return res.status(200).json({
//       purchasedCourse,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



import Stripe from "stripe";
import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user?._id;
    const userEmail = req.user?.email;
    const { courseId } = req.body;

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle || "Untitled Course",
              images: [course.courseThumbnail?.startsWith("http") ? course.courseThumbnail : "https://placehold.co/300x200"],
            },
            unit_amount: Math.round(course.price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/course-progress/${courseId}`,
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId: courseId.toString(),
        userId: userId.toString(),
      },
      customer_email: typeof userEmail === "string" && userEmail.includes("@") ? userEmail : "test@example.com",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    await CoursePurchase.create({
      courseId,
      userId,
      status: "pending",
      paymentId: session.id,
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("❌ Checkout Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Stripe Webhook
export const stripeWebhook = async (req, res) => {
  let event;
  try {
    const signature = req.headers["stripe-signature"];
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    event = stripe.webhooks.constructEvent(req.body, signature, secret);
    console.log("✅ Webhook received:", event.type);
  } catch (error) {
    console.error("❌ Webhook verification failed:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    try {
      const rawSession = event.data.object;

      const session = await stripe.checkout.sessions.retrieve(rawSession.id, {
        expand: ["line_items"],
      });

      const { userId, courseId } = session.metadata;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate("courseId");

      if (!purchase) {
        console.warn("⚠️ Purchase not found for session:", session.id);
        return res.status(404).json({ message: "Purchase not found" });
      }

      purchase.status = "completed";
      purchase.amount =
        session.amount_total
          ? session.amount_total / 100
          : session.line_items?.data?.[0]?.amount_total
          ? session.line_items.data[0].amount_total / 100
          : 0;

      await purchase.save();
      console.log("✅ Purchase updated with amount:", purchase.amount);

      // Free all lectures (optional logic)
      if (purchase.courseId?.lectures?.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await User.findByIdAndUpdate(userId, {
        $addToSet: { enrolledCourses: purchase.courseId._id },
      });

      await Course.findByIdAndUpdate(courseId, {
        $addToSet: { enrolledStudents: userId },
      });
    } catch (error) {
      console.error("❌ Error processing webhook session:", error);
      return res.status(500).json({ message: "Webhook handling failed" });
    }
  }

  res.status(200).send(); // must return 200
};

// ✅ Get Course Detail With Purchase Status
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log("❌ Course detail error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Purchased Courses
export const getAllPurchasedCourse = async (req, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({ purchasedCourse });
  } catch (error) {
    console.log("❌ Get all purchased error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};










