import express from "express";
import {
	checkAuth,
	login,
	signup,
	updateProfile,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter
	.post("/signup", signup)
	.post("/login", login)
	.put("/update-profile", protectRoute, updateProfile)
	.get("/check", protectRoute, checkAuth);


	export default userRouter