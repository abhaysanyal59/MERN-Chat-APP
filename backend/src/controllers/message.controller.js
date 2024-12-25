
const userModel = require("../models/user.models.js");
const messageModel = require("../models/message.models.js");
const cloudinary = require("cloudinary");
const {getReceiverSocketId,io} = require("../connections/socket.js")

const getUsersForSidebar = async (request, response) => {
  try {
    const loggedInUserId = request.user._id;
    const filteredUsers = await userModel
      .find({
        _id: { $ne: loggedInUserId },
      })
      .select("-password");
    response.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getusersidebar:", error.message);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

const getMessages = async (request, response) => {
  try {
    const { id: userToChatId } = request.params;
    const myId = request.user._id;
    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    response.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessage", error.message);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

const sendMessages = async (request, response) => {
  try {
    const sentMessageData = request.body;
    const text = sentMessageData.text;
    const image = sentMessageData.image;
    const { id: receiverId } = request.params;
    const senderId = request.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage",newMessage); 
    }
    response.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in message controller", error.message);
    response.status(500).json("Internal Server Error");
  }
};
module.exports = { getUsersForSidebar, getMessages, sendMessages };
