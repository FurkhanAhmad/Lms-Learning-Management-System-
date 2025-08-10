



import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './database/db.js';
import userRoutes from './routes/user.route.js'
import courseRoute from './routes/course.route.js';
import mediaRouter from './routes/media.route.js';
import purchaseRoute from "./routes/puchaseCourse.route.js"
import { stripeWebhook } from "./controllers/coursePurchase.controller.js";
import courseProgressRoute from "./routes/courseProgress.route.js"
import mediaRoutes from "./routes/media.route.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Stripe webhook route — FIRST and RAW
app.post("/api/v1/purchase/webhook", express.raw({ type: "application/json" }), stripeWebhook);



// ✅ Now JSON parsing for all other routes
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// ✅ All normal routes
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoute);

app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);




app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
