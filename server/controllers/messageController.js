// import Message from "../models/message.js";
import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";
import {io, userSocketMap} from "../server.js"

// get all users except the logged in user
// export const getUsersForSideBar = async (req, res) => {
// 	try {
// 		const userId = req.user._id;
// 		const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
// 			"-password"
// 		);

// 		// count number of unread messages
// 		const unseenMessages = {};
// 		const promises = filteredUsers.map(async (user) => {
// 			const messages = await Message.find({
// 				senderId: user._id,
// 				receiverId: userId,
// 			});

// 			if (messages.length > 0) {
// 				unseenMessages[user._id] = messages.length;
// 			}
// 		});

// 		await Promise.all(promises);
// 		res.status(200).json({
// 			success: true,
// 			users: filteredUsers,
// 			unseenMessages,
// 		});
// 	} catch (error) {
// 		console.log(error.message);
// 		res.status(500).json({ success: false, message: error.message });
// 	}
// };

export const getUsersForSideBar = async (req, res) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized" });
		}

		const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
			"-password"
		);

		const unseenMessages = {};
		const promises = filteredUsers.map(async (user) => {
			const count = await Message.countDocuments({
				senderId: user._id,
				receiverId: userId,
				seen: false, // 🔍 Only unread messages
			});

			if (count > 0) {
				unseenMessages[user._id] = count;
			}
		});

		await Promise.all(promises);

		res.status(200).json({
			success: true,
			users: filteredUsers,
			unseenMessages,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

// get all messages for the selected user
// export const getMessages = async (req, res) => {
// 	try {
// 		const { id: selectedUserId } = req.params;
// 		const myId = req.user._id;

// 		const messages = await Message.find({
// 			$or: [
// 				{ senderId: myId, receiverId: selectedUserId },
// 				{ senderid: selectedUserId, receiverId: myId },
// 			],
// 		});

// 		await Message.updateMany(
// 			{ senderId: selectedUserId, receiverId: myId },
// 			{ seen: true }
// 		);

// 		res.status(200).json({ success: true, messages });
// 	} catch (error) {
// 		console.log(error.message);
// 		res.status(500).json({ success: false, message: error.message });
// 	}
// };
export const getMessages = async (req, res) => {
	try {
		const { id: selectedUserId } = req.params;
		const myId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: selectedUserId },
				{ senderId: selectedUserId, receiverId: myId },
			],
		}).sort({ createdAt: 1 }); // oldest to newest

		// mark all messages from selected user to me as seen
		await Message.updateMany(
			{ senderId: selectedUserId, receiverId: myId, seen: false },
			{ $set: { seen: true } }
		);

		res.status(200).json({ success: true, messages });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

//mark message as seen using id
export const markMessageAsSeen = async (req, res) => {
	try {
		const { id } = req.params;
		await Message.findByIdAndUpdate(id, { seen: true });

		res.status(200).json({success: true})
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { text, image } = req.body;
		const receiverId = req.params.id;
		const senderId = req.user._id;

		let imageUrl;
		if (image) {
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadResponse.secure_url; // ✅ fixed typo
		}

		const newMessage = await Message.create({
			senderId,
			receiverId,
			text,
			image: imageUrl,
		});

		// emit the new message to the receiver's socket
		const receiverSocketId = userSocketMap[receiverId];
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json({ success: true, newMessage });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};
