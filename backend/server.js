import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to MongoDB & Cloudinary
connectDB();
connectCloudinary();

// ✅ Middleware
app.use(express.json());

// ✅ CORS setup for frontend live & local
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173", // Vercel or local frontend
    ],
    credentials: true,
  })
);

// ✅ Serve static uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start Server
app.listen(port, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);
