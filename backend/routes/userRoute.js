import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  updateUser, // ✅ Import update controller
} from "../controllers/userController.js";

const userRouter = express.Router();

// 📝 User Auth Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);

// 🔄 Update Profile (phone/address)
userRouter.put("/update", updateUser); // ✅ Secure route with token

export default userRouter;
