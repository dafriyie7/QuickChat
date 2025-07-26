import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
	getMessages,
	getUsersForSideBar,
	markMessageAsSeen,
	sendMessage,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter
	.get("/users", protectRoute, getUsersForSideBar)
	.get("/:id", protectRoute, getMessages)
	.put('/mark/:id', protectRoute, markMessageAsSeen)
	.post('/send/:id', protectRoute, sendMessage)

export default messageRouter