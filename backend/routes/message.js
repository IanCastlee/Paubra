import express from "express";
import multer from "multer";
import {
  sendMessage,
  getConversation,
  getMessage,
} from "../controller/message.js";

const route = express.Router();

//Setup Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "message_images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const messageRoutes = (io) => {
  route.post("/send-message", upload.single("messageImage"), (req, res) =>
    sendMessage(req, res, io)
  );

  route.get("/chats", (req, res) => getMessage(req, res, io));
  route.get("/conversation", (req, res) => getConversation(req, res, io));

  return route;
};

export default messageRoutes;
